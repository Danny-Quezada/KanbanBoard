import React, { useState } from "react";

import TaskCardStyle from "./TaskCard.module.css";
import Task from "../../Domain/Models/Task";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { RiDeleteBinLine } from "react-icons/ri";
function TaskCard({ task, updateTask,deleteTask }: Props) {
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
  const [modeEditor, setMode] = useState<boolean>(task.Description==="" ? true: false);
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
        borderColor: isDragging ? "palevioletred" : "",
        backgroundColor: isDragging ? "transparent" : "",
      }}
    >
      {!isDragging && (
        <>
          {modeEditor === true ? (
            <input
              className={TaskCardStyle.titleInput}
              placeholder="Write description"
              maxLength={30}
              autoFocus={true}
              onKeyUp={(e) => {
                if (e.key === "Enter") {
                  setMode(false);
                }
              }}
              value={task.Description}
              onChange={(e) =>
                updateTask(task.IdColumn, task.Id, e.target.value)
              }
            />
          ) : (
            <h4
              className={TaskCardStyle.title}
              onClick={() => {
                setMode(true);
              }}
            >
              {task.Description}
            </h4>
          )}
        </>
      )}
      <button className={TaskCardStyle.delete} onClick={(e)=>deleteTask(task.IdColumn,task.Id)}>
       
        <RiDeleteBinLine/>
      </button>
    </div>
  );
}
interface Props {
  task: Task;
  updateTask: (idColumn: string, id: string, description: string) => void;
  deleteTask:(idColumn: string, id:string)=>void;
}

export default TaskCard;
