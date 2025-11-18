'use client';

import { motion } from 'framer-motion';

const contactInfo = [
  {
    title: 'Email',
    value: 'Safinsarker1122@gmail.com',
    href: 'mailto:Safinsarker1122@gmail.com',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    title: 'Phone',
    value: '+47 462 74 885',
    href: 'tel:+4746274885',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
      </svg>
    ),
  },
  {
    title: 'Location',
    value: 'Stavanger, Norway',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
];

const socialLinks = [
  {
    name: 'GitHub',
    href: 'https://github.com/Safin-Sarker',
    icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
      </svg>
    ),
  },
  {
    name: 'LinkedIn',
    href: 'https://www.linkedin.com/in/safin-sarker/',
    icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
    ),
  },
];

export default function Contact() {
  return (
    <section id="contact" className="py-20 bg-gray-100 dark:bg-gray-800 transition-colors duration-300">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-center">
            <span className="bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
              Get in Touch
            </span>
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-center mb-12 max-w-2xl mx-auto">
            I'm always open to new opportunities, collaborations, and interesting projects.
            Feel free to reach out!
          </p>

          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              {/* Contact Information */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="space-y-6"
              >
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Contact Information</h3>
                {contactInfo.map((contact, index) => (
                  <div
                    key={index}
                    className="bg-white dark:bg-gray-900 p-6 rounded-lg border border-gray-300 dark:border-gray-700 hover:border-purple-500 transition-all duration-300"
                  >
                    <div className="flex items-center gap-4">
                      <div className="bg-gradient-to-br from-blue-500 to-purple-600 p-3 rounded-lg text-white flex-shrink-0">
                        {contact.icon}
                      </div>
                      <div className="flex-grow">
                        <h4 className="text-gray-600 dark:text-gray-400 text-sm mb-1">{contact.title}</h4>
                        {contact.href ? (
                          <a
                            href={contact.href}
                            className="text-gray-900 dark:text-white font-semibold hover:text-purple-400 transition-colors duration-300"
                          >
                            {contact.value}
                          </a>
                        ) : (
                          <p className="text-gray-900 dark:text-white font-semibold">{contact.value}</p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </motion.div>

              {/* Social Links & CTA */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Connect With Me</h3>
                <div className="space-y-4 mb-8">
                  {socialLinks.map((social, index) => (
                    <a
                      key={index}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-white dark:bg-gray-900 p-6 rounded-lg border border-gray-300 dark:border-gray-700 hover:border-purple-500 transition-all duration-300 flex items-center gap-4 group"
                    >
                      <div className="bg-gradient-to-br from-blue-500 to-purple-600 p-3 rounded-lg text-white flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                        {social.icon}
                      </div>
                      <div className="flex-grow">
                        <h4 className="text-gray-900 dark:text-white font-semibold group-hover:text-purple-400 transition-colors duration-300">
                          {social.name}
                        </h4>
                      </div>
                      <svg className="w-5 h-5 text-gray-600 dark:text-gray-400 group-hover:text-purple-400 transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  ))}
                </div>

                <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-1 rounded-lg">
                  <div className="bg-white dark:bg-gray-900 p-8 rounded-lg text-center">
                    <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Ready to Work Together?</h4>
                    <p className="text-gray-700 dark:text-gray-300 mb-6">
                      Let's discuss how I can help bring your project to life
                    </p>
                    <a
                      href="mailto:Safinsarker1122@gmail.com"
                      className="inline-block px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300 transform hover:scale-105"
                    >
                      Send Me an Email
                    </a>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Quick Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="bg-white dark:bg-gray-900 p-8 rounded-lg border border-gray-300 dark:border-gray-700 text-center"
            >
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Available For</h3>
              <div className="flex flex-wrap gap-4 justify-center">
                <span className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full text-sm font-semibold">
                  Full-time Opportunities
                </span>
                <span className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full text-sm font-semibold">
                  Freelance Projects
                </span>
                <span className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full text-sm font-semibold">
                  Consulting
                </span>
                <span className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full text-sm font-semibold">
                  Collaboration
                </span>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Footer */}
      <footer className="mt-20 pt-8 border-t border-gray-300 dark:border-gray-700">
        <div className="container mx-auto px-4 text-center text-gray-600 dark:text-gray-400">
          <p className="mb-2">© 2025 MD Safin Sarker. All rights reserved.</p>
          <p className="text-sm">Built with Next.js, TypeScript, and Tailwind CSS</p>
        </div>
      </footer>
    </section>
  );
}
