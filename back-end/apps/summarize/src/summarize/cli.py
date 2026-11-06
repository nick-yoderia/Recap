import typer
import sys
from summarize import run


app = typer.Typer()

@app.command()
def main(
    transcript: str |
    None = typer.Argument(None)
    ):

    if transcript is None:
        transcript = sys.stdin.read()
    typer.echo(run(transcript))