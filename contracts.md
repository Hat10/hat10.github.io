# API Contracts - Andreas Stenberg Portfolio

## Overview
This document outlines the backend API contracts and integration plan for transitioning from mock data to full-stack functionality.

## Current Mock Data Structure
Currently using `/src/data/mock.js` with the following data:
- Personal information (name, title, contact details, profile image)
- Home page content (bilingual greeting and descriptions)
- About section (education, skills, languages, interests)
- Timeline/Resume data (work experience)
- Projects data (project details, technologies, GitHub links)
- Blog posts (articles in both languages)
- Navigation labels (bilingual)

## Backend API Endpoints to Implement

### 1. Portfolio Content API
**GET /api/portfolio**
- Returns all portfolio content including personal info, about data, education, skills
- Supports language parameter: `?lang=en|no`
- Response includes all static content currently in mock.js

### 2. Timeline/Experience API
**GET /api/timeline**
- Returns work experience timeline
- Supports language parameter: `?lang=en|no`
- Ordered by date (most recent first)

### 3. Projects API
**GET /api/projects**
- Returns all projects with descriptions, technologies, GitHub links
- Supports language parameter: `?lang=en|no`
- Include featured project flag

### 4. Blog Posts API
**GET /api/blog**
- Returns all blog articles
- Supports language parameter: `?lang=en|no`
- Includes pagination support
- Returns: title, excerpt, date, slug, category, readTime

**GET /api/blog/:slug**
- Returns full blog post content by slug
- Supports language parameter

### 5. Contact Form API
**POST /api/contact**
- Accepts contact form submissions
- Required fields: name, email, subject, message
- Stores in database and optionally sends email notification
- Returns success/error response

### 6. Newsletter Subscription API
**POST /api/newsletter**
- Accepts email subscriptions from blog page
- Required field: email
- Stores in database with subscription date
- Returns success/error response

## Database Models

### Portfolio Model
```javascript
{
  _id: ObjectId,
  personalInfo: {
    name: String,
    title: { en: String, no: String },
    email: String,
    linkedin: String,
    github: String,
    profileImage: String,
    birthdate: String
  },
  home: {
    en: { greeting: String, description: String },
    no: { greeting: String, description: String }
  },
  about: {
    education: {
      en: [{ degree: String, institution: String, period: String, thesis: String }],
      no: [{ degree: String, institution: String, period: String, thesis: String }]
    },
    skills: { en: [String], no: [String] },
    languages: { en: [String], no: [String] },
    interests: { en: [String], no: [String] }
  },
  createdAt: Date,
  updatedAt: Date
}
```

### Timeline Model
```javascript
{
  _id: ObjectId,
  year: String,
  title: { en: String, no: String },
  company: { en: String, no: String },
  description: { en: String, no: String },
  order: Number,
  createdAt: Date
}
```

### Project Model
```javascript
{
  _id: ObjectId,
  title: { en: String, no: String },
  description: { en: String, no: String },
  technologies: [String],
  github: String,
  liveUrl: String,
  featured: Boolean,
  order: Number,
  createdAt: Date
}
```

### BlogPost Model
```javascript
{
  _id: ObjectId,
  title: { en: String, no: String },
  excerpt: { en: String, no: String },
  content: { en: String, no: String },
  slug: { en: String, no: String },
  category: { en: String, no: String },
  readTime: String,
  published: Boolean,
  publishedAt: Date,
  createdAt: Date,
  updatedAt: Date
}
```

### Contact Model
```javascript
{
  _id: ObjectId,
  name: String,
  email: String,
  subject: String,
  message: String,
  read: Boolean,
  submittedAt: Date
}
```

### Newsletter Model
```javascript
{
  _id: ObjectId,
  email: String,
  subscribed: Boolean,
  subscribedAt: Date,
  unsubscribedAt: Date
}
```

## Frontend Integration Changes

### 1. API Service Layer
Create `/src/services/api.js` to handle all API calls:
- Replace direct mock data imports
- Add error handling and loading states
- Implement language parameter passing

### 2. State Management
Update components to:
- Use useEffect hooks for data fetching
- Add loading states
- Handle error states
- Cache API responses where appropriate

### 3. Form Handling
Update Contact component:
- Replace mock form submission with actual API call
- Add proper validation
- Show success/error feedback
- Clear form on successful submission

### 4. Component Updates
- **Home.jsx**: Fetch home content from API
- **About.jsx**: Fetch about data from API  
- **Resume.jsx**: Fetch timeline data from API
- **Projects.jsx**: Fetch projects from API
- **Blog.jsx**: Fetch blog posts from API
- **Contact.jsx**: Submit to contact API

## Migration Strategy

### Phase 1: Backend Setup
1. Create database models
2. Implement API endpoints
3. Seed database with current mock data
4. Test all endpoints

### Phase 2: Frontend Integration
1. Create API service layer
2. Update components one by one
3. Add loading/error states
4. Test bilingual functionality

### Phase 3: Enhanced Features
1. Add blog post creation/editing (optional admin panel)
2. Email notifications for contact form
3. Newsletter email integration
4. Analytics and visitor tracking

## Testing Requirements
- Test all API endpoints with both languages
- Verify contact form submissions work
- Test error handling for network failures
- Ensure backward compatibility during migration
- Test responsive design with real data

## Security Considerations
- Input validation on all POST endpoints
- Rate limiting for contact form
- Email validation for newsletter
- CORS configuration for frontend domain
- Environment variables for sensitive data

## Performance Optimizations
- Database indexing on frequently queried fields
- API response caching
- Image optimization for profile photos
- CDN integration for static assets