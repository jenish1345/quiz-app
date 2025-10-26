import React from 'react';
import { motion } from 'framer-motion';

function QuizCard({ quiz, onClick }) {
  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      onClick={onClick}
      className="bg-white rounded-lg shadow-md p-6 cursor-pointer hover:shadow-xl transition-shadow"
    >
      <h3 className="text-xl font-bold text-gray-800 mb-2">{quiz.title}</h3>
      <p className="text-gray-600 mb-4">
        {quiz.questions.length} questions • {quiz.quizType}
      </p>
      <p className="text-sm text-gray-500">
        Created {new Date(quiz.createdAt).toLocaleDateString()}
      </p>
    </motion.div>
  );
}

export default QuizCard;
