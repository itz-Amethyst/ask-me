from fastapi import APIRouter , HTTPException
from starlette import requests
import requests
from backend.app.config.settings import settings
from backend.app.schemas import TranslateSchema

router = APIRouter()

@router.post("/translate")
async def translate(translate_schema: TranslateSchema):
    response = requests.post(
        f"https://api.cloudflare.com/client/v4/accounts/{settings.general.CLOUDFLARE_ACCOUNT_ID}/ai/run/@cf/meta/m2m100-1.2b",
        headers={"Authorization": f"Bearer {settings.general.CLOUDFLARE_API_TOKEN}"},
        json={
            "text": translate_schema.content,
            "target_lang": "english"
        }
    )
    if response.status_code != 200:
        raise HTTPException(status_code=response.status_code, detail="Error fetching quote")

    result = response.json()
    data = result['result']['translated_text']


    return TranslateSchema(content=data)