const express = require('express');
const multer = require('multer');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const fs = require('fs');

dotenv.config();
const app = express();


app.use(cors());
app.use(express.json());

// multer upload config
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, 'uploads');
    if (!fs.existsSync(uploadPath)) fs.mkdirSync(uploadPath);
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});
const upload = multer({ storage });

const resumeController = require('./controllers/resumeController');

app.post('/api/analyze', upload.single('resume'), resumeController.analyzeResume);
app.get('/api/resumes', resumeController.getAllResumes);
app.get('/api/resumes/:id', resumeController.getResumeById);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
require("dotenv").config(); // Load env vars
const cors = require('cors');
app.use(cors({
  origin: 'https://resume-analyser-frontend.onrender.com',
}));
