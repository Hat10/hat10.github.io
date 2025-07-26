from fastapi import APIRouter, HTTPException
from typing import List
from models.contact import Contact, ContactCreate, Newsletter, NewsletterCreate
from database import db
import logging

logger = logging.getLogger(__name__)
router = APIRouter(prefix="/api", tags=["contact"])

@router.post("/contact")
async def submit_contact_form(contact: ContactCreate):
    """Submit contact form"""
    try:
        contact_dict = contact.dict()
        result = await db.contacts.insert_one(contact_dict)
        
        if result.inserted_id:
            # Here you could add email notification logic
            logger.info(f"New contact form submission from {contact.email}")
            return {"message": "Thank you for your message. I'll get back to you soon!"}
        
        raise HTTPException(status_code=400, detail="Failed to submit contact form")
        
    except Exception as e:
        logger.error(f"Error submitting contact form: {str(e)}")
        raise HTTPException(status_code=500, detail="Internal server error")

@router.get("/contacts")
async def get_contacts():
    """Get all contact form submissions (admin endpoint)"""
    try:
        contacts = await db.contacts.find().sort("submitted_at", -1).to_list(100)
        
        # Convert ObjectIds to strings
        for contact in contacts:
            contact["_id"] = str(contact["_id"])
        
        return contacts
        
    except Exception as e:
        logger.error(f"Error fetching contacts: {str(e)}")
        raise HTTPException(status_code=500, detail="Internal server error")

@router.post("/newsletter")
async def subscribe_newsletter(newsletter: NewsletterCreate):
    """Subscribe to newsletter"""
    try:
        # Check if email already exists
        existing = await db.newsletter.find_one({"email": newsletter.email})
        if existing:
            if existing.get("subscribed", False):
                return {"message": "Email already subscribed to newsletter"}
            else:
                # Resubscribe
                await db.newsletter.update_one(
                    {"email": newsletter.email},
                    {"$set": {"subscribed": True, "unsubscribed_at": None}}
                )
                return {"message": "Successfully resubscribed to newsletter"}
        
        # New subscription
        newsletter_dict = newsletter.dict()
        result = await db.newsletter.insert_one(newsletter_dict)
        
        if result.inserted_id:
            logger.info(f"New newsletter subscription: {newsletter.email}")
            return {"message": "Successfully subscribed to newsletter"}
        
        raise HTTPException(status_code=400, detail="Failed to subscribe to newsletter")
        
    except Exception as e:
        logger.error(f"Error subscribing to newsletter: {str(e)}")
        raise HTTPException(status_code=500, detail="Internal server error")

@router.get("/newsletter")
async def get_newsletter_subscribers():
    """Get all newsletter subscribers (admin endpoint)"""
    try:
        subscribers = await db.newsletter.find({"subscribed": True}).to_list(1000)
        
        # Convert ObjectIds to strings
        for subscriber in subscribers:
            subscriber["_id"] = str(subscriber["_id"])
        
        return subscribers
        
    except Exception as e:
        logger.error(f"Error fetching newsletter subscribers: {str(e)}")
        raise HTTPException(status_code=500, detail="Internal server error")