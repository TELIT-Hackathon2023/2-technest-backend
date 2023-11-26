from typing import List

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from ChatbotService import ChatbotService
from model import SendDataDto
from dotenv import load_dotenv

load_dotenv()

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

chatbot_service = ChatbotService()

class TwoDArray(BaseModel):
    data: List[List[str]]

@app.get("/prompt")
def prompt(data: str):
    return {"answer": chatbot_service.get_answer(data)}
    # test response
    # return  {"answer": "Test Answer, hello gays"}


@app.post("/api/v1/hello")
async def receive_data(data: SendDataDto):
    try:

        print("Received data in FastAPI:", data)
        response_data = "Data received successfully from FastAPI!"
        return {"sendData": response_data}

    except Exception as e:
        return {"error": str(e)}


@app.get("/refresh-model")
async def refresh_model():
    chatbot_service.refresh_model()
    return {"message": "Chat bot was trained on a new documentation!"}



# // [[question, answer ]] -> [(question, answer)] -> service.set_history([(question, answer)])
@app.post("/set-history")
def set_history(history_array: TwoDArray):

    # history_array = [tuple(inner_list) for inner_list in history_array]
    print(history_array.data)
    return {"message": "OK"}