// Mock data for Andreas Stenberg's portfolio
export const mockData = {
  // Personal information
  personal: {
    name: "Andreas Attila Stenberg",
    title: {
      en: "Audit Accountant at KPMG",
      no: "Revisjonsrevisor i KPMG"
    },
    birthdate: "29. mars 1999",
    email: "andreasstenb@gmail.com",
    linkedin: "https://www.linkedin.com/in/andreasstenberg/",
    github: "https://github.com/Hat10",
    profileImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face"
  },

  // Home page content
  home: {
    en: {
      greeting: "Hi, I'm Andreas.",
      description: "I work as an audit accountant at KPMG and hold a Master in Financial Economics from NTNU. I've a background in nanotechnology and expertise in data analysis, process improvement, and financial systems. Welcome to my portfolio!"
    },
    no: {
      greeting: "Hei! Jeg heter Andreas.",
      description: "Jeg jobber som revisjonsrevisor i KPMG og har en master i finansiell økonomi fra NTNU. Jeg har bakgrunn i nanoteknologi og ekspertise innen dataanalyse, prosessforbedring og finansielle systemer. Velkommen til min portefølje!"
    }
  },

  // About section
  about: {
    education: {
      en: [
        {
          degree: "MSc Financial Economics",
          institution: "NTNU",
          period: "2024–2025",
          thesis: "How stock volatility affects stock prices – empirical study of Ang et al.'s \"Cross-Section of Volatility and Expected Returns\""
        },
        {
          degree: "BSc Economics",
          institution: "NTNU", 
          period: "2023–2024"
        },
        {
          degree: "Nanotechnology Engineering",
          institution: "NTNU",
          period: "2018–2023"
        },
        {
          degree: "Exchange Student",
          institution: "UC Santa Barbara",
          period: "2021–2022"
        }
      ],
      no: [
        {
          degree: "Master i finansiell økonomi",
          institution: "NTNU",
          period: "2024–2025",
          thesis: "Hvordan aksjevolatilitet påvirker aksjepriser – empirisk studie basert på Ang et al."
        },
        {
          degree: "Bachelor samfunnsøkonomi",
          institution: "NTNU",
          period: "2023–2024"
        },
        {
          degree: "Nanoteknologi (ingeniør)",
          institution: "NTNU",
          period: "2018–2023"
        },
        {
          degree: "Utveksling",
          institution: "UC Santa Barbara",  
          period: "2021–2022"
        }
      ]
    },
    skills: {
      en: [
        "Python (advanced data analysis)",
        "Excel (pivot tables, macros)", 
        "Tripletex & Uni Micro (accounting systems)",
        "Financial modeling",
        "Process improvement",
        "Data analysis"
      ],
      no: [
        "Python (avansert dataanalyse)",
        "Excel (pivot, makroer)",
        "Tripletex & Uni Micro (regnskapssystemer)",
        "Finansiell modellering", 
        "Prosessforbedring",
        "Dataanalyse"
      ]
    },
    languages: {
      en: ["Norwegian (native)", "English (fluent)"],
      no: ["Norsk (morsmål)", "Engelsk (flytende)"]
    },
    interests: {
      en: ["Hiking", "Nature", "Quantitative finance", "Data analysis"],
      no: ["Friluftsliv", "Natur", "Kvantitativ finans", "Dataanalyse"]
    }
  },

  // Resume/Timeline
  timeline: {
    en: [
      {
        year: "2025–Present",
        title: "Audit Associate",
        company: "KPMG",
        description: "Conducting financial audits and compliance reviews"
      },
      {
        year: "2024–2025", 
        title: "Internal Auditor & Budgeting",
        company: "NTNUI Økonomi",
        description: "Budget management and internal audit processes"
      },
      {
        year: "2023–2024",
        title: "Treasurer", 
        company: "NTNUI Swimming",
        description: "Financial management and budgeting"
      },
      {
        year: "2020–2024",
        title: "Teaching Assistant",
        company: "NTNU",
        description: "Electrochemistry, Statistics, Mathematics"
      },
      {
        year: "Summer 2022",
        title: "Microfabrication Intern",
        company: "CrayoNano", 
        description: "Research and development in nanotechnology"
      }
    ],
    no: [
      {
        year: "2025–d.d.",
        title: "Revisor",
        company: "KPMG",
        description: "Gjennomføring av finansiell revisjon og compliance-vurderinger"
      },
      {
        year: "2024–2025",
        title: "Økonomiutvalget",
        company: "NTNUI",
        description: "Budsjettering og internrevisjon"
      },
      {
        year: "2023–2024", 
        title: "Økonomiansvarlig",
        company: "NTNUI Svømming",
        description: "Økonomistyring og budsjettering"
      },
      {
        year: "2020–2024",
        title: "Læringsassistent", 
        company: "NTNU",
        description: "Elektrokjemi, statistikk, matematikk"
      },
      {
        year: "Sommer 2022",
        title: "Mikrofabrikasjon praktikant",
        company: "CrayoNano",
        description: "Forskning og utvikling innen nanoteknologi"
      }
    ]
  },

  // Projects
  projects: {
    en: [
      {
        title: "Stock Volatility Analysis",
        description: "Empirical study on how stock volatility affects stock prices, based on Ang et al.'s research",
        technologies: ["Python", "Pandas", "NumPy", "Statistical Analysis"],
        github: "https://github.com/Hat10"
      },
      {
        title: "Financial Data Dashboard", 
        description: "Interactive dashboard for financial data visualization and analysis",
        technologies: ["Python", "Plotly", "Streamlit", "Financial APIs"],
        github: "https://github.com/Hat10"
      },
      {
        title: "Process Automation Tools",
        description: "Excel macros and Python scripts for audit process automation",
        technologies: ["Python", "VBA", "Excel", "Process Optimization"],
        github: "https://github.com/Hat10"
      }
    ],
    no: [
      {
        title: "Aksjevolatilitetsanalyse",
        description: "Empirisk studie av hvordan aksjevolatilitet påvirker aksjepriser, basert på Ang et al.s forskning",
        technologies: ["Python", "Pandas", "NumPy", "Statistisk analyse"],
        github: "https://github.com/Hat10"
      },
      {
        title: "Finansiell data-dashboard",
        description: "Interaktivt dashboard for visualisering og analyse av finansielle data", 
        technologies: ["Python", "Plotly", "Streamlit", "Finans-APIer"],
        github: "https://github.com/Hat10"
      },
      {
        title: "Prosessautomatiseringsverktøy",
        description: "Excel-makroer og Python-skript for automatisering av revisjonsprosesser",
        technologies: ["Python", "VBA", "Excel", "Prosessoptimalisering"],
        github: "https://github.com/Hat10"
      }
    ]
  },

  // Blog posts
  blog: {
    en: [
      {
        title: "Understanding Financial Risk Analysis",
        excerpt: "A deep dive into modern risk analysis techniques in finance",
        date: "2024-12-15",
        slug: "financial-risk-analysis"
      }
    ],
    no: [
      {
        title: "Forståelse av finansiell risikoanalyse", 
        excerpt: "Et dypdykk i moderne risikoanalyseteknikker innen finans",
        date: "2024-12-15",
        slug: "finansiell-risikoanalyse"
      }
    ]
  },

  // Navigation
  navigation: {
    en: {
      home: "Home",
      about: "About Me", 
      resume: "Resume",
      projects: "Projects",
      blog: "Blog",
      contact: "Contact"
    },
    no: {
      home: "Hjem",
      about: "Om meg",
      resume: "CV", 
      projects: "Prosjekter",
      blog: "Artikler",
      contact: "Kontakt"
    }
  }
};