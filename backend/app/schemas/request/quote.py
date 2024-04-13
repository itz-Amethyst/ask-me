from pydantic import BaseModel

class QuoteSchema(BaseModel):
    content: str
    author: str