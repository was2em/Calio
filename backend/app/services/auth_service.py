from datetime import datetime, timedelta, timezone

from sqlalchemy.orm import Session

from app.core.config import settings
from app.core.security import (
    create_access_token,
    create_refresh_token,
    hash_password,
    hash_refresh_token,
    verify_password,
)
from app.models.refresh_token import RefreshToken
from app.models.user import User
from app.repositories.refresh_token_repository import (
    RefreshTokenRepository,
)
from app.repositories.user_repository import UserRepository
from app.schemas.user import UserCreate


class AuthService:

    @staticmethod
    def register(
        db: Session,
        user_data: UserCreate,
    ) -> User:

        existing_user = UserRepository.get_by_email(
            db,
            user_data.email.lower(),
        )

        if existing_user:
            raise ValueError(
                "An account with this email already exists."
            )

        user = User(
            first_name=user_data.first_name.strip(),
            last_name=user_data.last_name.strip(),
            email=user_data.email.lower(),
            password_hash=hash_password(
                user_data.password
            ),
            phone=user_data.phone,
        )

        return UserRepository.create(
            db,
            user,
        )

    @staticmethod
    def login(
        db: Session,
        email: str,
        password: str,
    ) -> tuple[str, str]:

        user = UserRepository.get_by_email(
            db,
            email.lower(),
        )

        if not user:
            raise ValueError(
                "Invalid email or password."
            )

        if not user.is_active:
            raise ValueError(
                "This account is inactive."
            )

        if not verify_password(
            password,
            user.password_hash,
        ):
            raise ValueError(
                "Invalid email or password."
            )

        # Update last login time
        user.last_login_at = datetime.now(timezone.utc)

        # Create access token
        access_token = create_access_token(
            user.id
        )

        # Create refresh token
        refresh_token = create_refresh_token()

        refresh_token_record = RefreshToken(
            user_id=user.id,
            token_hash=hash_refresh_token(
                refresh_token
            ),
            expires_at=(
                datetime.now(timezone.utc)
                + timedelta(
                    days=settings.refresh_token_expire_days
                )
            ),
        )

        RefreshTokenRepository.create(
            db,
            refresh_token_record,
        )

        return access_token, refresh_token