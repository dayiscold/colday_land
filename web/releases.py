from fastapi import Depends, Query

from application.crud import get_db_session, get_photo_releases_list, ReleasesSchema
from application.vkid.security import vk_security
from web.app import app


@app.get("/api/v1/releases", tags=["Releases"])
async def releases_handler(
    releases: str | None = Query(None),
    db=Depends(get_db_session),
    _=Depends(vk_security),
) -> ReleasesSchema:
    """RETURN LIST RELEASES"""
    return get_photo_releases_list(releases=releases, session=db)
