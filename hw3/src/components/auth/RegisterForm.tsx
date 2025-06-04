import React, { useState } from 'react';
import { Container } from '@mui/material';
import { Link } from 'react-router-dom';
import api from '../../api/axiosConfig';
import { useAuth } from '../../context/AuthContext';
import styles from './login-register.module.scss';

const RegisterForm: React.FC = () => {
  const { login } = useAuth();
  const [form, setForm] = useState({ username: '', password: '', confirmPassword: '' });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors((prev) => ({ ...prev, [e.target.name]: '' }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newErrors: { [key: string]: string } = {};

    if (!form.username) newErrors.username = 'Въведи потребителско име';
    if (!form.password) newErrors.password = 'Паролата е задължителна';
    else if (form.password.length < 6) newErrors.password = 'Минимум 6 символа';

    if (form.password !== form.confirmPassword) {
      newErrors.confirmPassword = 'Паролите не съвпадат';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const response = await api.post('/auth/register', {
        username: form.username,
        password: form.password,
      });

      const { token } = response.data;
      login(token);
    } catch (error: any) {
      if (error.response?.status === 409) {
        setErrors({ username: 'Потребителското име вече съществува' });
      } else {
        alert('Грешка при регистрация.');
      }
    }
  };

  return (
    <Container className={styles.mainSignupLogin}>
      <div className={styles.headerSignupLogin}>
        <h1>Регистрация</h1>
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
          placeholder="Tрябва да съдържа минимум 6 символа"
          value={form.password}
          onChange={handleChange}
          required
        />
        {errors.password && <span className={styles.errorText}>{errors.password}</span>}

        <label>Повтори паролата</label>
        <input
          className={`${styles.inputSignupLogin} ${errors.confirmPassword ? styles.inputError : ''}`}
          type="password"
          name="confirmPassword"
          placeholder="Повтори паролата"
          value={form.confirmPassword}
          onChange={handleChange}
          required
        />
        {errors.confirmPassword && <span className={styles.errorText}>{errors.confirmPassword}</span>}

        <button type="submit" className={styles.submitButton}>Регистрирай се</button>

        <p className={styles.redirectInformation}>
          Вече имаш акаунт?{' '}
          <Link to="/login" className={styles.redirectLink}>Влез</Link>
        </p>
      </form>
    </Container>
  );
};

export default RegisterForm;
