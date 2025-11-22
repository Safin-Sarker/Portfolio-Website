# MD Safin Sarker - Portfolio Website

A modern portfolio website with an AI-powered chatbot assistant that answers questions about my experience, skills, and projects.

**[Live Demo](https://safin-portfolio-website.netlify.app/)**

---

## Table of Contents

- [About](#about)
- [Key Features](#key-features)
- [Tech Stack](#tech-stack)
- [Setup](#setup)
- [Project Structure](#project-structure)
- [Available Commands](#available-commands)
- [Contact](#contact)
- [License](#license)

---

## About

This is a full-stack portfolio website built with Next.js and TypeScript, featuring smooth animations and an intelligent RAG (Retrieval Augmented Generation) chatbot. The chatbot uses OpenAI and Pinecone to provide accurate, context-aware answers about my professional background.

---

## Key Features

- **Interactive Hero Section** - Animated typewriter effect and smooth transitions
- **AI Chatbot** - RAG-powered assistant using OpenAI GPT-4 and Pinecone vector database
- **Animated Timeline** - Professional experience with scroll-triggered animations
- **Skills Showcase** - Categorized technical skills with hover effects
- **Projects Gallery** - Portfolio projects with live demos and GitHub links
- **Dark Mode** - Theme toggle with smooth transitions
- **Fully Responsive** - Mobile-first design that works on all devices

---

## Tech Stack

**Frontend:**

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Framer Motion

**Backend & AI:**

- OpenAI API (GPT-4o-mini, embeddings)
- Pinecone (Vector database)
- LangChain.js
- Vercel AI SDK

**Deployment:**

- Vercel / Railway / DigitalOcean

---

## Setup

### Prerequisites

- Node.js 18 or higher
- npm or pnpm
- OpenAI API key ([Get one here](https://platform.openai.com/api-keys))
- Pinecone API key ([Get one here](https://www.pinecone.io/))

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/Safin-Sarker/Portfolio-Website.git
   cd Portfolio-Website
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**

   Create a `.env.local` file in the root directory:

   ```env
   # OpenAI Configuration
   OPENAI_API_KEY=sk-your-openai-api-key-here

   # Pinecone Configuration
   PINECONE_API_KEY=your-pinecone-api-key-here
   PINECONE_INDEX=portfolio-knowledge

   # App Configuration
   NEXT_PUBLIC_SITE_URL=http://localhost:3000
   NEXT_PUBLIC_SITE_NAME=Your-Name-Portfolio
   ```

4. **Seed the vector database**

   ```bash
   npm run seed
   ```

   This generates embeddings from your portfolio content and stores them in Pinecone.

5. **Run the development server**

   ```bash
   npm run dev
   ```

   Visit [http://localhost:3000](http://localhost:3000) to view your portfolio.

---

## Project Structure

```
Portfolio-Website/
├── src/
│   ├── app/                 # Next.js App Router
│   │   ├── api/chat/        # Chatbot API endpoint
│   │   ├── page.tsx         # Main page
│   │   └── layout.tsx       # Root layout
│   ├── components/          # React components
│   │   ├── Hero.tsx
│   │   ├── About.tsx
│   │   ├── Experience.tsx
│   │   ├── Skills.tsx
│   │   ├── Projects.tsx
│   │   ├── Education.tsx
│   │   ├── ChatBot.tsx
│   │   └── ...
│   ├── data/knowledge/      # RAG knowledge base
│   └── contexts/            # React contexts
├── public/images/           # Static assets
├── scripts/
│   └── seed-pinecone.ts     # Vector DB seeding
└── .env.local               # Environment variables
```

---

## Available Commands

```bash
npm run dev       # Start development server
npm run build     # Build for production
npm run start     # Start production server
npm run lint      # Run ESLint
npm run seed      # Seed Pinecone with embeddings
```

---

## Contact

**MD Safin Sarker**

- Portfolio: [safin-portfolio-website.netlify.app](https://safin-portfolio-website.netlify.app/)
- LinkedIn: [linkedin.com/in/safin-sarker](https://www.linkedin.com/in/safin-sarker/)
- GitHub: [github.com/Safin-Sarker](https://github.com/Safin-Sarker)
- Email: [Safinsarker1122@gmail.com](mailto:Safinsarker1122@gmail.com)

---

## License

© 2025 MD Safin Sarker. All Rights Reserved.

This project is for personal portfolio use. Please contact me for permission before using any part of this code.

---

**Made with Next.js, TypeScript, and AI**

If you found this project helpful, consider giving it a star!
