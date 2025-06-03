import React, { useState, useEffect } from 'react';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import Dashboard from './components/Dashboard';
import { Container } from '@mui/material';

function App() {
  const [view, setView] = useState('login');
  const [user, setUser] = useState(null);

  useEffect(() => {
    const logged = localStorage.getItem('loggedInUser');
    if (logged) {
      setUser(logged);
      setView('dashboard');
    }
  }, []);

  const handleLogin = (username) => {
    localStorage.setItem('loggedInUser', username);
    setUser(username);
    setView('dashboard');
  };

  const handleLogout = () => {
    localStorage.removeItem('loggedInUser');
    setUser(null);
    setView('login');
  };

  return (
    <Container>
      {view === 'login' && <LoginForm onLogin={handleLogin} onSwitch={() => setView('register')} />}
      {view === 'register' && <RegisterForm onSwitch={() => setView('login')} />}
      {view === 'dashboard' && <Dashboard onLogout={handleLogout} username={user} />}
    </Container>
  );
}

export default App;
