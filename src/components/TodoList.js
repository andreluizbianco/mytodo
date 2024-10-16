import React from "react";
import { Reorder } from "framer-motion";
import TodoItem from "./TodoItem";

const TodoList = ({
  todos,
  addTodo,
  updateTodo,
  selectedTodo,
  setSelectedTodo,
}) => {
  return (
    <div className="todo-items-column">
      <div className="add-button-container">
        <button onClick={addTodo} className="todo-add-button">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="plus-icon"
          >
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
        </button>
      </div>
      <Reorder.Group
        axis="y"
        values={todos}
        onReorder={updateTodo}
        className="todo-list"
      >
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            selectTodo={setSelectedTodo}
            isSelected={selectedTodo && selectedTodo.id === todo.id}
            updateTodo={updateTodo}
            isEditing={
              selectedTodo && selectedTodo.id === todo.id && todo.text === ""
            }
          />
        ))}
      </Reorder.Group>
    </div>
  );
};

export default TodoList;
