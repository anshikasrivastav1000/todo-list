import { useState, useEffect } from "react";
import api from "./api";
import './TodoList.css'
function TodoList() {
  const [todos, setTodos] = useState([]);


  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await api.get("/api/todos");
        setTodos(response.data);
      } catch (error) {
        alert("Failed to fetch todos.");
      }
    };

    fetchTodos();
  }, []);


  const handleUpdate = async (id, updatedTitle) => {
    try {
      const response = await api.put(`/api/todos${id}`, { title: updatedTitle });
      setTodos(
        todos.map((todo) => (todo.id === id ? response.data : todo))
      );
    } catch (error) {
      alert("Failed to update todo.");
    }
  };

//   // Mark as Done
//   const handleMarkDone = async (id, currentStatus) => {
//     try {
//       const response = await api.put(`/api/todos/${id}`, { done: !currentStatus });
//       setTodos(
//         todos.map((todo) => (todo.id === id ? { ...todo, done: !currentStatus } : todo))
//       );
//     } catch (error) {
//       alert("Failed to update todo status.");
//     }
//   };

  
  const handleDelete = async (id) => {
    try {
      await api.delete(`/api/todos/${id}`);
      setTodos(todos.filter((todo) => todo.id !== id));
    } catch (error) {
      alert("Failed to delete todo.");
    }
  };

  return (
    <div>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <input
              type="text"
              value={todo.title}
              onChange={(e) => handleUpdate(todo.id, e.target.value)}
            />
           {/* <button onClick={() => handleMarkDone(todo.id, todo.done)}>
                    {todo.done ? "Mark as Undone" : "Done"}
            </button> */}
            <button onClick={() => handleDelete(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoList;
