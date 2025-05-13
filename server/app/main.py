from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    return {"message": "Ticket Tracker API"}

@app.get("/boards/{board_id}")
async def get_board(board_id: str):
    return {"board_id": board_id, "name": "Sample Board"}