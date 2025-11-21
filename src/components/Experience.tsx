'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

const experiences = [
  {
    title: 'AI Generated Illustrations Specialist',
    company: 'Laerdal Medical',
    location: 'Stavanger, Norway',
    period: '10/2025 - Ongoing',
    description: [
      'Fine-tuning LoRA and Stable Diffusion models for clinically relevant illustrations',
      'Developing a React and Flask-based interface connected to a Dockerized ComfyUI endpoint in a serverless setup',
      'Optimizing AI workflows and prompt engineering for consistency and quality',
    ],
    current: true,
  },
  {
    title: 'Intern – LoRa Training, Generative Models & Workflow Development',
    company: 'Laerdal Medical',
    location: 'Stavanger, Norway',
    period: '07/2025 – 09/2025',
    description: [
      'Fine-tuned LoRa models on Stable Diffusion',
      'Developed ComfyUI-based workflows',
      'Implemented prompt engineering and automated pipelines to improve image consistency and scalability',
    ],
  },
  {
    title: 'Software Engineer (Intern, Remote)',
    company: 'Devskill',
    location: 'Dhaka, Bangladesh',
    period: '01/2025 - 02/2025',
    description: [
      'Contributed to an ERP system using .NET Core Web API and Clean Architecture',
      'Collaborated in an Agile team with GitHub Projects and code reviews',
      'Applied Git Flow with CI/CD integration',
    ],
  },
  {
    title: "Master's Thesis Student",
    company: 'Laerdal Medical & UiS',
    location: 'Stavanger, Norway',
    period: '01/2025 - 06/2025',
    description: [
      'Research and development of LoRA fine-tuning techniques for Stable Diffusion XL (SDXL)',
      'Training custom LoRA models to generate Laerdal-style life illustrations for design assistance',
      'Optimizing AI workflows using ComfyUI to enhance designer productivity and maintain brand consistency',
    ],
  },
  {
    title: 'Teaching Assistant (Part-Time)',
    company: 'University Of Stavanger',
    location: 'Stavanger, Norway',
    period: '08/2024 - 11/2024',
    description: [
      'Teaching Assistant for Image Processing and Computer Vision course',
    ],
  },
  {
    title: 'Coding Instructor (YoungCoderz)',
    company: 'British International School of Stavanger',
    location: 'Stavanger, Norway',
    period: '12/2023 – 08/2024',
    description: [
      'Taught coding to young students, introducing programming fundamentals and computational thinking',
    ],
  },
];

export default function Experience() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Animate timeline height based on scroll
  const timelineHeight = useTransform(scrollYProgress, [0, 0.8], ["0%", "100%"]);

  return (
    <section id="experience" ref={containerRef} className="py-20 bg-gray-100 dark:bg-gray-800 transition-colors duration-300">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center">
            <span className="bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
              Professional Experience
            </span>
          </h2>

          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Static background timeline line */}
              <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 h-full w-0.5 bg-gray-300 dark:bg-gray-700"></div>

              {/* Animated timeline line that draws on scroll */}
              <motion.div
                className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 w-0.5 bg-gradient-to-b from-blue-500 to-purple-600 origin-top"
                style={{ height: timelineHeight }}
              ></motion.div>

              {experiences.map((exp, index) => {
                const isLeft = index % 2 === 0;

                return (
                <motion.div
                  key={index}
                  initial={{
                    opacity: 0,
                    x: isLeft ? -200 : 200,
                    scale: 0.8,
                    rotate: isLeft ? -5 : 5
                  }}
                  whileInView={{
                    opacity: 1,
                    x: 0,
                    scale: 1,
                    rotate: 0
                  }}
                  viewport={{ once: false, margin: "-50px", amount: 0.3 }}
                  transition={{
                    duration: 0.8,
                    delay: index * 0.15,
                    type: "spring",
                    stiffness: 100,
                    damping: 15
                  }}
                  className={`mb-12 flex flex-col md:flex-row items-start ${
                    isLeft ? 'md:flex-row-reverse' : ''
                  }`}
                >
                  {/* Content */}
                  <div className={`w-full md:w-1/2 ${index % 2 === 0 ? 'md:pl-8' : 'md:pr-8'}`}>
                    <div className="bg-white dark:bg-gray-900 p-6 rounded-lg border border-gray-300 dark:border-gray-700 hover:border-purple-500 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/20 relative">
                      {exp.current && (
                        <div className="absolute -top-3 -right-3">
                          <span className="bg-gradient-to-r from-blue-500 to-purple-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                            Current
                          </span>
                        </div>
                      )}
                      <div className="mb-4">
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{exp.title}</h3>
                        <div className="flex items-center gap-2 text-purple-400 mb-1">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                          </svg>
                          <span className="font-semibold">{exp.company}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 text-sm mb-1">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          <span>{exp.location}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 text-sm">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          <span>{exp.period}</span>
                        </div>
                      </div>
                      <ul className="space-y-2">
                        {exp.description.map((item, i) => (
                          <li key={i} className="text-gray-700 dark:text-gray-300 text-sm flex items-start gap-2">
                            <span className="text-purple-500 mt-1">▹</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Timeline dot with pulse animation */}
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: false, amount: 0.5 }}
                    transition={{
                      duration: 0.5,
                      delay: index * 0.15 + 0.4,
                      type: "spring",
                      stiffness: 200
                    }}
                    className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 z-10"
                  >
                    <motion.div
                      animate={{
                        boxShadow: [
                          "0 0 0 0 rgba(147, 51, 234, 0.7)",
                          "0 0 0 10px rgba(147, 51, 234, 0)",
                          "0 0 0 0 rgba(147, 51, 234, 0)"
                        ]
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: index * 0.15 + 0.8
                      }}
                      className="w-4 h-4 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full border-4 border-gray-100 dark:border-gray-800"
                    ></motion.div>
                  </motion.div>
                </motion.div>
              );
              })}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
