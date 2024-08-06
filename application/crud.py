from fastapi import FastAPI
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from database import SiteInfo, Base, SessionLocal
from datetime import datetime
def add_site_info(name, description, year, links):
    session = SessionLocal()
    site_info = SiteInfo(name=name, description=description, year=year, links=links)
    session.add(site_info)
    session.commit()
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

add_site_info(name="COLDAY", description="все для души.", year=datetime.now().year, links=[
    {
        "id": "1000",
        "url": "https://t.me/coldaybigstepper",
        "type": "telegram",
        "path": "/static/tg.png"
    },
    {
        "id": "1001",
        "url": "https://vk.com/luxurycolday",
        "type": "vk",
        "path": "/static/vk.png"
    },
    {
        "id": "1002",
        "url": "https://steamcommunity.com/id/martyraycolday/",
        "type": "steam",
        "path": "/static/steam.png"
    }
])

