import base64
import random

import requests
from fastapi import FastAPI, APIRouter, UploadFile
from starlette.middleware.cors import CORSMiddleware

from schemas import ChatSchema, NFTSchema, NFTResponse, QuoteResponse, TranslateSchema, WhisperResponse
from env import CLOUDFLARE_ACCOUNT_ID, CLOUDFLARE_API_TOKEN


app = FastAPI(
    title='ask-me',
    docs_url="/docs/"
)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    expose_headers=["Content-Range", "Range"],
    allow_headers=["Authorization", "Range", "Content-Range"],
)
router = APIRouter(prefix='/api')


def make_request(url: str, method: str, headers: dict, json_data: dict = None, data: dict = None):
    response = requests.request(method, url, headers=headers, json=json_data, data=data)
    response.raise_for_status()
    content_type = response.headers.get('content-type')

    if 'application/json' in content_type:
        return response.json()
    else:
        return response.content


@router.post("/chat")
def get_quote(chat_schema: ChatSchema):
    url = f"https://api.cloudflare.com/client/v4/accounts/{CLOUDFLARE_ACCOUNT_ID}/ai/run/@cf/meta/llama-2-7b-chat-fp16"
    headers = {"Authorization": f"Bearer {CLOUDFLARE_API_TOKEN}"}
    json_data = {
        "messages": [
            {"role": "system", "content": "You are a friendly assistant"},
            {"role": "user", "content": chat_schema.content}
        ]
    }
    result = make_request(url, "POST", headers, json_data)
    return ChatSchema(content=result['result']['response'])


@router.post("/nft")
def create_nft(nft_schema: NFTSchema):
    url = f"https://api.cloudflare.com/client/v4/accounts/{CLOUDFLARE_ACCOUNT_ID}/ai/run/@cf/bytedance/stable-diffusion-xl-lightning"
    headers = {"Authorization": f"Bearer {CLOUDFLARE_API_TOKEN}"}
    json_data = {"prompt": nft_schema.content}
    result = make_request(url, "POST", headers, json_data)
    image_data = base64.b64encode(result).decode('utf-8')
    return NFTResponse(nft_image=image_data)


@router.post("/improve")
def improve_nft_command(nft_schema: NFTSchema):
    url = f"https://api.cloudflare.com/client/v4/accounts/{CLOUDFLARE_ACCOUNT_ID}/ai/run/@hf/nousresearch/hermes-2-pro-mistral-7b"
    headers = {"Authorization": f"Bearer {CLOUDFLARE_API_TOKEN}"}
    json_data = {
        "messages": [
            {"role": "system", "content": "You are a helpful assistant make the given context better should not be longer than 90 characters only make the given text better"},
            {"role": "user", "content": nft_schema.content}
        ]
    }
    result = make_request(url, "POST", headers, json_data)
    return NFTSchema(content=result['result']['response'])


@router.get("/quote/")
def get_quote():
    categories = ["happy", "technology", "inspirational", "motivational", "success", "love", "nature", "creativity", "education", "friendship", "movies", "art", "books", "fact", "sport", "actor"]
    category = random.choice(categories)
    prompt = f"Give me a quote in this field ({category}). only quote and it's author dont say your thought"
    url = f"https://api.cloudflare.com/client/v4/accounts/{CLOUDFLARE_ACCOUNT_ID}/ai/run/@hf/mistralai/mistral-7b-instruct-v0.2"
    headers = {"Authorization": f"Bearer {CLOUDFLARE_API_TOKEN}"}
    json_data = {
        "messages": [
            {"role": "system", "content": "your job is to provide a quote"},
            {"role": "user", "content": prompt}
        ]
    }
    result = make_request(url, "POST", headers, json_data)
    parts = result['result']['response'].split('-')
    quote = parts[0].strip()
    author = parts[-1].strip()
    url = f"https://api.cloudflare.com/client/v4/accounts/{CLOUDFLARE_ACCOUNT_ID}/ai/run/@cf/bytedance/stable-diffusion-xl-lightning"
    headers = {"Authorization": f"Bearer {CLOUDFLARE_API_TOKEN}"}
    json_data = {"prompt": author}
    result = make_request(url, "POST", headers, json_data)
    image_data = base64.b64encode(result).decode('utf-8')
    return QuoteResponse(content=quote, author=author, author_image=image_data)


@router.post("/translate")
def translate(translate_schema: TranslateSchema):
    url = f"https://api.cloudflare.com/client/v4/accounts/{CLOUDFLARE_ACCOUNT_ID}/ai/run/@cf/meta/m2m100-1.2b"
    headers = {"Authorization": f"Bearer {CLOUDFLARE_API_TOKEN}"}
    json_data = {
        "text": translate_schema.content,
        "target_lang": "english"
    }
    result = make_request(url, "POST", headers, json_data)
    return TranslateSchema(content=result['result']['translated_text'])


@router.post("/whisper")
def extract(file: UploadFile):
    url = f"https://api.cloudflare.com/client/v4/accounts/{CLOUDFLARE_ACCOUNT_ID}/ai/run/@cf/openai/whisper"
    headers = {"Authorization": f"Bearer {CLOUDFLARE_API_TOKEN}"}
    result = make_request(url, "POST", headers, data=file.file)
    return WhisperResponse(extracted_text=result['result']['text'], word_count=result['result']['word_count'])


app.include_router(router)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", port=8000)
