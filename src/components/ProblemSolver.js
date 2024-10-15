import React, { useState } from 'react';
import axios from 'axios';

const ProblemSolver = ({ match }) => {
  const [code, setCode] = useState('');
  const [output, setOutput] = useState('');

  const handleRunCode = () => {
    const data = {
      source_code: code,
      language_id: 54, // 54 for C++, 71 for Python, 62 for Java
      stdin: ''
    };
    
    axios.post('https://judge0-ce.p.rapidapi.com/submissions', data, {
      headers: {
        'x-rapidapi-key': 'your-api-key', // Use your actual API key here
        'x-rapidapi-host': 'judge0-ce.p.rapidapi.com',
      }
    })
    .then(response => {
      const token = response.data.token;
      // Fetch the result using the token
      return axios.get(`https://judge0-ce.p.rapidapi.com/submissions/${token}`, {
        headers: {
          'x-rapidapi-key': 'your-api-key',
          'x-rapidapi-host': 'judge0-ce.p.rapidapi.com',
        }
      });
    })
    .then(resultResponse => {
      setOutput(resultResponse.data);
    })
    .catch(error => console.log(error));
  };

  return (
    <div>
      <h2>Problem: {match.params.id}</h2>
      <textarea
        value={code}
        onChange={(e) => setCode(e.target.value)}
        placeholder="Write your code here..."
      />
      <button onClick={handleRunCode}>Run Code</button>
      <div>
        <h3>Output</h3>
        <pre>{JSON.stringify(output, null, 2)}</pre> {/* Render the output */}
      </div>
    </div>
  );
};

export default ProblemSolver;
