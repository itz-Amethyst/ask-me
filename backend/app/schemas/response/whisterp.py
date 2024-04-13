
from pydantic import BaseModel

class WhisperResponse(BaseModel):
    extracted_text: str
    word_count: int
