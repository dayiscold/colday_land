import logging
import os
from datetime import timedelta, datetime, timezone

import jwt

from application.vkid.jwt_manager.exception import JWTException
from application.vkid.jwt_manager.model import JWTModelWithAccessToken, JWTModelProfile

logger = logging.getLogger(__name__)


class JWTManager:
    def __init__(self, secret: str | None = None, access_lifetime: int | None = None):
        self._access_lifetime = access_lifetime or 30 * 60
        self._secret = secret or os.urandom(128)
        self._algorithm = "HS256"

    @property
    def access_lifetime(self) -> int:
        return self._access_lifetime

    def encode(self, profile: JWTModelProfile) -> JWTModelWithAccessToken:
        try:
            payload = profile.model_dump()
            payload["exp"] = datetime.now(tz=timezone.utc) + timedelta(seconds=self._access_lifetime)
            encoded_jwt = jwt.encode(payload=payload, key=self._secret, algorithm=self._algorithm)
            return JWTModelWithAccessToken(access_token=encoded_jwt)
        except Exception:
            logger.debug("JWTManager.encode exception", exc_info=True)
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
            logger.debug("JWTManager.decode exception", exc_info=True)
            raise JWTException
