import React, { useState } from "react";

const colors = ["red", "yellow", "green", "blue"];

const TodoSettings = ({ todo, updateTodo, removeTodo, archiveTodo }) => {
  const [deleteClickCount, setDeleteClickCount] = useState(0);

  const handleDelete = () => {
    if (deleteClickCount === 0) {
      setDeleteClickCount(1);
      setTimeout(() => setDeleteClickCount(0), 300);
    } else {
      removeTodo(todo.id);
    }
  };

  return (
    <div className="settings-content">
      <h3>Todo Settings</h3>
      <div className="color-palette">
        {colors.map((color) => (
          <button
            key={color}
            className={`color-button ${color} ${
              todo.color === color ? "selected" : ""
            }`}
            onClick={() => updateTodo(todo.id, { color })}
          ></button>
        ))}
      </div>
      <button
        onClick={() => archiveTodo(todo.id)}
        className="todo-archive-button"
      >
        {/* SVG for archive */}
        Archive Todo
      </button>
      <button onClick={handleDelete} className="todo-delete-button">
        {/* SVG for delete */}
        {deleteClickCount === 0 ? "Delete Todo" : "Click again to delete"}
      </button>
    </div>
  );
};

export default TodoSettings;
