from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()

class Artist_Name(BaseModel):
    name: str
    description: str | None


@app.get("/homepage")
def get_homepage():
    artist_name = Artist_Name(name="COLDAY", description="все для души.")
    return {"data": artist_name}