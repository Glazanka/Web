import { Note } from "../types/Note";
import "../styles/_NoteCard.scss";
import { useEffect, useRef, useState } from "react";
interface NoteCardProps {
  note: Note;
  onEdit: (note: Note) => void;
  onDelete: (id: number) => void;
  onCardClick: (note: Note) => void;
}

const NoteCard = ({ note, onEdit, onDelete, onCardClick }: NoteCardProps) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleMenuClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setMenuOpen(prev => !prev);
  };

  return (
    <div className="card" onClick={() => onCardClick(note)}>
    <h3 className="card__title">{note.title}</h3>
  
    <div className="card__menu--container" onClick={(e) => e.stopPropagation()}>
      <div className="card__menu--button" onClick={handleMenuClick}>⋯</div>
      {menuOpen && (
        <div className="card__menu--popup" ref={menuRef}>
          <button className="card__buttons--edit" onClick={() => onEdit(note)}>Edit</button>
          <button className="card__buttons--delete" onClick={() => onDelete(note.id)}>Delete</button>
        </div>
      )}
    </div>
  </div>
  );
};



export default NoteCard;
