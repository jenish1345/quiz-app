# 🎓 AI Quiz Generator

Generate quizzes automatically from PDFs and notes using AI. Upload your study materials and get instant quizzes with multiple question types!

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Node](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen.svg)
![React](https://img.shields.io/badge/react-18.2.0-blue.svg)

## ✨ Features

- 📄 **PDF Upload** - Extract text from PDF files automatically
- ✍️ **Text Input** - Paste your notes directly
- 🤖 **AI-Powered** - Uses Groq API (Llama 3.3 70B) for intelligent question generation
- 🎯 **4 Quiz Types**:
  - Multiple Choice (4 options)
  - True/False (2 options)
  - Short Answer (text input)
  - Mixed (combination of all types)
- 📊 **Results & Analytics** - Score calculation with detailed review
- 💾 **Quiz Library** - Save and manage your quizzes
- 🎨 **Beautiful UI** - Modern design with Tailwind CSS and Framer Motion
- 📱 **Responsive** - Works on desktop, tablet, and mobile

## 🚀 Demo

### Generate Quiz
Upload a PDF or paste text, select quiz type, and generate questions instantly!

### Take Quiz
Answer questions with a clean interface, no spoilers during the quiz.

### View Results
Get your score with detailed explanations and correct answers.

## 🛠️ Tech Stack

### Frontend
- React 18
- Vite
- React Router
- Tailwind CSS
- Framer Motion
- Axios

### Backend
- Node.js
- Express
- MongoDB + Mongoose
- Groq AI API
- Multer (file upload)
- pdf-parse (PDF extraction)

## 📋 Prerequisites

- Node.js (v18 or higher)
- MongoDB (local or Atlas)
- Groq API key (free tier available)

## 🔧 Installation

### 1. Clone the repository
```bash
git clone https://github.com/YOUR_USERNAME/ai-quiz-generator.git
cd ai-quiz-generator
```

### 2. Install Backend Dependencies
```bash
cd backend
npm install
```

### 3. Install Frontend Dependencies
```bash
cd ../frontend
npm install
```

### 4. Set Up Environment Variables

Create `backend/.env`:
```env
PORT=5001
MONGODB_URI=mongodb://localhost:27017/quiz-generator
GROQ_API_KEY=your_groq_api_key_here
NODE_ENV=development
```

### 5. Get Groq API Key (Free)

1. Visit [https://console.groq.com](https://console.groq.com)
2. Sign up for a free account
3. Go to API Keys section
4. Create a new API key
5. Copy and paste into your `.env` file

**Free Tier**: 30 requests/minute - perfect for development!

## 🚀 Running the Application

### Start Backend Server
```bash
cd backend
npm run dev
```
Backend will run on `http://localhost:5001`

### Start Frontend Server
```bash
cd frontend
npm run dev
```
Frontend will run on `http://localhost:3000`

### Access the Application
Open your browser and navigate to `http://localhost:3000`

## 📖 Usage

### 1. Generate a Quiz
1. Click "Generate Quiz Now" on the landing page
2. Upload a PDF file (max 10MB) OR paste text (min 50 characters)
3. Select quiz type:
   - **Multiple Choice** - 4 options per question
   - **True/False** - Statement-based questions
   - **Short Answer** - Open-ended questions
   - **Mixed** - Variety of question types
4. Choose number of questions (3-20)
5. Click "Generate Quiz"

### 2. Take a Quiz
1. Answer questions one by one
2. Navigate with Previous/Next buttons
3. Track your progress (X of Y answered)
4. Click "Finish Quiz" when done

### 3. View Results
1. See your score and percentage
2. Review all questions with:
   - ✅ Correct answers (green)
   - ❌ Incorrect answers (red)
   - Your answer vs correct answer
   - Explanations for each question
3. Retake quiz or return to library

### 4. Quiz Library
1. View all saved quizzes
2. Filter by quiz type
3. See statistics (total, by type)
4. Delete quizzes
5. Take quizzes again

## 📁 Project Structure

```
ai-quiz-generator/
├── backend/
│   ├── controllers/
│   │   └── quizController.js
│   ├── models/
│   │   └── Quiz.js
│   ├── routes/
│   │   └── quizRoutes.js
│   ├── services/
│   │   ├── aiService.js
│   │   └── pdfService.js
│   ├── server.js
│   ├── package.json
│   └── .env
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   └── QuizCard.jsx
│   │   ├── pages/
│   │   │   ├── LandingPage.jsx
│   │   │   ├── GenerateQuiz.jsx
│   │   │   ├── QuizView.jsx
│   │   │   └── QuizLibrary.jsx
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── package.json
│   └── vite.config.js
├── .gitignore
└── README.md
```

## 🔒 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `PORT` | Backend server port | Yes |
| `MONGODB_URI` | MongoDB connection string | Yes |
| `GROQ_API_KEY` | Groq API key for AI generation | Yes |
| `NODE_ENV` | Environment (development/production) | No |

## 🎯 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/quiz/generate` | Generate new quiz from PDF/text |
| GET | `/api/quiz` | Get all quizzes (with filters) |
| GET | `/api/quiz/:id` | Get single quiz by ID |
| GET | `/api/quiz/stats` | Get quiz statistics |
| DELETE | `/api/quiz/:id` | Delete quiz |
| GET | `/api/quiz/health` | Health check |

## 🧪 Testing

### Test Quiz Generation
```bash
curl -X POST http://localhost:5001/api/quiz/generate \
  -F "text=JavaScript is a programming language created in 1995..." \
  -F "quizType=multiple-choice" \
  -F "numberOfQuestions=5"
```

### Test Quiz Retrieval
```bash
curl http://localhost:5001/api/quiz
```

## 🐛 Troubleshooting

### MongoDB Connection Error
- Ensure MongoDB is running: `brew services start mongodb-community` (macOS)
- Check connection string in `.env`

### Port Already in Use
- Change `PORT` in `backend/.env`
- Update `API_URL` in `frontend/src/services/api.js`

### AI Generation Fails
- Verify Groq API key is correct
- Check API rate limits (30 req/min on free tier)
- Ensure content is at least 50 characters

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Groq](https://groq.com) - Fast AI inference
- [MongoDB](https://www.mongodb.com) - Database
- [Tailwind CSS](https://tailwindcss.com) - Styling
- [Framer Motion](https://www.framer.com/motion/) - Animations

## 📧 Contact

Your Name - [@yourtwitter](https://twitter.com/yourtwitter)

Project Link: [https://github.com/YOUR_USERNAME/ai-quiz-generator](https://github.com/YOUR_USERNAME/ai-quiz-generator)

## 🌟 Show your support

Give a ⭐️ if this project helped you!
