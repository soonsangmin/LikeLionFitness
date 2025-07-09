import React, { useState } from "react";


const inputCls = "flex-1 px-3 py-2 rounded-l-md border focus:outline-none";
const addBtnCls =
  "px-4 py-2 bg-blue-600 text-white rounded-r-md active:brightness-110";
const itemCls =
  "flex justify-between items-center px-4 py-3 border-b last:border-none";
const textDone = "line-through text-gray-400";

interface Todo {
  id: number;
  text: string;
  done: boolean;
}

let nextId = 1; 

const TodoList: React.FC = () => {
  /* state */
  const [todos, setTodos] = useState<Todo[]>([
    { id: nextId++, text: "learn react", done: true },
    { id: nextId++, text: "Go shopping", done: false },
    { id: nextId++, text: "buy flowers", done: false },
  ]);
  const [input, setInput] = useState("");

  /* add item */
  const addTodo = () => {
    const trimmed = input.trim();
    if (!trimmed) return;
    setTodos((prev) => [...prev, { id: nextId++, text: trimmed, done: false }]);
    setInput("");
  };

  /* remove item*/
  const removeTodo = (id: number) =>
    setTodos((prev) => prev.filter((t) => t.id !== id));

  /* done */
  const toggleDone = (id: number) =>
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t))
    );

  
  return (
    <div className="flex flex-col gap-6 w-full max-w-xl mx-auto">
      <h1 className="text-3xl font-bold text-blue-300">Todo list</h1>

      {/* LIST */}
      <div className="bg-white rounded-md shadow">
        {todos.map((t) => (
          <div key={t.id} className={itemCls}>
            <div
              className={`flex items-center gap-3 cursor-pointer select-none ${
                t.done ? textDone : ""
              }`}
              onClick={() => toggleDone(t.id)}
            >
              {/* ✔ / ❌ */}
              <span
                className={`text-xl ${
                  t.done ? "text-blue-500" : "text-red-500"
                }`}
              >
                ✔
              </span>
              <span>{t.text}</span>
            </div>

            {/* nút xoá */}
            <button
              className="text-gray-400 hover:text-gray-700"
              onClick={() => removeTodo(t.id)}
            >
              ✕
            </button>
          </div>
        ))}
        {todos.length === 0 && (
          <p className="text-center py-6 text-gray-400">No task</p>
        )}
      </div>

      {/* Ô nhập + nút Add */}
      <div className="flex w-full">
        <input
          className={inputCls}
          placeholder="add a new todo..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addTodo()}
        />
        <button className={addBtnCls} onClick={addTodo}>
          Add
        </button>
      </div>
    </div>
  );
};

export default TodoList;
