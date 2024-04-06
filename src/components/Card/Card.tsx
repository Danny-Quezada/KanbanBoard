import React, { useState } from "react";
import CardStyle from "./Card.module.css";
import { CSS } from "@dnd-kit/utilities";
import { SortableContext, useSortable } from "@dnd-kit/sortable";
import { RiDragMove2Fill } from "react-icons/ri";
import { MdDelete } from "react-icons/md";
import { IoAddCircleOutline } from "react-icons/io5";
import Board from "../../Domain/Models/Board";
import TaskCard from "../Task/TaskCard";

interface Props {
  column: Board;
  updateColumn: (id: string, title: string) => void;
  addTask: (id: string) => void;
  deleteTask: (id: string) => void;
}

function Card({ column, updateColumn, addTask, deleteTask }: Props) {
  const [modeEditor, setMode] = useState<boolean>(true);

  const {
    attributes,
    setNodeRef,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: column.Id,
    data: {
      type: "container",
    },
  });

  return (
    <div
      className={CardStyle.Board}
      {...attributes}
      ref={setNodeRef}
      style={{
        transition: transition,
        transform: CSS.Translate.toString(transform),
      }}
    >
      <div className={CardStyle.titleContainer}>
        {modeEditor === true || column.Title==="" ? (
          <input
            placeholder="Write title"
            maxLength={10}
            className={CardStyle.titleInput}
            autoFocus={true}
            onKeyUp={(e) => {
              if (e.key === "Enter") {
                setMode(false);
              }
            }}
            value={column.Title}
            onChange={(e) => updateColumn(column.Id, e.target.value)}
          />
        ) : (
          <h4
            className={CardStyle.title}
            onClick={() => {
              setMode(true);
            }}
          >
            {column.Title}
          </h4>
        )}
        <div className={CardStyle.items}>
          <button
            className={CardStyle.item}
            onClick={(e) => deleteTask(column.Id)}
          >
            <MdDelete color="red" />
          </button>
          <button
            {...listeners}
            style={{
              cursor: "grab",
            }}
            className={CardStyle.item}
          >
            <RiDragMove2Fill />
          </button>
        </div>
      </div>
      <div
        style={{
          flex: "1",
          marginTop: "10px",
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          overflowY: "auto",
          marginBottom: "10px",
          paddingBottom: "5px"
          
        }}
      >
        <SortableContext items={column.Tasks.map((task) => task.Id)}>
          {column.Tasks.map((task) => (
            <TaskCard key={task.Id} task={task}/>
          ))}
        </SortableContext>
      </div>

      <footer className={CardStyle.footer}>
        <button
          className={CardStyle.addButton}
          onClick={(e) => addTask(column.Id)}
        >
          <IoAddCircleOutline />
          <h5>Add task</h5>
        </button>
      </footer>
    </div>
  );
}

export default Card;
