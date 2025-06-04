import React, { useState, useEffect, FormEvent } from "react";
import api from "../api";

interface Note {
  id: string;
  title: string;
}

export default function ReminderForm(): JSX.Element {
  const [notes, setNotes] = useState<Note[]>([]);
  const [selectedNoteId, setSelectedNoteId] = useState<string>("");
  const [text, setText] = useState<string>("");
  const [remindAt, setRemindAt] = useState<string>("");

  useEffect(() => {
    api
      .get<Note[]>("/notes")
      .then(res => {
        setNotes(res.data);
        if (res.data.length > 0) setSelectedNoteId(res.data[0].id);
      })
      .catch(err => {
        console.error("Неуспешно зареждане на бележки:", err);
      });
  }, []);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!selectedNoteId || !text.trim() || !remindAt) {
      alert("Попълнете всички полета!");
      return;
    }
    api
      .post("/reminders", { noteId: selectedNoteId, text: text.trim(), remindAt })
      .then(() => {
        setText("");
        setRemindAt("");
        alert("Напомнянето беше създадено успешно!");
      })
      .catch(err => {
        console.error("Грешка при създаване на напомняне:", err);
        alert("Неуспешно създаване.");
      });
  };

  return (
    <form className="card form" onSubmit={handleSubmit}>
      <select value={selectedNoteId} onChange={e => setSelectedNoteId(e.target.value)}>
        {notes.map(note => (
          <option key={note.id} value={note.id}>
            {note.title}
          </option>
        ))}
      </select>
      <input
        name="text"
        placeholder="Текст на напомнянето..."
        value={text}
        onChange={e => setText(e.target.value)}
      />
      <input
        name="time"
        type="datetime-local"
        value={remindAt}
        onChange={e => setRemindAt(e.target.value)}
      />
      <button className="btn" type="submit">
        Създай напомняне
      </button>
    </form>
  );
}
