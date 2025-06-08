
import { useState } from "react";
import api from "../api";

interface Props {
  noteId: number;
  onClose: () => void;
}

export default function ShareModal({ noteId, onClose }: Props) {
  const [email, setEmail] = useState("");

  const share = () => {
    api.post(`/api/notes/${noteId}/share`, { targetUserEmail: email })
       .then(() => {
         alert("Shared successfully!");
         onClose();
       })
       .catch(err => {
         console.error(err);
         alert("Error sharing");
       });
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Share Note</h2>
        <input
          type="email"
          placeholder="User email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <button onClick={share}>Send</button>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
}
