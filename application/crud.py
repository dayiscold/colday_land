from datetime import datetime
from http import HTTPStatus
from typing import List

from fastapi import HTTPException
from pydantic import BaseModel, Field
from sqlalchemy.orm import Session

from database import SiteInfo, SessionLocal


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
