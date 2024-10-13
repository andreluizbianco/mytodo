import React from "react";
import { Reorder, useDragControls } from "framer-motion";

const TodoItem = ({ todo, removeTodo, selectTodo, isSelected }) => {
  const dragControls = useDragControls();

  return (
    <Reorder.Item
      value={todo}
      id={todo.id.toString()}
      dragListener={false}
      dragControls={dragControls}
    >
      <div
        className={`todo-item ${isSelected ? "selected" : ""}`}
        onPointerDown={(e) => dragControls.start(e)}
        onClick={() => selectTodo(todo)}
      >
        <span>{todo.text}</span>
        <button
          onClick={(e) => {
            e.stopPropagation();
            removeTodo(todo.id);
          }}
          className="todo-delete-button"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="trash-icon"
          >
            <polyline points="3 6 5 6 21 6"></polyline>
            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
            <line x1="10" y1="11" x2="10" y2="17"></line>
            <line x1="14" y1="11" x2="14" y2="17"></line>
          </svg>
        </button>
      </div>
    </Reorder.Item>
  );
};

export default TodoItem;
