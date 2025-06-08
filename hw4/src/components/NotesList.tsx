// src/components/NotesList.tsx
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api";
import { Note } from "../types/Note";

export default function NotesList() {
  const [notes, setNotes] = useState<Note[]>([]);
  const nav = useNavigate();

  useEffect(() => {
    api.get<Note[]>("/api/notes")
       .then(r => setNotes(r.data))
       .catch(console.error);
  }, []);

  const handleDelete = (id: number) => {
    api.delete(`/api/notes/${id}`)
       .then(() => setNotes(n => n.filter(x => x.id !== id)))
       .catch(console.error);
  };

  return (
    <div>
      <h1>Notes</h1>
      <Link to="/notes/new"><button>Add New Note</button></Link>
      <ul>
        {notes.map(n => (
          <li key={n.id}>
            <Link to={`/notes/${n.id}`}>{n.title}</Link>
            <button onClick={() => nav(`/notes/${n.id}`)}>Edit</button>
            <button onClick={() => handleDelete(n.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
