
import { useState } from "react";
import { TodoItem } from "../types/Note";

interface Props {
  todoList: TodoItem[];
  onChange: (newList: TodoItem[]) => void;
}

export default function TodoList({ todoList, onChange }: Props) {
  const [text, setText] = useState("");

  const add = () => {
    if (!text.trim()) return;
    const next: TodoItem = {
      id: Date.now(),
      text: text.trim(),
      done: false
    };
    onChange([...todoList, next]);
    setText("");
  };

  const toggle = (id: number) =>
    onChange(todoList.map(t => t.id === id ? { ...t, done: !t.done } : t));

  const remove = (id: number) =>
    onChange(todoList.filter(t => t.id !== id));

  return (
    <div>
      <h3>To-Do List</h3>
      <ul>
        {todoList.map(t => (
          <li key={t.id}>
            <input
              type="checkbox"
              checked={t.done}
              onChange={() => toggle(t.id)}
            />
            {t.text}
            <button onClick={() => remove(t.id)}>×</button>
          </li>
        ))}
      </ul>
      <input
        value={text}
        onChange={e => setText(e.target.value)}
        placeholder="New task"
      />
      <button onClick={add}>Add</button>
    </div>
  );
}
