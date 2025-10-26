import pdf from 'pdf-parse';

export const extractTextFromPDF = async (buffer) => {
  try {
    const data = await pdf(buffer);
    
    if (!data.text || data.text.trim().length === 0) {
      throw new Error('PDF appears to be empty or contains no readable text');
    }

    // Clean up the text
    const cleanText = data.text
      .replace(/\s+/g, ' ')  // Replace multiple spaces with single space
      .replace(/\n{3,}/g, '\n\n')  // Replace multiple newlines
      .trim();

    console.log(`📊 PDF Stats: ${data.numpages} pages, ${cleanText.length} characters`);
    
    return cleanText;
  } catch (error) {
    console.error('❌ PDF extraction error:', error.message);
    throw new Error(`Failed to extract text from PDF: ${error.message}`);
  }
};
