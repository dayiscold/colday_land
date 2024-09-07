from fastapi import HTTPException
from fastapi.security import HTTPBearer
from starlette.requests import Request

from application.vkid.jwt_manager import jwt_instance_manager
from application.vkid.jwt_manager.exception import JWTException
from application.vkid.jwt_manager.model import JWTModelWithAccessToken

HTTPBearerSecurityException = HTTPException(status_code=401, detail="Доступ запрещен")


class HTTPBearerSecurity(HTTPBearer):
    def __init__(self):
        super().__init__(
            scheme_name="JWT токен пользователя",
            auto_error=False,
        )

    async def __call__(self, request: Request):
        cred = await super().__call__(request=request)
        if not (cred and cred.credentials):
            raise HTTPBearerSecurityException
        try:
            return jwt_instance_manager.decode(access=JWTModelWithAccessToken(access_token=cred.credentials))
        except JWTException:
            raise HTTPBearerSecurityException
