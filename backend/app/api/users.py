from fastapi import APIRouter

router = APIRouter()


@router.get("/health")
def users_health() -> dict[str, str]:
    return {"module": "users", "status": "ok"}
