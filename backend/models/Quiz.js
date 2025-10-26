import mongoose from 'mongoose';

const questionSchema = new mongoose.Schema({
  question: { type: String, required: true },
  options: [{ type: String }],
  correctAnswer: { type: String, required: true },
  explanation: { type: String }
});

const quizSchema = new mongoose.Schema({
  title: { type: String, required: true },
  quizType: { 
    type: String, 
    enum: ['multiple-choice', 'true-false', 'short-answer', 'mixed'],
    required: true 
  },
  questions: [questionSchema],
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Quiz', quizSchema);
