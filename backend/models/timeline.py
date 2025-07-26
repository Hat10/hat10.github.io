from pydantic import BaseModel, Field
from typing import Dict
from datetime import datetime
import uuid

class Timeline(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    year: str
    title: Dict[str, str]  # {"en": "...", "no": "..."}
    company: Dict[str, str]
    description: Dict[str, str]
    order: int
    created_at: datetime = Field(default_factory=datetime.utcnow)

class TimelineCreate(BaseModel):
    year: str
    title: Dict[str, str]
    company: Dict[str, str]
    description: Dict[str, str]
    order: int

class TimelineResponse(BaseModel):
    year: str
    title: str
    company: str
    description: str