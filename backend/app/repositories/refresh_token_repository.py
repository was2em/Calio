from datetime import datetime, timezone

from sqlalchemy import select
from sqlalchemy.orm import Session

from app.models.refresh_token import RefreshToken


class RefreshTokenRepository:

    @staticmethod
    def create(
        db: Session,
        refresh_token: RefreshToken,
    ) -> RefreshToken:
        db.add(refresh_token)
        db.commit()
        db.refresh(refresh_token)

        return refresh_token

    @staticmethod
    def get_by_hash(
        db: Session,
        token_hash: str,
    ) -> RefreshToken | None:
        statement = select(RefreshToken).where(
            RefreshToken.token_hash == token_hash
        )

        return db.scalar(statement)

    @staticmethod
    def revoke(
        db: Session,
        refresh_token: RefreshToken,
    ) -> None:
        refresh_token.revoked_at = datetime.now(timezone.utc)

        db.commit()