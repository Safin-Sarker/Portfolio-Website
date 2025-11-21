'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useHasMounted } from '@/hooks/useHasMounted';

const navItems = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Experience', href: '#experience' },
  { name: 'Skills', href: '#skills' },
  { name: 'Projects', href: '#projects' },
  { name: 'Education', href: '#education' },
  { name: 'Contact', href: '#contact' },
];

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const mounted = useHasMounted();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav
      initial={mounted ? { y: -100 } : { y: 0 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm shadow-lg shadow-purple-500/10'
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 pr-16 md:pr-20">
        <div className="flex items-center justify-between h-20 md:h-24 py-2">
          {/* Logo */}
          <a href="#home" className="flex items-center gap-3 group">
            <div className="relative">
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden border-2 border-purple-500 group-hover:border-blue-400 transition-all duration-300 group-hover:scale-125 shadow-lg group-hover:shadow-purple-500/50">
                <img
                  src="/images/Safin .jpg"
                  alt="MD Safin Sarker"
                  className="w-full h-full object-cover object-top transition-transform duration-300 group-hover:scale-110"
                  style={{ objectPosition: '50% 20%' }}
                />
              </div>
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
            </div>
            <span className="hidden md:block text-lg font-bold bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
              Safin Sarker
            </span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-4 lg:gap-6 xl:gap-8">
            {navItems.map((item, index) => (
              <a
                key={index}
                href={item.href}
                className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors duration-300 relative group text-sm lg:text-base whitespace-nowrap"
              >
                {item.name}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-600 group-hover:w-full transition-all duration-300"></span>
              </a>
            ))}
            <a
              href="mailto:Safinsarker1122@gmail.com"
              className="px-4 lg:px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300 transform hover:scale-105 text-sm lg:text-base whitespace-nowrap"
            >
              Hire Me
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-gray-900 dark:text-white p-2"
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800"
          >
            <div className="py-4 space-y-4">
              {navItems.map((item, index) => (
                <a
                  key={index}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-300"
                >
                  {item.name}
                </a>
              ))}
              <a
                href="mailto:Safinsarker1122@gmail.com"
                className="block mx-4 px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full font-semibold text-center"
              >
                Hire Me
              </a>
            </div>
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
}
