import { Note } from "../types/Note";
import NoteCard from "./NoteCard";

interface NotesGridProps {
  notes: Note[];
  onEdit: (note: Note) => void;
  onDelete: (id: number) => void;
}

const NotesGrid = ({ notes, onEdit, onDelete }: NotesGridProps) => {
  return (
    <div className="notes-grid">
      {notes.map((note) => (
        <NoteCard key={note.id} note={note} onEdit={onEdit} onDelete={onDelete} />
      ))}
    </div>
  );
};

export default NotesGrid;
