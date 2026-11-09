
### Dependencies

1. [Install uv](https://docs.astral.sh/uv/getting-started/installation/)
2. [Install ollama](https://docs.ollama.com/quickstart)

### Running

If it is your first time running the `back-end` you will need to run:
```
cd /recap/back-end
uv sync
ollama serve
ollama pull llama3.2:3b
```

Once you have done this once you only have to run `uv sync` when new dependencies or new apps are added.

Now, to run an app, in `/back-end` you run:
```
uv run <APP_NAME> [args...]
```

### Special cases

`summarize` requires running the ollama local server
```
ollama serve
```

`api` has a unique uv command and requires ollama server for full functionality
```
ollama serve
uv run fastapi dev
```