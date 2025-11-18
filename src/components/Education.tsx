'use client';

import { motion } from 'framer-motion';

const education = [
  {
    degree: 'M.Sc. in Computer Science (Data Science)',
    institution: 'University of Stavanger',
    location: 'Stavanger, Norway',
    period: '08/2022 – 06/2025',
    description: 'Specialized in Data Science with focus on Machine Learning, AI, and advanced software development. Thesis: AI-powered image generation system using Stable Diffusion and ComfyUI.',
  },
  {
    degree: 'B.Sc. in Computer Science',
    institution: 'American International University Bangladesh',
    location: 'Dhaka, Bangladesh',
    period: '01/2017 – 04/2021',
    description: 'Foundation in computer science fundamentals, software engineering, and web development.',
  },
];

const certifications = [
  {
    title: 'Microsoft Certified: Azure Fundamentals',
    issuer: 'Microsoft',
    icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M13.5 2L8.5 8.5 5 7.5l-3 7 7-3-1-3.5L13.5 2zM22 12l-7 3 1 3.5L10.5 22l5-6.5L19 16.5l3-4.5z"/>
      </svg>
    ),
  },
];

const languages = [
  { language: 'English', level: 'Fluent', percentage: 100 },
  { language: 'Norwegian (Norsk)', level: 'Intermediate (B1)', percentage: 60 },
  { language: 'Bengali', level: 'Native', percentage: 100 },
];

const interests = [
  { name: 'Traveling', icon: '✈️' },
  { name: 'Bicycling', icon: '🚴' },
  { name: 'Playing Football', icon: '⚽' },
];

export default function Education() {
  return (
    <section id="education" className="py-20 bg-white dark:bg-gray-900 transition-colors duration-300">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center">
            <span className="bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
              Education & More
            </span>
          </h2>

          <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-8">
            {/* Education */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
                <div className="bg-gradient-to-br from-blue-500 to-purple-600 p-2 rounded-lg">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                Education
              </h3>
              <div className="space-y-6">
                {education.map((edu, index) => (
                  <div
                    key={index}
                    className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg border border-gray-300 dark:border-gray-700 hover:border-purple-500 transition-all duration-300"
                  >
                    <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{edu.degree}</h4>
                    <div className="text-purple-400 font-semibold mb-1">{edu.institution}</div>
                    <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400 mb-3">
                      <span className="flex items-center gap-1">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        {edu.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        {edu.period}
                      </span>
                    </div>
                    <p className="text-gray-700 dark:text-gray-300 text-sm">{edu.description}</p>
                  </div>
                ))}
              </div>

              {/* Certifications */}
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 mt-8 flex items-center gap-3">
                <div className="bg-gradient-to-br from-blue-500 to-purple-600 p-2 rounded-lg">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                </div>
                Certifications
              </h3>
              <div className="space-y-4">
                {certifications.map((cert, index) => (
                  <div
                    key={index}
                    className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg border border-gray-300 dark:border-gray-700 hover:border-purple-500 transition-all duration-300 flex items-center gap-4"
                  >
                    <div className="bg-gradient-to-br from-blue-500 to-purple-600 p-3 rounded-lg text-white flex-shrink-0">
                      {cert.icon}
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 dark:text-white">{cert.title}</h4>
                      <p className="text-purple-400 text-sm">{cert.issuer}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Languages & Interests */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              {/* Languages */}
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
                <div className="bg-gradient-to-br from-blue-500 to-purple-600 p-2 rounded-lg">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                  </svg>
                </div>
                Languages
              </h3>
              <div className="space-y-4 mb-8">
                {languages.map((lang, index) => (
                  <div key={index} className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg border border-gray-300 dark:border-gray-700">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-900 dark:text-white font-semibold">{lang.language}</span>
                      <span className="text-gray-600 dark:text-gray-400 text-sm">{lang.level}</span>
                    </div>
                    <div className="w-full bg-gray-300 dark:bg-gray-700 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${lang.percentage}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Interests */}
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
                <div className="bg-gradient-to-br from-blue-500 to-purple-600 p-2 rounded-lg">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                Personal Interests
              </h3>
              <div className="grid grid-cols-1 gap-4">
                {interests.map((interest, index) => (
                  <div
                    key={index}
                    className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg border border-gray-300 dark:border-gray-700 hover:border-purple-500 transition-all duration-300 flex items-center gap-4"
                  >
                    <span className="text-4xl">{interest.icon}</span>
                    <span className="text-gray-900 dark:text-white font-semibold text-lg">{interest.name}</span>
                  </div>
                ))}
              </div>

            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
