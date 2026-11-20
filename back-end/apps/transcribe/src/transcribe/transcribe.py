from faster_whisper import WhisperModel, BatchedInferencePipeline
from typing import BinaryIO
import logging

def run(audio: BinaryIO):
    model_size = "large-v3-turbo" # possible models: tiny, base, small, medium, large-v2, large-v3, large-v3-turbo, distil-large-v3


    # Run on GPU with FP16
    # model = WhisperModel(model_size, device="cuda", compute_type="float16")

    # or run on GPU with INT8
    # model = WhisperModel(model_size, device="cuda", compute_type="int8_float16")
    # or run on CPU with INT8


    model = WhisperModel(model_size, device="cpu", compute_type="int8")
    batched_model = BatchedInferencePipeline(model=model)

    segments, info = batched_model.transcribe(audio, batch_size=16) # beam_size=5 if not using batched_model

    logging.info("Detected language '%s' with probability %f" % (info.language, info.language_probability))

    ret = ""
    
    for segment in segments:
        ret += f"{segment.text}\n"

    return ret