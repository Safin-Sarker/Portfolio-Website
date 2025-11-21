'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useChat } from 'ai/react';
import ReactMarkdown from 'react-markdown';

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [showTooltip, setShowTooltip] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    api: '/api/chat',
  });

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    // Hide tooltip after 5 seconds
    const timer = setTimeout(() => {
      setShowTooltip(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  const handleToggleChat = () => {
    setIsOpen(!isOpen);
    setShowTooltip(false);
  };

  return (
    <>
      {/* Tooltip */}
      <AnimatePresence>
        {showTooltip && !isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, x: 20 }}
            animate={{ opacity: 1, y: 0, x: 0 }}
            exit={{ opacity: 0, y: 10, x: 20 }}
            className="fixed bottom-24 right-6 z-[9999] bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-lg shadow-lg text-sm font-medium whitespace-nowrap"
            style={{ position: 'fixed', bottom: '6rem', right: '1.5rem' }}
          >
            💬 Ask me about my experience!
            <div className="absolute -bottom-2 right-6 w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-purple-600"></div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat Button */}
      <motion.button
        onClick={handleToggleChat}
        className="fixed bottom-6 right-6 z-[9999] w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full shadow-lg hover:shadow-xl hover:shadow-purple-500/50 transition-all duration-300 flex items-center justify-center group relative"
        style={{ position: 'fixed', bottom: '1.5rem', right: '1.5rem' }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        aria-label="Toggle chat"
        animate={!isOpen ? {
          boxShadow: [
            '0 10px 25px rgba(168, 85, 247, 0.4)',
            '0 10px 40px rgba(168, 85, 247, 0.6)',
            '0 10px 25px rgba(168, 85, 247, 0.4)',
          ],
        } : {}}
        transition={{
          boxShadow: {
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }
        }}
      >
        {/* Notification Badge */}
        {!isOpen && (
          <motion.div
            className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-gray-900"
            animate={{
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        )}

        {isOpen ? (
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
        )}
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-24 right-6 z-[9999] w-96 max-w-[calc(100vw-3rem)] h-[600px] max-h-[calc(100vh-8rem)] bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-300 dark:border-gray-700 flex flex-col overflow-hidden"
            style={{ position: 'fixed', bottom: '6rem', right: '1.5rem' }}
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-white">Portfolio Assistant</h3>
                <p className="text-xs text-white/80">Ask me about Safin's experience</p>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.length === 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-center text-gray-600 dark:text-gray-400 mt-8"
                >
                  <div className="text-4xl mb-4">👋</div>
                  <p className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Hi! I'm your portfolio assistant.</p>
                  <p className="text-sm mb-4">I can answer questions about Safin's background. Try asking:</p>
                  <div className="mt-4 space-y-2 text-sm">
                    <motion.div
                      whileHover={{ scale: 1.05, backgroundColor: 'rgba(59, 130, 246, 0.2)' }}
                      className="bg-gray-100 dark:bg-gray-800 p-3 rounded-lg cursor-pointer hover:bg-blue-500/10 transition-colors"
                    >
                      💼 "What is his work experience?"
                    </motion.div>
                    <motion.div
                      whileHover={{ scale: 1.05, backgroundColor: 'rgba(59, 130, 246, 0.2)' }}
                      className="bg-gray-100 dark:bg-gray-800 p-3 rounded-lg cursor-pointer hover:bg-blue-500/10 transition-colors"
                    >
                      🛠️ "What technical skills does he have?"
                    </motion.div>
                    <motion.div
                      whileHover={{ scale: 1.05, backgroundColor: 'rgba(59, 130, 246, 0.2)' }}
                      className="bg-gray-100 dark:bg-gray-800 p-3 rounded-lg cursor-pointer hover:bg-blue-500/10 transition-colors"
                    >
                      📁 "Tell me about his projects"
                    </motion.div>
                    <motion.div
                      whileHover={{ scale: 1.05, backgroundColor: 'rgba(59, 130, 246, 0.2)' }}
                      className="bg-gray-100 dark:bg-gray-800 p-3 rounded-lg cursor-pointer hover:bg-blue-500/10 transition-colors"
                    >
                      🎓 "What is his education background?"
                    </motion.div>
                  </div>
                </motion.div>
              )}

              {messages.map((message, index) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className={`max-w-[80%] p-3 rounded-lg ${
                      message.role === 'user'
                        ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white'
                        : 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-200'
                    }`}
                  >
                    <div className="text-sm prose prose-invert prose-sm max-w-none">
                      <ReactMarkdown
                        components={{
                          strong: ({ children }) => (
                            <strong className="font-bold text-[1.05em] text-blue-300">
                              {children}
                            </strong>
                          ),
                          p: ({ children }) => (
                            <p className="mb-2 last:mb-0 whitespace-pre-wrap">
                              {children}
                            </p>
                          ),
                          ul: ({ children }) => (
                            <ul className="list-disc list-outside ml-4 space-y-1 mb-2">
                              {children}
                            </ul>
                          ),
                          ol: ({ children }) => (
                            <ol className="list-decimal list-outside ml-4 space-y-1 mb-2">
                              {children}
                            </ol>
                          ),
                          li: ({ children }) => (
                            <li className="ml-2 pl-1">{children}</li>
                          ),
                          hr: () => (
                            <hr className="my-6 border-t-2 border-gray-300 dark:border-gray-600" />
                          ),
                        }}
                      >
                        {message.content}
                      </ReactMarkdown>
                    </div>
                  </motion.div>
                </motion.div>
              ))}

              {isLoading && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-start"
                >
                  <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-lg">
                    <div className="flex space-x-2">
                      <motion.div
                        className="w-2 h-2 bg-purple-500 rounded-full"
                        animate={{ y: [-3, 3, -3] }}
                        transition={{ duration: 0.6, repeat: Infinity, ease: "easeInOut" }}
                      />
                      <motion.div
                        className="w-2 h-2 bg-purple-500 rounded-full"
                        animate={{ y: [-3, 3, -3] }}
                        transition={{ duration: 0.6, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
                      />
                      <motion.div
                        className="w-2 h-2 bg-purple-500 rounded-full"
                        animate={{ y: [-3, 3, -3] }}
                        transition={{ duration: 0.6, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
                      />
                    </div>
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <form onSubmit={handleSubmit} className="p-4 border-t border-gray-300 dark:border-gray-700">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={handleInputChange}
                  placeholder="Type your question here... 💭"
                  className="flex-1 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder:text-gray-500 dark:placeholder:text-gray-400"
                  disabled={isLoading}
                  autoFocus
                />
                <motion.button
                  type="submit"
                  disabled={isLoading || !input.trim()}
                  className="bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg px-4 py-2 hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95, rotate: 15 }}
                >
                  <motion.svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    animate={isLoading ? { rotate: 360 } : {}}
                    transition={isLoading ? { duration: 1, repeat: Infinity, ease: "linear" } : {}}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </motion.svg>
                </motion.button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
