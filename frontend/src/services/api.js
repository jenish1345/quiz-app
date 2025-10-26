import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';

export const generateQuiz = async (formData) => {
  const response = await axios.post(`${API_URL}/quiz/generate`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });
  return response.data;
};

export const getQuizzes = async () => {
  const response = await axios.get(`${API_URL}/quiz`);
  return response.data;
};

export const getQuizById = async (id) => {
  const response = await axios.get(`${API_URL}/quiz/${id}`);
  return response.data;
};

export const deleteQuiz = async (id) => {
  const response = await axios.delete(`${API_URL}/quiz/${id}`);
  return response.data;
};

export const getQuizStats = async () => {
  const response = await axios.get(`${API_URL}/quiz/stats`);
  return response.data;
};
