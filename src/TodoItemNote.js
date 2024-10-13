import React, { useState, useEffect, useRef } from "react";

const TodoItemNote = ({ note, updateNote }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [noteText, setNoteText] = useState(note.note);
  const textareaRef = useRef(null);

  useEffect(() => {
    setNoteText(note.note);
  }, [note]);

  useEffect(() => {
    if (isEditing) {
      textareaRef.current.focus();
    }
  }, [isEditing]);

  const handleClick = () => {
    setIsEditing(true);
  };

  const handleBlur = () => {
    setIsEditing(false);
    updateNote(noteText);
  };

  const handleChange = (e) => {
    setNoteText(e.target.value);
  };

  return (
    <div className="todo-item-note" onClick={handleClick}>
      {isEditing ? (
        <textarea
          ref={textareaRef}
          value={noteText}
          onChange={handleChange}
          onBlur={handleBlur}
        />
      ) : (
        <p>{noteText || "Click to add a note..."}</p>
      )}
    </div>
  );
};

export default TodoItemNote;
