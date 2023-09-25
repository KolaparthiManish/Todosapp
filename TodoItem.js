import { useState } from "react";
import React from "react";


const TodoItem = ({ todo, onToggleComplete, onDelete, onEdit }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedTask, setEditedTask] = useState(todo.title);
  
    const handleEdit = () => {
      onEdit(todo.id, editedTask);
      setIsEditing(false);
    };
  
    return (
      <li>
        {isEditing ? (
          <>
            <input
              type="text"
              value={editedTask}
              onChange={(e) => setEditedTask(e.target.value)}
            />
            <button onClick={handleEdit}>Save</button>
          </>
        ) : (
          <>
            <span
              style={{ color: todo.completed ? 'green' : 'none' }}
              onClick={() => onToggleComplete(todo.id)}
            >
              {todo.title}
            </span>
            <button onClick={() => setIsEditing(true)}>Edit</button>
            <button onClick={() => onDelete(todo.id)}>Delete</button>
          </>
        )}
      </li>
    );
  };

export default TodoItem