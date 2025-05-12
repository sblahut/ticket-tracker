from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime

class Ticket(BaseModel):
    id: str
    title: str
    description: Optional[str]
    created_at: datetime
    updated_at: datetime
    column_id: str

class Column(BaseModel):
    id: str
    title: str
    order: int
    board_id: str

class Board(BaseModel):
    id: str
    name: str
    columns: List[Column]
    tickets: List[Ticket]