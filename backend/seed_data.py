import asyncio
from database import db
from datetime import datetime

# Mock data from frontend (converted to backend format)
async def seed_database():
    """Seed the database with initial portfolio data"""
    
    # Clear existing data
    await db.portfolio.delete_many({})
    await db.timeline.delete_many({})
    await db.projects.delete_many({})
    await db.blog_posts.delete_many({})
    
    # Portfolio data
    portfolio_data = {
        "personal_info": {
            "name": "Andreas Attila Stenberg",
            "title": {
                "en": "Audit Accountant at KPMG",
                "no": "Revisjonsrevisor i KPMG"
            },
            "email": "andreasstenb@gmail.com",
            "linkedin": "https://www.linkedin.com/in/andreasstenberg/",
            "github": "https://github.com/Hat10",
            "profile_image": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
            "birthdate": "29. mars 1999"
        },
        "home": {
            "en": {
                "greeting": "Hi, I'm Andreas.",
                "description": "I work as an audit accountant at KPMG and hold a Master in Financial Economics from NTNU. I've a background in nanotechnology and expertise in data analysis, process improvement, and financial systems. Welcome to my portfolio!"
            },
            "no": {
                "greeting": "Hei! Jeg heter Andreas.",
                "description": "Jeg jobber som revisjonsrevisor i KPMG og har en master i finansiell økonomi fra NTNU. Jeg har bakgrunn i nanoteknologi og ekspertise innen dataanalyse, prosessforbedring og finansielle systemer. Velkommen til min portefølje!"
            }
        },
        "about": {
            "education": {
                "en": [
                    {
                        "degree": "MSc Financial Economics",
                        "institution": "NTNU",
                        "period": "2024–2025",
                        "thesis": "How stock volatility affects stock prices – empirical study of Ang et al.'s \"Cross-Section of Volatility and Expected Returns\""
                    },
                    {
                        "degree": "BSc Economics",
                        "institution": "NTNU",
                        "period": "2023–2024"
                    },
                    {
                        "degree": "Nanotechnology Engineering",
                        "institution": "NTNU",
                        "period": "2018–2023"
                    },
                    {
                        "degree": "Exchange Student",
                        "institution": "UC Santa Barbara",
                        "period": "2021–2022"
                    }
                ],
                "no": [
                    {
                        "degree": "Master i finansiell økonomi",
                        "institution": "NTNU",
                        "period": "2024–2025",
                        "thesis": "Hvordan aksjevolatilitet påvirker aksjepriser – empirisk studie basert på Ang et al."
                    },
                    {
                        "degree": "Bachelor samfunnsøkonomi",
                        "institution": "NTNU",
                        "period": "2023–2024"
                    },
                    {
                        "degree": "Nanoteknologi (ingeniør)",
                        "institution": "NTNU",
                        "period": "2018–2023"
                    },
                    {
                        "degree": "Utveksling",
                        "institution": "UC Santa Barbara",
                        "period": "2021–2022"
                    }
                ]
            },
            "skills": {
                "en": [
                    "Python (advanced data analysis)",
                    "Excel (pivot tables, macros)",
                    "Tripletex & Uni Micro (accounting systems)",
                    "Financial modeling",
                    "Process improvement",
                    "Data analysis"
                ],
                "no": [
                    "Python (avansert dataanalyse)",
                    "Excel (pivot, makroer)",
                    "Tripletex & Uni Micro (regnskapssystemer)",
                    "Finansiell modellering",
                    "Prosessforbedring",
                    "Dataanalyse"
                ]
            },
            "languages": {
                "en": ["Norwegian (native)", "English (fluent)"],
                "no": ["Norsk (morsmål)", "Engelsk (flytende)"]
            },
            "interests": {
                "en": ["Hiking", "Nature", "Quantitative finance", "Data analysis"],
                "no": ["Friluftsliv", "Natur", "Kvantitativ finans", "Dataanalyse"]
            }
        },
        "created_at": datetime.utcnow(),
        "updated_at": datetime.utcnow()
    }
    
    # Timeline data
    timeline_data = [
        {
            "year": "2025–Present",
            "title": {
                "en": "Audit Associate",
                "no": "Revisor"
            },
            "company": {
                "en": "KPMG",
                "no": "KPMG"
            },
            "description": {
                "en": "Conducting financial audits and compliance reviews",
                "no": "Gjennomføring av finansiell revisjon og compliance-vurderinger"
            },
            "order": 1,
            "created_at": datetime.utcnow()
        },
        {
            "year": "2024–2025",
            "title": {
                "en": "Internal Auditor & Budgeting",
                "no": "Økonomiutvalget"
            },
            "company": {
                "en": "NTNUI Økonomi",
                "no": "NTNUI"
            },
            "description": {
                "en": "Budget management and internal audit processes",
                "no": "Budsjettering og internrevisjon"
            },
            "order": 2,
            "created_at": datetime.utcnow()
        },
        {
            "year": "2023–2024",
            "title": {
                "en": "Treasurer",
                "no": "Økonomiansvarlig"
            },
            "company": {
                "en": "NTNUI Swimming",
                "no": "NTNUI Svømming"
            },
            "description": {
                "en": "Financial management and budgeting",
                "no": "Økonomistyring og budsjettering"
            },
            "order": 3,
            "created_at": datetime.utcnow()
        },
        {
            "year": "2020–2024",
            "title": {
                "en": "Teaching Assistant",
                "no": "Læringsassistent"
            },
            "company": {
                "en": "NTNU",
                "no": "NTNU"
            },
            "description": {
                "en": "Electrochemistry, Statistics, Mathematics",
                "no": "Elektrokjemi, statistikk, matematikk"
            },
            "order": 4,
            "created_at": datetime.utcnow()
        },
        {
            "year": "Summer 2022",
            "title": {
                "en": "Microfabrication Intern",
                "no": "Mikrofabrikasjon praktikant"
            },
            "company": {
                "en": "CrayoNano",
                "no": "CrayoNano"
            },
            "description": {
                "en": "Research and development in nanotechnology",
                "no": "Forskning og utvikling innen nanoteknologi"
            },
            "order": 5,
            "created_at": datetime.utcnow()
        }
    ]
    
    # Projects data
    projects_data = [
        {
            "title": {
                "en": "Stock Volatility Analysis",
                "no": "Aksjevolatilitetsanalyse"
            },
            "description": {
                "en": "Empirical study on how stock volatility affects stock prices, based on Ang et al.'s research",
                "no": "Empirisk studie av hvordan aksjevolatilitet påvirker aksjepriser, basert på Ang et al.s forskning"
            },
            "technologies": ["Python", "Pandas", "NumPy", "Statistical Analysis"],
            "github": "https://github.com/Hat10",
            "featured": True,
            "order": 1,
            "created_at": datetime.utcnow()
        },
        {
            "title": {
                "en": "Financial Data Dashboard",
                "no": "Finansiell data-dashboard"
            },
            "description": {
                "en": "Interactive dashboard for financial data visualization and analysis",
                "no": "Interaktivt dashboard for visualisering og analyse av finansielle data"
            },
            "technologies": ["Python", "Plotly", "Streamlit", "Financial APIs"],
            "github": "https://github.com/Hat10",
            "featured": True,
            "order": 2,
            "created_at": datetime.utcnow()
        },
        {
            "title": {
                "en": "Process Automation Tools",
                "no": "Prosessautomatiseringsverktøy"
            },
            "description": {
                "en": "Excel macros and Python scripts for audit process automation",
                "no": "Excel-makroer og Python-skript for automatisering av revisjonsprosesser"
            },
            "technologies": ["Python", "VBA", "Excel", "Process Optimization"],
            "github": "https://github.com/Hat10",
            "featured": False,
            "order": 3,
            "created_at": datetime.utcnow()
        }
    ]
    
    # Blog posts data
    blog_posts_data = [
        {
            "title": {
                "en": "Understanding Financial Risk Analysis",
                "no": "Forståelse av finansiell risikoanalyse"
            },
            "excerpt": {
                "en": "A deep dive into modern risk analysis techniques in finance",
                "no": "Et dypdykk i moderne risikoanalyseteknikker innen finans"
            },
            "content": {
                "en": "Financial risk analysis has evolved significantly over the past decades...",
                "no": "Finansiell risikoanalyse har utviklet seg betydelig de siste tiårene..."
            },
            "slug": {
                "en": "financial-risk-analysis",
                "no": "finansiell-risikoanalyse"
            },
            "category": {
                "en": "Finance",
                "no": "Finans"
            },
            "read_time": "8 min",
            "published": True,
            "published_at": datetime(2024, 12, 15),
            "created_at": datetime.utcnow(),
            "updated_at": datetime.utcnow()
        }
    ]
    
    # Insert data
    try:
        await db.portfolio.insert_one(portfolio_data)
        print("✅ Portfolio data inserted")
        
        await db.timeline.insert_many(timeline_data)
        print("✅ Timeline data inserted")
        
        await db.projects.insert_many(projects_data)
        print("✅ Projects data inserted")
        
        await db.blog_posts.insert_many(blog_posts_data)
        print("✅ Blog posts data inserted")
        
        print("🎉 Database seeded successfully!")
        
    except Exception as e:
        print(f"❌ Error seeding database: {str(e)}")

if __name__ == "__main__":
    asyncio.run(seed_database())