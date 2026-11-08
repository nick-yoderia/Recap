import subprocess
import pathlib 
from pathlib import Path
import magic
from typing import BinaryIO
import tempfile
import shutil

def run (file_stream: BinaryIO) -> pathlib.Path:
    # Read chunk of stream to check MIME type
    header_chunk = file_stream.read(2048)
    file_stream.seek(0)
    
    mime_type = magic.from_buffer(header_chunk, mime=True)
    
    # Validate MIME is video or audio
    allowed_mimes = {"audio/mpeg", "video/mp4", "audio/mp4", "audio/wav", "audio/x-wav", "audio/x-m4a", "video/webm", "audio/webm"}
    if mime_type not in allowed_mimes:
        raise ValueError(f"Invalid file type: {mime_type}. Valid audio and video formats only.")
    
    # Save BinaryIO stream so ffmpeg can process it 
    with tempfile.NamedTemporaryFile(delete=False, suffix=".tmp") as temp_in:
        shutil.copyfileobj(file_stream, temp_in)
        temp_in_path = pathlib.Path(temp_in.name)
        
    try:
        outputPath = temp_in_path.with_name("converted.mp3")
        ffmpegCommands = [
            "ffmpeg",
            "-y", # Overwrite output file 
            "-i", str(temp_in_path),
            "-vn", # No Video
            "-c:a", "libmp3lame", # Use Lame encoding library for MP3
            "-q:a", "2", # Variable bitrate
            str(outputPath) # Output file
        ]
        
        result = subprocess.run(ffmpegCommands, capture_output=True, text=True)
        if result.returncode != 0:
            raise RuntimeError(f"FFMpeg conversion failed: {result.stderr}")
        return outputPath
    finally:
        # CLean temp file 
        if temp_in_path.exists():
            temp_in_path.unlink()