from fastapi import Depends, Query

<<<<<<< HEAD
from application.crud import (
    get_db_session,
    get_photo_releases_list,
    ReleasesSchema,
    change_current_release,
    ReleasesInfoEdit,
    ReleasesSchemaItem,
    delete_current_release,
    ReturnReleaseFromId,
    add_new_release,
)
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


@app.post("/api/v1/releases/", tags=["Releases"])
async def add_release_handler(release: ReleasesSchemaItem, db=Depends(get_db_session)) -> ReleasesSchemaItem:
    """ADD NEW RELEASE"""
    return add_new_release(new_release=release, session=db)


@app.post("/api/v1/releases/", tags=["Releases"])
async def change_release_handler(release: ReleasesSchemaItem, db=Depends(get_db_session)) -> ReleasesInfoEdit:
    """CHANGE CURRENT RELEASE"""
    change_current_release(release_info=release, session=db)
    return ReleasesInfoEdit(status="ok")


@app.delete("api/v1/releases/{release_id}", tags=["Releases"])
async def delete_release_handler(release_id: int, db=Depends(get_db_session)) -> ReleasesInfoEdit:
    delete_current_release(id=ReturnReleaseFromId(id=release_id), session=db)
    return ReleasesInfoEdit(status="Релиз удален")
