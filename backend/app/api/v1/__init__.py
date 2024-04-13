from fastapi import APIRouter

from backend.app.config.settings import settings
from backend.app.api.v1.endpoints import user, login, service

router = APIRouter(
    prefix = f'/{settings.general.API_V1_STR}',
)
router.include_router(user.router, prefix = '/users', tags = ["Users"])
router.include_router(login.router, prefix = '/login', tags = ["Login"])
router.include_router(service.router, prefix = '/service', tags = ["Service"])
