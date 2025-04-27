import { useState, useEffect } from "react";
import { Note } from "../types/Note";
import "../styles/_NoteEditor.scss"

interface NoteEditorProps {
  note: Note | null;
  onSave: (note: Note) => void;
  onCancel: () => void;
}

const NoteEditor = ({ note, onSave, onCancel }: NoteEditorProps) => {
  const [title, setTitle] = useState<string>(note?.title || "");
  const [content, setContent] = useState<string>(note?.content || "");

  // При промяна на note (например при натискане "Edit"), да презареди полетата
  useEffect(() => {
    setTitle(note?.title || "");
    setContent(note?.content || "");
  }, [note]);

  const handleSave = () => {
    if (title.trim() === "" || content.trim() === "") {
      alert("Title and Content cannot be empty!");
      return;
    }

    const newNote: Note = {
      id: note ? note.id : Date.now(),
      title,
      content,
    };
    onSave(newNote);
  };

  return (
    <div className="editor">
      <input
      className="editor__title"
        type="text"
        placeholder="Title..."
        value={title}
        maxLength={30}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
      className="editor__desc"
        placeholder="Content..."
        maxLength={300}
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <div className="editor__buttons">
        <button className="editor__buttons--save" onClick={handleSave}>Save</button>
        <button className="editor__buttons--cancel" onClick={onCancel}>Cancel</button>
      </div>
    </div>
  );
};

export default NoteEditor;
