import React, { useEffect, useState } from 'react';
import { Avatar } from '@mui/material';
import styles from './dashboard.module.scss';
import { useAuth } from '../../context/AuthContext';
import api from '../../api/axiosConfig';

interface Note {
  title: string;
  content: string;
}

const Dashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const [notes, setNotes] = useState<Note[]>([]);

  useEffect(() => {
    api.get('/notes')
      .then(res => setNotes(res.data))
      .catch(err => console.error('Грешка при зареждане на бележки:', err));
  }, []);

  return (
    <div className={styles.dashboardWrapper}>
      <header className={styles.header}>
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
        <h1>Notes in the Cloud</h1>
        <h2>Добре дошъл, {user?.username}</h2>
      </header>

      <main className={styles.main}>
        <div className={styles.notesContainer}>
          {notes.length === 0 ? (
            <p className={styles.noNotes}>Нямаш бележки.</p>
          ) : (
            notes.map((note, index) => (
              <div key={index} className={styles.noteCard}>
                <h3>{note.title}</h3>
                <p>{note.content}</p>
              </div>
            ))
          )}
        </div>

        <button onClick={logout} className={styles.logoutButton}>Изход</button>
      </main>
    </div>
  );
};

export default Dashboard;
