from crud import add_site_info
from datetime import datetime

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
