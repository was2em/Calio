# Calio
An app for Chat. Call. Connect.

## FastAPI setup

Project layout:

```text
Calio/
├── backend/
│   ├── .venv/
│   ├── app/
│   ├── tests/
│   ├── requirements.txt
│   └── .env
├── frontend/
└── README.md
```

Enter the backend folder:

```powershell
cd backend
```

Create and activate the virtual environment:

```powershell
python -m venv .venv
.\.venv\Scripts\Activate.ps1
```

Install dependencies:

```powershell
python -m pip install -r requirements.txt
```

Run the API:

```powershell
python run.py
```

Swagger UI will open automatically at `http://127.0.0.1:8000/docs`.

You can also run without auto-opening Swagger:

```powershell
fastapi dev app/main.py
```

```Database packages
For PostgreSQL + SQLAlchemy 2.x:
pip install sqlalchemy psycopg[binary] alembic
```
