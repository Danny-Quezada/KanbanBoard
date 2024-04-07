import React, { useMemo, useState } from "react";
import CardStyle from "./Card.module.css";
import { CSS } from "@dnd-kit/utilities";
import { SortableContext, useSortable } from "@dnd-kit/sortable";
import { RiDragMove2Fill } from "react-icons/ri";
import { MdDelete } from "react-icons/md";
import { IoAddCircleOutline } from "react-icons/io5";
import Board from "../../Domain/Models/Board";
import TaskCard from "../Task/TaskCard";

interface Props {
  board: Board;
  updateColumn: (id: string, title: string) => void;
  addTask: (id: string) => void;
  deleteColumn: (id: string) => void;
  updateTask:(idColumn: string, id:string, description: string)=>void;
}

function Card({ board, updateColumn, addTask, deleteColumn ,updateTask}: Props) {
  
  const [modeEditor, setMode] = useState<boolean>(true);
  console.log(board.Tasks)

  const {
    attributes,
    setNodeRef,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: board.Id,
    data: {
      type: "container",
      board,
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
        borderColor: isDragging===true ? "palevioletred": ""
      }}
    >
      {!isDragging && (
        <>
          <div className={CardStyle.titleContainer}>
            {modeEditor === true || board.Title === "" ? (
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
                value={board.Title}
                onChange={(e) => updateColumn(board.Id, e.target.value)}
              />
            ) : (
              <h4
                className={CardStyle.title}
                onClick={() => {
                  setMode(true);
                }}
              >
                {board.Title}
              </h4>
            )}
            <div className={CardStyle.items}>
              <button
                className={CardStyle.item}
                onClick={(e) => deleteColumn(board.Id)}
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
             
              marginTop: "10px",
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              overflowY: "auto",
              marginBottom: "10px",
              paddingBottom: "5px",
              overflowX: "hidden",
              flexGrow: "1"
            }}
          >
            <SortableContext items={board.Tasks.map((task) => task.Id)}>
              {board.Tasks.map((task) => (
                <TaskCard key={task.Id} task={task} updateTask={updateTask} />
              ))}
            </SortableContext>
          </div>

          <footer className={CardStyle.footer}>
            <button
              className={CardStyle.addButton}
              onClick={(e) => addTask(board.Id)}
            >
              <IoAddCircleOutline />
              <h5>Add task</h5>
            </button>
          </footer>
        </>
      )}
    </div>
  );
}

export default Card;
