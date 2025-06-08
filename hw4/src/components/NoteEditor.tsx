
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api";
import { Note } from "../types/Note";
import TodoList from "./TodoList";
import ShareModal from "./ShareModal";


export default function NoteEditor() {
  const { id } = useParams<{ id: string }>();
  const isNew = id === "new";
  const nav = useNavigate();

  const [note, setNote] = useState<Note>({
    id: 0, title: "", content: "",
    todoList: [], notificationDate: null,
    sharedWith: [], publicId: null,
  });
  const [showShare, setShowShare] = useState(false);

  useEffect(() => {
    if (!isNew) {
      api.get<Note>(`/api/notes/${id}`)
         .then(r => setNote(r.data))
         .catch(console.error);
    }
  }, [id]);

  const handleSave = () => {
    const method = isNew ? api.post : api.put;
    const url = isNew ? "/api/notes" : `/api/notes/${id}`;
    method(url, note)
      .then(() => nav("/notes"))
      .catch(console.error);
  };

  const makePublic = () => {
    api.post(`/api/notes/${id}/makePublic`)
       .then(r => setNote(n => ({ ...n, publicId: r.data.publicId })))
       .catch(console.error);
  };

  return (
    <div>
      <h1>{isNew ? "Create Note" : "Edit Note"}</h1>
      <input
        placeholder="Title"
        value={note.title}
        onChange={e => setNote(n => ({ ...n, title: e.target.value }))}
      />
      <textarea
        placeholder="Content"
        value={note.content}
        onChange={e => setNote(n => ({ ...n, content: e.target.value }))}
      />
      <label>
        Notification Date:
        <input
          type="datetime-local"
          value={note.notificationDate?.slice(0,16) || ""}
          onChange={e => setNote(n => ({
            ...n,
            notificationDate: e.target.value ? new Date(e.target.value).toISOString() : null
          }))}
        />
      </label>
      <TodoList
        todoList={note.todoList}
        onChange={newList => setNote(n => ({ ...n, todoList: newList }))}
      />
      <div>
        <button onClick={handleSave}>Save</button>
        <button onClick={() => setShowShare(true)}>Share</button>
        {!note.publicId && !isNew && (
          <button onClick={makePublic}>Make Public</button>
        )}
        {note.publicId && <span>Public link: <a href={`/public/${note.publicId}`}>{note.publicId}</a></span>}
        <button onClick={() => nav("/notes")}>Cancel</button>
      </div>
      {showShare && <ShareModal noteId={note.id} onClose={() => setShowShare(false)} />}
    </div>
  );
}
