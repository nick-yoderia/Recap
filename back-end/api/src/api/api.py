from fastapi import FastAPI, UploadFile
from transcribe.transcribe import ts

app = FastAPI()

@app.post("/api/transcript")
def create_transcript(file: UploadFile):
    text = ts(file.file)
    return {"transcript": text}