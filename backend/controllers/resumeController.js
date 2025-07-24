const fs = require('fs');
const pdfParse = require('pdf-parse');
const fetch = require('node-fetch');
const pool = require('../db');

// Gemini API Key
const GEMINI_API_KEY = 'AIzaSyCUGxRjNoEpxI1AB9EIaK3OwwOF7OquzX0';

// Simple fallback parser if Gemini fails
function basicExtract(text) {
  const extract = (label) => {
    const match = text.match(new RegExp(label + '[:\\-\\s]+(.+)', 'i'));
    return match ? match[1].trim() : '';
  };

  return {
    name: extract('Name') || 'Unknown',
    email: extract('Email'),
    phone: extract('Phone'),
    content: {
      summary: '',
      skills: extract('Skills')?.split(',').map(s => s.trim()) || [],
      education: extract('Education'),
      experience: extract('Experience'),
      certifications: extract('Certifications'),
      rating: 5,
      feedback: 'Parsed using fallback logic'
    }
  };
}

// Analyze with Gemini API
async function analyzeWithGemini(text) {
  const prompt = `
Extract the following details in valid JSON ONLY (no markdown, no explanation):

{
  "name": "",
  "email": "",
  "phone": "",
  "content": {
    "summary": "",
    "skills": ["", ""],
    "education": "",
    "experience": "",
    "certifications": "",
    "rating": 0,
    "feedback": ""
  }
}

Resume:
"""${text}"""`;

  try {
    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }]
        })
      }
    );

    const data = await res.json();
    const raw = data?.candidates?.[0]?.content?.parts?.[0]?.text || '';

    console.log('🔍 Gemini Raw Output:', raw);

    if (!raw) return null;

    const match = raw.match(/{[\s\S]*}/);
    return match ? JSON.parse(match[0]) : null;
  } catch (err) {
    console.error(' Gemini parsing failed:', err);
    return null;
  }
}

// API: POST /api/analyze
exports.analyzeResume = async (req, res) => {
  try {
    const fileBuffer = fs.readFileSync(req.file.path);
    const parsed = await pdfParse(fileBuffer);
    const text = parsed.text;

    console.log('📝 Extracted Resume Text:', text.slice(0, 500)); // short preview

    let aiResult = await analyzeWithGemini(text);

    if (!aiResult) {
      console.warn('⚠️ Falling back to basic parser...');
      aiResult = basicExtract(text);
    }

    const result = await pool.query(
      'INSERT INTO resumes (name, email, phone, content) VALUES ($1, $2, $3, $4) RETURNING *',
      [aiResult.name, aiResult.email, aiResult.phone, aiResult.content]
    );

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};

// API: GET /api/resumes
exports.getAllResumes = async (req, res) => {
  const data = await pool.query('SELECT id, name, email, created_at FROM resumes');
  res.json(data.rows);
};

// API: GET /api/resumes/:id
exports.getResumeById = async (req, res) => {
  const data = await pool.query('SELECT * FROM resumes WHERE id = $1', [req.params.id]);
  res.json(data.rows[0]);
};
