from fastapi import HTTPException

JWTException = HTTPException(status_code=500, detail="Невозможно создать или обновить JWT токен")
