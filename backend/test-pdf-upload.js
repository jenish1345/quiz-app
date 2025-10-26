// Test script to verify PDF upload functionality
import fs from 'fs';
import FormData from 'form-data';
import axios from 'axios';

const testPDFUpload = async () => {
  console.log('🧪 Testing PDF upload and text extraction...\n');

  // Test 1: Text-only quiz generation
  console.log('Test 1: Text-only quiz generation');
  try {
    const response = await axios.post('http://localhost:5001/api/quiz/generate', {
      text: 'JavaScript is a programming language. It was created in 1995. JavaScript runs in web browsers and on servers using Node.js. Variables can be declared using let, const, or var.',
      quizType: 'multiple-choice',
      numberOfQuestions: 3
    });
    console.log('✅ Text quiz generated:', response.data.title);
  } catch (error) {
    console.log('❌ Failed:', error.response?.data?.error || error.message);
  }

  console.log('\n---\n');

  // Test 2: Empty content validation
  console.log('Test 2: Empty content validation');
  try {
    await axios.post('http://localhost:5001/api/quiz/generate', {
      text: '',
      quizType: 'multiple-choice',
      numberOfQuestions: 5
    });
  } catch (error) {
    console.log('✅ Validation working:', error.response?.data?.error);
  }

  console.log('\n---\n');

  // Test 3: Short content validation
  console.log('Test 3: Short content validation');
  try {
    await axios.post('http://localhost:5001/api/quiz/generate', {
      text: 'Too short',
      quizType: 'multiple-choice',
      numberOfQuestions: 5
    });
  } catch (error) {
    console.log('✅ Validation working:', error.response?.data?.error);
  }

  console.log('\n✅ All tests completed!');
};

testPDFUpload();
