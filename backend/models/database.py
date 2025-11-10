import pyodbc
import os
from dotenv import load_dotenv

load_dotenv()

def get_db_connection():
    server = os.getenv('AZURE_SQL_SERVER')
    database = os.getenv('AZURE_SQL_DATABASE')
    username = os.getenv('AZURE_SQL_USERNAME')
    password = os.getenv('AZURE_SQL_PASSWORD')
    
    if not all([server, database, username, password]):
        raise ValueError("Azure SQL connection settings are missing. Please check your .env file.")
    
    connection_string = (
        f"Driver={{ODBC Driver 18 for SQL Server}};"
        f"Server=tcp:{server},1433;"
        f"Database={database};"
        f"Uid={username};"
        f"Pwd={password};"
        f"Encrypt=yes;"
        f"TrustServerCertificate=no;"
        f"Connection Timeout=30;"
    )
    
    return pyodbc.connect(connection_string)

def init_db():
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        
        cursor.execute("""
            IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[trips]') AND type in (N'U'))
            CREATE TABLE trips (
                id INT IDENTITY(1,1) PRIMARY KEY,
                user_name NVARCHAR(100) NOT NULL,
                location NVARCHAR(255) NOT NULL,
                description NVARCHAR(MAX),
                photo_url NVARCHAR(500),
                trip_date DATETIME2 NOT NULL,
                created_at DATETIME2 DEFAULT GETDATE()
            )
        """)
        
        conn.commit()
        cursor.close()
        conn.close()
        print("Database initialized successfully")
    except Exception as e:
        print(f"Database initialization error: {str(e)}")
        print("Note: Make sure Azure SQL Database is configured and accessible")

