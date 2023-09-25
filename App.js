import React, { useState, useEffect } from 'react';
import './App.css';
import TodoItem from './TodoItem';

function App() {
  const [todos, setTodos] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [showCompleted, setShowCompleted] = useState(false);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users/1/todos')
      .then((response) => response.json())
      .then((data) => setTodos(data))
      .catch((error) => console.error('Error fetching todos:', error));
  }, []);

  const handleAddTask = () => {
    if (newTask.trim() !== '') {
      const newTodo = {
        userId: 1,
        id: todos.length + 1,
        title: newTask,
        completed: false,
      };
      setTodos([...todos, newTodo]);
      setNewTask('');
    }
  };

  const handleToggleComplete = (id) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodos);
  };

  const handleEditTask = (id, editedTitle) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, title: editedTitle } : todo
    );
    setTodos(updatedTodos);
  };

  const handleDeleteTask = (id) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  };

  return (
    <div className="App">
      <h1>Todo App</h1>
      <input
        type="text"
        placeholder="Add a new task"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
      />
      <button onClick={handleAddTask}>Add Task</button>
      <label>
        Show Completed Tasks
        <input
          type="checkbox"
          checked={showCompleted}
          onChange={() => setShowCompleted(!showCompleted)}
        />
      </label>
      <ul>
        {todos
          .filter((todo) => !showCompleted || todo.completed)
          .map((todo) => (
            <TodoItem key={todo.id} todo={todo} onToggleComplete={handleToggleComplete} onDelete={handleDeleteTask} onEdit={handleEditTask}/>
          ))}
      </ul>
    </div>
  );
}

export default App;
