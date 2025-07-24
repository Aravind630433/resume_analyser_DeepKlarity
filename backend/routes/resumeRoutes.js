const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const { analyzeResume, getAllResumes, getResumeById } = require('../controllers/resumeController');

router.post('/upload', upload.single('resume'), analyzeResume);
router.get('/resumes', getAllResumes);
router.get('/resumes/:id', getResumeById);

module.exports = router;
