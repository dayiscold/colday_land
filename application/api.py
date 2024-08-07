from fastapi import FastAPI
from crud import get_site_info
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
