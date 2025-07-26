from fastapi import APIRouter, HTTPException, Query
from typing import List, Optional
from ..models.blog import BlogPost, BlogPostCreate, BlogPostResponse, BlogPostDetail
from ..database import db
import logging

logger = logging.getLogger(__name__)
router = APIRouter(prefix="/api", tags=["blog"])

@router.get("/blog", response_model=List[BlogPostResponse])
async def get_blog_posts(
    lang: Optional[str] = Query("en", regex="^(en|no)$"),
    limit: Optional[int] = Query(10),
    skip: Optional[int] = Query(0)
):
    """Get blog posts with language support and pagination"""
    try:
        posts = await db.blog_posts.find({"published": True})\
                                  .sort("published_at", -1)\
                                  .skip(skip)\
                                  .limit(limit)\
                                  .to_list(limit)
        
        transformed_posts = []
        for post in posts:
            transformed_posts.append({
                "title": post["title"][lang],
                "excerpt": post["excerpt"][lang],
                "date": post["published_at"].strftime("%Y-%m-%d") if post.get("published_at") else post["created_at"].strftime("%Y-%m-%d"),
                "slug": post["slug"][lang],
                "category": post["category"][lang],
                "read_time": post["read_time"]
            })
        
        return transformed_posts
        
    except Exception as e:
        logger.error(f"Error fetching blog posts: {str(e)}")
        raise HTTPException(status_code=500, detail="Internal server error")

@router.get("/blog/{slug}", response_model=BlogPostDetail)
async def get_blog_post(
    slug: str,
    lang: Optional[str] = Query("en", regex="^(en|no)$")
):
    """Get a specific blog post by slug"""
    try:
        # Find post by slug in the specified language
        post = await db.blog_posts.find_one({
            f"slug.{lang}": slug,
            "published": True
        })
        
        if not post:
            raise HTTPException(status_code=404, detail="Blog post not found")
        
        return {
            "title": post["title"][lang],
            "content": post["content"][lang],
            "date": post["published_at"].strftime("%Y-%m-%d") if post.get("published_at") else post["created_at"].strftime("%Y-%m-%d"),
            "category": post["category"][lang],
            "read_time": post["read_time"]
        }
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error fetching blog post: {str(e)}")
        raise HTTPException(status_code=500, detail="Internal server error")

@router.post("/blog")
async def create_blog_post(blog_post: BlogPostCreate):
    """Create a new blog post"""
    try:
        blog_dict = blog_post.dict()
        result = await db.blog_posts.insert_one(blog_dict)
        
        if result.inserted_id:
            return {"message": "Blog post created successfully", "id": str(result.inserted_id)}
        
        raise HTTPException(status_code=400, detail="Failed to create blog post")
        
    except Exception as e:
        logger.error(f"Error creating blog post: {str(e)}")
        raise HTTPException(status_code=500, detail="Internal server error")