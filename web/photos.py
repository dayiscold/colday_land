from fastapi import Depends, UploadFile
from starlette.responses import StreamingResponse

from application.crud import (
    get_db_session,
    PhotoAddSchema,
    return_photo_from_id,
    append_photo,
    delete_photo,
    ReturnPhotoFromId,
    photo_list,
    PhotoListSchema,
)
from web.app import app


@app.get("/api/v1/photos/list", tags=["Photos"])
async def get_photo_list(db=Depends(get_db_session)) -> PhotoListSchema:
    """RETURN PHOTOS DATA LIST"""
    return photo_list(session=db)


@app.post("/api/v1/photos", tags=["Photos"])
async def add_photo(file: UploadFile, db=Depends(get_db_session)) -> PhotoAddSchema:
    """RETURN NEW PHOTO"""
    photo_id = append_photo(file=file, session=db)
    return PhotoAddSchema(
        id=photo_id,
        filename=file.filename,
    )


@app.delete("/api/v1/photos/{photo_id}", tags=["Photos"])
async def delete_photo_by_id(photo_id: int, db=Depends(get_db_session)) -> PhotoAddSchema:
    """RETURN DELETE PHOTO"""
    photo_id = delete_photo(photo_id=ReturnPhotoFromId(id=photo_id), session=db)
    return PhotoAddSchema(
        id=photo_id,
        filename="",
    )


@app.get("/api/v1/photos/{photo_id}", tags=["Photos"])
async def get_photo_from_id(photo_id: int, db=Depends(get_db_session)):
    """RETURN PHOTO WITH THE HELP IDENTIFIER"""
    return StreamingResponse(
        content=return_photo_from_id(photo_id=photo_id, session=db),
        media_type="image/jpeg",
    )
