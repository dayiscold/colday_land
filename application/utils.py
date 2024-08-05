SETTINGS_LOGGER = {
    "version": 1,
    "disable_existing_loggers": False,
    "formatters": {"default": {"()": "logs.JsonFormatter"}},
    "handlers": {"default": {"class": "logging.StreamHandler", "formatter": "default"}},
    "loggers": {
        "": {"level": "DEBUG", "handlers": ["default"]},
        "databases": {"level": "INFO", "handlers": ["default"]},
    },
}
