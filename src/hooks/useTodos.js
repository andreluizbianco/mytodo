import { useState, useEffect } from "react";

export const useTodos = () => {
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem("todos");
    return savedTodos ? JSON.parse(savedTodos) : [];
  });

  const [archivedTodos, setArchivedTodos] = useState(() => {
    const savedArchivedTodos = localStorage.getItem("archivedTodos");
    return savedArchivedTodos ? JSON.parse(savedArchivedTodos) : [];
  });

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  useEffect(() => {
    localStorage.setItem("archivedTodos", JSON.stringify(archivedTodos));
  }, [archivedTodos]);

  const addTodo = () => {
    const newTodo = { id: Date.now(), text: "", note: "", color: "" };
    setTodos([...todos, newTodo]);
    return newTodo;
  };

  const updateTodo = (id, updates) => {
    setTodos(
      todos.map((todo) => (todo.id === id ? { ...todo, ...updates } : todo))
    );
  };

  const removeTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const archiveTodo = (id) => {
    const todoToArchive = todos.find((todo) => todo.id === id);
    if (todoToArchive) {
      setArchivedTodos((prev) => [...prev, { ...todoToArchive }]);
      setTodos(todos.filter((todo) => todo.id !== id));
    }
  };

  const unarchiveTodo = (id) => {
    const todoToUnarchive = archivedTodos.find((todo) => todo.id === id);
    if (todoToUnarchive) {
      setTodos((prev) => [...prev, { ...todoToUnarchive }]);
      setArchivedTodos(archivedTodos.filter((todo) => todo.id !== id));
    }
  };

  return {
    todos,
    archivedTodos,
    addTodo,
    updateTodo,
    removeTodo,
    archiveTodo,
    unarchiveTodo,
  };
};
