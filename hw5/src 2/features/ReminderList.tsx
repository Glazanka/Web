import React, { useState, useEffect } from "react";
import api from "../api";

interface Reminder {
  id: string;
  noteId: string;
  remindAt: string;
  sent: boolean;
}

interface Note {
  id: string;
  title: string;
}

export default function ReminderList(): JSX.Element {
  const [reminders, setReminders] = useState<Reminder[]>([]);
  const [notesMap, setNotesMap] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState<boolean>(true);

  const userId = localStorage.getItem("userId");

  useEffect(() => {
    api
      .get<Note[]>("/api/notes")
      .then((res) => {
        const map: Record<string, string> = {};
        res.data.forEach((n) => {
          map[n.id] = n.title;
        });
        setNotesMap(map);
      })
      .catch((err) => console.error("Error loading notes:", err));
  }, []);

  const fetchReminders = () => {
    if (!userId) {
      console.error("No userId in localStorage");
      return;
    }
    setLoading(true);
    api
      .get<Reminder[]>(`/api/reminders/upcoming?userId=${userId}`)
      .then((res) => {
        setReminders(res.data);
      })
      .catch((err) => console.error("Error loading reminders:", err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchReminders();
  }, []);

  const handleDelete = (id: string) => {
    if (!userId) return;
    api
      .delete(`/api/reminders/${id}?userId=${userId}`)
      .then(() => {
        setReminders((prev) => prev.filter((r) => r.id !== id));
      })
      .catch((err) => console.error("Error deleting reminder:", err));
  };

  return (
    <div className="list-container">
      <h2>Upcoming Reminders</h2>
      {loading ? (
        <p>Loading...</p>
      ) : reminders.length === 0 ? (
        <p>No upcoming reminders.</p>
      ) : (
        <table className="reminder-table">
          <thead>
            <tr>
              <th>Note</th>
              <th>Date & Time</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {reminders.map((r) => (
              <tr key={r.id} className={r.sent ? "sent" : ""}>
                <td>{notesMap[r.noteId] || "(no title)"}</td>
                <td>
                  {new Date(r.remindAt).toLocaleString("en-GB", {
                    dateStyle: "short",
                    timeStyle: "short",
                  })}
                </td>
                <td>
                  <button className="deleteBtn" onClick={() => handleDelete(r.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
