# MD Safin Sarker - Portfolio Website

<div align="center">

![Portfolio Banner](./public/images/logo.png)

**A modern, animated portfolio website with an AI-powered chatbot assistant**

[![Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![OpenAI](https://img.shields.io/badge/OpenAI-GPT--4-green?style=for-the-badge&logo=openai)](https://openai.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)

[Live Demo](#) | [Documentation](./claude.md) | [Setup Guide](./LOCAL-SETUP.md)

</div>

---

## 📋 Table of Contents

- [Project Overview](#-project-overview)
- [Features](#-features)
- [Technology Stack](#-technology-stack)
- [Quick Start](#-quick-start)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running the Project](#running-the-project)
  - [Building for Production](#building-for-production)
- [Project Structure](#-project-structure)
- [Environment Variables](#-environment-variables)
- [Available Scripts](#-available-scripts)
- [Animations & Interactions](#-animations--interactions)
- [RAG Chatbot](#-rag-chatbot)
- [Deployment](#-deployment)
- [Contact](#-contact)
- [License](#-license)

---

## 🎯 Project Overview

This is a **full-stack portfolio website** showcasing my skills as a Full Stack Developer and AI Specialist. The portfolio features a modern, responsive design with smooth animations and an intelligent **RAG (Retrieval Augmented Generation) chatbot** powered by OpenAI and ChromaDB.

The chatbot can answer questions about my experience, skills, projects, and education by retrieving relevant information from a knowledge base and generating contextual responses using GPT-4/3.5-turbo.

**Key Highlights:**

- ⚡ Built with Next.js 14 and TypeScript for type safety and performance
- 🎨 Stunning animations using Framer Motion
- 🤖 AI-powered chatbot with RAG architecture
- 📱 Fully responsive and mobile-friendly
- 🌗 Dark mode support
- 🚀 Optimized for production deployment

---

## ✨ Features

### 🎨 User Interface

- **Hero Section** with typewriter animation cycling through roles
- **About Me** section with professional summary
- **Impact & Achievements** with animated number counters
- **Experience Timeline** with cards flying in from both sides
- **Skills Section** with categorized skills and hover animations
- **Projects Showcase** with 3D tilt effect cards
- **Education Timeline** with smooth animations
- **Contact Form** for direct communication
- **Dark/Light Mode Toggle** with smooth transitions

### 🚀 Advanced Animations

- Scroll-based animations that trigger every time sections come into view
- 3D tilt effect on project cards (mouse tracking)
- Typewriter effect for dynamic text
- Animated counters for statistics
- Timeline animations with drawing effect
- Pulsing timeline dots with ripple effect
- Skill tags with stagger animations
- Scroll progress indicator
- Smooth page transitions

### 🤖 AI Chatbot

- RAG-powered responses using OpenAI and ChromaDB
- Context-aware answers about experience, skills, and projects
- Streaming responses for better UX
- Message bubble animations
- Typing indicator
- Pre-built question suggestions
- Markdown support in responses

---

## 🛠️ Technology Stack

### Frontend

| Technology               | Purpose                         |
| ------------------------ | ------------------------------- |
| **Next.js 14**           | React framework with App Router |
| **TypeScript**           | Type safety and better DX       |
| **Tailwind CSS**         | Utility-first styling           |
| **Framer Motion**        | Advanced animations             |
| **React Type Animation** | Typewriter effects              |
| **React CountUp**        | Number counter animations       |

### Backend & AI

| Technology        | Purpose                           |
| ----------------- | --------------------------------- |
| **OpenAI API**    | GPT-4/3.5 for chat and embeddings |
| **ChromaDB**      | Vector database for embeddings    |
| **LangChain.js**  | RAG orchestration                 |
| **Vercel AI SDK** | Streaming chat responses          |

### Development & Deployment

| Technology | Purpose                     |
| ---------- | --------------------------- |
| **Docker** | Containerization (optional) |
| **ESLint** | Code linting                |
| **Git**    | Version control             |

---

## 🚀 Quick Start

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher) - [Download](https://nodejs.org/)
- **npm** or **pnpm** - Comes with Node.js
- **OpenAI API Key** - [Get one here](https://platform.openai.com/api-keys)

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

   ```bash
   cp .env.example .env.local
   ```

   Add your OpenAI API key:

   ```env
   OPENAI_API_KEY=sk-your-openai-api-key-here
   CHROMADB_PATH=./.chromadb
   ```

4. **Seed the vector database**
   ```bash
   npm run seed
   ```
   This will generate embeddings from your portfolio content and store them in ChromaDB.

### Running the Project

**Development Mode:**

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to see your portfolio.

**Production Preview:**

```bash
npm run build
npm run start
```

### Building for Production

```bash
npm run build
```

This creates an optimized production build in the `.next` folder.

---

## 📁 Project Structure

```
Portfolio-Website/
├── public/                      # Static assets
│   ├── images/                  # Images and logos
│   └── favicon.ico
├── src/
│   ├── app/                     # Next.js App Router
│   │   ├── api/                 # API routes
│   │   │   └── chat/            # RAG chatbot endpoint
│   │   ├── globals.css          # Global styles
│   │   ├── layout.tsx           # Root layout
│   │   └── page.tsx             # Main page
│   ├── components/              # React components
│   │   ├── About.tsx
│   │   ├── ChatBot.tsx
│   │   ├── Contact.tsx
│   │   ├── Education.tsx
│   │   ├── Experience.tsx
│   │   ├── Hero.tsx
│   │   ├── Navigation.tsx
│   │   ├── Projects.tsx
│   │   ├── ScrollProgress.tsx
│   │   ├── Skills.tsx
│   │   ├── Stats.tsx
│   │   ├── ThemeToggle.tsx
│   │   ├── ThemeWrapper.tsx
│   │   └── TiltCard.tsx
│   ├── contexts/                # React contexts
│   │   └── ThemeContext.tsx
│   ├── data/                    # Portfolio content
│   │   └── knowledge/           # RAG knowledge base
│   └── lib/                     # Utilities
│       └── queryRouter.ts
├── scripts/
│   └── seed-embeddings.ts       # Vector DB seeding script
├── .env.example                 # Environment variables template
├── docker-compose.yml           # Docker setup (optional)
├── Dockerfile                   # Docker configuration
├── next.config.js               # Next.js configuration
├── tailwind.config.ts           # Tailwind CSS configuration
├── tsconfig.json                # TypeScript configuration
└── package.json                 # Dependencies and scripts
```

---

## 🔐 Environment Variables

| Variable         | Description                       | Required | Default       |
| ---------------- | --------------------------------- | -------- | ------------- |
| `OPENAI_API_KEY` | Your OpenAI API key               | ✅ Yes   | -             |
| `CHROMADB_PATH`  | Local path for ChromaDB storage   | ✅ Yes   | `./.chromadb` |
| `CHROMADB_URL`   | ChromaDB server URL (Docker only) | ❌ No    | -             |

**Example `.env.local`:**

```env
OPENAI_API_KEY=sk-proj-xxxxxxxxxxxxxxxxxxxxxxxx
CHROMADB_PATH=./.chromadb
```

---

## 📜 Available Scripts

| Script          | Description                                       |
| --------------- | ------------------------------------------------- |
| `npm run dev`   | Start development server on http://localhost:3000 |
| `npm run build` | Create production build                           |
| `npm run start` | Start production server                           |
| `npm run lint`  | Run ESLint for code quality                       |
| `npm run seed`  | Seed ChromaDB with portfolio embeddings           |

---

## 🎭 Animations & Interactions

This portfolio features extensive animations powered by **Framer Motion**:

- **Scroll-triggered animations** - Animations replay every time you scroll to a section
- **3D Tilt Cards** - Projects cards tilt based on mouse position
- **Typewriter Effect** - Hero section cycles through different roles
- **Number Counters** - Statistics count up when scrolled into view
- **Timeline Animations** - Experience cards fly in from both sides
- **Particle Effects** - Subtle floating particles in Stats section
- **Scroll Progress Bar** - Visual indicator of page scroll progress
- **Hover Micro-interactions** - Buttons, cards, and tags respond to hover
- **Theme Transitions** - Smooth color transitions when switching themes

---

## 🤖 RAG Chatbot

The portfolio includes an intelligent chatbot powered by **Retrieval Augmented Generation (RAG)**:

### How It Works

1. **Knowledge Base**: Portfolio content is stored as markdown files in `src/data/knowledge/`
2. **Embeddings**: Content is converted to vector embeddings using OpenAI's `text-embedding-3-small`
3. **Storage**: Embeddings are stored in ChromaDB for fast similarity search
4. **Retrieval**: When a user asks a question, relevant content chunks are retrieved
5. **Generation**: OpenAI GPT-4/3.5 generates a response based on retrieved context

### Features

- Streaming responses for better UX
- Context-aware answers about experience, skills, projects, and education
- Markdown formatting in responses
- Typing indicator animation
- Suggestion chips for common questions

### Customization

To update the chatbot's knowledge base:

1. Edit files in `src/data/knowledge/`
2. Run `npm run seed` to regenerate embeddings
3. Restart the development server

---

## 🌐 Deployment

### Deploy to Vercel (Recommended)

1. **Push to GitHub**

   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. **Deploy on Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Add environment variable: `OPENAI_API_KEY`
   - Deploy!

### Other Deployment Options

- **Railway**: Auto-detects Dockerfile, easy setup
- **DigitalOcean**: Deploy with Docker Compose
- **Render**: Free tier available

For detailed deployment instructions, see [claude.md](./claude.md#deployment-guide).

---

## 📞 Contact

**MD Safin Sarker**

- 🌐 Portfolio: [Your Live URL]
- 💼 LinkedIn: [linkedin.com/in/safin-sarker](https://www.linkedin.com/in/safin-sarker/)
- 🐙 GitHub: [github.com/Safin-Sarker](https://github.com/Safin-Sarker)
- 📧 Email: [Safinsarker1122@gmail.com](mailto:Safinsarker1122@gmail.com)

---

## 📄 License

**© 2025 MD Safin Sarker. All Rights Reserved.**

This project is proprietary and confidential. Unauthorized copying, modification, distribution, or use of this software, via any medium, is strictly prohibited without explicit written permission from the author.

**Important:**

- ❌ **No commercial use** without permission
- ❌ **No redistribution** without permission
- ❌ **No modification** without permission
- ✅ **For reference and inspiration only**

If you're interested in using this code or have questions, please [contact me](#-contact).

---

<div align="center">

**Made by MD Safin Sarker**

⭐ Star this repo if you found it helpful!

</div>
