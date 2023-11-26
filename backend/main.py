from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

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
