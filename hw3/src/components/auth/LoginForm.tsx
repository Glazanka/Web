import React, { useState } from 'react';
import { Container } from '@mui/material';
import { Link } from 'react-router-dom';
import api from '../../api/axiosConfig';
import { useAuth } from '../../context/AuthContext';
import styles from './login-register.module.scss';

const LoginForm: React.FC = () => {
  const { login } = useAuth();
  const [form, setForm] = useState({ username: '', password: '' });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors((prev) => ({ ...prev, [e.target.name]: '' }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newErrors: { [key: string]: string } = {};

    if (!form.username) newErrors.username = 'Въведи потребителско име';
    if (!form.password) newErrors.password = 'Въведи парола';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const response = await api.post('/auth/login', {
        username: form.username,
        password: form.password,
      });

      const { token } = response.data;
      login(token);
    } catch (error: any) {
      if (error.response?.status === 401) {
        setErrors({ password: 'Грешна парола или потребителско име!' });
      } else {
        alert('Грешка при вход.');
      }
    }
  };

  return (
    <Container className={styles.mainSignupLogin}>
      <div className={styles.headerSignupLogin}>
        <h1>Вход</h1>
      </div>
      <form onSubmit={handleSubmit} className={styles.loginSignupForm}>
        <label>Потребителско име</label>
        <input
          className={`${styles.inputSignupLogin} ${errors.username ? styles.inputError : ''}`}
          type="text"
          name="username"
          placeholder="Въведи потребителско име"
          value={form.username}
          onChange={handleChange}
          required
        />
        {errors.username && <span className={styles.errorText}>{errors.username}</span>}

        <label>Парола</label>
        <input
          className={`${styles.inputSignupLogin} ${errors.password ? styles.inputError : ''}`}
          type="password"
          name="password"
          placeholder="Въведи парола"
          value={form.password}
          onChange={handleChange}
          required
        />
        {errors.password && <span className={styles.errorText}>{errors.password}</span>}

        <button type="submit" className={styles.submitButton}>Вход</button>

        <p className={styles.redirectInformation}>
          Нямаш акаунт?{' '}
          <Link to="/register" className={styles.redirectLink}>Регистрирай се</Link>
        </p>
      </form>
    </Container>
  );
};

export default LoginForm;
