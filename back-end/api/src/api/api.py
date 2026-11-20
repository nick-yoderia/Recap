from fastapi import FastAPI, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI, UploadFile, File, Request, Response
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
