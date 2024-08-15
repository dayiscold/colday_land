import os

from application.utils import SETTINGS_LOGGER
from application.run import app  # noqa: F401

if __name__ == "__main__":
    import uvicorn

    is_debug = os.getenv("DEBUG") == "True"

    uvicorn.run(
        "application.run:app",
        host="0.0.0.0",
        port=5000,
        access_log=True,
        log_config=SETTINGS_LOGGER,
        reload=is_debug,
    )
