import secrets
from pathlib import Path
from typing import List , Union
# Todo check beshe
from pydantic import AnyHttpUrl , BaseSettings
from backend.app import __version__
from backend.app.config.settings.helper import config

class General(BaseSettings):
    SECRET_KEY: str = secrets.token_urlsafe(32)
    DEBUG: bool = config.get("DEBUG" , True)
    VERSION: str = config.get("VERSION" , __version__)
    DOCS_FAVICON_PATH: Path = config.get("DOCS_FAVICON_PATH" , "test/fav.ico")
    HOST_PORT: int = config.get("HOST_PORT" , 8000)

    API_V1_STR: str = config.get("API_V1_STR" , "v1")

    BACKEND_CORS_ORIGINS: Union[List[AnyHttpUrl], str] = config.get("BACKEND_CORS_ORIGINS" , [])

    PROJECT_NAME: str = config.get("PROJECT_NAME" , "")

    CLOUDFLARE_ACCOUNT_ID: str = config.get("CLOUDFLARE_ACCOUNT_ID", "")

    CLOUDFLARE_API_TOKEN: str = config.get("CLOUDFLARE_ACCOUNT_ID", "")


