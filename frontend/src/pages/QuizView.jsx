import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import { getQuizById } from '../services/api';

function QuizView() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [quiz, setQuiz] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    loadQuiz();
  }, [id]);

  const loadQuiz = async () => {
    try {
      const data = await getQuizById(id);
      setQuiz(data);
    } catch (error) {
      alert('Failed to load quiz');
    }
  };

  const handleAnswerSelect = (answer) => {
    setAnswers({
      ...answers,
      [currentQuestion]: answer
    });
  };

  const calculateScore = () => {
    let correct = 0;
    quiz.questions.forEach((question, index) => {
      if (answers[index] === question.correctAnswer) {
        correct++;
      }
    });
    return correct;
  };

  const handleNext = () => {
    if (currentQuestion < quiz.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
    }
  };

  const handlePrevious = () => {
    setCurrentQuestion(Math.max(0, currentQuestion - 1));
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setAnswers({});
    setShowResults(false);
  };

  if (!quiz) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

  if (showResults) {
    const score = calculateScore();
    const percentage = ((score / quiz.questions.length) * 100).toFixed(1);

    return (
      <div className="min-h-screen bg-gradient-to-br from-green-400 to-blue-500 py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl shadow-2xl p-8"
          >
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-2">Quiz Complete! 🎉</h2>
              <div className="text-6xl font-bold text-purple-600 my-4">
                {score}/{quiz.questions.length}
              </div>
              <p className="text-xl text-gray-600">Score: {percentage}%</p>
            </div>

            <div className="space-y-6">
              {quiz.questions.map((question, index) => {
                const userAnswer = answers[index];
                const isCorrect = userAnswer === question.correctAnswer;

                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`p-6 rounded-lg border-2 ${
                      isCorrect ? 'border-green-500 bg-green-50' : 'border-red-500 bg-red-50'
                    }`}
                  >
                    <div className="flex items-start gap-3 mb-3">
                      <span className={`text-2xl ${isCorrect ? '✅' : '❌'}`}>
                        {isCorrect ? '✅' : '❌'}
                      </span>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-800 mb-2">
                          Question {index + 1}: {question.question}
                        </h3>
                        
                        <div className="space-y-2 text-sm">
                          <p>
                            <span className="font-semibold">Your answer:</span>{' '}
                            <span className={isCorrect ? 'text-green-700' : 'text-red-700'}>
                              {userAnswer || 'Not answered'}
                            </span>
                          </p>
                          
                          {!isCorrect && (
                            <p>
                              <span className="font-semibold">Correct answer:</span>{' '}
                              <span className="text-green-700">{question.correctAnswer}</span>
                            </p>
                          )}
                          
                          {question.explanation && (
                            <p className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded">
                              <span className="font-semibold">💡 Explanation:</span>{' '}
                              {question.explanation}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            <div className="flex gap-4 mt-8">
              <button
                onClick={restartQuiz}
                className="flex-1 bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700"
              >
                Retake Quiz
              </button>
              <button
                onClick={() => navigate('/library')}
                className="flex-1 bg-gray-200 text-gray-800 py-3 rounded-lg font-semibold hover:bg-gray-300"
              >
                Back to Library
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  const question = quiz.questions[currentQuestion];
  const selectedAnswer = answers[currentQuestion] || '';

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-400 to-blue-500 py-12">
      <div className="container mx-auto px-4 max-w-3xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-2xl shadow-2xl p-8"
        >
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-800">{quiz.title}</h2>
            <div className="flex items-center gap-4 mt-2">
              <p className="text-gray-600">Question {currentQuestion + 1} of {quiz.questions.length}</p>
              <span className="px-3 py-1 bg-purple-100 text-purple-700 text-xs font-semibold rounded-full">
                {question.options?.length === 4 ? 'Multiple Choice' : 
                 question.options?.length === 2 ? 'True/False' : 
                 'Short Answer'}
              </span>
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">{question.question}</h3>
            
            {/* Multiple choice or True/False */}
            {question.options && question.options.length > 0 ? (
              <div className="space-y-3">
                {question.options.map((option, idx) => (
                  <motion.button
                    key={idx}
                    whileHover={{ scale: 1.02 }}
                    onClick={() => handleAnswerSelect(option)}
                    className={`w-full text-left p-4 rounded-lg border-2 transition-colors ${
                      selectedAnswer === option
                        ? 'border-purple-500 bg-purple-50'
                        : 'border-gray-200 hover:border-purple-300'
                    }`}
                  >
                    {option}
                  </motion.button>
                ))}
              </div>
            ) : (
              /* Short answer */
              <div>
                <textarea
                  value={selectedAnswer}
                  onChange={(e) => handleAnswerSelect(e.target.value)}
                  rows="4"
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  placeholder="Type your answer here..."
                />
              </div>
            )}
          </div>

          <div className="flex justify-between items-center">
            <button
              onClick={handlePrevious}
              disabled={currentQuestion === 0}
              className="px-6 py-3 bg-gray-200 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed font-semibold"
            >
              ← Previous
            </button>
            
            <div className="text-sm text-gray-600">
              {Object.keys(answers).length} of {quiz.questions.length} answered
            </div>
            
            <button
              onClick={handleNext}
              className="px-6 py-3 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700"
            >
              {currentQuestion < quiz.questions.length - 1 ? 'Next →' : 'Finish Quiz'}
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default QuizView;
