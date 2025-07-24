# DeepKlarity Resume Analyzer

An AI-powered full-stack web app to analyze resumes using Google's Gemini API, with fallback parsing logic. Users can upload resumes, view parsed data, and track history.

---

## 🛠️ Tech Stack

- **Frontend**: React, Axios, React Router
- **Backend**: Node.js, Express, Multer, PDF-Parse, Google Gemini API
- **Database**: PostgreSQL
- **AI**: Google Gemini Pro API (v1beta)
- **Other**: dotenv, pg, cors

---

## 📂 Folder Structure

DeepKlarity_Assignment/
├── backend/
│ ├── app.js
│ ├── controllers/resumeController.js
│ ├── db.js
│ └── uploads/
├── frontend/
│ └── src/pages/
│ ├── UploadResume.js
│ └── History.js
├── sample_data/
│ └── cv_aravind.pdf
├── screenshots/
│ ├── upload_tab.png
│ ├── analysis_result.png
│ ├── history_tab.png
│ └── details_modal.png
└── README.md 

---

## 🚀 Features

- Upload resumes (PDF)
- Extracts Name, Email, Phone, Skills
- AI-powered feedback (Google Gemini)
- Resume history + detail view
- Fallback parser if Gemini fails

---

## 🔧 Setup Instructions

### 1. Backend

```bash
cd backend
npm install
node app.js
Create a .env file:

DATABASE_URL=postgres://postgres:Aravind2325@localhost:5432/resume_analyzer
GEMINI_API_KEY=AIzaSyCUGxRjNoEpxI1AB9EIaK3OwwOF7OquzX0 
#frontend
cd frontend
npm install
npm start
### Screenshots

| Feature | Screenshot |
|--------|-------------|
| Resume Upload | ![](screenshots/upload_tab.png) |
| Analysis Result | ![](screenshots/analysis_result.png) |
