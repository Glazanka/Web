import { useState, useEffect } from "react";
import { Note } from "./types/Note";
import NotesGrid from "./components/NotesGrid";
import NoteEditor from "./components/NoteEditor";

import './index.scss';

const LOCAL_STORAGE_KEY = "notes-app-data";

const App = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [editingNote, setEditingNote] = useState<Note | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const savedNotes = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (savedNotes) {
      try {
        const parsedNotes: Note[] = JSON.parse(savedNotes);
        setNotes(parsedNotes);
      } catch (error) {
        console.error("Failed to parse notes from localStorage", error);
      }
    }
  }, []);

  useEffect(() => {
    if (notes.length > 0) {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(notes));
    } else {
      localStorage.removeItem(LOCAL_STORAGE_KEY);
    }
  }, [notes]);

  const handleEdit = (note: Note) => {
    setEditingNote(note);
    setIsEditing(true);
  };

  const handleDelete = (id: number) => {
    setNotes(prev => prev.filter(note => note.id !== id));
  };

  const handleSave = (note: Note) => {
    setNotes(prev => {
      const existing = prev.find(n => n.id === note.id);
      if (existing) {
        return prev.map(n => n.id === note.id ? note : n);
      }
      return [...prev, note];
    });
    setIsEditing(false);
    setEditingNote(null);
  };

  const handleAddNew = () => {
    setEditingNote(null);
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditingNote(null);
  };

  return (
    <div className="app">
      <h1>Notes in the Cloud</h1>

      {isEditing ? (
        <NoteEditor note={editingNote} onSave={handleSave} onCancel={handleCancel} />
      ) : (
        <>
          <NotesGrid notes={notes} onEdit={handleEdit} onDelete={handleDelete} />
          <button className="add-button" onClick={handleAddNew}>Add New Note</button>
        </>
      )}
    </div>
  );
};

export default App;
