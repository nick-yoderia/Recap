from fastapi import FastAPI, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI, UploadFile, Request, Response, HTTPException
import hashlib
import secrets
import convert
import transcribe
import summarize
import db

app = FastAPI()

OWNER_COOKIE = "owner_token"
ONE_YEAR_SECONDS = 60 * 60 * 24 * 365

def hash_token(token: str) -> str:
    return hashlib.sha256(token.encode()).hexdigest()


origins = [
    "http://localhost:5173"
]


app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Return this browser's owner_id, creating a new owner (and cookie) if needed.
@app.get("/api/owner")
def get_or_create_owner(request: Request, response: Response):
    conn = db.get_conn()
    try:
        token = request.cookies.get(OWNER_COOKIE)
        owner_id = None

        if token:
            owner_id = db.get_owner_by_token(conn, hash_token(token))

        if owner_id is None:
            # TODO: Handle token collision
            token = secrets.token_urlsafe(32)
            owner_id = db.create_owner(conn, hash_token(token))
            conn.commit()
    finally:
        conn.close()

    assert token is not None
    response.set_cookie(
        key=OWNER_COOKIE,
        value=token,
        max_age=ONE_YEAR_SECONDS,
        httponly=True,
        samesite="lax",
    )
    return {"owner_id": owner_id}


# Run the full pipeline (convert -> transcribe -> summarize) on one upload,
# saving the meeting, transcript and summary under this browser's owner.
@app.post("/api/pipeline")
def run_pipeline(request: Request, file: UploadFile):
    token = request.cookies.get(OWNER_COOKIE)
    if not token:
        raise HTTPException(status_code=401, detail="Missing owner cookie")

    conn = db.get_conn()
    try:
        owner_id = db.get_owner_by_token(conn, hash_token(token))
        if owner_id is None:
            raise HTTPException(status_code=401, detail="Unknown owner")

        meeting_id = db.create_meeting(conn, owner_id)
        db.update_meeting_status(conn, meeting_id, "processing")
        conn.commit()

        try:
            audio = convert.run(file.file)
            text = transcribe.run(audio)
            summary = summarize.run(text)
        except ValueError as e:
            db.update_meeting_status(conn, meeting_id, "failed")
            conn.commit()
            raise HTTPException(status_code=400, detail=str(e))
        except Exception:
            db.update_meeting_status(conn, meeting_id, "failed")
            conn.commit()
            raise

        # TODO: Change architecture so model names are not hard coded
        db.save_transcript(conn, meeting_id, text, whisper_model="large-v3-turbo")
        db.save_summary(conn, meeting_id, summary, llm_model="llama3.2:3b")
        db.update_meeting_status(conn, meeting_id, "complete")
        conn.commit()
    finally:
        conn.close()

    return {"meeting_id": meeting_id, "summary": summary, "transcript": text}