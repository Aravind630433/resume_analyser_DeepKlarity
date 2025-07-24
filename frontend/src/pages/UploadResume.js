import React, { useState } from 'react';
import axios from 'axios';

function UploadResume() {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);

  const handleUpload = async () => {
    if (!file) return alert("Please select a resume PDF first.");
    const formData = new FormData();
    formData.append('resume', file);
    try {
      const res = await axios.post('http://localhost:5000/api/analyze', formData);
      setResult(res.data);
    } catch (err) {
      alert("Upload failed. Check backend connection.");
      console.error(err);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Upload Resume</h2>
      <input type="file" accept="application/pdf" onChange={e => setFile(e.target.files[0])} />
      <button onClick={handleUpload} style={{ marginLeft: '10px' }}>Analyze</button>

      {result && (
        <div style={{ border: '1px solid #ccc', padding: 16, marginTop: 20, backgroundColor: '#f8f8f8' }}>
          <h3>Resume Analysis</h3>
          <p><strong>Name:</strong> {result.name}</p>
          <p><strong>Email:</strong> {result.email}</p>
          <p><strong>Phone:</strong> {result.phone}</p>
          <p><strong>Rating:</strong> {result.content.rating}/10</p>
          <p><strong>Feedback:</strong> {result.content.feedback}</p>
          <p><strong>Skills:</strong> {result.content.skills.join(', ')}</p>
          <p><strong>Submitted:</strong> {new Date(result.created_at).toLocaleString()}</p>
        </div>
      )}
    </div>
  );
}

export default UploadResume;
