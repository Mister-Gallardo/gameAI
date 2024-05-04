import { useState } from "react";
import "./App.css";
import Move from "./logic/Minimax";

function App() {
  // P - Person, C - Computer
  const [board, setBoard] = useState<(string | number)[]>([
    0, 1, 2, 3, 4, 5, 6, 7, 8,
  ]);
  const [title, setTitle] = useState<string>("Крестики-Нолики");
  const [access, setAccess] = useState(true);

  function reset() {
    setBoard([0, 1, 2, 3, 4, 5, 6, 7, 8]);
    setTitle("Крестики-Нолики");
    setAccess(true);
  }

  const handleSetValue = (index: number, player: string) => {
    if (board[index] !== "P" && board[index] !== "C" && access) {
      board[index] = player;
      setBoard([...board]);
      setAccess(false);
      player === "P" && Move(board, handleSetValue, reset, setTitle, setAccess);
      setAccess(true);
    }
  };

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        gap: "30px",
        alignItems: "center",
      }}
    >
      <h1
        style={{
          marginTop: "16vh",
          fontSize: "34px",
          backgroundColor: "white",
          display: "inline-block",
          padding: "8px",
          borderRadius: "15px",
        }}
      >
        {title}
      </h1>
      <div
        style={{
          width: "24vw",
          minWidth: "300px",
          display: "flex",
          flexWrap: "wrap",
        }}
      >
        {board.map((elem: number | string, index: number) => (
          <button
            key={index}
            onClick={() => handleSetValue(index, "P")}
            style={{
              width: "33.3%",
              height: "calc(24vw / 3.2)",
              minHeight: "100px",
              border: "4px solid black",
              fontSize: "70px",
              fontWeight: "800",
              color: elem === "P" ? "red" : "blue",
            }}
          >
            {elem === "P" ? "X" : elem === "C" && "O"}
          </button>
        ))}
      </div>
    </div>
  );
}

export default App;
