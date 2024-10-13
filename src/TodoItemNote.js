import React from "react";

const TodoItemNote = ({ note }) => {
  return (
    <div className="todo-item-note">
      <p>{note.text}</p>
    </div>
  );
};

export default TodoItemNote;
