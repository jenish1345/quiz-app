import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500">
      <div className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h1 className="text-6xl font-bold text-white mb-6">
            AI Quiz Generator
          </h1>
          <p className="text-xl text-white/90 mb-12 max-w-2xl mx-auto">
            Upload your PDFs or notes, and let AI create custom quizzes instantly.
            Perfect for students, teachers, and lifelong learners.
          </p>
          
          <div className="flex gap-4 justify-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/generate')}
              className="bg-white text-purple-600 px-8 py-4 rounded-full text-lg font-semibold shadow-lg hover:shadow-xl transition-shadow"
            >
              Generate Quiz Now
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/library')}
              className="bg-purple-600/20 backdrop-blur-lg text-white border-2 border-white px-8 py-4 rounded-full text-lg font-semibold shadow-lg hover:shadow-xl transition-shadow"
            >
              View Library
            </motion.button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="mt-20 grid md:grid-cols-3 gap-8"
        >
          {[
            { title: 'Upload Content', desc: 'PDF files or paste text directly' },
            { title: 'Choose Type', desc: 'Multiple choice, true/false, or mixed' },
            { title: 'Get Quiz', desc: 'AI generates questions instantly' }
          ].map((feature, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -5 }}
              className="bg-white/10 backdrop-blur-lg rounded-xl p-6 text-white"
            >
              <h3 className="text-2xl font-bold mb-3">{feature.title}</h3>
              <p className="text-white/80">{feature.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

export default LandingPage;
