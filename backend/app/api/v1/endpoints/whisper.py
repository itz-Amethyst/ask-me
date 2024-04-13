from fastapi import APIRouter , HTTPException
from starlette import requests
import requests
from backend.app.config.settings import settings
from backend.app.schemas import WhisperResponse, AudioFile


router = APIRouter()

@router.post("/whisper")
async def extract():
    res = requests.get(
        "https://github.com/Azure-Samples/cognitive-services-speech-sdk/raw/master/samples/cpp/windows/console/samples/enrollment_audio_katie.wav"
    )
    blob = res.content

    response = requests.post(
        f"https://api.cloudflare.com/client/v4/accounts/{settings.general.CLOUDFLARE_ACCOUNT_ID}/ai/run/@cf/openai/whisper",
        headers={"Authorization": f"Bearer {settings.general.CLOUDFLARE_API_TOKEN}"},
        json={
            "audio": list(blob)
        }
    )
    if response.status_code != 200:
        raise HTTPException(status_code=response.status_code, detail="Error fetching quote")

    result = response.json()
    data = result['result']['text']
    word_count = result['result']['word_count']


    return WhisperResponse(extracted_text=data, word_count = word_count)