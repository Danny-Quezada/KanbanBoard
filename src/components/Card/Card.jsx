import React, { useState } from "react";
import CardStyle from "./Card.module.css";
import {CSS} from "@dnd-kit/utilities";
import {useSortable} from "@dnd-kit/sortable";
function Card({ tasks, id }) {
  const [title, setTitle] = useState("Write title");
  const [modeEditor, setMode] = useState("false");
  const {attributes, setNodeRef, listeners, transform, transition, isDragging }=useSortable({
    id: id,
    data: {
      type: "container"
    }
  })
  console.log(isDragging)
  return (
    <div className={CardStyle.Board} 
      {...attributes}
      ref={setNodeRef}
      style={{
        opacity: isDragging===true && "50%",
        transition: transition,
        transform: CSS.Translate.toString(transform)
      }}
      {...listeners}
    >
      <div className={CardStyle.titleContainer}>
      
        {modeEditor ? (
          <input
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
          <h4 className={CardStyle.title}
            onClick={() => {
              setMode(true);
            }}
          >
            {title}
          </h4>
        )}
      </div>
    </div>
  );
}

export default Card;
