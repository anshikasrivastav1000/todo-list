import "./App.css";
import { useState, useEffect } from "react";
import api from "./api";

function App() {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState("");

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        try {
            const response = await api.get("/");
            setTasks(response.data);
        } catch (error) {
            console.error("Error fetching tasks:", error);
        }
    };

    const addTask = async () => {
        try {
            const response = await api.post("/", { title: newTask, completed: false });
            setTasks([...tasks, response.data]);
            setNewTask("");
        } catch (error) {
            console.error("Error adding task:", error);
        }
    };

    const deleteTask = async (id) => {
        try {
            await api.delete(`/${id}`);
            setTasks(tasks.filter((task) => task.id !== id));
        } catch (error) {
            console.error("Error deleting task:", error);
        }
    };

    const toggleTask = async (id) => {
        try {
            const response = await api.put(`/${id}/toggle`);
            const updatedTask = response.data;
            setTasks((prevTasks) =>
                prevTasks.map((task) => (task.id === updatedTask.id ? updatedTask : task))
            );
        } catch (error) {
            console.error("Error toggling task:", error);
        }
    };

    return (
        <div className="todo-app">
            <h1 className="title">Todo App</h1>
            <div className="input-container">
                <input
                    type="text"
                    value={newTask}
                    onChange={(e) => setNewTask(e.target.value)}
                    placeholder="Add a new task..."
                    className="task-input"
                />
                <button onClick={addTask} className="add-btn">
                    Add Task
                </button>
            </div>
            <ul className="task-list">
                {tasks.map((task) => (
                    <li key={task.id} className="task-item">
                        <span
                            className={`task-title ${task.completed ? "completed" : ""}`}
                        >
                            {task.title}
                        </span>
                        <div className="task-actions">
                            <button
                                onClick={() => toggleTask(task.id)}
                                className={`toggle-btn ${task.completed ? "incomplete" : "complete"}`}
                            >
                                {task.completed ? "Mark as Incomplete" : "Mark as Complete"}
                            </button>
                            <button onClick={() => deleteTask(task.id)} className="delete-btn">
                                Delete
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default App;
