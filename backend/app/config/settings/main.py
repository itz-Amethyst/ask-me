from functools import lru_cache
from pydantic_settings import BaseSettings

from backend.app.config.settings.general.main import General


class Settings(BaseSettings):
    general: General = General()



@lru_cache(maxsize = 1)
def get_settings() -> Settings:
    return Settings()

