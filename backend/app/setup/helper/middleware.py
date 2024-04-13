from starlette.middleware.cors import CORSMiddleware

from backend.app.config.settings import settings


def setup_cors_middleware(app):
        app.add_middleware(
            CORSMiddleware,
            allow_origins=[str(origin) for origin in settings.general.BACKEND_CORS_ORIGINS] if settings.general.BACKEND_CORS_ORIGINS else ["*"],
            allow_credentials=True,
            allow_methods=["*"],
            expose_headers=["Content-Range", "Range"],
            allow_headers=["Authorization", "Range", "Content-Range"],
        )