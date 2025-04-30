import uuid
import pkce

from application.vkid.client.exception import VKIDAuthException


class VKIDPKCEStore:
    def __init__(self):
        self._store: dict[str, str] = dict()

    def generate(self) -> tuple[str, str]:
        """
        Generate state and pkce code_challenge
        :return: [0] - state, [1] - code_challenge
        """
        code_verifier, code_challenge = pkce.generate_pkce_pair(code_verifier_length=100)
        state = str(uuid.uuid4())
        self._store[state] = code_verifier
        return state, code_challenge

    def get(self, state: str) -> str:
        """
        Get pkce code_verify by state
        :return: code_verify
        """
        code = self._store.get(state)
        if not code:
            raise VKIDAuthException(error_description="Неверный код для VKID")
        return code


vkid_store = VKIDPKCEStore()
