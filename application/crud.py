import base64
from datetime import datetime
from http import HTTPStatus
from typing import List, Iterator

from fastapi import HTTPException, status, UploadFile
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


class ReleasesSchemaItem(BaseModel):
    id: int
    created_at: datetime
    updated_at: datetime | None
    description: str | None
    file_id: str
    link: str


class ReleasesSchema(BaseModel):
    releases: list[ReleasesSchemaItem] = []


class PhotoAddSchema(BaseModel):
    id: int
    filename: str


class ReturnPhotoFromId(BaseModel):
    id: int | None


class ReturnReleaseFromId(BaseModel):
    id: int | None


class ReleasesInfoEdit(BaseModel):
    status: str


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


def get_photo_releases_list(releases: str | None = None, session=Session) -> ReleasesSchema:
    response = ReleasesSchema()
    if releases == "all":
        rows = session.query(ReleasesInfo).all()
    else:
        rows = session.query(ReleasesInfo).order_by(ReleasesInfo.created_at.desc()).limit(3).all()
    for release in rows:
        response.releases.append(
            ReleasesSchemaItem(
                id=release.id,
                created_at=release.created_at,
                updated_at=release.updated_at,
                description=release.description,
                file_id=release.file_id,
                link=release.link,
            )
        )
    return response


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


def append_photo(file: UploadFile, session: Session) -> int:
    encoded_string = base64.b64encode(file.file.read()).decode("utf-8")
    new_photo = PhotoFileReleases(filename=file.filename, content=encoded_string)
    session.add(new_photo)
    session.commit()
    return new_photo.id


def delete_photo(photo_id: ReturnPhotoFromId, session: Session) -> int:
    if photo_id.id is None:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Не передан идентификатор")
    photo = session.query(PhotoFileReleases).filter(PhotoFileReleases.id == photo_id.id).first()
    if photo is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Фотография не найдена")
    session.delete(photo)
    session.commit()
    return photo_id.id


def return_photo_from_id(photo_id: int, session: Session) -> Iterator[bytes]:
    photo: PhotoFileReleases | None = session.query(PhotoFileReleases).filter(PhotoFileReleases.id == photo_id).first()
    if not photo:
        raise HTTPException(status_code=404, detail="Фото не найдено")
    yield base64.b64decode(photo.content.encode("utf-8"))


def change_current_release(release_info: ReleasesSchemaItem, session: Session) -> None:
    with session.begin():
        session.query(ReleasesInfo).delete()
        session.add(
            ReleasesInfo(
                id=release_info.id,
                created_at=release_info.created_at,
                updated_at=release_info.updated_at,
                description=release_info.description,
                file_id=release_info.file_id,
                link=release_info.link,
            )
        )
        session.commit()


def delete_current_release(id: ReturnReleaseFromId, session: Session) -> int | None:
    if id.id is None:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Не передан идентификатор релиза")
    release = session.query(ReleasesInfo).filter(ReleasesInfo.id == id.id).first()
    if release is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Релиз не был найден")
    session.delete(release)
    session.commit()
    return id.id


def add_new_release(new_release: ReleasesSchemaItem, session: Session) -> ReleasesSchemaItem:
    new_release_append = ReleasesInfo(
        id=new_release.id,
        created_at=new_release.created_at,
        updated_at=new_release.updated_at,
        description=new_release.description,
        file_id=new_release.file_id,
        link=new_release.link,
    )
    session.add(new_release_append)
    session.commit()
    return new_release
