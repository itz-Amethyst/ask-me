from fastapi import APIRouter , HTTPException
from starlette import requests
import requests
from backend.app.config.settings import settings
from backend.app.schemas import QuoteResponse

router = APIRouter()

@router.get("/quote/")
async def get_quote():
    prompt = "Give me a quote"
    response = requests.post(
        f"https://api.cloudflare.com/client/v4/accounts/{settings.general.CLOUDFLARE_ACCOUNT_ID}/ai/run/@cf/meta/llama-2-7b-chat-fp16",
        headers={"Authorization": f"Bearer {settings.general.CLOUDFLARE_API_TOKEN}"},
        json={
            "messages": [
                {"role": "system", "content": "You should only provide a quote"},
                {"role": "user", "content": prompt}
            ]
        }
    )
    if response.status_code != 200:
        raise HTTPException(status_code=response.status_code, detail="Error fetching quote")

    result = response.json()
    data = result['result']['response']
    # Todo improve
    parts = data.split('-')
    quote = parts[0].strip()  # Get the content (before the '-')
    author = parts[-1].strip()  # Get the author (after the last '-')

    return QuoteResponse(content=quote, author=author, author_image='/image.jpg')