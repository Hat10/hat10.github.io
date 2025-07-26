from motor.motor_asyncio import AsyncIOMotorClient
import os
from dotenv import load_dotenv
from pathlib import Path

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Collections
portfolio_collection = db.portfolio
timeline_collection = db.timeline
projects_collection = db.projects
blog_posts_collection = db.blog_posts
contacts_collection = db.contacts
newsletter_collection = db.newsletter