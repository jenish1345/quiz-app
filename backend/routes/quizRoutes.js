import express from 'express';
import multer from 'multer';

const router = express.Router();

// Configure multer with file size limit and file filter
const upload = multer({ 
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB limit
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'application/pdf') {
      cb(null, true);
    } else {
      cb(new Error('Only PDF files are allowed'));
    }
  }
});

import { createQuiz, getQuizzes, getQuizById, deleteQuiz, getQuizStats } from '../controllers/quizController.js';

router.post('/generate', upload.single('pdf'), createQuiz);
router.get('/stats', getQuizStats);
router.get('/', getQuizzes);
router.get('/:id', getQuizById);
router.delete('/:id', deleteQuiz);

// Health check endpoint
router.get('/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    message: 'Quiz API is running',
    timestamp: new Date().toISOString()
  });
});

export default router;
