from datetime import datetime
from http import HTTPStatus
from typing import List
from fastapi import HTTPException, Depends, status, UploadFile, File
from fastapi.security import OAuth2PasswordBearer
from pydantic import BaseModel
from sqlalchemy.orm import Session
from database import SiteInfo, SessionLocal, ReleasesInfo, PhotoFileReleases

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


class PhotoHandlerSchema(BaseModel):
    id: int
    created_at: datetime
    updated_at: datetime | None
    description: str | None
    link: str

class PhotoAddSchema(BaseModel):
    id: int
    file: str
    link: str


def get_current_user(session: Session):
    pass

def get_site_info(session: Session) -> SiteInfoSchema:
    site_info = session.query(SiteInfo).first()
    if not site_info:
        raise HTTPException(status_code=HTTPStatus.NOT_FOUND, detail="Нет информации о сайте")
    return SiteInfoSchema(
        name=site_info.name,
        description=site_info.description,
        links=SiteInfoLinksSchema.model_validate(site_info.links).links,
    )



def get_photo_releases_list(releases: str = None, session=Session) -> PhotoHandlerSchema:
    if releases == "all":
        releases = session.query(ReleasesInfo).all()
    else:
        releases = session.query(ReleasesInfo).order_by(ReleasesInfo.created_at.desc()).limit(3).all()
    photos_list = []
    for release in releases:
        photo = {
            "id": release.id,
            "created_at": release.created_at,
            "updated_at": release.updated_at,
            "description": release.description,
            "link": release.link,
        }
        photos_list.append(photo)
    return photos_list


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

@app.post("/api/v1/photo")
    async def append_photo(session: Session, photo: PhotoAddSchema, file: UploadFile = File()):
        with open(f"/path/to/save/{file.filename}", "wb") as file_object:
            file_object.write(file.file.read())
        new_photo = PhotoFileReleases(file=file.filename, link=photo.link)
        session.add(new_photo)
        session.commit()
        return {"details": "Сохранена"}
