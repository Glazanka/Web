import React, { useState } from 'react';
import { Avatar } from '@mui/material';
import '../css/dashboard.css';
import '../css/login-register.css';
import '../css/reset.css';

const Dashboard = ({ onLogout, username }) => {
  const [user, setUser] = useState(() =>
    JSON.parse(localStorage.getItem(username))
  );

  const notes = [
    { title: 'Пазар', content: 'Хляб, мляко, яйца' },
    { title: 'Домашно', content: 'Завърши React проект' },
    { title: 'План', content: 'Понеделник: React, Вторник: Node.js' }
  ];

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const updatedUser = { ...user, avatar: reader.result };
        localStorage.setItem(username, JSON.stringify(updatedUser));
        setUser(updatedUser); // актуализирай състоянието
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <header className="dashboard-header">
        <Avatar
          src={user?.avatar || undefined}
          alt="User avatar"
          sx={{
            width: 100,
            height: 100,
            margin: '0 auto 10px auto',
            border: '3px solid black'
          }}
        />

       <label htmlFor="change-avatar" style={{ marginBottom: '10px' }}>
  <input
    type="file"
    id="change-avatar"
    accept="image/*"
    hidden
    onChange={handleAvatarChange}
  />
  <span className="icon-button">
    {user?.avatar ? 'Смени икона' : 'Добави икона'}
  </span>
</label>


        <h1>Notes in the cloud</h1>
        <h2>Dashboard</h2>
      </header>

      <main>
        <div className="notes-container">
          {notes.map((n, i) => (
            <div key={i} className="note-card">
              <h3>{n.title}</h3>
              <p>{n.content}</p>
            </div>
          ))}
        </div>
        <button onClick={onLogout} className="submit-button">Изход</button>
      </main>
    </>
  );
};

export default Dashboard;
