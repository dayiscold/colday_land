from fastapi import Request, UploadFile, Form, File, Depends, HTTPException
from fastapi.responses import HTMLResponse
from fastapi.security import HTTPBasicCredentials
from application.login_data import administration
from application.uploaded_releases import uploaded_link_image, release_dates
from .app import app, templates, security


@app.get("/", response_class=HTMLResponse)
async def home_page(request: Request):
    static_url = app.url_path_for("static", path="")
    return templates.TemplateResponse(
        "page.html", {"request": request, "static_url": static_url, "uploaded_photos": []}
    )


@app.get("/upload_photo", response_class=HTMLResponse)
async def upload_form(request: Request):
    return templates.TemplateResponse("upload_photo.html", {"request": request})


@app.get("/login", response_class=HTMLResponse)
async def login_form(request: Request):
    static_url = app.url_path_for("static", path="")
    return templates.TemplateResponse("login.html", {"request": request, "static_url": static_url})


@app.post("/login")
async def login(credentials: HTTPBasicCredentials = Depends(security)):
    user = administration.get(credentials.username)
    if not user or user["password"] != credentials.password:
        raise HTTPException(status_code=401, detail="Неверные учетные данные")
    else:
        return {"message": "Вы успешно вошли"}


@app.post("/upload_photo")
async def upload_photo(
    request: Request,
    photo: UploadFile = File(...),
    photo_link: str = Form(...),
    release_date: str = Form(...),
    credentials: HTTPBasicCredentials = Depends(security),
):
    user = administration.get(credentials.username)
    if not user or user["password"] != credentials.password:  # typeing[index]
        raise HTTPException(status_code=401, detail="Неверные учетные данные")
    image_content = await photo.read()
    image_url = f"static/{photo.filename}"
    with open(image_url, "wb") as image_file:
        image_file.write(image_content)
    uploaded_link_image[photo_link] = image_url
    release_dates[photo_link] = int(release_date[0:4] + release_date[5:7] + release_date[8:])
    return {"message": "Релиз загружен"}
