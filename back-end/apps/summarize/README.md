# Running the Summarize app for development:

Summarize can be run from the command line for testing during development. The below commands should allow you to run the summarize module with a provided meeting transcript from your CLI. You will need to have two terminals active for this to run.

The first terminal will serve Ollama while the second terminal will run the script and return the summary.

## Housekeeping
All commands will be run from the back-end directory and require the [uv](https://docs.astral.sh/uv/getting-started/installation/) environment.

```sh
cd back-end
uv sync --all-packages
```

### Downloading Ollama

Ollama will need to be installed on your machine before running the server. The commands below install Ollama.

macOS and Linux:
```sh
curl -fsSL https://ollama.com/install.sh | sh
```

Windows (PowerShell):
```powershell
irm https://ollama.com/install.ps1 | iex
```

### Running the Ollama server
Before downloading the model, you must run the Ollama server. Open a new terminal and run:
```sh
ollama serve
```

In your other terminal, you will then be able to download the model onto your machine for local summarization. llama3.2:3b is approximately 2GB.
```sh
ollama pull llama3.2:3b
```

## Running Summarize

In that same terminal, run the following command with the Ollama server still running in a separate terminal.

Pass the transcript inside of the quotation marks.

```sh
uv run --all-packages summarize "meeting transcript here"
```
