# Projects

## AI & Machine Learning Projects

### AI-Powered Portfolio Website

**Type:** Full-Stack AI Application with RAG
**Status:** Live & Production Ready

**Description:**
A modern, responsive portfolio website featuring an intelligent RAG (Retrieval Augmented Generation) chatbot powered by OpenAI and Pinecone vector database. The chatbot provides context-aware answers about my professional background, skills, projects, and experience by retrieving relevant information from a knowledge base.

**Key Features:**

- **RAG Chatbot System**: Intelligent conversational AI that retrieves and generates accurate responses about my professional profile
- **Vector Database Integration**: Pinecone vector database for semantic search and efficient information retrieval
- **OpenAI Integration**: GPT-4o-mini for natural language understanding and generation, text-embedding-ada-002 for embeddings
- **Streaming Responses**: Real-time streaming of AI-generated answers using Vercel AI SDK
- **Dark Mode**: Smooth theme toggle with system preference detection
- **Animated Sections**: Smooth scroll animations using Framer Motion
- **Interactive Projects Gallery**: Showcase of projects with live demos and GitHub links
- **Skills Visualization**: Categorized technical skills with interactive hover effects
- **Experience Timeline**: Professional work history with scroll-triggered animations
- **Fully Responsive**: Mobile-first design optimized for all devices
- **Performance Optimized**: Fast page loads with Next.js 14 App Router and static generation

**Technologies:**

- **Frontend**: Next.js 14 (App Router), TypeScript, Tailwind CSS, Framer Motion
- **AI/ML**: OpenAI API (GPT-4o-mini, embeddings), Pinecone Vector Database, LangChain.js
- **Backend**: Next.js API Routes, Vercel AI SDK for streaming
- **Styling**: Tailwind CSS with custom animations and transitions
- **Deployment**: Vercel (optimized for Next.js)

**RAG Architecture:**

1. **Knowledge Base**: Markdown files containing professional information (projects, skills, experience, education)
2. **Embedding Generation**: OpenAI text-embedding-ada-002 creates vector embeddings of knowledge content
3. **Vector Storage**: Pinecone stores embeddings with metadata for fast semantic search
4. **Query Processing**: User questions are embedded and matched against stored vectors
5. **Context Retrieval**: Top relevant chunks retrieved based on semantic similarity
6. **Response Generation**: GPT-4o-mini generates natural answers using retrieved context
7. **Streaming UI**: Responses stream in real-time for better user experience

**Technical Highlights:**

- Clean architecture with separation of concerns
- Type-safe development with TypeScript
- Optimized embedding chunking strategy for accurate retrieval
- Metadata filtering for targeted information retrieval
- Error handling and fallback responses
- Mobile-responsive chat interface
- Smooth animations without performance impact

**Impact:**
Demonstrates advanced full-stack development skills, AI integration expertise, and modern web development best practices. The RAG system provides an interactive way for recruiters and visitors to learn about my professional background.

**Repository:** https://github.com/Safin-Sarker/Portfolio-Website

---

### Stable Diffusion ComfyUI - Master's Thesis Project

**Duration:** January 2025 - June 2025
**Institution:** University of Stavanger & Laerdal Medical

**Description:**
A comprehensive master's thesis project focused on developing an AI-powered image generation system using Stable Diffusion and ComfyUI to enhance design workflows for medical educational illustrations.

**Key Features:**

- Custom fine-tuned Stable Diffusion models for medical content
- ComfyUI-based workflow automation
- Advanced prompt engineering for consistent results
- Serverless deployment architecture
- React and Flask-based user interface
- Docker containerization for scalability

**Technologies:**

- Stable Diffusion, LoRA Fine-tuning
- ComfyUI, Python, PyTorch
- React, Flask
- Docker, Serverless Architecture
- Prompt Engineering, ML Optimization

**Impact:**
Successfully demonstrated how generative AI can be applied to medical education, improving the efficiency and quality of illustration creation workflows.

**Repository:** https://github.com/Safin-Sarker/Stable-Diffusion-ComfyUI-for-Laerdal-Style-Image-Generation-Master-s-Thesis-

---

### Data Science Projects Collection

**Duration:** 2023 - 2024

**Description:**
A collection of data science and machine learning projects showcasing various techniques in data analysis, visualization, and predictive modeling using Jupyter notebooks.

**Project Areas:**

- Data analysis and exploration
- Statistical modeling
- Predictive analytics
- Data visualization
- Machine learning algorithms implementation

**Technologies:**

- Python, Jupyter Notebooks
- Pandas, NumPy
- Matplotlib, Seaborn
- Scikit-learn
- Statistical analysis libraries

**Key Projects:**

- Exploratory data analysis on real-world datasets
- Predictive modeling for various use cases
- Data visualization dashboards
- Machine learning algorithm implementations

**Repository:** https://github.com/Safin-Sarker/DataScience_project

---

## Full-Stack Web Applications

### Fletchy - Modern E-commerce Platform

**Type:** Full-Stack E-commerce Application
**Status:** 🔄 Under Active Development

**Description:**
A modern e-commerce application built with .NET 9 (C#) backend and React (TypeScript) frontend, combining traditional e-commerce functionality with AI-powered shopping experiences using intelligent agents. This project serves as both a technical portfolio and a demonstration of full-stack development with AI integration.

**Current Development Status:**

✅ **Completed:**
- Modern e-commerce UI with React + TypeScript + Material UI
- Backend REST API using ASP.NET Core 9 Web API
- Entity Framework Core for data access
- SQL Server / SQLite database integration
- Authentication & Authorization with ASP.NET Identity
- Product Management with pagination and filtering
- Shopping Cart functionality
- Docker containerization support

🔄 **In Progress:**
- Payment Integration (Stripe / PayPal)
- Role-Based Authorization (Admin & Customer roles)
- AI Shopping Assistant architecture design

⏳ **Planned Features:**
- AI Shopping Assistant with LLM-based product recommendations
- Real-time notifications using SignalR
- Personalized recommendation system with embeddings
- Admin analytics dashboard
- Multi-language and multi-currency support

**Technologies:**

**Frontend:**
- React with TypeScript
- Vite build tool
- Material UI for modern responsive design
- Redux Toolkit + RTK Query for state management
- Zod for form validation
- React Router for navigation

**Backend:**
- ASP.NET Core 9 Web API (RESTful architecture)
- C#, Entity Framework Core
- ASP.NET Identity for authentication
- SQLite (development) → SQL Server (production)
- Docker for containerization

**AI & Future Integration:**
- Python microservice for AI agent communication
- OpenAI / Hugging Face LLM integration
- Agentic AI for intelligent shopping assistance
- Semantic search and chat-based product discovery

**Architecture:**

- Clean client-server architecture
- RESTful API design
- Repository pattern with Dependency Injection
- Microservices-ready design (AI service separation)
- Containerized deployment with Docker

**Development Roadmap:**

**Phase 1-3:** ✅ Core e-commerce foundation (authentication, product management, cart)
**Phase 4:** 🔄 Payment integration (Stripe/PayPal)
**Phase 5-6:** ⏳ Role-based authorization, real-time notifications
**Phase 7:** ⏳ AI Shopping Assistant integration
**Phase 8-9:** ⏳ Cloud deployment, testing, optimization

**Current Focus:**
- Finalizing payment workflow
- Preparing role-based authorization
- Early AI assistant architecture design

**Repository:** https://github.com/Safin-Sarker/Fletchy

---

### DevPost - Blogging Platform

**Type:** Full-Stack Blog Application

**Description:**
A comprehensive blogging platform built with ASP.NET Core MVC, featuring a clean, modern interface for creating, managing, and sharing blog posts.

**Key Features:**

- **User Authentication**: Secure registration and login system
- **Post Management**: Create, edit, delete, and publish blog posts
- **Rich Text Editor**: Advanced text editing with markdown support
- **Comments System**: User engagement through comments
- **Categories & Tags**: Organized content classification
- **Search Functionality**: Find posts easily
- **User Profiles**: Author profiles and post history
- **Responsive Design**: Clean, modern UI that works on all devices

**Technologies:**

- **Backend**: ASP.NET Core MVC, C#
- **Database**: Entity Framework, Microsoft SQL Server
- **Frontend**: Bootstrap, jQuery, JavaScript
- **Authentication**: ASP.NET Identity
- **Styling**: Custom CSS with Bootstrap

**Features Implemented:**

- CRUD operations for blog posts
- User authentication and authorization
- Comment moderation
- Category management
- Search and filtering

**Repository:** https://github.com/Safin-Sarker/DevPost-Blog-website-using-Asp.NetCore-MVC-

---

### Easy Inventory Management System

**Type:** Enterprise Inventory Management

**Description:**
A full-featured inventory management system designed for businesses to track stock levels, manage suppliers, and generate reports in real-time.

**Key Features:**

- **Real-time Stock Tracking**: Live inventory level monitoring
- **Supplier Management**: Complete supplier information and relationships
- **Product Management**: Comprehensive product catalog with variations
- **Order Management**: Purchase and sales order tracking
- **Reporting**: Detailed reports on inventory, sales, and suppliers
- **Multi-user Support**: Role-based access control

**Technologies:**

- **Backend**: ASP.NET Core MVC, C#
- **Database**: Entity Framework, MSSQL
- **Frontend**: JavaScript, jQuery
- **Reporting**: Custom report generation
- **UI**: Bootstrap, Responsive Design

**Business Value:**

- Reduces inventory management time by 50%
- Prevents stockouts with automated alerts
- Improves accuracy with barcode integration
- Provides actionable insights through reporting

**Repository:** https://github.com/Safin-Sarker/Easy-Inventory-System

---

## Technical Demonstrations & Utilities

### JSON Serializer - Custom Implementation

**Type:** Technical Deep-Dive Project

**Description:**
A custom JSON serializer implementation in C# using advanced programming techniques including recursion and reflection, demonstrating deep understanding of .NET internals and data structures.

**Key Features:**

- Custom serialization logic from scratch
- Support for complex nested objects
- Recursive object traversal
- Reflection-based property mapping
- Type handling and conversion
- Performance optimization techniques

**Technologies:**

- C#,Reflection
- Recursive algorithms
- Data structures
- Performance profiling

**Technical Highlights:**

- No external libraries used for core serialization
- Handles circular references
- Supports custom type converters
- Optimized for performance
- Comprehensive error handling

**Learning Outcomes:**

- Deep understanding of .NET reflection
- Advanced C# programming techniques
- Algorithmic thinking and optimization
- Data structure design

**Repository:** https://github.com/Safin-Sarker/Json-Serailizer-Using-Recursion-and-Reflection

---

## Project Summary Statistics

**Total Projects:** 6+ major projects
**Technologies Used:** 20+ different technologies
**Lines of Code:** 50,000+ across all projects
**GitHub Stars:** Growing open-source presence

**Project Categories:**

- AI/ML: 2 projects
- Full-Stack Web: 3 projects
- Technical Deep-Dive: 1 project
- Data Science: Multiple notebooks

**Most Used Technologies:**

- Backend: ASP.NET Core, Python, Flask
- Frontend: React, JavaScript, Bootstrap
- Database: MSSQL, Entity Framework
- AI/ML: Stable Diffusion, Python, Machine Learning
- DevOps: Docker, Git, CI/CD
