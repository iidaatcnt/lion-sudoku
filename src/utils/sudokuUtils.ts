import { Puzzle } from '../types/types';

// エラーセルの検出
export const findErrorCells = (board: number[][]): string[] => {
  const errors = new Set<string>();
  
  // 行の重複チェック
  for (let row = 0; row < 4; row++) {
    const seen = new Map<number, number>();
    for (let col = 0; col < 4; col++) {
      const value = board[row][col];
      if (value !== 0) {
        if (seen.has(value)) {
          errors.add(`${row}-${col}`);
          errors.add(`${row}-${seen.get(value)}`);
        } else {
          seen.set(value, col);
        }
      }
    }
  }
  
  // 列の重複チェック
  for (let col = 0; col < 4; col++) {
    const seen = new Map<number, number>();
    for (let row = 0; row < 4; row++) {
      const value = board[row][col];
      if (value !== 0) {
        if (seen.has(value)) {
          errors.add(`${row}-${col}`);
          errors.add(`${seen.get(value)}-${col}`);
        } else {
          seen.set(value, row);
        }
      }
    }
  }
  
  // 2×2ブロックの重複チェック
  for (let blockRow = 0; blockRow < 2; blockRow++) {
    for (let blockCol = 0; blockCol < 2; blockCol++) {
      const seen = new Map<number, string>();
      for (let row = blockRow * 2; row < blockRow * 2 + 2; row++) {
        for (let col = blockCol * 2; col < blockCol * 2 + 2; col++) {
          const value = board[row][col];
          if (value !== 0) {
            if (seen.has(value)) {
              errors.add(`${row}-${col}`);
              errors.add(seen.get(value)!);
            } else {
              seen.set(value, `${row}-${col}`);
            }
          }
        }
      }
    }
  }
  
  return Array.from(errors);
};

// 完成判定
export const isGameComplete = (board: number[][], solution: number[][]): boolean => {
  // 全セル入力チェック
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      if (board[i][j] === 0) return false;
    }
  }

  // 正解との照合
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      if (board[i][j] !== solution[i][j]) {
        return false;
      }
    }
  }

  return true;
};

// 空白セルを取得
export const getEmptyCells = (board: number[][]): Array<{row: number, col: number}> => {
  const emptyCells = [];
  for (let row = 0; row < 4; row++) {
    for (let col = 0; col < 4; col++) {
      if (board[row][col] === 0) {
        emptyCells.push({ row, col });
      }
    }
  }
  return emptyCells;
};

// ランダムヒント取得
export const getRandomHint = (board: number[][], solution: number[][]): {row: number, col: number, value: number} | null => {
  const emptyCells = getEmptyCells(board);
  
  if (emptyCells.length === 0) return null;
  
  const randomCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
  return {
    row: randomCell.row,
    col: randomCell.col,
    value: solution[randomCell.row][randomCell.col]
  };
};

// セルのクラス名を取得
export const getCellClass = (
  row: number, 
  col: number, 
  board: number[][], 
  initialBoard: number[][], 
  errorCells: string[], 
  showSolution: boolean,
  solution: number[][]
) => {
  const baseClass = "w-12 h-12 text-xl font-bold border-2 text-center focus:outline-none focus:ring-2 focus:ring-blue-500 rounded";
  const cellKey = `${row}-${col}`;
  
  let borderClass = "";
  if ((row < 2 && col < 2) || (row >= 2 && col >= 2)) {
    borderClass = "border-orange-500";
  } else {
    borderClass = "border-yellow-400";
  }
  
  if (showSolution && board[row][col] === solution[row][col]) {
    return `${baseClass} ${borderClass} bg-green-200 text-green-800 border-green-500`;
  }
  
  if (errorCells.includes(cellKey)) {
    return `${baseClass} ${borderClass} bg-red-200 text-red-800 border-red-500`;
  }
  
  if (initialBoard[row][col] !== 0) {
    return `${baseClass} ${borderClass} bg-yellow-300 text-orange-800`;
  }
  
  return `${baseClass} ${borderClass} bg-white text-blue-600`;
};