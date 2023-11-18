import React, { useState } from 'react';
import './App.css';
const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await fetch('https://stg.dhunjam.in/account/admin/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: 'DJ@4',
          password: 'Dhunjam@2023',
        }),
      });

      const data = await response.json();

      if (data.status === 200) {
        onLogin(data.data.token);
      } else {
        console.error('Login failed');
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  return (
    <div className='login'>
      <h2>Venue Admin Login</h2>
      <form>
        <label>
          <input type="text" placeholder='Username' value={username} onChange={(e) => setUsername(e.target.value)} />
        </label>
        <br />
        <label>
          <input type="password" placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        <br />
        <button type="button" onClick={handleLogin}>
          Sign in
        </button>
      </form>
    </div>
  );
};

export default Login;
