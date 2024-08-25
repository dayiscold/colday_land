from web.app import app
from web.site_info import app as router_site_info
from web.router_legacy import app as router_legacy
from web.vkid import app as router_vkid

__all__ = (
    "app",
    "router_site_info",
    "router_legacy",
    "router_vkid",
)
