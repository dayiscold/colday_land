import base64
from datetime import datetime
from http import HTTPStatus
from typing import List, Iterator

from fastapi import HTTPException, status, UploadFile
from pydantic import BaseModel
from pydantic import Field
from sqlalchemy import select
from sqlalchemy.orm import Session

from database import SiteInfo, SessionLocal, PhotoFileReleases, ReleasesInfo


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


class SiteInfoPlayWidget(BaseModel):
    title: str = Field(..., title="Название карточки")
    description: str = Field(..., title="Описание карточки")
    color: str = Field(..., title="Цвет текста на карточке")
    color_card: str = Field(..., title="Цвет карточки")
    url: str = Field(..., title="Ссылка при клике на 'Добавить в спотифай'")
    button_name: str = Field("Добавить в спотифай", title="Надпись на кнопке 'Добавить в спотифай'")
    photo_path: str = Field(..., title="Ссылка на картинку")
    song_source: str = Field(..., title="Ссылка на просшивание")


class SiteInfoSchema(BaseModel):
    name: str = Field(..., title="Название сайта")
    description: str = Field(..., title="Описание сайта")
    year: int = Field(datetime.now().year, title="Год сайта")
    links: List[LinksSchema] | None = Field(None, title="Список ссылок сайта")
    play_widget: SiteInfoPlayWidget | None = Field(None, title="Виджет для получения проигрывателя")


class SiteInfoLinksSchema(BaseModel):
    links: List[LinksSchema] | None = None
    play_widget: SiteInfoPlayWidget | None = None


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


class PhotoListSchema(BaseModel):
    photos: list[PhotoAddSchema] = []


class ReturnPhotoFromId(BaseModel):
    id: int | None


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
        play_widget=SiteInfoLinksSchema.model_validate(site_info.links).play_widget,
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


def photo_list(session=Session) -> PhotoListSchema:
    response = PhotoListSchema()
    result = session.execute(select(PhotoFileReleases.id, PhotoFileReleases.filename))
    photos = result.all()
    for photo in photos:
        response.photos.append(
            PhotoAddSchema(
                id=photo[0],
                filename=photo[1],
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
                links=SiteInfoLinksSchema(
                    links=site_info.links,
                    play_widget=site_info.play_widget,
                ).model_dump(mode="json"),
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
