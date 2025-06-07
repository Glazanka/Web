// src/features/ReminderForm.tsx
import React, { useState, useEffect, FormEvent } from "react";
import api from "../api";

interface Note {
  id: string;
  title: string;
}

export default function ReminderForm(): JSX.Element {
  const [notes, setNotes] = useState<Note[]>([]);
  const [selectedNoteId, setSelectedNoteId] = useState<string>("");
  const [remindAt, setRemindAt] = useState<string>("");

  // Get userId from localStorage
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    // Load all notes to populate the <select>
    api
      .get<Note[]>("/api/notes")
      .then((res) => {
        setNotes(res.data);
      })
      .catch((err) => {
        console.error("Error loading notes:", err);
      });
  }, []);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!selectedNoteId || !remindAt) return;
    if (!userId) {
      alert("No userId found in localStorage");
      return;
    }

    // Send POST to backend: /api/reminders?userId=<userId>
    api
      .post(`/api/reminders?userId=${userId}`, {
        noteId: selectedNoteId,
        remindAt: new Date(remindAt).toISOString(),
      })
      .then(() => {
        setSelectedNoteId("");
        setRemindAt("");
        alert("Reminder created successfully.");
      })
      .catch((err) => {
        console.error("Error creating reminder:", err);
        alert("Error creating reminder.");
      });
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <label>
        Select Note:
        <select
          value={selectedNoteId}
          onChange={(e) => setSelectedNoteId(e.target.value)}
          required
        >
          <option value="">-- choose a note --</option>
          {notes.map((note) => (
            <option key={note.id} value={note.id}>
              {note.title}
            </option>
          ))}
        </select>
      </label>

      <label>
        Select Date & Time:
        <input
          name="time"
          type="datetime-local"
          value={remindAt}
          onChange={(e) => setRemindAt(e.target.value)}
          required
        />
      </label>

      <button className="btn" type="submit">
        Create Reminder
      </button>
    </form>
  );
}
