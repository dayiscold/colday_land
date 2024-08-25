from fastapi import Request
from fastapi.responses import HTMLResponse

from .app import app, templates


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
