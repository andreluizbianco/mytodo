import React, { useEffect, useRef } from "react";

const TodoItemNote = ({ note, updateNote }) => {
  const noteRef = useRef(null);

  useEffect(() => {
    if (noteRef.current) {
      noteRef.current.innerText = note.note || "";
    }
  }, [note]);

  const handleBlur = () => {
    const newText = noteRef.current.innerText;
    updateNote(newText);
  };

  return (
    <div
      ref={noteRef}
      className="todo-item-note"
      contentEditable={true}
      onBlur={handleBlur}
      dangerouslySetInnerHTML={{
        __html: note.note || "Click to add a note...",
      }}
    />
  );
};

export default TodoItemNote;
