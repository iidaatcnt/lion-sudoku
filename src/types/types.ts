// パズルデータの型定義
export interface Puzzle {
  initial: number[][];
  solution: number[][];
}

// ゲーム状態の型定義
export interface GameState {
  currentPuzzle: number;
  board: number[][];
  initialBoard: number[][];
  isComplete: boolean;
  showHint: boolean;
  soundEnabled: boolean;
  errorCells: string[];
  showSolution: boolean;
}

// 音声タイプの型定義
export type SoundType = 'select' | 'hint' | 'complete' | 'reset' | 'button' | 'giveup';