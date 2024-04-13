import logging
from backend.app.setup.factory import create_app
from backend.app.config.settings import settings


app = create_app()

# @app.get("/", include_in_schema=False)
# def docs_redirect():
#     return RedirectResponse(f"/api/{settings.general.API_V1_STR}/docs")


logging.info("Starting uvicorn in reload mode")

if __name__ == "__main__":
    import uvicorn


    uvicorn.run(
        "main:app",
        reload=True,
        port=settings.general.HOST_PORT,
    )

