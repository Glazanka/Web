import { Note } from "../types/Note";
import "../styles/_NoteCard.scss";
import { useRef } from "react";
interface NoteCardProps {
  note: Note;
  onEdit: (note: Note) => void;
  onDelete: (id: number) => void;
  onCardClick: (note: Note) => void;
}

const NoteCard = ({ note, onEdit, onDelete, onCardClick }: NoteCardProps) => {

  const handleCardClick = () => {
    onCardClick(note);
  };

  return (
    <div className="card" onClick={handleCardClick}>
      <h3 className="card__title">{note.title}</h3>

      <div className="card__buttons" onClick={(e) => e.stopPropagation()}>
        <button className="card__buttons--edit" onClick={() => onEdit(note)}>Edit</button>
        <button className="card__button--delete" onClick={() => onDelete(note.id)}>Delete</button>
      </div>
    </div>
  );
};



export default NoteCard;
