from fastapi import FastAPI

from app.api import auth, users
from app.core.config import settings


app = FastAPI(
    title=settings.app_name,
    debug=settings.debug,
)


app.include_router(
    auth.router,
    prefix="/auth",
    tags=["auth"],
)

app.include_router(
    users.router,
    prefix="/users",
    tags=["users"],
)


@app.get("/")
def read_root() -> dict[str, str]:
    return {
        "message": f"{settings.app_name} is running"
    }


@app.get("/health")
def health_check() -> dict[str, str]:
    return {
        "status": "ok"
    }