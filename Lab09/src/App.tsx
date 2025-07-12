import { useEffect, useState, type FormEvent } from "react";
import type { Todo } from "../src/types/types";

const API = "https://jsonplaceholder.typicode.com/todos";

export default function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [task, setTask] = useState("");

  /* load data */
  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`${API}?_limit=10`);
        if (!res.ok) throw new Error("Fetch fail");
        const data: Todo[] = await res.json();
        setTodos(data);
      } catch (e) {
        alert("Không lấy được danh sách!");
        console.error(e);
      }
    })();
  }, []);

  /* Submit */
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const title = task.trim();
    if (!title) return;

    try {
      const res = await fetch(API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, completed: false }),
      });

      if (res.ok) {
        alert("submitted");

        // Cập nhật UI
        const newTodo: Todo = await res.json();
        setTodos([{ ...newTodo, id: Date.now() }, ...todos]);
        setTask("");
      } else {
        // Trường hợp lỗi HTTP
        alert(`Gửi thất bại! Status: ${res.status}`);
      }
    } catch (err) {
      alert("Gửi thất bại!");
      console.error(err);
    }
  };

  /*UI */
  return (
    <div className="min-h-screen flex flex-col items-center py-10">
      <h1 className="text-4xl font-bold mb-6">Todo List</h1>

      <form onSubmit={handleSubmit} className="w-full max-w-lg">
        <input
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Nhập công việc..."
          className="w-full border rounded px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="mt-3 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Submit
        </button>
      </form>

      <ul className="list-disc mt-8 w-full max-w-lg pl-6 space-y-1">
        {todos.map((t) => (
          <li key={t.id} className="text-lg">
            {t.title}
          </li>
        ))}
      </ul>
    </div>
  );
}
