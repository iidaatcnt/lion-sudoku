'use client'

import { useState, useEffect } from 'react';
import { GameState } from '../types/types';
import { puzzles } from '../data/puzzleData';
import { findErrorCells, isGameComplete, getRandomHint } from '../utils/sudokuUtils';
import { playSound } from '../utils/soundUtils';
import GameBoard from './GameBoard';
import GameControls from './GameControls';
import GameStatus from './GameStatus';

const [gameState, setGameState] = useState<GameState>({
  currentPuzzle: 0,
  board: [],
  initialBoard: [],
  isComplete: false,
  showHint: false,
  soundEnabled: true,
  errorCells: [],
  showSolution: false,
  isGivenUp: false, // 追加
});

  // パズル初期化
  useEffect(() => {
    initializePuzzle(gameState.currentPuzzle);
  }, [gameState.currentPuzzle]);

const initializePuzzle = (puzzleIndex: number) => {
  const puzzle = puzzles[puzzleIndex];
  const initial = puzzle.initial.map(row => [...row]);
  
  setGameState(prev => ({
    ...prev,
    board: initial,
    initialBoard: initial,
    isComplete: false,
    showHint: false,
    errorCells: [],
    showSolution: false,
    isGivenUp: false, // 追加
  }));
};

  // セル値変更
  const handleCellChange = (row: number, col: number, value: string) => {
    // 初期値セルは変更不可
    if (gameState.initialBoard[row][col] !== 0) return;

    playSound('select', gameState.soundEnabled);

    const newValue = value === '?' ? 0 : parseInt(value);
    const newBoard = gameState.board.map((r, rIndex) =>
      r.map((c, cIndex) => (rIndex === row && cIndex === col ? newValue : c))
    );
    
    // エラーチェック
    const errors = findErrorCells(newBoard);
    
    // 完成チェック
    const solution = puzzles[gameState.currentPuzzle].solution;
    const isComplete = errors.length === 0 && isGameComplete(newBoard, solution);
    
    setGameState(prev => ({
      ...prev,
      board: newBoard,
      errorCells: errors,
      isComplete,
    }));

    if (isComplete) {
      setTimeout(() => playSound('complete', gameState.soundEnabled), 200);
    }
  };

  // ヒント機能
  const handleHint = () => {
    if (gameState.isComplete || gameState.showSolution) return;

    const solution = puzzles[gameState.currentPuzzle].solution;
    const hint = getRandomHint(gameState.board, solution);
    
    if (!hint) return;
    
    const newBoard = gameState.board.map((r, rIndex) =>
      r.map((c, cIndex) => 
        rIndex === hint.row && cIndex === hint.col ? hint.value : c
      )
    );
    
    // エラーチェックと完成チェック
    const errors = findErrorCells(newBoard);
    const isComplete = errors.length === 0 && isGameComplete(newBoard, solution);
    
    setGameState(prev => ({
      ...prev,
      board: newBoard,
      showHint: true,
      errorCells: errors,
      isComplete,
    }));

    setTimeout(() => {
      setGameState(prev => ({ ...prev, showHint: false }));
    }, 1000);
    
    playSound('hint', gameState.soundEnabled);

    if (isComplete) {
      setTimeout(() => playSound('complete', gameState.soundEnabled), 200);
    }
  };

  // リセット機能
  const handleReset = () => {
    initializePuzzle(gameState.currentPuzzle);
    playSound('reset', gameState.soundEnabled);
  };

  // ギブアップ機能
const handleGiveUp = () => {
  const solution = puzzles[gameState.currentPuzzle].solution;
  setGameState(prev => ({
    ...prev,
    board: solution.map(row => [...row]),
    showSolution: true,
    errorCells: [],
    isGivenUp: true, // 追加
  }));
  playSound('giveup', gameState.soundEnabled);
};

  // 正解表示
  const handleShowSolution = () => {
    const solution = puzzles[gameState.currentPuzzle].solution;
    setGameState(prev => ({
      ...prev,
      board: solution.map(row => [...row]),
      showSolution: true,
      errorCells: [],
    }));
    playSound('button', gameState.soundEnabled);
  };

  // 次の問題へ
  const handleNextPuzzle = () => {
    const nextPuzzle = (gameState.currentPuzzle + 1) % puzzles.length;
    setGameState(prev => ({
      ...prev,
      currentPuzzle: nextPuzzle,
    }));
    playSound('button', gameState.soundEnabled);
  };

  // 音声設定切り替え
  const toggleSound = () => {
    setGameState(prev => ({
      ...prev,
      soundEnabled: !prev.soundEnabled,
    }));
  };

return (
  <div style={{
    minHeight: '100vh',
    background: 'linear-gradient(to bottom, #fef08a, #fed7aa)',
    padding: '16px'
  }}>
    <div style={{
      maxWidth: '448px',
      margin: '0 auto',
      backgroundColor: 'white',
      borderRadius: '8px',
      boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
      padding: '24px'
    }}>
      {/* ヘッダー */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '24px'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '60px', marginBottom: '8px' }}>🦁</div>
          <h1 style={{ 
            fontSize: '30px', 
            fontWeight: 'bold', 
            color: '#ea580c',
            margin: '0'
          }}>ライオン数独</h1>
          <p style={{ color: '#ea580c', margin: '0' }}>キッズ向け</p>
        </div>
        <button
          onClick={toggleSound}
          style={{
            fontSize: '24px',
            padding: '8px',
            border: 'none',
            background: 'transparent',
            cursor: 'pointer',
            borderRadius: '4px'
          }}
        >
          {gameState.soundEnabled ? '🔊' : '🔇'}
        </button>
      </div>

      {/* ゲームボード - 簡単なテスト用 */}
      <div style={{ marginBottom: '16px' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '4px',
          marginBottom: '16px',
          width: 'fit-content',
          margin: '0 auto'
        }}>
          {gameState.board.map((row, rowIndex) =>
            row.map((cell, colIndex) => (
              <select
                key={`${rowIndex}-${colIndex}`}
                value={cell === 0 ? '?' : cell.toString()}
                onChange={(e) => handleCellChange(rowIndex, colIndex, e.target.value)}
                disabled={gameState.initialBoard[rowIndex][colIndex] !== 0}
                style={{
                  width: '48px',
                  height: '48px',
                  fontSize: '20px',
                  fontWeight: 'bold',
                  border: '2px solid #f59e0b',
                  textAlign: 'center',
                  backgroundColor: gameState.initialBoard[rowIndex][colIndex] !== 0 ? '#fcd34d' : 'white',
                  color: gameState.initialBoard[rowIndex][colIndex] !== 0 ? '#b45309' : '#2563eb'
                }}
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

        <p style={{ 
          fontSize: '14px', 
          color: '#6b7280', 
          textAlign: 'center', 
          marginBottom: '16px' 
        }}>
          各行・列・2×2ブロックに1〜4を1つずつ入れよう！
        </p>

        {gameState.errorCells.length > 0 && (
          <p style={{ color: '#dc2626', textAlign: 'center', marginBottom: '8px' }}>
            ⚠️ 同じ数字が重複しています
          </p>
        )}
      </div>

      {/* ボタンエリア */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '8px',
        marginBottom: '16px'
      }}>
<button
  onClick={handleHint}
  disabled={gameState.isComplete || gameState.showSolution || gameState.isGivenUp}
  style={{
    backgroundColor: (gameState.isComplete || gameState.showSolution || gameState.isGivenUp) ? '#d1d5db' : '#10b981',
    color: 'white',
    fontWeight: 'bold',
    padding: '8px 16px',
    borderRadius: '4px',
    border: 'none',
    cursor: (gameState.isComplete || gameState.showSolution || gameState.isGivenUp) ? 'not-allowed' : 'pointer'
  }}
>
  💡 ヒント
</button>
        <button
          onClick={handleReset}
          style={{
            backgroundColor: '#3b82f6',
            color: 'white',
            fontWeight: 'bold',
            padding: '8px 16px',
            borderRadius: '4px',
            border: 'none',
            cursor: 'pointer'
          }}
        >
          🔄 リセット
        </button>
<button
  onClick={handleGiveUp}
  disabled={gameState.isComplete || gameState.showSolution || gameState.isGivenUp}
  style={{
    backgroundColor: (gameState.isComplete || gameState.showSolution || gameState.isGivenUp) ? '#d1d5db' : '#f59e0b',
    color: 'white',
    fontWeight: 'bold',
    padding: '8px 16px',
    borderRadius: '4px',
    border: 'none',
    cursor: (gameState.isComplete || gameState.showSolution || gameState.isGivenUp) ? 'not-allowed' : 'pointer'
  }}
>
  🏳️ ギブアップ
</button>
        <button
          onClick={handleShowSolution}
          disabled={gameState.isComplete}
          style={{
            backgroundColor: gameState.isComplete ? '#d1d5db' : '#8b5cf6',
            color: 'white',
            fontWeight: 'bold',
            padding: '8px 16px',
            borderRadius: '4px',
            border: 'none',
            cursor: gameState.isComplete ? 'not-allowed' : 'pointer'
          }}
        >
          📖 正解表示
        </button>
      </div>

      {/* 完成メッセージ */}
{gameState.isGivenUp && !gameState.isComplete && (
  <div style={{
    textAlign: 'center',
    marginBottom: '16px',
    padding: '16px',
    backgroundColor: '#fef3c7',
    borderRadius: '8px',
    border: '2px solid #f59e0b'
  }}>
    <div style={{ fontSize: '32px', marginBottom: '8px' }}>😅</div>
    <p style={{ color: '#92400e', fontWeight: 'bold', marginBottom: '8px' }}>
      答えを表示しました
    </p>
    <p style={{ color: '#92400e', fontSize: '14px', marginBottom: '12px' }}>
      次の問題で頑張りましょう！
    </p>
    <button
      onClick={handleNextPuzzle}
      style={{
        backgroundColor: '#f59e0b',
        color: 'white',
        fontWeight: 'bold',
        padding: '8px 16px',
        borderRadius: '4px',
        border: 'none',
        cursor: 'pointer'
      }}
    >
      {gameState.currentPuzzle === puzzles.length - 1 ? '最初の問題へ →' : '次の問題へ →'}
    </button>
  </div>
)}

      {/* 進捗表示 */}
      <div style={{ textAlign: 'center', marginBottom: '16px' }}>
        <p style={{ color: '#6b7280' }}>問題 {gameState.currentPuzzle + 1} / {puzzles.length}</p>
      </div>

      {/* 応援メッセージ */}
      <div style={{ textAlign: 'center' }}>
        <div style={{ fontSize: '32px', marginBottom: '8px' }}>🦁</div>
        <p style={{ color: '#ea580c', fontWeight: 'bold' }}>
          {gameState.isComplete 
            ? "よくできました！次も頑張って！" 
            : "落ち着いて考えれば必ずできるよ！"}
        </p>
      </div>
    </div>
  </div>
);
}