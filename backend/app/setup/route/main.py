from fastapi import FastAPI
from backend.app.api import router
def setup_routers(app: FastAPI) -> None:
    app.include_router(router)
