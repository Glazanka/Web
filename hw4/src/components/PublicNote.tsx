
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Note } from "../types/Note";
import api from "../api";

export default function PublicNote() {
  const { publicId } = useParams<{ publicId: string }>();
  const [note, setNote] = useState<Note | null>(null);

  useEffect(() => {
    api.get<Note>(`/public/${publicId}`)
       .then(r => setNote(r.data))
       .catch(console.error);
  }, [publicId]);

  if (!note) return <p>Loading public note…</p>;

  return (
    <div>
      <h1>{note.title}</h1>
      <p>{note.content}</p>
      <h3>To-do:</h3>
      <ul>
        {note.todoList.map(t => (
          <li key={t.id}>{t.done ? "✓ " : ""}{t.text}</li>
        ))}
      </ul>
    </div>
  );
}
