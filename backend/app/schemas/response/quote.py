from typing import Any
from pydantic import BaseModel

class QuoteResponse(BaseModel):
    content: str
    author: str
    author_image: Any
