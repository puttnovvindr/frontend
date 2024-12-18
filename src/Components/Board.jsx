import React, { useState } from "react";
import Cell from "./Cell";

const initialBoard = Array.from({ length: 6 }, () => Array(6).fill([])); // Perbaiki initialBoard

const validCities = [
  "Azure", "Zenith", "Apex", "Vertex", "Nexus", "Haven",
  "Solace", "Beacon", "Summit", "Horizon", "Pinnacle",
  "Spire", "Ardent", "Aurora", "Eclipse", "Genesis",
  "Mirage", "Nimbus", "Arcadia", "Serene", "Cascade",
  "Paradigm", "Radiant"
];

const Board = () => {
  const [board, setBoard] = useState(initialBoard);

  const handleCellChange = (row, col, newStack) => {
    const newBoard = board.map((r, rowIndex) =>
      r.map((cell, colIndex) =>
        rowIndex === row && colIndex === col ? newStack : cell
      )
    );
    setBoard(newBoard); // Update state board
  };

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(6, 50px)", // Ukuran kolom
        gap: "5px", // Jarak antar elemen
      }}
    >
      {board.map((row, rowIndex) =>
        row.map((cellStack, colIndex) => (
          <Cell
            key={`${rowIndex}-${colIndex}`} // Perbaiki key
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
