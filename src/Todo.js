import axiosInstance from './axiosConfig';
import React, { useEffect, useState } from 'react'
import './Todo.css'

function Todo() {
    const [todos,setTodos] = useState([]);
    const [ newTodo,setNewTodos] = useState("");
    const [editingTodos,setEditingTodos] = useState(null);
    const fetchTodos = async () =>{
        const res = await axiosInstance.get('/api/todos');
        setTodos(res.data);
    }
    useEffect(()=>{
        fetchTodos();
    },[])

    const addTodo = async () =>{
        if(newTodo.trim()){
            const res = await axiosInstance.post('/api/todos',{title: newTodo, completed: false })
            setTodos([...todos,res.data]);
            setNewTodos("");
        }
    };
    const updateTodo = async (id, updateTodo) =>{
        const res = await axiosInstance.put(`/api/todos/${id}`, updateTodo);
        setTodos(todos.map(todo =>(todo.id === id ? res.data : todo)));
        setEditingTodos(null);
    };

    const deleteTodo = async (id) => {
        await axiosInstance.delete(`/api/todos/${id}`);
        setTodos(todos.filter(todo => todo.id !== id));
    };


  return (
    <div className="App">
      <h1>TODO App</h1>
      <input
        type="text"
        value={newTodo}
        onChange={(e) => setNewTodos(e.target.value)}
        placeholder="Enter a new task"
      />
      <button onClick={addTodo}>Add Task</button>
     <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            {editingTodos === todo.id ? (
              <input
                type="text"
                defaultValue={todo.title}
                onBlur={(e) => updateTodo(todo.id, { ...todo, title: e.target.value })}
              />
            ) : (
              <>
                <span>{todo.title}</span>
                <button onClick={() => setEditingTodos(todo.id)}>Edit</button>
                <button onClick={() => deleteTodo(todo.id)}>Delete</button>
              </>
            )}
          </li>
        ))}
      </ul> 
     
    </div>
  )
}

export default Todo