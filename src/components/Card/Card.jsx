import React, { useState } from "react";
import CardStyle from "./Card.module.css";
function Card({ tasks, id }) {
  const [title, setTitle] = useState("Write title");
  const [modeEditor, setMode] = useState("false");

  return (
    <div className={CardStyle.Board}>
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
