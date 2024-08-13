from crud import get_site_info, edit_site_info, get_photo_releases_list
from pydantic import BaseModel
from datetime import datetime
from typing import List


@app.get("/api/v1/site_info")
async def read_site_info():
    """Return Site Links"""
    return get_site_info()


class LinksSchema(BaseModel):
    id: str
    url: str
    type: str
    path: str


class SiteInfoSchema(BaseModel):
    name: str = "COLDAY"
    description: str = "все для души."
    year: int = datetime.now().year
    links: List[Link]


@app.post("/api/v1/site_info")
async def change_site_info():
    """Return changed information Links"""
    return edit_site_info()


@app.get("api/v1/photos")
async def photo_handler():
    """Return Releases List with Photos"""
    return get_photo_releases_list()


class PhotoHandlerSchema(BaseModel):
    id: int
    created_at: int
    updated_at: int | None
    description: str | None
    link: str
