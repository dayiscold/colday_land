from web.app import app
from web.site_info import app as router_site_info
from web.photos import app as router_photos
from web.releases import app as router_releases
from web.vkid import app as router_vkid

__all__ = (
    "app",
    "router_site_info",
    "router_vkid",
    "router_photos",
    "router_releases",
)
