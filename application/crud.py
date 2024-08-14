from datetime import datetime
from typing import List

from fastapi.security import OAuth2PasswordBearer
from pydantic import BaseModel
from sqlalchemy.orm import Session

from database import SiteInfo, SessionLocal

security = OAuth2PasswordBearer(tokenUrl="token")


def get_db_session():
    """Receives Session Database"""
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


class LinksSchema(BaseModel):
    id: str
    url: str
    type: str
    path: str


class SiteInfoSchema(BaseModel):
    name: str
    description: str
    year: int = datetime.now().year
    links: List[LinksSchema]


class SiteInfoEdit(BaseModel):
    message: str


def get_site_info(session: Session) -> SiteInfoSchema:
    site_info = session.query(SiteInfo).first()
    return SiteInfoSchema(name=site_info.name, description=site_info.description, links=site_info.links)


def edit_site_info(
    site_info: SiteInfoSchema,
    session: Session,
) -> None:
    with session.begin():
        session.query(SiteInfo).delete()
        session.add(
            SiteInfo(
                id=site_info.id,
                name=site_info.name,
                description=site_info.description,
                year=site_info.year,
                links=site_info.links,
            )
        )
        session.commit()
