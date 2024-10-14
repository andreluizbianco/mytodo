import React, { useState, useEffect } from "react";
import { Reorder } from "framer-motion";
import TodoItem from "./TodoItem";
import TodoItemNote from "./TodoItemNote";
import "./TodoList.css";

function App() {
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem("todos");
    return savedTodos ? JSON.parse(savedTodos) : [];
  });

  const [selectedTodo, setSelectedTodo] = useState(null);
  const [activeView, setActiveView] = useState("notes");
  const [deleteClickCount, setDeleteClickCount] = useState(0);
  const [deleteClickTimeout, setDeleteClickTimeout] = useState(null);

  const colors = ["red", "yellow", "green", "blue"];

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = () => {
    const newTodo = { id: Date.now(), text: "", note: "", color: "" };
    setTodos([...todos, newTodo]);
    setSelectedTodo(newTodo);
  };

  const removeTodo = (id) => {
    if (deleteClickCount === 0) {
      setDeleteClickCount(1);
      const timeout = setTimeout(() => {
        setDeleteClickCount(0);
      }, 300);
      setDeleteClickTimeout(timeout);
    } else {
      clearTimeout(deleteClickTimeout);
      setDeleteClickCount(0);
      setTodos(todos.filter((todo) => todo.id !== id));
      if (selectedTodo && selectedTodo.id === id) {
        setSelectedTodo(null);
      }
    }
  };

  const selectTodo = (todo) => {
    setSelectedTodo(todo);
  };

  const updateTodoNote = (id, noteText) => {
    setTodos(
      todos.map((todo) => (todo.id === id ? { ...todo, note: noteText } : todo))
    );
    if (selectedTodo && selectedTodo.id === id) {
      setSelectedTodo({ ...selectedTodo, note: noteText });
    }
  };

  const updateTodo = (id, newText) => {
    setTodos(
      todos.map((todo) => (todo.id === id ? { ...todo, text: newText } : todo))
    );
    if (selectedTodo && selectedTodo.id === id) {
      setSelectedTodo({ ...selectedTodo, text: newText });
    }
  };

  const updateTodoColor = (id, color) => {
    setTodos(todos.map((todo) => (todo.id === id ? { ...todo, color } : todo)));
    if (selectedTodo && selectedTodo.id === id) {
      setSelectedTodo({ ...selectedTodo, color });
    }
  };

  return (
    <div className="todo-container">
      <div className="todo-content">
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
            onReorder={setTodos}
            className="todo-list"
          >
            {todos.map((todo) => (
              <TodoItem
                key={todo.id}
                todo={todo}
                selectTodo={selectTodo}
                isSelected={selectedTodo && selectedTodo.id === todo.id}
                updateTodo={updateTodo}
                isEditing={
                  selectedTodo &&
                  selectedTodo.id === todo.id &&
                  todo.text === ""
                }
              />
            ))}
          </Reorder.Group>
        </div>
        <div className="todo-note-column">
          <div className="note-header">
            <button
              className={`icon-button ${
                activeView === "notes" ? "active" : ""
              }`}
              onClick={() => setActiveView("notes")}
              title="Notes"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="icon"
              >
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                <line x1="8" y1="10" x2="16" y2="10"></line>
                <line x1="8" y1="14" x2="16" y2="14"></line>
                <line x1="8" y1="18" x2="12" y2="18"></line>
              </svg>
            </button>
            <button
              className={`icon-button ${
                activeView === "settings" ? "active" : ""
              }`}
              onClick={() => setActiveView("settings")}
              title="Settings"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="icon"
              >
                <circle cx="12" cy="12" r="3"></circle>
                <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
              </svg>
            </button>
          </div>
          <div className="note-content">
            {activeView === "notes" && selectedTodo && (
              <TodoItemNote
                note={selectedTodo}
                updateNote={(noteText) =>
                  updateTodoNote(selectedTodo.id, noteText)
                }
              />
            )}
            {activeView === "settings" && selectedTodo && (
              <div className="settings-content">
                <h3>Todo Settings</h3>
                <div className="color-palette">
                  {colors.map((color) => (
                    <button
                      key={color}
                      className={`color-button ${color} ${
                        selectedTodo.color === color ? "selected" : ""
                      }`}
                      onClick={() => updateTodoColor(selectedTodo.id, color)}
                    ></button>
                  ))}
                </div>
                <button
                  onClick={() => removeTodo(selectedTodo.id)}
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
                  {deleteClickCount === 0
                    ? "Delete Todo"
                    : "Click again to delete"}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
