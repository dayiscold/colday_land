from pydantic import BaseModel, Field


class JWTModelProfile(BaseModel):
    id: int = Field(..., title="Идентификатор пользователя")
    first_name: str = Field(..., title="Имя")
    last_name: str = Field(..., title="Фамилия")
    photo_max: str = Field(..., title="URL квадратной фотографии с максимальной шириной")


class JWTModelWithAccessToken(BaseModel):
    access_token: str
