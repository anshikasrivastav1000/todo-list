
import './App.css';
import { useState } from'react';
import AddTodo from './AddTodo';
import TodoList from './TodoList';

function App() {
  const [todos, setTodos] = useState([]);

  // Add a new To-Do
  const handleAddTodo = (newTodo) => {
    setTodos([...todos, newTodo]);
  };
  return (
    <div className="App">
       <div>
      <h1>To-Do List</h1>
      <AddTodo onAdd={handleAddTodo} />
      <TodoList />
    </div>
    </div>
  );
}

export default App;
