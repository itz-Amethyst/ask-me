from fastapi import FastAPI
from fastapi.responses import ORJSONResponse

from backend.app.config.settings import settings

from backend.app.setup.route.main import setup_routers


tags_metadata = [
    {
        "name": "Ask-me",
        "description": "An Ai assistant with its feature",
    },
]

def create_app():
    description = f"{settings.general.PROJECT_NAME} API"
    app = FastAPI(
        title=settings.general.PROJECT_NAME,
        debug = settings.general.DEBUG,
        version = settings.general.VERSION,
        openapi_url=f"/api/{settings.general.API_V1_STR}/openapi.json",
        docs_url="/docs/",
        default_response_class = ORJSONResponse,
        openapi_tags = tags_metadata,
        description=description,
        redoc_url=None,
    )
    setup_routers(app)
    return app





