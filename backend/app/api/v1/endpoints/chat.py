from fastapi import APIRouter , HTTPException
from starlette import requests
import requests
from backend.app.config.settings import settings
from backend.app.schemas import ChatSchema

router = APIRouter()

@router.post("/chat")
async def get_quote(chat_schema: ChatSchema):
    response = requests.post(
        f"https://api.cloudflare.com/client/v4/accounts/{settings.general.CLOUDFLARE_ACCOUNT_ID}/ai/run/@cf/mistral/mistral-7b-instruct-v0.2-lora",
        headers={"Authorization": f"Bearer {settings.general.CLOUDFLARE_API_TOKEN}"},
        json={
            "messages": [
                {"role": "system", "content": "You are a friendly assistant"},
                {"role": "user", "content": chat_schema.content}
            ]
        }
    )
    if response.status_code != 200:
        raise HTTPException(status_code=response.status_code, detail="Error fetching quote")

    result = response.json()
    data = result['result']['response']


    return ChatSchema(content=data)