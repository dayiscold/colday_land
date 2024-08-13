from database import SiteInfo, SessionLocal, ReleasesInfo
from fastapi import Depends, HTTPException, status
from sqlalchemy.orm import Session
from local.main_links_data import links
from fastapi.security import OAuth2PasswordBearer
from typing import List

security = OAuth2PasswordBearer(tokenUrl="token")


def get_db_session():
    """Receives Session Database"""
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


def add_site_info(name: str, description: str, year: int, db: Session = Depends(get_db_session())):
    session = db
    try:
        site_info = SiteInfo(name=name, description=description, year=year, links=links)
        session.add(site_info)
        session.commit()
    finally:
        session.close()


def get_site_info():
    session = SessionLocal()
    site_info = session.query(SiteInfo).first()
    session.close()
    return {
        "name": site_info.name,
        "description": site_info.description,
        "year": site_info.year,
        "links": site_info.links
    }


def edit_site_info(name: str, description: str, year: int, current_user: User = Depends(get_current_user),
                   db: Session = Depends(get_db_session())):
    if not current_user:
        raise HTTPException(status_code=status.HTTP_401, detail="Not credentials")
    session = db
    try:
        site_info = session.query(SiteInfo).first()
        if site_info:
            site_info.name = name
            site_info.description = description
            site_info.year = year
            site_info.links = links
            return {"details": "Сохранено"}
        else:
            raise HTTPException(status_code=status.HTTP_500, detail="Not credentials")
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500, detail="Not credentials")
    finally:
        session.close()


def get_photo_releases_list(releases: str = None) -> List[dict]:
    session = SessionLocal()
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
            "link": release.link
        }
        photos_list.append(photo)
    return photos_list




