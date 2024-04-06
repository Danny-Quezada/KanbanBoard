import { useMemo, useState } from "react";
import AppStyle from "./App.module.css";
import Card from "./components/Card/Card";
import {
  closestCorners,
  DndContext,
  DragEndEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { arrayMove, SortableContext } from "@dnd-kit/sortable";
import Board from "./Domain/Models/Board";
import React from "react";
import Task from "./Domain/Models/Task";
function App() {
  const [columns, setColumns] = useState<Board[]>([]);
  const boardsId = useMemo(() => columns.map((col) => col.Id), [columns]);
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
          >
            <SortableContext items={boardsId}>
              {columns.map((value) => (
                <Card
                  key={value.Id}
                  column={value}
                  updateColumn={UpdateColumn}
                  addTask={AddTask}
                  deleteTask={deleteColumn}
                />
              ))}
            </SortableContext>
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
            setColumns([...columns, board]);
          }}
        >
          Create columns
        </button>
      </section>
    </main>
  );


  function deleteColumn(id: string) {
    const filteredColumns = columns.filter((col) => col.Id !== id);
    setColumns(filteredColumns);

    
  }

  function AddTask(id: string){
    const task:Task={
      Id:  Math.floor(Math.random() * 10001).toString(),
      IdColumn: id,
      Description: ""
    }
    const newColumns = columns.map((col) => {
      if (col.Id !== id) return col;
      return { ...col, Tasks: [...col.Tasks, task] };
    });
setColumns(newColumns);
  }
  function UpdateColumn(id: string, title: string) {
    const newColumns = columns.map((col) => {
      if (col.Id !== id) return col;
      return { ...col, Title: title };
    });

    setColumns(newColumns);
  }
  function DragEnd(event: DragEndEvent) {
    
    const { active, over } = event;
   
    if (!over) return;
    const activeId = active.id;
    const overId = over.id;
    if (activeId === overId) return;

    const isActiveAContainer = active.data.current?.type === "container";
    if (!isActiveAContainer) return;

   

    setColumns((columns) => {
      const activeColumnIndex = columns.findIndex((col) => col.Id === activeId);
      console.log(activeColumnIndex);
      const overColumnIndex = columns.findIndex((col) => col.Id === overId);

      return arrayMove(columns, activeColumnIndex, overColumnIndex);
    });
  }
}

export default App;
