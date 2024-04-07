import { useMemo, useState } from "react";
import AppStyle from "./App.module.css";
import Card from "./components/Card/Card";
import {
  closestCorners,
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { arrayMove, SortableContext } from "@dnd-kit/sortable";
import Board from "./Domain/Models/Board";
import React from "react";
import Task from "./Domain/Models/Task";
import { createPortal } from "react-dom";
import TaskCard from "./components/Task/TaskCard";
function App() {
  const [activeBoard, setActiveBoard] = useState<Board | null>(null);

  const [activeTask, setActiveTask] = useState<Task | null>(null);
  const [Boards, setBoards] = useState<Board[]>([
    { Id: "88888", Tasks: [], Title: "To do" },
    { Id: "88898", Tasks: [], Title: "Doing" },
  ]);
  const boardsId = useMemo(() => Boards.map((col) => col.Id), [Boards]);
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 10,
      },
    })
  );
  return (
    <main
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        overflow: "hidden",
      }}
    >
      <aside
        style={{
          width: "50px",
          height: "100vh",
          borderRightColor: "grey",
          borderRightStyle: "solid",
          borderRightWidth: "1px",
        }}
      ></aside>
      <section
        className="KanbanBoard"
        style={{
          flex: "1",
          height: "100%",
          gap: "20px",
          overflowX: "auto",
          display: "flex",
          alignItems: "center",
          paddingRight: "30px",
        }}
      >
        <div
          className="Boards"
          style={{
            marginLeft: "30px",
            display: "flex",
            gap: "20px",
          }}
        >
          <DndContext
            collisionDetection={closestCorners}
            sensors={sensors}
            onDragEnd={DragEnd}
            onDragOver={onDragOver}
            onDragStart={onDragStart}
          >
            <SortableContext items={boardsId}>
              {Boards.map((value) => (
                <Card
                  updateTask={updateTask}
                  key={value.Id}
                  board={value}
                  updateColumn={UpdateColumn}
                  addTask={AddTask}
                  deleteColumn={deleteColumn}
                />
              ))}
            </SortableContext>
            {createPortal(
              <DragOverlay>
                {activeBoard && (
                  <Card
                    updateTask={updateTask}
                    addTask={AddTask}
                    board={activeBoard}
                    deleteColumn={deleteColumn}
                    updateColumn={UpdateColumn}
                  />
                )}
                {activeTask && (
                  <TaskCard task={activeTask} updateTask={updateTask} />
                )}
              </DragOverlay>,
              document.body
            )}
          </DndContext>
        </div>
        <button
          className={AppStyle.button}
          onClick={(event) => {
            const board: Board = {
              Id: Math.floor(Math.random() * 10001).toString(),
              Tasks: [],
              Title: "",
            };
            setBoards([...Boards, board]);
          }}
        >
          Create columns
        </button>
      </section>
    </main>
  );
  function onDragStart(event: DragStartEvent) {
    if (event.active.data.current?.type === "container") {
      setActiveBoard(event.active.data.current.board);
      return;
    }

    if (event.active.data.current?.type === "task") {
      setActiveTask(event.active.data.current.task);
      return;
    }
  }
  function deleteColumn(id: string) {
    const filteredColumns = Boards.filter((col) => col.Id !== id);
    setBoards(filteredColumns);
  }
  function updateTask(idColumn: string, id: string, description: string) {
    const newColumns = Boards.map((col) => {
      if (col.Id !== idColumn) return col;

      const NewTasks=col.Tasks.map((task) => {
        if (task.Id !== id) return task;

        return { ...task, Description: description };
        
      });
     
      return {...col, Tasks: NewTasks};
    });
    setBoards(newColumns);
  }
  function AddTask(id: string) {
    const task: Task = {
      Id: Math.floor(Math.random() * 10001).toString(),
      IdColumn: id,
      Description: "",
    };
    const newColumns = Boards.map((col) => {
      if (col.Id !== id) return col;
      return { ...col, Tasks: [...col.Tasks, task] };
    });
    setBoards(newColumns);
  }
  function UpdateColumn(id: string, title: string) {
    const newColumns = Boards.map((col) => {
      if (col.Id !== id) return col;
      return { ...col, Title: title };
    });

    setBoards(newColumns);
  }
  function DragEnd(event: DragEndEvent) {
    setActiveBoard(null);
    setActiveTask(null);
    const { active, over } = event;

    if (!over) return;
    const activeId = active.id;
    const overId = over.id;
    if (activeId === overId) return;

    const isActiveAContainer = active.data.current?.type === "container";
    if (!isActiveAContainer) return;

    setBoards((columns) => {
      const activeColumnIndex = columns.findIndex((col) => col.Id === activeId);
      console.log(activeColumnIndex);
      const overColumnIndex = columns.findIndex((col) => col.Id === overId);

      return arrayMove(columns, activeColumnIndex, overColumnIndex);
    });
  }

  function onDragOver(event: DragOverEvent) {
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;

    const isActiveATask = active.data.current?.type === "task";
    const isOverATask = over.data.current?.type === "task";

    if (!isActiveATask) return;

    const isOverAContainer = over.data.current?.type === "container";
    console.log(isOverAContainer);
    if (isActiveATask && isOverAContainer) {
      console.log("preuba");
      const newTask = active.data.current?.task as Task;

      const IdContainer = over.id.toString();

      setBoards((boards) => {
        const containerOverIndex = boards.findIndex(
          (value) => value.Id === IdContainer
        );
        const containerActiveIndex = boards.findIndex(
          (value) => value.Id == newTask.IdColumn
        );
        newTask.IdColumn = IdContainer;
        boards[containerActiveIndex].Tasks = boards[
          containerActiveIndex
        ].Tasks.filter((value) => value.Id !== newTask.Id);
        boards[containerOverIndex].Tasks.push(newTask);
        return boards;
      });
    }
    // Im dropping a Task over another Task
    if (isActiveATask && isOverATask) {
      const columnIdActive = active.data.current?.idColumn;
      const columnIdOver = over.data.current?.idColumn;

      if (columnIdActive === columnIdOver) {
        setBoards((boards) => {
          const index = boards.findIndex((value) => value.Id == columnIdActive);
          const activeIndex = boards[index].Tasks.findIndex(
            (value) => value.Id === activeId
          );
          const overIndex = boards[index].Tasks.findIndex(
            (value) => value.Id === overId
          );
          const tasks = arrayMove(boards[index].Tasks, activeIndex, overIndex);
          boards[index].Tasks = tasks;
          return boards;
        });
      } else if (columnIdActive !== columnIdOver) {
        console.log("si");
        setBoards((boards) => {
          const index = boards.findIndex((value) => value.Id == columnIdActive);
          const indexOver = boards.findIndex(
            (value) => value.Id === columnIdOver
          );
          const activeIndex = boards[index].Tasks.findIndex(
            (value) => value.Id === activeId
          );
          const overIndex = boards[indexOver].Tasks.findIndex(
            (value) => value.Id === overId
          );
          const newTask = boards[index].Tasks[activeIndex];

          newTask.IdColumn = columnIdOver;
          // boards[indexOver].Tasks.push(newTask);
          boards[indexOver].Tasks.splice(overIndex, 0, newTask);
          boards[index].Tasks = boards[index].Tasks.filter(
            (value) => value.Id !== activeId
          );
          // boards[indexOver].Tasks = arrayMove(
          //   boards[indexOver].Tasks,
          //   activeIndex,
          //   overIndex-1
          // );
          return boards;
        });
      }
    }
  }
}

export default App;
