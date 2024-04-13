
from pydantic import BaseModel


class AudioFile(BaseModel):
    audio: bytes
