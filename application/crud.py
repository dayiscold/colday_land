from datetime import datetime
from http import HTTPStatus
from typing import List

from fastapi import HTTPException
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
    links: List[LinksSchema] | None


class SiteInfoLinksSchema(BaseModel):
    links: List[LinksSchema] | None


class SiteInfoEdit(BaseModel):
    message: str


def get_site_info(session: Session) -> SiteInfoSchema:
    site_info = session.query(SiteInfo).first()
    if not site_info:
        raise HTTPException(status_code=HTTPStatus.NOT_FOUND, detail="Нет информации о сайте")
    return SiteInfoSchema(
        name=site_info.name,
        description=site_info.description,
        links=SiteInfoLinksSchema.model_validate(site_info.links).links,
    )


def edit_site_info(
    site_info: SiteInfoSchema,
    session: Session,
) -> None:
    with session.begin():
        session.query(SiteInfo).delete()
        session.add(
            SiteInfo(
                name=site_info.name,
                description=site_info.description,
                year=site_info.year,
                links=SiteInfoLinksSchema(links=site_info.links).model_dump(mode="json"),
            )
        )
        session.commit()
