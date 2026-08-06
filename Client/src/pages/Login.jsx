import React, { useState } from 'react';
import Navbar from '../components/Navbar';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    alert('Login successful (demo)');
  };

  return (
    <div style={{ minHeight: '100vh', background: '#0f172a', color: 'white', fontFamily: 'Arial' }}>
      <Navbar />

      <div
        style={{
          maxWidth: '420px',
          margin: '60px auto',
          background: '#1e293b',
          padding: '30px',
          borderRadius: '16px'
        }}
      >
        <h1 style={{ color: '#22c55e', marginBottom: '20px' }}>Login</h1>

        <form onSubmit={handleLogin}>
          <input
            type='email'
            placeholder='Email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={inputStyle}
          />

          <input
            type='password'
            placeholder='Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={inputStyle}
          />

          <button
            type='submit'
            style={{
              width: '100%',
              padding: '14px',
              border: 'none',
              borderRadius: '10px',
              background: '#22c55e',
              color: '#0f172a',
              fontWeight: 'bold',
              cursor: 'pointer'
            }}
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

const inputStyle = {
  width: '100%',
  padding: '14px',
  marginBottom: '15px',
  borderRadius: '10px',
  border: 'none',
  background: '#0f172a',
  color: 'white'
};

export default Login;