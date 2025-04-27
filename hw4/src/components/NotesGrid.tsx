import { Note } from "../types/Note";
import NoteCard from "./NoteCard";
import "../styles/_NotesGrid.scss";
interface NotesGridProps {
  notes: Note[];
  onEdit: (note: Note) => void;
  onDelete: (id: number) => void;
  onCardClick: (note: Note) => void;
}

export const NotesGrid = ({ notes, onEdit, onDelete, onCardClick }: NotesGridProps) => {
  return (
    <div className="notes">
      {notes.map((note) => (
        <NoteCard
          key={note.id}
          note={note}
          onEdit={onEdit}
          onDelete={onDelete}
          onCardClick={onCardClick}
        />
      ))}
    </div>
  );
};
