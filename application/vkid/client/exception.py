from fastapi import HTTPException


class VKIDAuthException(HTTPException):
    def __init__(self, error_description: str):
        super().__init__(status_code=500, detail=error_description or "Ошибка интеграции VKID")
