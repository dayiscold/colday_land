import os
from dataclasses import dataclass, field
from functools import partial


@dataclass
class VKIDConfig:
    client_id: str = field(default_factory=partial(os.environ.get, "VK_CLIENT_ID", "1"))  # type: ignore[assignment]
    frontend_url: str = field(
        default_factory=partial(os.environ.get, "VK_REDIRECT_URL", "http://localhost:5183")
    )  # type: ignore[assignment]
    access_admin_page: set[int] = field(
        default_factory=lambda: set(map(int, os.environ.get("VK_ACCESS_ADMIN", "1").split(",")))
    )

    def has_access_admin_page_user(self, user_id: int) -> bool:
        return user_id in self.access_admin_page


vkid_config = VKIDConfig()
