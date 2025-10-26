# AI Quiz Generator

Generate quizzes automatically from PDFs and notes using AI.

## Setup

### Backend
```bash
cd backend
npm install
# Update .env with your MongoDB URI and AI API key
npm run dev
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

## Environment Variables

Create `backend/.env`:
```
PORT=5001
MONGODB_URI=mongodb://localhost:27017/quiz-generator
GROQ_API_KEY=your_groq_api_key_here
```

## Free AI API (Groq)

Get a free API key from Groq:
1. Visit https://console.groq.com
2. Sign up with email or Google
3. Go to API Keys section
4. Create new key and copy it
5. Paste into backend/.env file
6. Free tier: 30 requests/minute

## Features

- Upload PDF files or paste text
- Choose quiz type (multiple choice, true/false, short answer, mixed)
- Specify number of questions
- AI-powered question generation
- Beautiful UI with Tailwind CSS and Framer Motion
- MongoDB storage for quizzes
