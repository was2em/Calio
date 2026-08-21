from fastapi import APIRouter

router = APIRouter()


@router.get("/health")
def messages_health() -> dict[str, str]:
    return {"module": "messages", "status": "ok"}
