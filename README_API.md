# TechLearn Hub - API Documentation

## Overview
This project now includes an Express.js backend API that handles content redirects and serves the learning resource pages for Cybersecurity and Data Science.

## Installation

1. Install dependencies:
```bash
npm install
```

2. Start the server:
```bash
npm start
```

For development with auto-reload:
```bash
npm run dev
```

The server will run on `http://localhost:3000`

## API Endpoints

### 1. Get All Content
**Endpoint:** `GET /api/content`

Returns all available content for both Data Science and Cybersecurity categories.

**Response:**
```json
{
  "datascience": [
    { "id": "python", "title": "Python Programming", "path": "content/datascience/python.html" },
    { "id": "ml", "title": "Machine Learning", "path": "content/datascience/ml.html" },
    ...
  ],
  "cybersecurity": [
    { "id": "fundamentals", "title": "Cybersecurity Fundamentals", "path": "content/cybersecurity/fundamentals.html" },
    ...
  ]
}
```

### 2. Get Content by Category
**Endpoint:** `GET /api/content/:category`

Parameters:
- `category`: Either "datascience" or "cybersecurity"

**Example:** `GET /api/content/datascience`

### 3. Redirect to Content
**Endpoint:** `GET /api/redirect/:category/:id`

Parameters:
- `category`: Either "datascience" or "cybersecurity"
- `id`: The content ID (e.g., "python", "ml", "fundamentals", etc.)

**Example:** `GET /api/redirect/datascience/python`

This will redirect the user to the Python content page.

## How Redirects Work

The JavaScript file `js/api-redirect.js` automatically intercepts clicks on links that point to content files and routes them through the API:

1. When a user clicks on any link to `content/datascience/python.html` or `content/cybersecurity/fundamentals.html`
2. The JavaScript intercepts the click
3. It parses the URL to extract the category and content ID
4. It calls the API redirect endpoint: `/api/redirect/{category}/{id}`
5. The API redirects to the actual content file

This approach provides:
- Centralized content routing
- Easy tracking of content access
- Flexibility to change content paths without updating HTML
- Ability to add authentication or logging in the future

## Available Content

### Data Science
- python - Python Programming
- ml - Machine Learning
- dl - Deep Learning
- nlp - Natural Language Processing
- sql - SQL & Databases
- fastapi - FastAPI
- pytorch - PyTorch
- tensorflow - TensorFlow
- transformers - Transformers
- rl - Reinforcement Learning
- scikit - Scikit-Learn
- automl - AutoML
- mlops - MLOps
- cnn - Computer Vision
- langchain - LangChain
- math - Mathematics for DS

### Cybersecurity
- fundamentals - Cybersecurity Fundamentals
- network - Network Security
- cryptography - Cryptography
- ethics - Ethical Hacking
- forensics - Digital Forensics
- incident - Incident Response
- malware - Malware Analysis
- soc - SOC Operations
- siem - SIEM Tools
- pentest - Penetration Testing
- webapp - Web App Security
- mobile - Mobile Security
- cloud - Cloud Security
- threat - Threat Intelligence
- iot - IoT Security
- compliance - Compliance
- rodemap - Roadmap

## Main Pages

- `/` - Home page (index-w3style.html)
- `/tutorials` - Tutorials page
- `/exercises` - Exercises page
- `/certifications` - Certifications page
- `/faq` - FAQ page

## Static Files

All static files (CSS, JS, images) are served from the root directory.

## Development

The server includes hot-reload capability when using `npm run dev` (requires nodemon).

## Future Enhancements

- Add user authentication
- Track user progress
- Add content analytics
- Implement search functionality
- Add user favorites
- Create learning paths
