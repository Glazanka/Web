import React, { useState } from 'react';
import { Avatar } from '@mui/material';
import bcrypt from 'bcryptjs';
import '../css/login-register.css';
import '../css/reset.css';

const RegisterForm = ({ onSwitch }) => {
  const [form, setForm] = useState({ username: '', password: '', confirm: '' });
  const [avatar, setAvatar] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAvatar = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatar(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.password !== form.confirm) {
      alert('Паролите не съвпадат!');
      return;
    }

    if (localStorage.getItem(form.username)) {
      alert('Потребителят вече съществува!');
      return;
    }

    const hashedPassword = await bcrypt.hash(form.password, 10);

    const userData = {
      username: form.username,
      password: hashedPassword,
      avatar
    };

    console.log('Хеширана парола:', hashedPassword);
    localStorage.setItem(form.username, JSON.stringify(userData));
    alert('Регистрацията е успешна!');
    onSwitch();
  };

  return (
    <div className="main-signup-login">
      <div className="header-signup-login">
        <h1>Регистрация</h1>
      </div>

      <form onSubmit={handleSubmit} className="login-signup-form">
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '15px' }}>
          <Avatar
            src={avatar || undefined}
            sx={{
              width: 100,
              height: 100,
              border: '2px solid grey',
              marginBottom: '10px'
            }}
          />
          <label htmlFor="upload" style={{ cursor: 'pointer' }}>
            <input
              accept="image/*"
              id="upload"
              type="file"
              hidden
              onChange={handleAvatar}
            />
            <span className="icon-button">Добави икона</span>
          </label>
        </div>

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
        <input
          className="input-signup-login"
          type="password"
          name="confirm"
          placeholder="Повтори паролата"
          value={form.confirm}
          onChange={handleChange}
          required
        />
        <button type="submit" className="submit-button">Регистрация</button>

        <p className="redirect-information">
          Вече имаш акаунт?{' '}
          <span className="redirect-link" onClick={onSwitch}>Влез</span>
        </p>
      </form>
    </div>
  );
};

export default RegisterForm;
