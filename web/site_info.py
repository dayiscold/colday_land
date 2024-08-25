from fastapi import Depends

from application.crud import get_site_info, edit_site_info, SiteInfoSchema, SiteInfoEdit, get_db_session
from web.app import app


@app.get("/api/v1/site_info", tags=["Site info"])
async def read_site_info(db=Depends(get_db_session)) -> SiteInfoSchema:
    """Return Site Links"""
    return get_site_info(session=db)


@app.post("/api/v1/site_info", tags=["Site info"])
async def change_site_info(site_info: SiteInfoSchema, db=Depends(get_db_session)) -> SiteInfoEdit:
    """Return changed information Links"""
    edit_site_info(site_info=site_info, session=db)
    return SiteInfoEdit(message="Успешно")
