import React, { useState } from 'react';
import { Container } from '@mui/material';
import bcrypt from 'bcryptjs';
import '../css/login-register.css';
import '../css/reset.css';

const LoginForm = ({ onLogin, onSwitch }) => {
  const [form, setForm] = useState({ username: '', password: '' });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = localStorage.getItem(form.username);
    if (!data) return alert('Няма такъв потребител.');

    const user = JSON.parse(data);
    const match = await bcrypt.compare(form.password, user.password);
    if (!match) return alert('Грешна парола!');

    onLogin(form.username);
  };

  return (
    <Container className="main-signup-login">
      <div className="header-signup-login">
        <h1>Вход</h1>
      </div>
      <form onSubmit={handleSubmit} className="login-signup-form">
        <input
          className="input-signup-login"
          type="text"
          name="username"
          placeholder="Потребителско име"
          value={form.username}
          onChange={handleChange}
          required
        />
        <input
          className="input-signup-login"
          type="password"
          name="password"
          placeholder="Парола"
          value={form.password}
          onChange={handleChange}
          required
        />
        <button type="submit" className="submit-button">Вход</button>
        <p className="redirect-information">
          Нямаш акаунт?{' '}
          <span className="redirect-link" onClick={onSwitch}>Регистрирай се</span>
        </p>
      </form>
    </Container>
  );
};

export default LoginForm;
