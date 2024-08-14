from sqlalchemy import create_engine, Column, Integer, String, JSON
from sqlalchemy.orm import sessionmaker, DeclarativeBase

SQLALCHEMY_DATABASE_URL = "sqlite:///./site_info.db"
engine = create_engine(SQLALCHEMY_DATABASE_URL)


SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)


class Base(DeclarativeBase): ...  # noqa: E701


class SiteInfo(Base):
    __tablename__ = "site_info"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    description = Column(String)
    year = Column(Integer)
    links = Column(JSON)


# Создаем таблицу в базе данных
Base.metadata.create_all(engine)
