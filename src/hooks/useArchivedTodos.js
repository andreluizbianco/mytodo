import { useState, useEffect } from "react";

export const useArchivedTodos = () => {
  const [archivedTodos, setArchivedTodos] = useState(() => {
    const savedArchivedTodos = localStorage.getItem("archivedTodos");
    return savedArchivedTodos ? JSON.parse(savedArchivedTodos) : [];
  });

  useEffect(() => {
    localStorage.setItem("archivedTodos", JSON.stringify(archivedTodos));
  }, [archivedTodos]);

  const archiveTodo = (id) => {
    const todoToArchive = todos.find((todo) => todo.id === id);
    console.log("Archiving todo:", todoToArchive);
    if (todoToArchive) {
      setArchivedTodos((prev) => {
        const newArchivedTodos = [...prev, { ...todoToArchive }];
        console.log("New archived todos:", newArchivedTodos);
        return newArchivedTodos;
      });
      setTodos(todos.filter((todo) => todo.id !== id));
    }
  };

  const unarchiveTodo = (id) => {
    const todoToUnarchive = archivedTodos.find((todo) => todo.id === id);
    if (todoToUnarchive) {
      setArchivedTodos(archivedTodos.filter((todo) => todo.id !== id));
      return todoToUnarchive;
    }
    return null;
  };

  return { archivedTodos, archiveTodo, unarchiveTodo };
};
