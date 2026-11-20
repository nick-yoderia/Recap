import typer
import pathlib
import shutil
from convert import run
import sys

app = typer.Typer()

@app.command()
def main(
    input_path: pathlib.Path = typer.Argument(
        ...,
        exists=True,
        file_okay=True,
        dir_okay=False,
        readable=True,       
        resolve_path=True    
    )
):
    typer.echo(f"Converting {input_path}", err=True)

    try:
        # Open the file path as a binary stream and pass it to convert.run()
        with open(input_path, "rb") as file_stream:
            audio_stream = run(file_stream)
            shutil.copyfileobj(audio_stream, sys.stdout.buffer)
            sys.stdout.buffer.flush()

            
    except Exception as e:
        typer.echo(f"Error during conversion: {e}", err=True)
        raise typer.Exit(code=1)
    
if __name__ == "__main__":  
    app()