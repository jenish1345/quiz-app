import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import GenerateQuiz from './pages/GenerateQuiz';
import QuizView from './pages/QuizView';
import QuizLibrary from './pages/QuizLibrary';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/generate" element={<GenerateQuiz />} />
        <Route path="/quiz/:id" element={<QuizView />} />
        <Route path="/library" element={<QuizLibrary />} />
      </Routes>
    </Router>
  );
}

export default App;
