import { useState } from "react";

import AppStyle from "./App.module.css";
import Card from "./components/Card/Card";
import { closestCorners, DndContext } from "@dnd-kit/core";
import { SortableContext } from "@dnd-kit/sortable";
function App() {
  const [count, setCount] = useState(0);
  const [columns, setColumn] = useState([1, 2, 3]);

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
            <SortableContext items={columns}>
              {columns.map((value) => (
                <Card key={value} id={value} />
              ))}
            </SortableContext>
         
          </DndContext>
        </div>
        <button className={AppStyle.button}
          onClick={(event) => {
            setColumn([...columns, columns.length + 1]);
          }}
        >
          Create columns
        </button>
      </section>
    </main>
  );
}

export default App;
