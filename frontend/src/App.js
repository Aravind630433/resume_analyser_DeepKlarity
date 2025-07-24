import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import UploadResume from './pages/UploadResume';
import History from './pages/History';

function App() {
  return (
    <Router>
      <nav>
        <Link to="/">Upload</Link> | <Link to="/history">History</Link>
      </nav>
      <Routes>
        <Route path="/" element={<UploadResume />} />
        <Route path="/history" element={<History />} />
      </Routes>
    </Router>
  );
}
export default App;
