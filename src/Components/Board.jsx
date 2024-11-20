import React, { useState } from "react";
import Cell from "./Cell";

const initialBoard = Array(6)
  .fill(null)
  .map(() => Array(6).fill([])); 

const validCities = [
  "Azure","Zenith","Apex","Vertex","Nexus","Haven",
  "Solace","Beacon","Summit","Horizon","Pinnacle",
  "Spire","Ardent","Aurora","Eclipse","Genesis",
  "Mirage","Nimbus","Arcadia","Serene","Cascade",
  "Paradigm","Radiant"
];

const Board = () => {
  const [board, setBoard] = useState(initialBoard);

  const handleCellChange = (row, col, newStack) => {
    const newBoard = [...board];
    newBoard[row][col] = newStack;
    setBoard(newBoard); // Update state board
  };

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(6, 50px)", 
        gap: "5px", 
      }}
    >
      {board.map((row, rowIndex) =>
        row.map((cellStack, colIndex) => (
          <Cell
            key={`${rowIndex}-${colIndex}`}
            value={cellStack}
            onChange={(newStack) => handleCellChange(rowIndex, colIndex, newStack)}
            validCities={validCities}
          />
        ))
      )}
    </div>
  );
};

export default Board;
