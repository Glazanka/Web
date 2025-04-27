import { useEffect } from "react";
import { Note } from "../types/Note";
import "../styles/_Modal.scss";

interface ModalProps {
  note: Note;
  onClose: () => void;
}

const Modal = ({ note, onClose }: ModalProps) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  const handleBackgroundClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if ((e.target as Element).classList.contains("modal__container")) {
      onClose();
    }
  };

  return (
    <div className="modal__container" onClick={handleBackgroundClick}>
      <div className="modal__content">
        <h2 className="modal__content--header">{note.title}</h2>
        <p className="modal__content--desc">{note.content}</p>
      </div>
    </div>
  );
};

export default Modal;
