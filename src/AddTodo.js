import { useState } from "react";
import api from "./api";
import './AddTodo.css'
function AddTodo({ onAdd }) {
  const [title, setTitle] = useState("");

  const handleAddTodo = async (e) => {
    e.preventDefault();
    if (!title.trim()) {
      alert("Title cannot be empty!");
      return;
    }

    try {
      const response = await api.post("/api/todos", { title });
      onAdd(response.data); // Notify parent about the new todo
      setTitle(""); // Clear input field
    } catch (error) {
      alert("Failed to add todo. Please try again.");
    }
  };

  return (
    <form onSubmit={handleAddTodo}>
      <input
        type="text"
        placeholder="Add a new task"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <button type="submit">Add</button>
    </form>
  );
}

export default AddTodo;
