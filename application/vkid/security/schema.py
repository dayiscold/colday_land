from fastapi import HTTPException
from fastapi.security import APIKeyCookie
from starlette.requests import Request

from application.vkid.jwt_manager import jwt_instance_manager
from application.vkid.jwt_manager.exception import JWTException
from application.vkid.jwt_manager.model import JWTModelWithAccessToken, JWTModelProfile

HTTPBearerSecurityException = HTTPException(status_code=401, detail="Доступ запрещен")


class HTTPCookiesSecurity(APIKeyCookie):
    def __init__(self):
        super().__init__(
            name="Authorization",
            scheme_name="JWT токен пользователя",
            auto_error=False,
        )

    async def __call__(self, request: Request) -> JWTModelProfile:
        access_token = await super().__call__(request=request)
        if not access_token:
            raise HTTPBearerSecurityException
        try:
            return jwt_instance_manager.decode(access=JWTModelWithAccessToken(access_token=access_token))
        except JWTException:
            raise HTTPBearerSecurityException
