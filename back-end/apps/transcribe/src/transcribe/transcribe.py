from faster_whisper import WhisperModel
from typing import BinaryIO
import logging

def run(file: BinaryIO):
    model_size = "base"

    # Run on GPU with FP16
    #model = WhisperModel(model_size, device="cuda", compute_type="float16")

    # or run on GPU with INT8
    # model = WhisperModel(model_size, device="cuda", compute_type="int8_float16")
    # or run on CPU with INT8
    model = WhisperModel(model_size, device="cpu", compute_type="int8")

    segments, info = model.transcribe(file, beam_size=5)

    logging.info("Detected language '%s' with probability %f" % (info.language, info.language_probability))

    ret = ""
    
    for segment in segments:
        ret += f"{segment.text}\n"

    return ret