from fastapi import APIRouter, HTTPException, Query
from typing import Optional
from ..models.portfolio import Portfolio, PortfolioCreate
from ..database import db
import logging

logger = logging.getLogger(__name__)
router = APIRouter(prefix="/api", tags=["portfolio"])

@router.get("/portfolio")
async def get_portfolio(lang: Optional[str] = Query("en", regex="^(en|no)$")):
    """Get portfolio content with language support"""
    try:
        portfolio = await db.portfolio.find_one()
        if not portfolio:
            raise HTTPException(status_code=404, detail="Portfolio not found")
        
        # Convert ObjectId to string
        portfolio["_id"] = str(portfolio["_id"])
        
        # Transform the data based on language
        transformed = {
            "personal": {
                "name": portfolio["personal_info"]["name"],
                "title": portfolio["personal_info"]["title"][lang],
                "email": portfolio["personal_info"]["email"],
                "linkedin": portfolio["personal_info"]["linkedin"],
                "github": portfolio["personal_info"]["github"],
                "profileImage": portfolio["personal_info"]["profile_image"],
                "birthdate": portfolio["personal_info"]["birthdate"]
            },
            "home": portfolio["home"][lang],
            "about": {
                "education": [
                    {
                        "degree": item["degree"],
                        "institution": item["institution"],
                        "period": item["period"],
                        "thesis": item.get("thesis")
                    }
                    for item in portfolio["about"]["education"][lang]
                ],
                "skills": portfolio["about"]["skills"][lang],
                "languages": portfolio["about"]["languages"][lang],
                "interests": portfolio["about"]["interests"][lang]
            }
        }
        
        return transformed
        
    except Exception as e:
        logger.error(f"Error fetching portfolio: {str(e)}")
        raise HTTPException(status_code=500, detail="Internal server error")

@router.post("/portfolio")
async def create_portfolio(portfolio: PortfolioCreate):
    """Create or update portfolio content"""
    try:
        portfolio_dict = portfolio.dict()
        
        # Check if portfolio already exists
        existing = await db.portfolio.find_one()
        if existing:
            # Update existing portfolio
            result = await db.portfolio.update_one(
                {"_id": existing["_id"]},
                {"$set": portfolio_dict}
            )
            if result.modified_count:
                return {"message": "Portfolio updated successfully"}
        else:
            # Create new portfolio
            result = await db.portfolio.insert_one(portfolio_dict)
            if result.inserted_id:
                return {"message": "Portfolio created successfully"}
        
        raise HTTPException(status_code=400, detail="Failed to save portfolio")
        
    except Exception as e:
        logger.error(f"Error saving portfolio: {str(e)}")
        raise HTTPException(status_code=500, detail="Internal server error")