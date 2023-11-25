
from fastapi import FastAPI
from model import SendDataDto

app = FastAPI()


@app.post("/api/v1/hello")
async def receive_data(data: SendDataDto):
    try:

        print("Received data in FastAPI:", data)
        response_data = "Data received successfully from FastAPI!"
        return {"sendData": response_data}

    except Exception as e:
        return {"error": str(e)}