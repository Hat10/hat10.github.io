from pydantic import BaseModel, Field
from typing import List, Dict, Optional
from datetime import datetime
import uuid

class Project(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    title: Dict[str, str]  # {"en": "...", "no": "..."}
    description: Dict[str, str]
    technologies: List[str]
    github: str
    live_url: Optional[str] = None
    featured: bool = False
    order: int = 0
    created_at: datetime = Field(default_factory=datetime.utcnow)

class ProjectCreate(BaseModel):
    title: Dict[str, str]
    description: Dict[str, str]
    technologies: List[str]
    github: str
    live_url: Optional[str] = None
    featured: bool = False
    order: int = 0

class ProjectResponse(BaseModel):
    title: str
    description: str
    technologies: List[str]
    github: str
    live_url: Optional[str] = None