import React, { useState } from "react";

import TaskCardStyle from "./TaskCard.module.css";
import Task from "../../Domain/Models/Task";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
function TaskCard({ task }: Props) {
  const {
    attributes,
    setNodeRef,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: task.Id,
    data: {
      type: "task",
      idColumn: task.IdColumn,
      task,
    },
  });
  const [modeEditor, setMode] = useState<boolean>(false);
  return (
    <div
    
      className={TaskCardStyle.taskCard}
      {...attributes}
      {...listeners}
      ref={setNodeRef}
      style={{
        transition: transition,
        transform: CSS.Translate.toString(transform),
        borderWidth: isDragging ? "1px" : "",
        borderStyle: isDragging ? "solid" : "",
        borderColor: isDragging ? "palevioletred": "",
        backgroundColor: isDragging ? "transparent": ""
      }}
    >
      {!isDragging && (
        <>
          {modeEditor === true ? (
            <input
              className={TaskCardStyle.titleInput}
              placeholder="Write description"
              maxLength={10}
              autoFocus={true}
              onKeyUp={(e) => {
                if (e.key === "Enter") {
                  setMode(false);
                }
              }}
              value={task.Description}
              readOnly
              // onChange={(e) => updateColumn(column.Id, e.target.value)}
            />
          ) : (
            <h4
              className={TaskCardStyle.title}
              onClick={() => {
                setMode(true);
              }}
            >
              {task.Id}
            </h4>
          )}
        </>
      )}
    </div>
  );
}
interface Props {
  task: Task;
}

export default TaskCard;
