import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Modal from "./components/Modal";
import NotesList from "./components/NotesList";
import NoteEditor from "./components/NoteEditor";
import PublicNote from "./components/PublicNote";
import NotFound from "./components/NotFound";
import { Note } from "./types/Note";

function App(): JSX.Element {
  const [modalNote, setModalNote] = useState<Note | null>(null);

  return (
    <BrowserRouter>
      {modalNote && (
        <Modal
          note={modalNote}
          onClose={() => setModalNote(null)}
        />
      )}
      <Routes>
        <Route path="/" element={<Navigate to="/notes" replace />} />
        <Route path="/notes" element={<NotesList />} />
        <Route path="/notes/:id" element={<NoteEditor />} />
        <Route path="/public/:publicId" element={<PublicNote />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
