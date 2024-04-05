import React, { useState } from "react";
import CardStyle from "./Card.module.css";
import { CSS } from "@dnd-kit/utilities";
import { useSortable } from "@dnd-kit/sortable";
import DeleteIcon from "../Icons/DeleteIcon";
import MoveIcon from "../Icons/MoveIcon";
function Card({ tasks, id }) {
  const [title, setTitle] = useState("Write title");
  const [modeEditor, setMode] = useState("false");
  const {
    attributes,
    setNodeRef,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: id,
    data: {
      type: "container",
    },
  });
  console.log(isDragging);
  return (
    <div
      className={CardStyle.Board}
      {...attributes}
      ref={setNodeRef}
      style={{
        opacity: isDragging === true && "50%",
        transition: transition,
        transform: CSS.Translate.toString(transform),
      }}
    >
      <div className={CardStyle.titleContainer}>
        {modeEditor ? (
          <input
           maxLength={10}
            className={CardStyle.titleInput}
            autoFocus={true}
            onKeyUp={(e) => {
              if (e.key === "Enter") {
                setMode(false);
              }
            }}
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
        ) : (
          <h4
            className={CardStyle.title}
            onClick={() => {
              setMode(true);
            }}
          >
            {title}
          </h4>
        )}
        <div className={CardStyle.items}>
          <button className={CardStyle.item}>
            <DeleteIcon />
          </button>
          <button 
          {...listeners}
          style={{
            cursor: "grab"
          }} className={CardStyle.item}>
            <MoveIcon />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Card;
