from fastapi import FastAPI, UploadFile, File
import transcribe
import summarize

app = FastAPI()

@app.post("/api/transcript")
def create_transcript(file: UploadFile):
    text = transcribe.run(file.file)
    return {"transcript": text}

@app.post("/api/summary")
async def create_summary(file: UploadFile = File(...)):
    text = transcribe.run(file.file)
    print(text)
    summary = summarize.run(text)
    return {"summary": summary}