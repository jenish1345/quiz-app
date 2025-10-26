import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { getQuizzes, deleteQuiz, getQuizStats } from '../services/api';

function QuizLibrary() {
  const navigate = useNavigate();
  const [quizzes, setQuizzes] = useState([]);
  const [stats, setStats] = useState(null);
  const [filter, setFilter] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, [filter]);

  const loadData = async () => {
    try {
      const [quizzesData, statsData] = await Promise.all([
        getQuizzes(),
        getQuizStats()
      ]);
      
      let filtered = quizzesData;
      if (filter) {
        filtered = quizzesData.filter(q => q.quizType === filter);
      }
      
      setQuizzes(filtered);
      setStats(statsData);
    } catch (error) {
      console.error('Failed to load quizzes:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id, title) => {
    if (!window.confirm(`Delete "${title}"?`)) return;
    
    try {
      await deleteQuiz(id);
      setQuizzes(quizzes.filter(q => q._id !== id));
    } catch (error) {
      alert('Failed to delete quiz');
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-500 to-pink-500">
        <div className="text-white text-2xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-500 to-pink-500 py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-4xl font-bold text-white">Quiz Library</h1>
            <button
              onClick={() => navigate('/generate')}
              className="bg-white text-purple-600 px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-shadow"
            >
              + New Quiz
            </button>
          </div>

          {/* Stats Cards */}
          {stats && (
            <div className="grid md:grid-cols-4 gap-4 mb-8">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-white/10 backdrop-blur-lg rounded-xl p-6 text-white"
              >
                <div className="text-3xl font-bold">{stats.total}</div>
                <div className="text-white/80">Total Quizzes</div>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-white/10 backdrop-blur-lg rounded-xl p-6 text-white"
              >
                <div className="text-3xl font-bold">{stats.byType['multiple-choice'] || 0}</div>
                <div className="text-white/80">Multiple Choice</div>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-white/10 backdrop-blur-lg rounded-xl p-6 text-white"
              >
                <div className="text-3xl font-bold">{stats.byType['true-false'] || 0}</div>
                <div className="text-white/80">True/False</div>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-white/10 backdrop-blur-lg rounded-xl p-6 text-white"
              >
                <div className="text-3xl font-bold">{stats.byType['mixed'] || 0}</div>
                <div className="text-white/80">Mixed</div>
              </motion.div>
            </div>
          )}

          {/* Filter */}
          <div className="mb-6">
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="px-4 py-2 rounded-lg bg-white/20 backdrop-blur-lg text-white border border-white/30"
            >
              <option value="">All Types</option>
              <option value="multiple-choice">Multiple Choice</option>
              <option value="true-false">True/False</option>
              <option value="short-answer">Short Answer</option>
              <option value="mixed">Mixed</option>
            </select>
          </div>

          {/* Quiz Grid */}
          {quizzes.length === 0 ? (
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-12 text-center text-white">
              <p className="text-xl mb-4">No quizzes found</p>
              <button
                onClick={() => navigate('/generate')}
                className="bg-white text-purple-600 px-6 py-3 rounded-lg font-semibold"
              >
                Create Your First Quiz
              </button>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {quizzes.map((quiz) => (
                <motion.div
                  key={quiz._id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  whileHover={{ scale: 1.03 }}
                  className="bg-white rounded-xl shadow-lg p-6 cursor-pointer"
                  onClick={() => navigate(`/quiz/${quiz._id}`)}
                >
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{quiz.title}</h3>
                  <div className="space-y-2 text-sm text-gray-600 mb-4">
                    <p>📝 {quiz.questions.length} questions</p>
                    <p>📋 {quiz.quizType.replace('-', ' ')}</p>
                    <p>🕒 {formatDate(quiz.createdAt)}</p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/quiz/${quiz._id}`);
                      }}
                      className="flex-1 bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700"
                    >
                      Take Quiz
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(quiz._id, quiz.title);
                      }}
                      className="px-4 bg-red-500 text-white rounded-lg hover:bg-red-600"
                    >
                      🗑️
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}

export default QuizLibrary;
