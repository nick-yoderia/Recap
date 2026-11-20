import typer
from transcribe import run
from typing import BinaryIO

app = typer.Typer()

@app.command()
def main(
    audio_path: BinaryIO = typer.Argument(
        ...,
        exists=True,
        file_okay=True,
        dir_okay=True,
        readable=True,
        resolve_path=True,
        )
):
    if audio_path.suffix.lower() != ".mp3":
        typer.echo(f"Error: File must be .mp3", err=True)
        raise typer.Exit(code=1)
    
    typer.echo(f"Transcribing {audio_path}")
    typer.echo(f"Processing...")
    with open(audio_path, "rb") as f:
        run(f)

if __name__ == "__main__":
    app()