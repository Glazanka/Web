export interface TodoItem {
  id: number;
  text: string;
  done: boolean;
}

export interface Note {
  id: number;
  title: string;
  content: string;
  todoList: TodoItem[];
  notificationDate: string | null;  // ISO string или null
  sharedWith: string[];             // масив от имейли
  publicId: string | null;          // генерирано от бекенда
}
