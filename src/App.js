import './App.css';
// App.js
import React, { useState } from 'react';
import Login from './Login';
import AdminDashboard from './AdminDashboard';

const App = () => {
  const [token, setToken] = useState(null);

  const handleLogin = (userToken) => {
    setToken(userToken);
  };

  return (
    <div>
      {token ? (
        <AdminDashboard token={token} />
      ) : (
        <Login onLogin={handleLogin} />
      )}
    </div>
  );
};

export default App;

