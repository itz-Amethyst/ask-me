from pydantic import BaseModel

class TranslateSchema(BaseModel):
    # Translated / main content
    content: str