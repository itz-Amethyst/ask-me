import base64
import json
import random
from typing import Any

from fastapi import FastAPI , APIRouter , UploadFile , File
from fastapi import HTTPException
import requests
from starlette.middleware.cors import CORSMiddleware

from schemas import ChatSchema , NFTSchema , NFTResponse , QuoteResponse , TranslateSchema , WhisperResponse
from env import CLOUDFLARE_ACCOUNT_ID, CLOUDFLARE_API_TOKEN


app = FastAPI(
    title = 'ask-me',
    docs_url = "/docs/"
)
app.add_middleware(
            CORSMiddleware,
            allow_origins=["*"],
            allow_credentials=True,
            allow_methods=["*"],
            expose_headers=["Content-Range", "Range"],
            allow_headers=["Authorization", "Range", "Content-Range"],
        )
router = APIRouter(prefix = '/api')


@router.post("/chat")
def get_quote(chat_schema: ChatSchema):

    response = requests.post(
        f"https://api.cloudflare.com/client/v4/accounts/{CLOUDFLARE_ACCOUNT_ID}/ai/run/@cf/meta/llama-2-7b-chat-fp16",
        headers={"Authorization": f"Bearer {CLOUDFLARE_API_TOKEN}"},
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

@router.post("/nft")
def create_nft(nft_schema: NFTSchema):
    response = requests.post(
        f"https://api.cloudflare.com/client/v4/accounts/{CLOUDFLARE_ACCOUNT_ID}/ai/run/@cf/bytedance/stable-diffusion-xl-lightning",
        headers={"Authorization": f"Bearer {CLOUDFLARE_API_TOKEN}", "content-type": "image/png"},
        json={
            "prompt": nft_schema.content
        }
    )
    if response.status_code != 200:
        raise HTTPException(status_code=response.status_code, detail="Error fetching quote")

    image_data = base64.b64encode(response.content).decode('utf-8')

    return NFTResponse(nft_image = image_data)


@router.post("/improve")
def improve_nft_command(nft_schema: NFTSchema):
    response = requests.post(
        f"https://api.cloudflare.com/client/v4/accounts/{CLOUDFLARE_ACCOUNT_ID}/ai/run/@hf/nousresearch/hermes-2-pro-mistral-7b",
        headers={"Authorization": f"Bearer {CLOUDFLARE_API_TOKEN}"},
        json={
            "messages": [
                {"role": "system", "content": "You are a helpful assistant make the given context better should not be longer than 90 characters only make the given text better"},
                {"role": "user", "content": nft_schema.content}
            ]
        }
    )
    if response.status_code != 200:
        raise HTTPException(status_code=response.status_code, detail="Error fetching quote")

    result = response.json()
    data = result['result']['response']


    return NFTSchema(content=data)

@router.get("/quote/")
def get_quote():
    categories = ["happy", "technology", "inspirational", "motivational", "success", "love", "nature", "creativity", "education", "friendship", "movies", "art", "books", "fact", "sport", "actor"]
    category = random.choice(categories)

    prompt = f"Give me a quote in this field ({category}). only quote and it's author dont say your thought"
    response = requests.post(
        f"https://api.cloudflare.com/client/v4/accounts/{CLOUDFLARE_ACCOUNT_ID}/ai/run/@hf/mistralai/mistral-7b-instruct-v0.2",
        headers={"Authorization": f"Bearer {CLOUDFLARE_API_TOKEN}"},
        json={
            "messages": [
                {"role": "system", "content": "your job is to provide a quote"},
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

    response2 = requests.post(
        f"https://api.cloudflare.com/client/v4/accounts/{CLOUDFLARE_ACCOUNT_ID}/ai/run/@cf/bytedance/stable-diffusion-xl-lightning" ,
        headers = {"Authorization": f"Bearer {CLOUDFLARE_API_TOKEN}"} ,
        json = {
            "prompt": author
        }
    )

    if response2.status_code != 200:
        raise HTTPException(status_code = response.status_code , detail = "Error fetching quote")

    image_data = base64.b64encode(response2.content).decode('utf-8')


    return QuoteResponse(content=quote, author=author, author_image=image_data)

@router.post("/translate")
def translate(translate_schema: TranslateSchema):
    response = requests.post(
        f"https://api.cloudflare.com/client/v4/accounts/{CLOUDFLARE_ACCOUNT_ID}/ai/run/@cf/meta/m2m100-1.2b",
        headers={"Authorization": f"Bearer {CLOUDFLARE_API_TOKEN}"},
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

# @router.post("/whisper")
# def extract(file = File(...)):
#     # res = requests.get(
#     #     "https://github.com/Azure-Samples/cognitive-services-speech-sdk/raw/master/samples/cpp/windows/console/samples/enrollment_audio_katie.wav"
#     # )
#     # print(file)
#     file_conent = file.read()
#     # blob = res.content
#
#     response = requests.post(
#         f"https://api.cloudflare.com/client/v4/accounts/{CLOUDFLARE_ACCOUNT_ID}/ai/run/@cf/openai/whisper",
#         headers={"Authorization": f"Bearer {CLOUDFLARE_API_TOKEN}"},
#         # json = {
#         #     "audio": list(blob)
#         # }
#         data = file
#     )
#     if response.status_code != 200:
#         raise HTTPException(status_code=response.status_code, detail="Error fetching quote")
#
#     result = response.json()
#     data = result['result']['text']
#     word_count = result['result']['word_count']
#
#
#     return WhisperResponse(extracted_text=data, word_count = word_count)

@router.post("/whisper")
async def extract(file: UploadFile):

    response = requests.post(
        f"https://api.cloudflare.com/client/v4/accounts/{CLOUDFLARE_ACCOUNT_ID}/ai/run/@cf/openai/whisper",
        headers={"Authorization": f"Bearer {CLOUDFLARE_API_TOKEN}"},
        data = file.file
    )
    if response.status_code != 200:
        raise HTTPException(status_code=response.status_code, detail="Error fetching quote")

    result = response.json()
    data = result['result']['text']
    word_count = result['result']['word_count']


    return WhisperResponse(extracted_text=data, word_count = word_count)


app.include_router(router)

if __name__ == "__main__":
    import uvicorn

    uvicorn.run("main:app", port = 8000)