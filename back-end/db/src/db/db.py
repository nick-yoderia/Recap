import sqlite3
from pathlib import Path

def init():

    here = Path(__file__).parents[2]
    db_path = here / "recap.db"

    with sqlite3.connect(db_path) as conn:

        cursor = conn.cursor()

        cursor.execute("""--sql
            create table if not exists owner(
                id integer primary key,
                token_hash text,
                created_at datetime
            )""")

        cursor.execute("""--sql
            create table if not exists meeting(
                id integer primary key,
                owner_id int references owner(id),
                -- series_id int references series(id)
                title text,
                source_filename text,
                duration_seconds int,
                status text,
                keep_media boolean,
                media_deleted_at datetime,
                created_at datetime
            )""")
        