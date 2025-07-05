import React from 'react';

interface GameControlsProps {
  isComplete: boolean;
  showSolution: boolean;
  onHint: () => void;
  onReset: () => void;
  onGiveUp: () => void;
  onShowSolution: () => void;
}

export default function GameControls({
  isComplete,
  showSolution,
  onHint,
  onReset,
  onGiveUp,
  onShowSolution
}: GameControlsProps) {
  return (
    <div className="grid grid-cols-2 gap-2 mb-4">
      <button
        onClick={onHint}
        disabled={isComplete || showSolution}
        className="bg-green-500 hover:bg-green-600 disabled:bg-gray-300 text-white font-bold py-2 px-4 rounded"
      >
        💡 ヒント
      </button>
      <button
        onClick={onReset}
        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
      >
        🔄 リセット
      </button>
      <button
        onClick={onGiveUp}
        disabled={isComplete || showSolution}
        className="bg-orange-500 hover:bg-orange-600 disabled:bg-gray-300 text-white font-bold py-2 px-4 rounded"
      >
        🏳️ ギブアップ
      </button>
      <button
        onClick={onShowSolution}
        disabled={isComplete}
        className="bg-purple-500 hover:bg-purple-600 disabled:bg-gray-300 text-white font-bold py-2 px-4 rounded"
      >
        📖 正解表示
      </button>
    </div>
  );
}