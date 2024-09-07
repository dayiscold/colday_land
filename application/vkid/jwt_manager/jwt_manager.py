import os

import jwt

from application.vkid.jwt_manager.exception import JWTException
from application.vkid.jwt_manager.model import JWTModelWithAccessToken, JWTModelProfile


class JWTManager:
    def __init__(self, secret: str | None = None):
        self._secret = secret or os.urandom(128)
        self._algorithm = ["HS256"]

    def encode(self, profile: JWTModelProfile) -> JWTModelWithAccessToken:
        try:
            encoded_jwt = jwt.encode(payload=profile.model_dump(), key=self._secret, algorithm=self._algorithm)
            return JWTModelWithAccessToken(access_token=encoded_jwt)
        except Exception:
            raise JWTException

    def decode(self, access: JWTModelWithAccessToken) -> JWTModelProfile:
        try:
            return JWTModelProfile.model_validate(
                jwt.decode(
                    jwt=access.access_token,
                    key=self._secret,
                    algorithms=self._algorithm,
                    verify=True,
                )
            )
        except Exception:
            raise JWTException
