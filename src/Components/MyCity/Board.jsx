import React, { useState } from "react";
import Cell from "./Cell";

const initialBoard = Array(6)
  .fill(null)
  .map(() => Array(9).fill([]));

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
      rowIndex === row
        ? r.map((cell, colIndex) => (colIndex === col ? newStack : cell))
        : r
    );
    setBoard(newBoard); // Update state board
  };

  return (
    <div className="flex justify-center items-center"> {/* Adjusted height */}
      <div className="grid grid-cols-9 grid-rows-6 gap-4"> {/* Gap adjusted */}
        {board.map((row, rowIndex) =>
          row.map((cellStack, colIndex) => (
            <Cell
              key={`${rowIndex}-${colIndex}`} // Correct key
              value={cellStack}
              onChange={(newStack) => handleCellChange(rowIndex, colIndex, newStack)}
              validCities={validCities}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default Board;
