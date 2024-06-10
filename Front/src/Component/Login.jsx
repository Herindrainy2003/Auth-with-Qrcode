import React, { useState } from 'react';
import axios from 'axios';

function Login() {
  const [qrCodeFile, setQrCodeFile] = useState(null);
  const [message, setMessage] = useState('');

  const handleFileChange = (e) => {
    setQrCodeFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('qrCode', qrCodeFile);

    try {
      const response = await axios.post('http://localhost:8000/api/login', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setMessage(`Login successful: ${response.data.user.username}`);
    } catch (error) {
      setMessage('Login failed');
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleFileChange} />
        <button type="submit">Login</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default Login;
