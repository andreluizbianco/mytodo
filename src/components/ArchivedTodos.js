import React from "react";

const ArchivedTodos = ({ archivedTodos, unarchiveTodo }) => {
  return (
    <div className="archive-content">
      <h3>Archived Todos</h3>
      <ul className="archived-todo-list">
        {archivedTodos.map((todo) => (
          <li key={todo.id} className="archived-todo-item">
            <span>{todo.text || "Untitled Todo"}</span>
            <button
              onClick={() => unarchiveTodo(todo.id)}
              className="unarchive-button"
            >
              Unarchive
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ArchivedTodos;
