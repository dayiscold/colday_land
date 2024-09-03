from fastapi import Depends, Query

from application.crud import get_db_session, get_photo_releases_list, ReleasesSchema, change_current_release, ReleasesInfoEdit, ReleasesSchemaItem
from web.app import app


@app.get("/api/v1/releases", tags=["Releases"])
async def releases_handler(releases: str | None = Query(None), db=Depends(get_db_session)) -> ReleasesSchema:
    """RETURN LIST RELEASES"""
    return get_photo_releases_list(releases=releases, session=db)


@app.post("/api/v1/releases/", tags=["Releases"])
async def change_release_handler(release: ReleasesSchemaItem, db=Depends(get_db_session)) -> ReleasesInfoEdit:
    """CHANGE CURRENT RELEASE"""
    change_current_release(release_info=release, session=db)
    return ReleasesInfoEdit(status="ok")


