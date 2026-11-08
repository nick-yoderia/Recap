from fastapi import FastAPI, UploadFile, File
import convert
import transcribe
import summarize

app = FastAPI()

@app.post("/api/convert")
def convert_media(file: UploadFile):
    media = convert.run(file.file)
    return {"convert": media}

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