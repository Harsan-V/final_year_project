import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { GoogleGenerativeAI } from '@google/generative-ai';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

app.post('/api/legal-assistant', async (req, res) => {
  try {
    const { question } = req.body;

    if (!question || typeof question !== 'string') {
      return res.status(400).json({ error: 'Question is required' });
    }

    const prompt =
    'You are a virtual legal information assistant for Indian users.\n' +
    'OUTPUT FORMAT RULES (very important):\n' +
    '- Answer ONLY as plain text, no Markdown, no **bold**, no headings.\n' +
    '- Give 3 to 4 key steps as numbered lines, like:\n' +
    '  1. First key step\n' +
    '  2. Second key step\n' +
    '  3. Third key step\n' +
    '- Each numbered step must be on its own line and be short (max 2 sentences).\n' +
    '- Focus only on the most important practical steps, not full theory.\n\n' +
    'Legal boundaries:\n' +
    '- Provide only GENERAL legal information and education.\n' +
    '- Do NOT give definitive legal advice or draft documents.\n' +
    '- If the question is very specific or sensitive, say to consult a lawyer.\n\n' +
    'After the numbered steps, on a NEW line, add this disclaimer as normal sentences (NOT numbered):\n' +
    'This is general legal information, not specific legal advice. Please consult a licensed advocate for guidance on your exact situation.\n\n' +
    'User question:\n' +
    question;


    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    res.json({
      answer:
        text ||
        'Sorry, I could not generate an answer right now. Please try again or contact a lawyer directly.'
    });
  } catch (err) {
    console.error('Gemini legal assistant error:', err);
    res.status(500).json({
      error:
        'There was an error contacting the legal assistant service. Please try again or contact a lawyer directly.'
    });
  }
});

app.listen(port, () => {
  console.log(`Legal assistant server (Gemini) running on http://localhost:${port}`);
});
