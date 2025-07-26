from pydantic import BaseModel, Field
from typing import List, Dict, Optional
from datetime import datetime
import uuid

class PersonalInfo(BaseModel):
    name: str
    title: Dict[str, str]  # {"en": "...", "no": "..."}
    email: str
    linkedin: str
    github: str
    profile_image: str
    birthdate: str

class HomeContent(BaseModel):
    en: Dict[str, str]  # {"greeting": "...", "description": "..."}
    no: Dict[str, str]

class EducationItem(BaseModel):
    degree: str
    institution: str
    period: str
    thesis: Optional[str] = None

class AboutData(BaseModel):
    education: Dict[str, List[EducationItem]]  # {"en": [...], "no": [...]}
    skills: Dict[str, List[str]]
    languages: Dict[str, List[str]]
    interests: Dict[str, List[str]]

class Portfolio(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    personal_info: PersonalInfo
    home: HomeContent
    about: AboutData
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

class PortfolioCreate(BaseModel):
    personal_info: PersonalInfo
    home: HomeContent
    about: AboutData