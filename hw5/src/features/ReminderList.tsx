import React, { useState, useEffect } from "react";
import api from "../api";

interface Reminder {
  id: string;
  text: string;
  remindAt: string;
  noteId: string;
  noteTitle: string;
  isSent: boolean;
}

export default function ReminderList(): JSX.Element {
  const [reminders, setReminders] = useState<Reminder[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchReminders = () => {
    setLoading(true);
    api
      .get<Reminder[]>("/reminders/upcoming")
      .then(res => {
        setReminders(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Неуспешно зареждане:", err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchReminders();
  }, []);

  const handleDelete = (id: string) => {
    api
      .delete(`/reminders/${id}`)
      .then(() => {
        setReminders(prev => prev.filter(r => r.id !== id));
      })
      .catch(err => {
        console.error("Грешка при изтриване:", err);
        alert("Неуспешно изтриване.");
      });
  };

  if (loading) return <p>Зареждане на напомняния…</p>;

  return (
    <div className="reminder-list">
      {reminders.length === 0 ? (
        <p>Нямате предстоящи напомняния.</p>
      ) : (
        <table className="reminder-table">
          <thead>
            <tr>
              <th>Бележка</th>
              <th>Текст</th>
              <th>Напомняне в</th>
              <th>Действие</th>
            </tr>
          </thead>
          <tbody>
            {reminders.map(r => (
              <tr key={r.id}>
                <td>{r.noteTitle}</td>
                <td>{r.text}</td>
                <td>{new Date(r.remindAt).toLocaleString("bg-BG")}</td>
                <td>
                  <button onClick={() => handleDelete(r.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
