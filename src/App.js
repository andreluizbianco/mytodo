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

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = () => {
    const newTodo = { id: Date.now(), text: "", note: "" };
    setTodos([...todos, newTodo]);
    setSelectedTodo(newTodo);
  };

  const removeTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
    if (selectedTodo && selectedTodo.id === id) {
      setSelectedTodo(null);
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

  return (
    <div className="todo-container">
      <div className="todo-header">
        <h1 className="todo-title">Todo List</h1>
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
      <div className="todo-content">
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
              removeTodo={removeTodo}
              selectTodo={selectTodo}
              isSelected={selectedTodo && selectedTodo.id === todo.id}
              updateTodo={updateTodo}
              isEditing={
                selectedTodo && selectedTodo.id === todo.id && todo.text === ""
              }
            />
          ))}
        </Reorder.Group>
        <div className="todo-note-container">
          {selectedTodo && (
            <TodoItemNote
              note={selectedTodo}
              updateNote={(noteText) =>
                updateTodoNote(selectedTodo.id, noteText)
              }
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
