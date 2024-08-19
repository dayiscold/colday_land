from fastapi import Depends
from application.crud import get_site_info, edit_site_info, SiteInfoSchema, SiteInfoEdit, get_db_session, \
    get_photo_releases_list, PhotoHandlerSchema, PhotoAddSchema
from web.app import app


@app.get("/api/v1/site_info")
async def read_site_info(db=Depends(get_db_session)) -> SiteInfoSchema:
    """Return Site Links"""
    return get_site_info(session=db)


@app.post("/api/v1/site_info")
async def change_site_info(site_info: SiteInfoSchema, db=Depends(get_db_session)) -> SiteInfoEdit:
    """Return changed information Links"""
    edit_site_info(site_info=site_info, session=db)
    return SiteInfoEdit(message="Успешно")


@app.get("api/v1/photos")
async def photo_handler(db=Depends(get_db_session)) -> PhotoHandlerSchema:
    """RETURN LIST PHOTOS"""
    return get_photo_releases_list(session=db)


@app.post("api/v1/photos")
async def add_photo(db=Depends(get_db_session)) -> PhotoAddSchema:
    """RETURN NEW PHOTO"""
    return append_photo(session=db)
