from fastapi import APIRouter, HTTPException, Query
from typing import List, Optional
from ..models.timeline import Timeline, TimelineCreate, TimelineResponse
from ..database import db
import logging

logger = logging.getLogger(__name__)
router = APIRouter(prefix="/api", tags=["timeline"])

@router.get("/timeline", response_model=List[TimelineResponse])
async def get_timeline(lang: Optional[str] = Query("en", regex="^(en|no)$")):
    """Get work experience timeline with language support"""
    try:
        timeline_items = await db.timeline.find().sort("order", -1).to_list(100)
        
        transformed_items = []
        for item in timeline_items:
            transformed_items.append({
                "year": item["year"],
                "title": item["title"][lang],
                "company": item["company"][lang],
                "description": item["description"][lang]
            })
        
        return transformed_items
        
    except Exception as e:
        logger.error(f"Error fetching timeline: {str(e)}")
        raise HTTPException(status_code=500, detail="Internal server error")

@router.post("/timeline")
async def create_timeline_item(timeline_item: TimelineCreate):
    """Create a new timeline item"""
    try:
        timeline_dict = timeline_item.dict()
        result = await db.timeline.insert_one(timeline_dict)
        
        if result.inserted_id:
            return {"message": "Timeline item created successfully", "id": str(result.inserted_id)}
        
        raise HTTPException(status_code=400, detail="Failed to create timeline item")
        
    except Exception as e:
        logger.error(f"Error creating timeline item: {str(e)}")
        raise HTTPException(status_code=500, detail="Internal server error")