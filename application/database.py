from sqlalchemy import create_engine, Column, Integer, String, JSON
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

SQLALCHEMY_DATABASE_URL = "sqlite:///./site_info.db"
engine = create_engine(SQLALCHEMY_DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()


class SiteInfo(Base):
    __tablename__ = "site_info"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    description = Column(String)
    year = Column(Integer)
    links = Column(JSON)


class ReleasesInfo(Base):
    __tablename__ = "releases_info"
    id = Column(Integer, primary_key=True, index=True)
    created_at = Column(Integer)
    updated_at = Column(Integer, nullable=True)
    description = Column(String, nullable=True)
    link = Column(String)


# Создаем таблицу в базе данных
Base.metadata.create_all(engine)
