from pydantic import BaseModel

from application.vkid.jwt_manager.model import JWTModelProfile


class VKIDFirstStepParams(BaseModel):
    code_challenge: str
    code_challenge_method: str = "s256"
    state: str
    scopes: str = "vkid.personal_info"
    client_id: str
    redirect_uri: str


class VKIDSecondStepParams(BaseModel):
    code: str
    state: str
    device_id: str
    ext_id: str
    type: str


class VKIDAccessToken(BaseModel):
    refresh_token: str | None = None
    access_token: str
    token_type: str
    expires_in: int
    user_id: int
    state: str | None = None
    scope: str | None = None


class ResponseProfileListInfo(BaseModel):
    response: list[JWTModelProfile] = []
