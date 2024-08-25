from sqlalchemy import create_engine, Column, Integer, String, JSON, DateTime
from sqlalchemy.orm import sessionmaker, DeclarativeBase

SQLALCHEMY_DATABASE_URL = "sqlite:///./site_info.db"
engine = create_engine(SQLALCHEMY_DATABASE_URL)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)


class Base(DeclarativeBase):  # noqa: E701
    id = Column(Integer, primary_key=True, index=True, autoincrement=True)


class SiteInfo(Base):
    __tablename__ = "site_info"
    name = Column(String)
    description = Column(String)
    year = Column(Integer)
    links = Column(JSON(none_as_null=True))


class ReleasesInfo(Base):
    __tablename__ = "releases_info"
    created_at = Column(DateTime)
    updated_at = Column(DateTime, nullable=True)
    description = Column(String, nullable=True)
    link = Column(String)
    file_id = Column(Integer)


class PhotoFileReleases(Base):
    __tablename__ = "photofile_info"
    filename = Column(String)
    content = Column(String)


# Создаем таблицу в базе данных
Base.metadata.create_all(engine)
