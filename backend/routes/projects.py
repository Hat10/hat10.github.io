from fastapi import APIRouter, HTTPException, Query
from typing import List, Optional
from ..models.project import Project, ProjectCreate, ProjectResponse
from ..database import db
import logging

logger = logging.getLogger(__name__)
router = APIRouter(prefix="/api", tags=["projects"])

@router.get("/projects", response_model=List[ProjectResponse])
async def get_projects(
    lang: Optional[str] = Query("en", regex="^(en|no)$"),
    featured_only: Optional[bool] = Query(False)
):
    """Get projects with language support"""
    try:
        query = {}
        if featured_only:
            query["featured"] = True
            
        projects = await db.projects.find(query).sort("order", 1).to_list(100)
        
        transformed_projects = []
        for project in projects:
            transformed_projects.append({
                "title": project["title"][lang],
                "description": project["description"][lang],
                "technologies": project["technologies"],
                "github": project["github"],
                "live_url": project.get("live_url")
            })
        
        return transformed_projects
        
    except Exception as e:
        logger.error(f"Error fetching projects: {str(e)}")
        raise HTTPException(status_code=500, detail="Internal server error")

@router.post("/projects")
async def create_project(project: ProjectCreate):
    """Create a new project"""
    try:
        project_dict = project.dict()
        result = await db.projects.insert_one(project_dict)
        
        if result.inserted_id:
            return {"message": "Project created successfully", "id": str(result.inserted_id)}
        
        raise HTTPException(status_code=400, detail="Failed to create project")
        
    except Exception as e:
        logger.error(f"Error creating project: {str(e)}")
        raise HTTPException(status_code=500, detail="Internal server error")