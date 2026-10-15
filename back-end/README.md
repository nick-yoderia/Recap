# Installation

We are using OpenAI's Faster-Whisper locally for this project. There is a python package that can be installed.

 To run the cli test:

```
cd back-end
uv sync
uv run back-end
```


### Running the summarize demo:
```
cd back-end
uv sync
cp .env.example .env
```
Open `.env` and set OPENAI_API_KEY to your own key. Keys can be created on the [OpenAI Platform](https://platform.openai.com). This file is ignored by Git. Do not commit your key!

Run the demo:
```
uv run --env-file .env python src/back_end/summarize.py
```

API usage does incur billing through the account provided. The demo runs independently of `cli.py` and does not interfere with the Whisper transcription demo.
