from functools import lru_cache
from pathlib import Path

from pydantic_settings import BaseSettings, SettingsConfigDict


BACKEND_DIR = Path(__file__).resolve().parents[2]
ENV_FILE = BACKEND_DIR / ".env"


class Settings(BaseSettings):
    app_name: str = "Calio API"
    environment: str = "development"
    debug: bool = True
    database_url: str = "postgresql+psycopg://postgres:postgres@localhost:5432/calio_db"
    secret_key: str = "change-me"

    access_token_expire_minutes: int = 15
    refresh_token_expire_days: int = 7


    model_config = SettingsConfigDict(
        env_file=ENV_FILE,
        env_file_encoding="utf-8",
        env_prefix="CALIO_",
        extra="ignore",
    )


@lru_cache
def get_settings() -> Settings:
    return Settings()


settings = get_settings()
