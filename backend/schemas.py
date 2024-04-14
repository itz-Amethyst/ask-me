from typing import Optional , Any

from pydantic import BaseModel


class ChatSchema(BaseModel):
    content: str

class NFTSchema(BaseModel):
    content: str

class NFTImproveResponse(BaseModel):
    content: str


class TranslateSchema(BaseModel):
    # Translated / main content
    content: str

class AudioFile(BaseModel):
    audio: bytes

class NFTResponse(BaseModel):
    nft_image: Any


class QuoteResponse(BaseModel):
    content: str
    author: str
    author_image: Any

class WhisperResponse(BaseModel):
    extracted_text: str
    word_count: int

