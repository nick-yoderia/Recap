import typer
import pathlib
from transcribe import run

app = typer.Typer()

@app.command()
def main(
    video_path: pathlib.Path = typer.Argument(
        ...,
        exists=True,
        file_okay=True,
        dir_okay=True,
        readable=True,
        resolve_path=True,
        )
):
    if video_path.suffix.lower() != ".mp3":
        typer.echo(f"Error: File must be .mp3", err=True)
        raise typer.Exit(code=1)
    
    typer.echo(f"Transcribing {video_path}", err=True)
    print(run(video_path))

if __name__ == "__main__":
    app()