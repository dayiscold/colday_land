import aiohttp
from pydantic import TypeAdapter
from socket import AF_INET

from application.vkid.client.exception import VKIDAuthException
from application.vkid.client.models import VKIDAccessToken
from application.vkid.jwt_manager.model import JWTModelProfile


class VKIDClient:
    def __init__(self):
        timeout = aiohttp.ClientTimeout(total=2)
        connector = aiohttp.TCPConnector(family=AF_INET, limit_per_host=1000, ssl=True)
        self.transport = aiohttp.ClientSession(timeout=timeout, connector=connector, raise_for_status=False)

    async def authorize(
        self,
        grant_type: str,
        code_verifier: str,
        redirect_uri: str,
        code: str,
        client_id: str,
        device_id: str,
        state: str,
    ) -> VKIDAccessToken:
        """
        Второй фактор в O2Auth авторизации
        :param grant_type: Способ запроса токена. В данном случае указывается значение authorization_code
        :param code_verifier: Верификатор, который обеспечивает защиту передаваемых данных.
        Параметр применяется при PKCE.
        Случайно сгенерированная строка, новая на каждый запрос.
        Может состоять из следующих символов алфавита: a-z, A-Z, 0-9, _, -.
        Длина от 43 до 128 символов.
        На основании строки формируется code_challenge: сервер преобразует code_verifier
        методом code_challenge_method, полученным в запросе на отправку кода подтверждения,
        и сравнивает результат с code_challenge из того же запроса.
        Параметр обязателен для обмена кода на токен
        :param redirect_uri: URL, куда перенаправляется пользователь после того, как он разрешил приложению доступ.
        Используется доверенный
        redirect URL, указанный в настройках приложения
        :param code: Код подтверждения authorization_code, который можно обменять на токен. Передается в теле запроса
        :param client_id: Идентификатор приложения. Доступен в параметрах приложения
        :param device_id: Уникальный идентификатор устройства, полученный вместе с авторизационным кодом
        :param state: Строка состояния в виде случайной строки длиной не
        менее 32 байта с символами из алфавита a-z, A-Z, 0-9, _, -.
        Передается на старте авторизации и должна возвращаться
        клиентскому приложению без изменения.
        Иначе ответ можно считать подмененным
        :return: Модель доступов
        """
        response = await self.transport.post(
            url="https://id.vk.com/oauth2/auth",
            params={
                "grant_type": grant_type,
                "code_verifier": code_verifier,
                "redirect_uri": redirect_uri,
                "code": code,
                "client_id": client_id,
                "device_id": device_id,
                "state": state,
            },
        )
        payload = await response.json()
        if "error" in payload:
            raise VKIDAuthException(error_description=payload.get("error_description"))
        return VKIDAccessToken.model_validate(obj=payload, strict=False)

    async def get_profile_info(
        self,
        access_token,
        user_ids: str,
        fields: str,
    ) -> list[JWTModelProfile]:
        response = await self.transport.post(
            url="https://api.vk.com/method/users.get",
            data={
                "user_ids": user_ids,
                "fields": fields,
                "access_token": access_token,
                "v": "5.199",
            },
        )
        payload = await response.json()
        if "error" in payload:
            raise VKIDAuthException(error_description=((payload.get("error") or dict()).get("error_msg")) or "")

        return TypeAdapter[list[JWTModelProfile]].validate_python(object=payload, strict=False)


vkid_client = None
