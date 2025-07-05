import React from 'react';
import { getCellClass } from '../utils/sudokuUtils';

interface GameBoardProps {
  board: number[][];
  initialBoard: number[][];
  errorCells: string[];
  showSolution: boolean;
  solution: number[][];
  onCellChange: (row: number, col: number, value: string) => void;
}

export default function GameBoard({
  board,
  initialBoard,
  errorCells,
  showSolution,
  solution,
  onCellChange
}: GameBoardProps) {
  return (
    <div className="grid grid-cols-4 gap-1 mb-4 mx-auto w-fit">
      {board.map((row, rowIndex) =>
        row.map((cell, colIndex) => (
          <select
            key={`${rowIndex}-${colIndex}`}
            value={cell === 0 ? '?' : cell.toString()}
            onChange={(e) => onCellChange(rowIndex, colIndex, e.target.value)}
            disabled={initialBoard[rowIndex][colIndex] !== 0}
            className={getCellClass(
              rowIndex, 
              colIndex, 
              board, 
              initialBoard, 
              errorCells, 
              showSolution, 
              solution
            )}
          >
            <option value="?">?</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
          </select>
        ))
      )}
    </div>
  );
}