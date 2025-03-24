import psycopg


def is_first_time_setup(connection_string):
    """Check if the checkpointer tables exist in the database."""
    conn = psycopg.connect(connection_string)
    try:
        with conn.cursor() as cursor:
            # PostgresSaver creates a table called 'checkpoints' by default
            cursor.execute(
                """
                SELECT EXISTS (
                    SELECT FROM information_schema.tables
                    WHERE table_name = 'checkpoints'
                );
                """
            )
            table_exists = cursor.fetchone()
            return not table_exists
    finally:
        conn.close()
