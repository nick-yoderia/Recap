from faster_whisper import WhisperModel, BatchedInferencePipeline
import pathlib
import time
import subprocess
import numpy as np

def process_audio(filename: pathlib.Path):
    command = ["ffmpeg", "-y", 
                   "-i", str(filename),
                   "-af", "loudnorm=I=-16:TP=-1.5:LRA=11", # normalize volume levels
                   "-ar", "16000", # standarize to 16 kHz audio (standard for models)
                   "-ac", "1", # make audio mono
                   "-f", "s16le", # raw PCM
                   "-"
                    ]
    
    result = subprocess.run(command, check=True, stdout=subprocess.PIPE, stderr=subprocess.DEVNULL)

    audio = np.frombuffer(result.stdout, dtype=np.int16).astype(np.float32) / 32768.0 # turns into numpy array to use in model
    
    return audio

def ts(filename: pathlib.Path):
    model_size = "large-v3-turbo" # possible models: tiny, base, small, medium, large-v2, large-v3, large-v3-turbo, distil-large-v3

    # Run on GPU with FP16
    #model = WhisperModel(model_size, device="cuda", compute_type="float16")

    # or run on GPU with INT8
    # model = WhisperModel(model_size, device="cuda", compute_type="int8_float16")
    # or run on CPU with INT8
    model = WhisperModel(model_size, device="cpu", compute_type="int8")
    batched_model = BatchedInferencePipeline(model=model)

    # audio = process_audio(filename)

    #start = time.perf_counter()
    segments, info = batched_model.transcribe(filename, batch_size=16) # beam_size=5 if not using batched_model
    #end = time.perf_counter()
    #total = end - start

    #print(f"Time taken to transcribe: {total:.4f} seconds")

    logging.info("Detected language '%s' with probability %f" % (info.language, info.language_probability))

    ret = ""
    
    for segment in segments:
        ret += f"{segment.text}\n"

    return ret