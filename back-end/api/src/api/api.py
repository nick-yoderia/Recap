from fastapi import FastAPI, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI, UploadFile, File
import convert
import transcribe
import summarize

app = FastAPI()


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
@app.post("/api/convert")
def convert_media(file: UploadFile):
    media = convert.run(file.file)
    return {"convert": media}

@app.post("/api/transcript")
def create_transcript(file: UploadFile):
    text = transcribe.run(file.file)
    return {"transcript": text}

@app.post("/api/summary")
async def create_summary(file: UploadFile):
    text = transcribe.run(file.file)
    summary = summarize.run(text)
    return {"summary": summary, "transcript": text}