from fastapi import APIRouter

router = APIRouter()


@router.get("/health")
def calls_health() -> dict[str, str]:
    return {"module": "calls", "status": "ok"}
