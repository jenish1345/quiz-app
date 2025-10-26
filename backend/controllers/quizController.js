import Quiz from '../models/Quiz.js';
import { generateQuiz } from '../services/aiService.js';
import { extractTextFromPDF } from '../services/pdfService.js';

export const createQuiz = async (req, res) => {
  try {
    const { text, quizType, numberOfQuestions } = req.body;
    const file = req.file;

    // Validation
    if (!file && !text) {
      return res.status(400).json({ error: 'Please provide either a PDF file or text content' });
    }

    if (file && file.mimetype !== 'application/pdf') {
      return res.status(400).json({ error: 'Only PDF files are supported' });
    }

    if (file && file.size > 10 * 1024 * 1024) {
      return res.status(400).json({ error: 'File size must be less than 10MB' });
    }

    let content = text?.trim() || '';

    // Extract text from PDF if provided
    if (file) {
      console.log(`📄 Processing PDF: ${file.originalname} (${(file.size / 1024).toFixed(2)} KB)`);
      content = await extractTextFromPDF(file.buffer);
      console.log(`✅ Extracted ${content.length} characters from PDF`);
    }

    // Validate content length
    if (!content || content.length < 50) {
      return res.status(400).json({ 
        error: 'Content is too short. Please provide at least 50 characters of text or a valid PDF with content' 
      });
    }

    if (content.length > 50000) {
      content = content.substring(0, 50000);
      console.log('⚠️ Content truncated to 50,000 characters');
    }

    console.log(`🤖 Generating ${quizType} quiz with ${numberOfQuestions} questions...`);
    const quizData = await generateQuiz(content, quizType, numberOfQuestions);
    
    // Validate quiz data
    if (!quizData.questions || quizData.questions.length === 0) {
      return res.status(500).json({ error: 'AI failed to generate valid questions' });
    }

    const quiz = new Quiz({
      title: quizData.title || 'Generated Quiz',
      quizType,
      questions: quizData.questions
    });

    await quiz.save();
    console.log(`✅ Quiz created successfully with ${quiz.questions.length} questions`);

    res.status(201).json(quiz);
  } catch (error) {
    console.error('❌ Error creating quiz:', error.message);
    
    if (error.message.includes('PDF')) {
      return res.status(400).json({ error: 'Failed to extract text from PDF. Please ensure it contains readable text.' });
    }
    
    if (error.message.includes('AI')) {
      return res.status(500).json({ error: 'AI service is unavailable. Please check your API key.' });
    }

    res.status(500).json({ error: error.message || 'Failed to generate quiz' });
  }
};

export const getQuizzes = async (req, res) => {
  try {
    const { type, limit } = req.query;
    
    // Build query filter
    const filter = {};
    if (type) {
      filter.quizType = type;
    }

    // Fetch quizzes with optional filtering and limit
    const query = Quiz.find(filter).sort({ createdAt: -1 });
    
    if (limit) {
      query.limit(parseInt(limit));
    }

    const quizzes = await query;
    
    console.log(`📚 Fetched ${quizzes.length} quizzes${type ? ` (type: ${type})` : ''}`);
    res.json(quizzes);
  } catch (error) {
    console.error('❌ Error fetching quizzes:', error.message);
    res.status(500).json({ error: 'Failed to fetch quizzes from database' });
  }
};

export const getQuizById = async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.id);
    if (!quiz) {
      return res.status(404).json({ error: 'Quiz not found' });
    }
    console.log(`📖 Retrieved quiz: ${quiz.title}`);
    res.json(quiz);
  } catch (error) {
    console.error('❌ Error fetching quiz:', error.message);
    res.status(500).json({ error: 'Failed to fetch quiz from database' });
  }
};

export const deleteQuiz = async (req, res) => {
  try {
    const quiz = await Quiz.findByIdAndDelete(req.params.id);
    if (!quiz) {
      return res.status(404).json({ error: 'Quiz not found' });
    }
    console.log(`🗑️ Deleted quiz: ${quiz.title}`);
    res.json({ message: 'Quiz deleted successfully', quiz });
  } catch (error) {
    console.error('❌ Error deleting quiz:', error.message);
    res.status(500).json({ error: 'Failed to delete quiz from database' });
  }
};

export const getQuizStats = async (req, res) => {
  try {
    const totalQuizzes = await Quiz.countDocuments();
    const quizzesByType = await Quiz.aggregate([
      { $group: { _id: '$quizType', count: { $sum: 1 } } }
    ]);
    
    const stats = {
      total: totalQuizzes,
      byType: quizzesByType.reduce((acc, item) => {
        acc[item._id] = item.count;
        return acc;
      }, {}),
      lastCreated: await Quiz.findOne().sort({ createdAt: -1 }).select('title createdAt')
    };
    
    res.json(stats);
  } catch (error) {
    console.error('❌ Error fetching stats:', error.message);
    res.status(500).json({ error: 'Failed to fetch quiz statistics' });
  }
};
