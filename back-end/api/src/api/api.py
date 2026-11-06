from fastapi import FastAPI, UploadFile
import transcribe
import summarize

app = FastAPI()

@app.post("/api/transcript")
def create_transcript(file: UploadFile):
    text = transcribe.run(file.file)
    return {"transcript": text}

@app.post("/api/summary")
def create_summary(file: UploadFile):
    text = transcribe.run(file.file)
    summary = summarize.run(text)
    return {"summary": summary}