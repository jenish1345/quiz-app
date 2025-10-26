import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { generateQuiz } from '../services/api';

function GenerateQuiz() {
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [text, setText] = useState('');
  const [quizType, setQuizType] = useState('multiple-choice');
  const [numberOfQuestions, setNumberOfQuestions] = useState(5);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [fileName, setFileName] = useState('');

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    // Validate file type
    if (selectedFile.type !== 'application/pdf') {
      setError('Please upload a PDF file only');
      setFile(null);
      setFileName('');
      return;
    }

    // Validate file size (max 10MB)
    if (selectedFile.size > 10 * 1024 * 1024) {
      setError('File size must be less than 10MB');
      setFile(null);
      setFileName('');
      return;
    }

    setFile(selectedFile);
    setFileName(selectedFile.name);
    setError('');
    setText(''); // Clear text if file is uploaded
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validation
    if (!file && !text.trim()) {
      setError('Please upload a PDF or paste text content');
      return;
    }

    if (text.trim() && text.trim().length < 50) {
      setError('Text content must be at least 50 characters');
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();
      if (file) formData.append('pdf', file);
      formData.append('text', text);
      formData.append('quizType', quizType);
      formData.append('numberOfQuestions', numberOfQuestions);

      const quiz = await generateQuiz(formData);
      navigate(`/quiz/${quiz._id}`);
    } catch (error) {
      setError(error.response?.data?.error || 'Failed to generate quiz. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const clearFile = () => {
    setFile(null);
    setFileName('');
    setError('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 py-12">
      <div className="container mx-auto px-4 max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-2xl p-8"
        >
          <h1 className="text-3xl font-bold text-gray-800 mb-6">Generate Quiz</h1>
          
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4"
            >
              {error}
            </motion.div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Upload PDF (Max 10MB)
              </label>
              <div className="relative">
                <input
                  type="file"
                  accept=".pdf"
                  onChange={handleFileChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100"
                />
                {fileName && (
                  <div className="mt-2 flex items-center justify-between bg-purple-50 px-4 py-2 rounded-lg">
                    <span className="text-sm text-purple-700 truncate">{fileName}</span>
                    <button
                      type="button"
                      onClick={clearFile}
                      className="text-red-500 hover:text-red-700 ml-2"
                    >
                      ✕
                    </button>
                  </div>
                )}
              </div>
              <p className="text-xs text-gray-500 mt-1">Supported format: PDF only</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Or Paste Text (Min 50 characters)
              </label>
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                rows="6"
                disabled={!!file}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
                placeholder="Paste your notes here..."
              />
              <p className="text-xs text-gray-500 mt-1">
                {text.length} characters {file && '(disabled when PDF is uploaded)'}
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Quiz Type
              </label>
              <select
                value={quizType}
                onChange={(e) => setQuizType(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
              >
                <option value="multiple-choice">Multiple Choice</option>
                <option value="true-false">True/False</option>
                <option value="short-answer">Short Answer</option>
                <option value="mixed">Mixed</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Number of Questions: {numberOfQuestions}
              </label>
              <input
                type="range"
                min="3"
                max="20"
                value={numberOfQuestions}
                onChange={(e) => setNumberOfQuestions(e.target.value)}
                className="w-full"
              />
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={loading || (!file && !text)}
              className="w-full bg-purple-600 text-white py-3 rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Generating...' : 'Generate Quiz'}
            </motion.button>
          </form>
        </motion.div>
      </div>
    </div>
  );
}

export default GenerateQuiz;
