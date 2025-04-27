import { useState, useEffect } from "react";
import { Note } from "./types/Note";
import {NotesGrid} from "./components/NotesGrid";
import NoteEditor from "./components/NoteEditor";
import Modal from "./components/Modal";

// import "./index.scss"

const LOCAL_STORAGE_KEY = "notes-app-data";

const App = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [editingNote, setEditingNote] = useState<Note | null>(null);
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('light'); // Управление на темата


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

    // Приложи текущата тема
    document.body.classList.add(theme === 'light' ? 'light-theme' : 'dark-theme');
    return () => {
      document.body.classList.remove('light-theme', 'dark-theme');
    };
  }, [theme]); // Актуализиране на темата при промяна

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

  
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

 
  const handleCardClick = (note: Note) => {
    setSelectedNote(note);
  };

  const handleCloseModal = () => {
    setSelectedNote(null);
  };

  return (
    <div className="app">
      <header className="app__header">
        <h1>Notes in the Cloud</h1>
        <button onClick={toggleTheme} className="theme-toggle__button">
          Toggle Theme
        </button>

      </header>


      {isEditing ? (
        <NoteEditor note={editingNote} onSave={handleSave} onCancel={handleCancel} />
      ) : (
        <>
          <NotesGrid 
            notes={notes} 
            onEdit={handleEdit} 
            onDelete={handleDelete}
            onCardClick={handleCardClick} // ново
          />
          <button className="app__add-button" onClick={handleAddNew}>Add New Note</button>
        </>
      )}

      {selectedNote && (
        <Modal note={selectedNote} onClose={handleCloseModal} />
      )}
    </div>
  );
};

export default App;
