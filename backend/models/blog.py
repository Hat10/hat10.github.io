from pydantic import BaseModel, Field
from typing import Dict, Optional
from datetime import datetime
import uuid

class BlogPost(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    title: Dict[str, str]  # {"en": "...", "no": "..."}
    excerpt: Dict[str, str]
    content: Dict[str, str]
    slug: Dict[str, str]
    category: Dict[str, str]
    read_time: str
    published: bool = False
    published_at: Optional[datetime] = None
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

class BlogPostCreate(BaseModel):
    title: Dict[str, str]
    excerpt: Dict[str, str]
    content: Dict[str, str]
    slug: Dict[str, str]
    category: Dict[str, str]
    read_time: str
    published: bool = False

class BlogPostResponse(BaseModel):
    title: str
    excerpt: str
    date: str
    slug: str
    category: str
    read_time: str

class BlogPostDetail(BaseModel):
    title: str
    content: str
    date: str
    category: str
    read_time: str