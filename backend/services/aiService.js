import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const getPromptForQuizType = (quizType, numberOfQuestions, content) => {
  const baseInstructions = `Generate a quiz with ${numberOfQuestions} questions based on the following content. Return ONLY valid JSON.`;
  
  let structure = '';
  
  switch (quizType) {
    case 'multiple-choice':
      structure = `{
  "title": "Quiz Title",
  "questions": [
    {
      "question": "Question text",
      "options": ["Option A", "Option B", "Option C", "Option D"],
      "correctAnswer": "Option A",
      "explanation": "Brief explanation"
    }
  ]
}

IMPORTANT: Each question MUST have exactly 4 options. The correctAnswer must be one of the options.`;
      break;
      
    case 'true-false':
      structure = `{
  "title": "Quiz Title",
  "questions": [
    {
      "question": "Statement to evaluate",
      "options": ["True", "False"],
      "correctAnswer": "True",
      "explanation": "Brief explanation"
    }
  ]
}

IMPORTANT: Each question MUST have exactly 2 options: "True" and "False". The correctAnswer must be either "True" or "False".`;
      break;
      
    case 'short-answer':
      structure = `{
  "title": "Quiz Title",
  "questions": [
    {
      "question": "Question requiring a short answer",
      "options": [],
      "correctAnswer": "Expected answer",
      "explanation": "Brief explanation"
    }
  ]
}

IMPORTANT: For short-answer questions, the options array should be EMPTY []. Only provide the correctAnswer as a brief text answer.`;
      break;
      
    case 'mixed':
      structure = `{
  "title": "Quiz Title",
  "questions": [
    {
      "question": "Multiple choice question",
      "options": ["Option A", "Option B", "Option C", "Option D"],
      "correctAnswer": "Option A",
      "explanation": "Brief explanation"
    },
    {
      "question": "True or false statement",
      "options": ["True", "False"],
      "correctAnswer": "True",
      "explanation": "Brief explanation"
    },
    {
      "question": "Short answer question",
      "options": [],
      "correctAnswer": "Expected answer",
      "explanation": "Brief explanation"
    }
  ]
}

IMPORTANT: Mix different question types:
- Multiple choice: 4 options
- True/False: 2 options ("True", "False")
- Short answer: empty options array []`;
      break;
      
    default:
      structure = `{
  "title": "Quiz Title",
  "questions": [
    {
      "question": "Question text",
      "options": ["Option A", "Option B", "Option C", "Option D"],
      "correctAnswer": "Option A",
      "explanation": "Brief explanation"
    }
  ]
}`;
  }
  
  return `${baseInstructions}

JSON Structure:
${structure}

Content to base questions on:
${content.substring(0, 4000)}`;
};

export const generateQuiz = async (content, quizType, numberOfQuestions) => {
  const prompt = getPromptForQuizType(quizType, numberOfQuestions, content);

  try {
    const response = await axios.post(
      'https://api.groq.com/openai/v1/chat/completions',
      {
        model: 'llama-3.3-70b-versatile',
        messages: [
          { 
            role: 'system', 
            content: `You are a quiz generator. Always respond with valid JSON only. Follow the exact structure provided for ${quizType} questions.` 
          },
          { role: 'user', content: prompt }
        ],
        temperature: 0.7,
        max_tokens: 2000
      },
      {
        headers: {
          'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );

    const aiResponse = response.data.choices[0].message.content;
    const jsonMatch = aiResponse.match(/\{[\s\S]*\}/);
    const quizData = JSON.parse(jsonMatch ? jsonMatch[0] : aiResponse);
    
    // Validate quiz structure based on type
    if (!quizData.questions || quizData.questions.length === 0) {
      throw new Error('No questions generated');
    }
    
    console.log(`✅ Generated ${quizData.questions.length} ${quizType} questions`);
    
    return quizData;
  } catch (error) {
    console.error('Groq API error:', error.response?.data || error.message);
    throw new Error('Failed to generate quiz with AI');
  }
};
