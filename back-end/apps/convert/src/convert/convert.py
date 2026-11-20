import subprocess
import puremagic
from typing import BinaryIO
import io

def run (file_stream: BinaryIO) -> BinaryIO:
    # Read chunk of stream to check MIME type
    header_chunk = file_stream.read(2048)
    file_stream.seek(0)
    
    mime_type = puremagic.from_string(header_chunk, mime=True)
    
    # Validate MIME is video or audio
    allowed_mimes = {"audio/mpeg", "video/mp4", "audio/mp4", "audio/wav", "audio/x-wav", "audio/x-m4a", "video/webm", "audio/webm"}
    if mime_type not in allowed_mimes:
        raise ValueError(f"Invalid file type: {mime_type}. Valid audio and video formats only.")
    
    # Save BinaryIO stream so ffmpeg can process it 
    file_stream.seek(0)

    command = ["ffmpeg", "-y", 
                   "-i", "pipe:0",
                   "-af", "loudnorm=I=-16:TP=-1.5:LRA=11", # normalize volume levels
                   "-ar", "16000", # standarize to 16 kHz audio (standard for models)
                   "-ac", "1", # make audio mono
                   "-f", "wav", # convert to wav
                   "pipe:1"
                    ]

    result = subprocess.run(
        command,
        input=file_stream.read(),
        stdout=subprocess.PIPE,
        stderr=subprocess.PIPE,
        check=True
    )
    
    output_io = io.BytesIO(result.stdout)
    output_io.seek(0)
    output_io.name = "audio.wav"
    return output_io