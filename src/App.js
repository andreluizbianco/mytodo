import React, { useState, useEffect } from "react";
import { Reorder } from "framer-motion";
import TodoHeader from "./TodoHeader";
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

  const addTodo = (text) => {
    if (text.trim() !== "") {
      setTodos([...todos, { id: Date.now(), text: text.trim(), note: "" }]);
    }
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

  return (
    <div className="todo-container">
      <TodoHeader addTodo={addTodo} />
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
            />
          ))}
        </Reorder.Group>
        <div className="todo-note-container">
          {selectedTodo && (
            <TodoItemNote
              note={selectedTodo}
              updateNote={(text) => updateTodoNote(selectedTodo.id, text)}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
