
from pydantic import BaseModel


class SendDataDto(BaseModel):
    sendData: str