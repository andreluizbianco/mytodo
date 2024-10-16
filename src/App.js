import React, { useState } from "react";
import TodoList from "./components/TodoList";
import TodoNoteColumn from "./components/TodoNoteColumn";
import { useTodos } from "./hooks/useTodos";
import "./TodoList.css";

function App() {
  const {
    todos,
    setTodos,
    archivedTodos,
    addTodo,
    updateTodo,
    removeTodo,
    archiveTodo,
    unarchiveTodo,
  } = useTodos();
  const [selectedTodo, setSelectedTodo] = useState(null);
  const [activeView, setActiveView] = useState("notes");

  return (
    <div className="todo-container">
      <div className="todo-content">
        <TodoList
          todos={todos}
          setTodos={setTodos}
          addTodo={addTodo}
          updateTodo={updateTodo}
          selectedTodo={selectedTodo}
          setSelectedTodo={setSelectedTodo}
        />
        <TodoNoteColumn
          selectedTodo={selectedTodo}
          activeView={activeView}
          setActiveView={setActiveView}
          updateTodo={updateTodo}
          removeTodo={removeTodo}
          archiveTodo={archiveTodo}
          archivedTodos={archivedTodos}
          unarchiveTodo={unarchiveTodo}
        />
      </div>
    </div>
  );
}

export default App;
