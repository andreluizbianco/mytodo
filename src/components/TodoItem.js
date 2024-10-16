import React, { useState, useRef, useEffect } from "react";
import { Reorder, useDragControls } from "framer-motion";

const TodoItem = ({
  todo,
  selectTodo,
  isSelected,
  updateTodo,
  isEditing: isEditingProp,
}) => {
  const dragControls = useDragControls();
  const [isEditing, setIsEditing] = useState(isEditingProp);
  const [editedText, setEditedText] = useState(todo.text || "New Todo");
  const editableSpanRef = useRef(null);

  useEffect(() => {
    setIsEditing(isEditingProp);
  }, [isEditingProp]);

  useEffect(() => {
    setEditedText(todo.text || "New Todo");
  }, [todo.text]);

  useEffect(() => {
    if (isEditing) {
      editableSpanRef.current.focus();
      if (editedText.length > 0) {
        const range = document.createRange();
        const sel = window.getSelection();
        if (editableSpanRef.current.childNodes.length > 0) {
          range.setStart(
            editableSpanRef.current.childNodes[0],
            editedText.length
          );
          range.collapse(true);
          sel.removeAllRanges();
          sel.addRange(range);
        }
      }
    }
  }, [isEditing, editedText]);

  const handleDoubleClick = () => {
    setIsEditing(true);
  };

  const handleInput = (e) => {
    setEditedText(e.target.innerText);
  };

  const handleBlur = () => {
    if (editedText.trim() !== "") {
      updateTodo(todo.id, { text: editedText.trim() });
    } else {
      setEditedText(todo.text || "New Todo");
    }
    setIsEditing(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleBlur();
    } else if (e.key === "Escape") {
      setEditedText(todo.text || "New Todo");
      setIsEditing(false);
    }
  };

  return (
    <Reorder.Item
      value={todo}
      id={todo.id.toString()}
      dragListener={false}
      dragControls={dragControls}
    >
      <div
        className={`todo-item ${isSelected ? "selected" : ""} ${
          isEditing ? "editing" : ""
        } ${todo.color}`}
        onPointerDown={(e) => !isEditing && dragControls.start(e)}
        onClick={() => !isEditing && selectTodo(todo)}
        onDoubleClick={handleDoubleClick}
      >
        <span
          ref={editableSpanRef}
          contentEditable={isEditing}
          onInput={handleInput}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          suppressContentEditableWarning={true}
          className="todo-text"
        >
          {editedText}
        </span>
      </div>
    </Reorder.Item>
  );
};

export default TodoItem;
