import { useState } from "react";

import "./App.css";
import Card from "./components/Card/Card";

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
          {columns.map((value) => (
           <Card key={value}/>
          ))}
        </div>
        <button onClick={(event)=>{
          setColumn([...columns, columns.length+1])
        }}>Create columns</button>
      </section>
    </main>
  );
}

export default App;
