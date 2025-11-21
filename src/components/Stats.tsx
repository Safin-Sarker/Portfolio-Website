'use client';

import { motion } from 'framer-motion';
import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';
import { useState, useEffect } from 'react';

const stats = [
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
      </svg>
    ),
    value: 2,
    suffix: '+',
    label: 'Years Experience',
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
      </svg>
    ),
    value: 10,
    suffix: '+',
    label: 'Projects Completed',
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    ),
    value: 15,
    suffix: '+',
    label: 'Technologies',
  },
];

export default function Stats() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

  // Generate static positions to avoid hydration mismatch
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Predefined positions to avoid hydration mismatch
  const dotPositions = [
    { top: 10, left: 15 },
    { top: 25, left: 85 },
    { top: 45, left: 10 },
    { top: 60, left: 90 },
    { top: 75, left: 20 },
    { top: 15, left: 70 },
    { top: 35, left: 40 },
    { top: 55, left: 65 },
    { top: 80, left: 45 },
    { top: 20, left: 50 },
    { top: 90, left: 75 },
    { top: 5, left: 30 },
    { top: 70, left: 55 },
    { top: 40, left: 95 },
    { top: 85, left: 5 },
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/30 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 relative overflow-hidden transition-colors duration-300">
      {/* Subtle animated background patterns */}
      {mounted && (
        <div className="absolute inset-0 opacity-20 dark:opacity-10">
          <div className="absolute top-0 left-0 w-full h-full">
            {dotPositions.map((pos, i) => (
              <motion.div
                key={i}
                className="absolute w-1.5 h-1.5 bg-blue-400 dark:bg-blue-500 rounded-full"
                style={{
                  top: `${pos.top}%`,
                  left: `${pos.left}%`,
                }}
                animate={{
                  y: [0, -20, 0],
                  opacity: [0.2, 0.5, 0.2],
                }}
                transition={{
                  duration: 4 + (i % 3),
                  repeat: Infinity,
                  delay: i * 0.2,
                }}
              />
            ))}
          </div>
        </div>
      )}

      <div className="container mx-auto px-4 relative z-10" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
              Impact & Achievements
            </span>
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Numbers that reflect dedication, growth, and continuous learning
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: false, amount: 0.5 }}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
                type: "spring",
                stiffness: 200,
              }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="bg-white dark:bg-gray-800 rounded-2xl p-8 text-center border-2 border-gray-200 dark:border-gray-700 hover:border-purple-400 dark:hover:border-purple-500 hover:shadow-lg hover:shadow-purple-500/10 transition-all duration-300"
            >
              <motion.div
                initial={{ rotate: 0 }}
                whileInView={{ rotate: 360 }}
                viewport={{ once: false, amount: 0.5 }}
                transition={{ duration: 1, delay: index * 0.1 }}
                className="inline-block mb-4"
              >
                <div className="bg-gradient-to-br from-blue-500 to-purple-600 p-3 rounded-xl text-white">
                  {stat.icon}
                </div>
              </motion.div>

              <div className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                {inView && (
                  <CountUp
                    end={stat.value}
                    duration={2.5}
                    delay={index * 0.1}
                    suffix={stat.suffix}
                  />
                )}
              </div>

              <p className="text-gray-700 dark:text-gray-300 font-medium">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
