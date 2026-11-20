import sqlite3
from pathlib import Path

DB_PATH = Path(__file__).parents[2] / "recap.db"

# return a conn object with foreign key enforcement to pass into database access functions
def get_conn():
    conn = sqlite3.connect(DB_PATH)
    conn.execute("PRAGMA foreign_keys = ON")        # enforce foreign keys
    return conn


def init():
    conn = get_conn()
    try:
        cursor = conn.cursor()

        cursor.execute("""--sql
            create table if not exists owner(
                id integer primary key,
                token_hash text,
                created_at datetime not null default current_timestamp
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
                created_at datetime not null default current_timestamp
            )""")

        cursor.execute("""--sql
            create table if not exists transcripts(
                id integer primary key, 
                meeting_id int unique not null references meeting(id) on delete cascade,
                language text, 
                whisper_model text,
                full_text text not null,
                created_at datetime not null default current_timestamp
            )""")

        cursor.execute("""--sql
            create table if not exists summaries(
                id integer primary key,
                meeting_id int not null references meeting(id) on delete cascade,
                version int not null,
                is_current int not null,
                llm_model text,
                prompt_version text,
                overview text,
                payload_json text not null,
                created_at datetime not null default current_timestamp,
                unique (meeting_id, version)
            )""")

        # ensure there is only at most one current summary per meeting summary (is_current = 1)
        cursor.execute("""--sql
            create unique index if not exists current_summaries
            on summaries (meeting_id)
            where is_current = 1
            """)

        conn.commit()
    finally:
        conn.close()


def create_meeting(conn, owner_id, filename, title):
    cursor = conn.cursor()

    cursor.execute(
        "select id from owner where id = ?",
        (owner_id,)
    )
    owner = cursor.fetchone()
    if owner is None: raise ValueError(f"Owner {owner_id} does not exist")      # raise ValueError if owner_id does not exist instead of handling

    cursor.execute("""--sql
        insert into meeting (owner_id, source_filename, title, status, keep_media)
        values (?, ?, ?, 'uploaded', 0)
    """, (owner_id, filename, title))

    return cursor.lastrowid     # return new meeting_id on success


def save_transcript(conn, meeting_id, full_text, language=None, whisper_model="base"):
    cursor = conn.cursor()

    cursor.execute(
        "select id from meeting where id = ?",
        (meeting_id,)
        )
    meeting = cursor.fetchone()
    if meeting is None: raise ValueError(f"Meeting {meeting_id} does not exist") 

    cursor.execute("""--sql
        insert into transcripts (meeting_id, language, whisper_model, full_text)
        values (?, ?, ?, ?)
    """, (meeting_id, language, whisper_model, full_text))

    return cursor.lastrowid


def save_summary(conn, meeting_id, overview, payload_json, llm_model=None, prompt_version=None):
    cursor = conn.cursor()

    cursor.execute(
        "select id from meeting where id = ?",
        (meeting_id,)
    )
    meeting = cursor.fetchone()
    if meeting is None: raise ValueError(f"Meeting {meeting_id} does not exist") 

    cursor.execute(
        "select MAX(version) from summaries where meeting_id = ?",
        (meeting_id,)
    )
    max_version = cursor.fetchone()[0]
    if max_version is None:
        version = 1
    else:
        version = max_version + 1
        cursor.execute("update summaries set is_current = 0 where meeting_id = ? AND is_current = 1", (meeting_id,))

    cursor.execute("""--sql
            insert into summaries (meeting_id, version, is_current, llm_model, prompt_version, overview, payload_json)
            values (?, ?, 1, ?, ?, ?, ?)
        """, (meeting_id, version, llm_model, prompt_version, overview, payload_json))

    return cursor.lastrowid


def list_meeting(conn, owner_id):
    cursor = conn.cursor()

    cursor.execute("""--sql
        select id, title, status, created_at
        from meeting
        where owner_id = ?
        order by created_at desc, id desc
    """, (owner_id,))

    return cursor.fetchall()


def get_meeting(conn, meeting_id, owner_id):
    cursor = conn.cursor()

    cursor.execute("""--sql
    select id, title, status, created_at
    from meeting
    where id = ? AND owner_id = ?
    """, (meeting_id, owner_id))

    return cursor.fetchone()


# return the owner_id that matches this token hash, or None if no match
def get_owner_by_token(conn, token_hash):
    cursor = conn.cursor()

    cursor.execute("""--sql
        select id
        from owner
        where token_hash = ?
    """, (token_hash,))

    row = cursor.fetchone()
    if row is None: return None
    return row[0]


# create a new owner with this token hash and return its new owner_id
def create_owner(conn, token_hash):
    cursor = conn.cursor()

    cursor.execute("""--sql
        insert into owner (token_hash)
        values (?)
    """, (token_hash,))

    return cursor.lastrowid