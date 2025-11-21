"use client";

import { motion } from "framer-motion";
import TiltCard from "./TiltCard";

const projects = [
  {
    title: "Fletchy",
    description:
      "A Modern E-commerce application using ASP.NET Core API, React, and AI. Features include product management, shopping cart, payment integration, and AI-powered recommendations.",
    technologies: ["ASP.NET Core", "React", "AI", "Entity Framework", "Redux"],
    github: "https://github.com/Safin-Sarker/Fletchy",
    featured: true,
  },
  {
    title: "Stable Diffusion ComfyUI",
    description:
      "Master's thesis project focused on developing an AI-powered image generation system using Stable Diffusion and ComfyUI to enhance design workflows for medical illustrations.",
    technologies: [
      "Stable Diffusion",
      "ComfyUI",
      "Python",
      "LoRA",
      "Prompt Engineering",
    ],
    github:
      "https://github.com/Safin-Sarker/Stable-Diffusion-ComfyUI-for-Laerdal-Style-Image-Generation-Master-s-Thesis-",
    featured: true,
  },
  {
    title: "AI-Powered Portfolio Website",
    description:
      "A modern, responsive portfolio website featuring a RAG (Retrieval Augmented Generation) chatbot powered by OpenAI and Pinecone. Showcases projects, skills, and experience with smooth animations and dark mode support.",
    technologies: [
      "Next.js 14",
      "TypeScript",
      "Tailwind CSS",
      "OpenAI API",
      "Pinecone",
      "Framer Motion",
      "RAG",
    ],
    github: "https://github.com/Safin-Sarker/Portfolio-Website",
    featured: true,
  },
  {
    title: "DevPost Blog Website",
    description:
      "A comprehensive blogging platform built with ASP.NET Core MVC, featuring user authentication, post management, comments, and a clean, modern interface.",
    technologies: [
      "ASP.NET Core MVC",
      "Entity Framework",
      "MSSQL",
      "Bootstrap",
      "jQuery",
    ],
    github:
      "https://github.com/Safin-Sarker/DevPost-Blog-website-using-Asp.NetCore-MVC-",
  },
  {
    title: "Easy Inventory Management System",
    description:
      "A full-featured inventory management system with real-time tracking, stock management, supplier management, and reporting capabilities.",
    technologies: [
      "ASP.NET Core MVC",
      "Entity Framework",
      "MSSQL",
      "JavaScript",
    ],
    github: "https://github.com/Safin-Sarker/Easy-Inventory-System",
    featured: true,
  },
  {
    title: "Data Science Projects",
    description:
      "Collection of data science and machine learning projects using Jupyter notebooks, including data analysis, visualization, and predictive modeling.",
    technologies: ["Python", "Jupyter", "Pandas", "NumPy", "Scikit-learn"],
    github: "https://github.com/Safin-Sarker/DataScience_project",
  },
];

export default function Projects() {
  return (
    <section
      id="projects"
      className="py-20 bg-gray-100 dark:bg-gray-800 transition-colors duration-300"
    >
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-center">
            <span className="bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
              Featured Projects
            </span>
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-center mb-12 max-w-2xl mx-auto">
            A showcase of my work spanning full-stack development, AI/ML, and
            software architecture
          </p>

          <div className="max-w-6xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr">
            {projects.map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.3 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`h-full ${project.featured ? "md:col-span-2 lg:col-span-1" : ""}`}
              >
                <TiltCard className="h-full bg-white dark:bg-gray-900 rounded-lg border border-gray-300 dark:border-gray-700 hover:border-purple-500 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/20 overflow-hidden group flex flex-col">
                  <div className="p-6 flex flex-col flex-grow">
                    <div className="flex-shrink-0">
                      {project.featured && (
                        <div className="mb-3">
                          <span className="bg-gradient-to-r from-blue-500 to-purple-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                            Featured
                          </span>
                        </div>
                      )}

                      <div className="flex items-start justify-between mb-4">
                        <div className="bg-gradient-to-br from-blue-500 to-purple-600 p-3 rounded-lg">
                          <svg
                            className="w-6 h-6 text-white"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                            />
                          </svg>
                        </div>
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors duration-300"
                          aria-label="View on GitHub"
                        >
                          <svg
                            className="w-6 h-6"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              fillRule="evenodd"
                              d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </a>
                      </div>

                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-600 group-hover:bg-clip-text transition-all duration-300">
                        {project.title}
                      </h3>

                      <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-3">
                        {project.description}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-2 mt-auto">
                      {project.technologies.map((tech, i) => (
                        <span
                          key={i}
                          className="px-2 py-1 bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded text-xs border border-gray-300 dark:border-gray-700"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="px-6 py-4 bg-gray-100 dark:bg-gray-800/50 border-t border-gray-300 dark:border-gray-700">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm text-purple-400 hover:text-purple-300 transition-colors duration-300"
                    >
                      <span>View Project</span>
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                        />
                      </svg>
                    </a>
                  </div>
                </TiltCard>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="text-center mt-12"
          >
            <a
              href="https://github.com/Safin-Sarker"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-3 bg-white dark:bg-gray-900 border-2 border-purple-500 rounded-full font-semibold hover:bg-purple-500/10 transition-all duration-300 transform hover:scale-105"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path
                  fillRule="evenodd"
                  d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                  clipRule="evenodd"
                />
              </svg>
              <span>View All Projects on GitHub</span>
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
