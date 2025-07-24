import React, { useEffect, useState } from 'react';
import axios from 'axios';

function History() {
  const [data, setData] = useState([]);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:5000/api/resumes').then(res => setData(res.data));
  }, []);

  const openDetails = async (id) => {
    const res = await axios.get(`http://localhost:5000/api/resumes/${id}`);
    setSelected(res.data);
  };

  return (
    <div>
      <h2>Resume History</h2>
      <table border="1">
        <thead>
          <tr><th>Name</th><th>Email</th><th>Date</th><th>Details</th></tr>
        </thead>
        <tbody>
          {data.map(row => (
            <tr key={row.id}>
              <td>{row.name}</td>
              <td>{row.email}</td>
              <td>{new Date(row.created_at).toLocaleDateString()}</td>
              <td><button onClick={() => openDetails(row.id)}>View</button></td>
            </tr>
          ))}
        </tbody>
      </table>

      {selected && <pre>{JSON.stringify(selected, null, 2)}</pre>}
    </div>
  );
}
export default History;
