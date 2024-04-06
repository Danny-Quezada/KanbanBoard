import { useMemo, useState } from "react";
import AppStyle from "./App.module.css";
import Card from "./components/Card/Card";
import { closestCorners, DndContext } from "@dnd-kit/core";
import { SortableContext } from "@dnd-kit/sortable";
import Board from "./Domain/Models/Board";
import React from "react";
function App() {
  
  const [columns, setColumn] = useState<Board[]>([]);
const boardsId=useMemo(()=>columns.map((col)=>col.Id),[columns]);
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
          <DndContext collisionDetection={closestCorners}>
            <SortableContext items={boardsId}>
              {columns.map((value) => (
                <Card key={value.Id} column={value} updateColumn={UpdateColumn} />
              ))}
            </SortableContext>
         
          </DndContext>
        </div>
        <button className={AppStyle.button}
          onClick={(event) => {
            const board: Board={
              Id: Math.floor(Math.random()*10001).toString(),
              Tasks:[],
              Title: ""
            }
            setColumn([...columns,board]);
          }}
        >
          Create columns
        </button>
      </section>
    </main>
    
  );
  function UpdateColumn(id: string, title: string){
 
    const newColumns=columns.map((col)=>{
      if(col.Id!==id) return col;
      return {...col, Title: title};
    })
    
    setColumn(newColumns);
  }
  
}

export default App;
