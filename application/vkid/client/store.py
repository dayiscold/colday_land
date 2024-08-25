import uuid
import pkce


class VKIDPKCEStore:
    def __init__(self):
        self._store: dict[str, str] = dict()

    def generate(self) -> tuple[str, str]:
        """
        Generate state and pkce code_challenge
        :return: [0] - state, [1] - code_challenge
        """
        code_verifier, code_challenge = pkce.generate_pkce_pair()
        state = str(uuid.uuid4())
        self._store[state] = code_verifier
        return state, code_challenge

    def get(self, state: str) -> str:
        """
        Get pkce code_verify by state
        :return: code_verify
        """
        return self._store.get(state) or ""


vkid_store = VKIDPKCEStore()
