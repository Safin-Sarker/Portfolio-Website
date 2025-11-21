# Portfolio Website - Project Documentation

**Last Updated:** 2025-11-16
**Status:** ✅ Foundation Complete - Ready for UI Development

---

## Project Overview

An eye-catching portfolio website with a RAG-powered chatbot where recruiters and visitors can learn about skills, projects, work experience, and contact information.

### Key Features
- Hero/Landing section with animations
- About Me section
- Skills showcase with interactive visualizations
- Projects grid with live demos
- Work Experience timeline
- Contact form
- RAG Chatbot (powered by OpenAI + ChromaDB)

---

## Tech Stack

### Frontend
- **Next.js 14/15** - React framework with App Router
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first styling
- **Framer Motion** - Animations and transitions
- **Aceternity UI / Magic UI** - Eye-catching UI components

### Backend & AI
- **OpenAI API** - GPT-4 / GPT-3.5 for chat and embeddings
- **ChromaDB** - Vector database for embeddings
- **LangChain.js** - RAG orchestration
- **Vercel AI SDK** - Streaming responses

### Infrastructure
- **Docker** - Containerization
- **Docker Compose** - Multi-container orchestration
- **Nginx** - Reverse proxy (optional)

### Deployment Options
1. **Railway** - $10-15/month, easiest
2. **DigitalOcean Droplet** - $12/month, full control
3. **Render** - Free tier available

---

## Architecture Decisions

### Why OpenAI?
- ✅ State-of-the-art LLM quality (GPT-4/3.5)
- ✅ Fast and reliable API
- ✅ Cost-effective for portfolio use case
- ✅ Easy to integrate and deploy
- ✅ No infrastructure management needed

### Why ChromaDB?
- ✅ Open source and free
- ✅ Perfect for small datasets (portfolio content)
- ✅ Easy integration with LangChain
- ✅ Can run in-process (no server needed) or with Docker
- ✅ Persistent local storage

### Why Docker? (Optional)
- ✅ Consistent environments (dev = prod)
- ✅ Easy deployment
- ✅ Demonstrates DevOps knowledge
- ✅ Scalable architecture
- ⚠️ **Note:** Docker is optional for this project. You can run everything locally without Docker (see LOCAL-SETUP.md)

### Why Single Page App?
- ✅ Better UX for portfolios
- ✅ Smooth scroll navigation
- ✅ Faster perceived performance
- ✅ Can add individual project pages later

---

## Project Structure

```
portfolio-website/
├── claude.md                    # This file - project documentation
├── docker-compose.yml           # Multi-container setup
├── Dockerfile                   # Next.js container
├── package.json                 # Dependencies
│
├── public/                      # Static assets
│   ├── images/                  # Images, logos, screenshots
│   └── resume.pdf              # Downloadable resume
│
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── page.tsx            # Main page (all sections)
│   │   ├── layout.tsx          # Root layout
│   │   └── api/                # API routes
│   │       ├── chat/           # RAG chatbot endpoints
│   │       └── contact/        # Contact form
│   │
│   ├── components/
│   │   ├── sections/           # Hero, About, Skills, Projects, etc.
│   │   ├── chatbot/            # Chat UI components
│   │   ├── ui/                 # Reusable UI components
│   │   └── animations/         # Animation wrappers
│   │
│   ├── lib/                    # Utilities
│   │   ├── chromadb.ts         # ChromaDB client
│   │   ├── openai.ts           # OpenAI client
│   │   └── langchain.ts        # RAG setup
│   │
│   ├── data/                   # Content (JSON/MD)
│   │   ├── portfolio.json      # Main content
│   │   ├── skills.json
│   │   ├── projects.json
│   │   └── experience.json
│   │
│   └── types/                  # TypeScript types
│
└── scripts/
    └── seed-embeddings.ts      # Initialize ChromaDB
```

---

## Setup Options

### Option 1: Fully Local (Recommended for Development)
- **No Docker required**
- ChromaDB runs in-process within Next.js
- Data stored in `.chromadb/` directory
- Fastest startup, simplest setup
- **See LOCAL-SETUP.md for detailed instructions**

### Option 2: Docker (Recommended for Production)
- ChromaDB runs as a separate container
- Next.js can run locally or in a container
- Better for deployment scenarios
- **See docker-compose.yml**

---

## Docker Architecture (Optional)

**Note:** Docker is optional. For local development without Docker, see LOCAL-SETUP.md

### Services (docker-compose.yml)

1. **nextjs** (Port 3000)
   - Next.js application
   - Communicates with ChromaDB and OpenAI API

2. **chromadb** (Port 8000)
   - Vector database
   - Persistent volume for embeddings

### Container Communication
```
nextjs:3000 → chromadb:8000 (vector search)
nextjs:3000 → OpenAI API (LLM inference via HTTPS)
```

---

## Environment Variables

### Required Variables (.env.local)

**For Local Setup (No Docker):**
```env
# OpenAI Configuration
OPENAI_API_KEY=sk-your-openai-api-key-here

# ChromaDB Configuration (local persistent storage)
CHROMADB_PATH=./.chromadb
```

**For Docker Setup:**
```env
# OpenAI Configuration
OPENAI_API_KEY=sk-your-openai-api-key-here

# ChromaDB Configuration (Docker server)
CHROMADB_URL=http://localhost:8000

# Contact Form (Optional - for email)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
CONTACT_EMAIL=your-email@gmail.com

# App Configuration
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_SITE_NAME=Your Name - Portfolio
```

---

## RAG Chatbot Architecture

### How It Works

1. **Initialization** (One-time)
   - Load portfolio content (JSON + MD files)
   - Generate embeddings using OpenAI (text-embedding-3-small)
   - Store in ChromaDB with metadata

2. **User Query Flow**
   - User asks: "What projects has [name] worked on?"
   - Create embedding of user question using OpenAI
   - Vector search in ChromaDB (top 5 relevant chunks)
   - Pass context + question to OpenAI (GPT-4 or GPT-3.5-turbo)
   - Stream response back to user

3. **Data Sources for RAG**
   - Resume/CV content
   - Project descriptions
   - Skills and technologies
   - Work experience
   - About me section
   - LinkedIn profile (optional)

---

## Development Workflow

### Initial Setup (Local - No Docker)

**Recommended for development:**

```bash
# Install dependencies
npm install

# Create .env.local with your OpenAI API key
echo "OPENAI_API_KEY=sk-your-key-here" > .env.local
echo "CHROMADB_PATH=./.chromadb" >> .env.local

# Seed ChromaDB with embeddings
npm run seed

# Start dev server
npm run dev
```

**See LOCAL-SETUP.md for detailed instructions.**

### Initial Setup (With Docker)

```bash
# Install dependencies
npm install

# Create .env.local with your OpenAI API key
echo "OPENAI_API_KEY=sk-your-key-here" > .env.local
echo "CHROMADB_URL=http://localhost:8000" >> .env.local

# Start Docker services (ChromaDB)
docker-compose up -d

# Seed ChromaDB with embeddings
npm run seed

# Start dev server
npm run dev
```

### Development Commands
```bash
npm run dev          # Start Next.js dev server
npm run build        # Production build
npm run start        # Start production server
npm run lint         # Lint code
npm run seed         # Re-seed ChromaDB
```

### Docker Commands
```bash
docker-compose up -d              # Start all services
docker-compose down               # Stop all services
docker-compose logs -f [service]  # View logs
docker-compose restart [service]  # Restart service
```

---

## OpenAI Models

### Recommended Models

**For Chat:**
- **gpt-4-turbo** - Best quality, most capable
- **gpt-4** - High quality, good balance
- **gpt-3.5-turbo** - Fast and cost-effective

**For Embeddings:**
- **text-embedding-3-small** - Cost-effective, good quality (default)
- **text-embedding-3-large** - Higher quality, more expensive

### Pricing (as of 2024)
- GPT-3.5-turbo: ~$0.001/1K tokens (very affordable)
- GPT-4: ~$0.03/1K tokens
- Embeddings: ~$0.0001/1K tokens

For a portfolio chatbot with moderate traffic, costs are typically under $5/month.

---

## Content Data Structure

### projects.json
```json
{
  "projects": [
    {
      "id": "project-1",
      "title": "Project Name",
      "description": "Short description",
      "longDescription": "Detailed description for RAG",
      "technologies": ["React", "Node.js"],
      "image": "/images/projects/project1.png",
      "liveUrl": "https://...",
      "githubUrl": "https://github.com/...",
      "featured": true
    }
  ]
}
```

### experience.json
```json
{
  "experience": [
    {
      "id": "exp-1",
      "company": "Company Name",
      "position": "Job Title",
      "startDate": "2023-01",
      "endDate": "2024-05",
      "current": false,
      "description": "What you did...",
      "achievements": ["Achievement 1", "Achievement 2"],
      "technologies": ["Tech 1", "Tech 2"]
    }
  ]
}
```

### skills.json
```json
{
  "categories": [
    {
      "name": "Frontend",
      "skills": [
        {
          "name": "React",
          "level": 90,
          "icon": "react-icon"
        }
      ]
    }
  ]
}
```

---

## Deployment Guide

### Option 1: Railway

1. Connect GitHub repo
2. Add environment variables
3. Railway auto-detects Dockerfile
4. Deploy!

### Option 2: DigitalOcean Droplet

1. Create Ubuntu 22.04 droplet ($12/month)
2. SSH into server
3. Install Docker + Docker Compose
4. Clone repo and run `docker-compose up -d`
5. Configure nginx reverse proxy
6. Set up SSL with Let's Encrypt

### Option 3: Render

1. Connect GitHub repo
2. Select "Docker" deployment
3. Add environment variables
4. Deploy

---

## Performance Considerations

### OpenAI Model Selection
- GPT-3.5-turbo → Very fast, cost-effective, good for most queries
- GPT-4 → Higher quality, better reasoning, slightly slower
- For portfolio chatbot: **GPT-3.5-turbo is perfect**

### ChromaDB Optimization
- Keep embeddings under 10,000 chunks
- Use metadata filtering
- Batch queries when possible

### Next.js Optimization
- Static generation where possible
- Image optimization with next/image
- Lazy load chatbot component
- Code splitting for animations

---

## TODO / Future Enhancements

- [ ] Add blog section
- [ ] Individual project detail pages
- [ ] Dark/light mode toggle
- [ ] Analytics integration
- [ ] Email newsletter signup
- [ ] Testimonials section
- [ ] Download resume button
- [ ] Multi-language support
- [ ] Voice input for chatbot
- [ ] Admin panel to update content

---

## Troubleshooting

### OpenAI API errors
- Check your API key is correct in .env.local
- Verify you have credits in your OpenAI account
- Check rate limits if getting 429 errors

### ChromaDB connection failed
```bash
docker-compose logs chromadb
# Check if volume is mounted correctly
```

### Rate limiting
- Implement request throttling in your chatbot
- Use GPT-3.5-turbo for lower rate limits
- Upgrade your OpenAI plan if needed

---

## Resources & Links

- [Next.js Docs](https://nextjs.org/docs)
- [OpenAI API Docs](https://platform.openai.com/docs)
- [ChromaDB Docs](https://docs.trychroma.com/)
- [LangChain.js](https://js.langchain.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/)
- [Aceternity UI](https://ui.aceternity.com/)

---

## Notes

- **User will provide:** CV, LinkedIn profile for content population
- **Keep this file updated** throughout development
- Document all major decisions and changes
- Add deployment URLs when live

---

## Progress Log

### 2025-11-16 - Initial Setup Complete

**Completed:**
- ✅ Project structure designed and documented
- ✅ Next.js 14 initialized with TypeScript
- ✅ Tailwind CSS configured
- ✅ Docker configuration (Dockerfile + docker-compose.yml)
- ✅ Services configured: Next.js, ChromaDB
- ✅ Environment variables template created
- ✅ OpenAI integration configured
- ✅ All dependencies installed
- ✅ Basic app structure (layout.tsx, page.tsx, globals.css)

**File Structure Created:**
```
Portfolio-Website/
├── claude.md ✅
├── README.md ✅
├── package.json ✅
├── tsconfig.json ✅
├── next.config.js ✅
├── tailwind.config.ts ✅
├── Dockerfile ✅
├── docker-compose.yml ✅
├── .env.example ✅
├── .gitignore ✅
├── src/app/ ✅
├── src/components/ (empty, ready)
├── src/lib/ (empty, ready)
├── src/data/ (empty, ready)
└── scripts/ ✅
```

**Next Steps:**
1. Create sample data files (skills.json, projects.json, experience.json)
2. Build UI components (Hero, About, Skills, Projects, Experience, Contact)
3. Set up RAG chatbot with LangChain + ChromaDB + OpenAI
4. Add animations with Framer Motion
5. Test Docker deployment
6. Populate with user's real CV/LinkedIn data

**To Run the Project:**
```bash
# Add OpenAI API key to .env.local
echo "OPENAI_API_KEY=sk-your-key-here" > .env.local

# Install dependencies
npm install

# Start Docker services (ChromaDB)
docker-compose up -d

# Start dev server
npm run dev
```

---

**Project Status:** ✅ Foundation complete! Ready for UI development and content creation.
