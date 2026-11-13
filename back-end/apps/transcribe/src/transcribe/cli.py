import typer
import pathlib
from transcribe import run

app = typer.Typer()

@app.command()
def main(
    audio_path: pathlib.Path = typer.Argument(
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
    
    typer.echo(f"Transcribing {audio_path}", err=True)
    with open(audio_path, "rb") as f:
        print(run(f))

if __name__ == "__main__":
    app()