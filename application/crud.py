from database import SiteInfo, SessionLocal
from fastapi import Depends
from sqlalchemy.orm import Session


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
