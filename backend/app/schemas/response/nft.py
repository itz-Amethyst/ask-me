from pydantic import BaseModel
from typing import Optional, Any

class NFTResponse(BaseModel):
    # improved version of content
    content: Optional[str]
    NFT_image: Optional[Any]
