FROM python:3.12.6-slim

RUN mkdir /colday_land_app

WORKDIR /colday_land_app

COPY requirements.txt .

EXPOSE 8080

RUN pip install -r requirements.txt

COPY . .

CMD ["uvicorn", "application/main:app", "--host", "0.0.0.0", "--port", "8080"]

