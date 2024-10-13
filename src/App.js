import React, { useState, useEffect } from "react";
import TodoHeader from "./TodoHeader";
import TodoItem from "./TodoItem";
import "./TodoList.css";

function App() {
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem("todos");
    return savedTodos ? JSON.parse(savedTodos) : [];
  });

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = (text) => {
    if (text.trim() !== "") {
      setTodos([...todos, { id: Date.now(), text: text.trim() }]);
    }
  };

  const removeTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <div className="todo-container">
      <TodoHeader addTodo={addTodo} />
      <ul className="todo-list">
        {todos.map((todo) => (
          <TodoItem key={todo.id} todo={todo} removeTodo={removeTodo} />
        ))}
      </ul>
    </div>
  );
}

export default App;
