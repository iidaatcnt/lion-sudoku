import React from 'react';

interface GameStatusProps {
  errorCells: string[];
  showHint: boolean;
  showSolution: boolean;
  isComplete: boolean;
  currentPuzzle: number;
  totalPuzzles: number;
  onNextPuzzle: () => void;
}

export default function GameStatus({
  errorCells,
  showHint,
  showSolution,
  isComplete,
  currentPuzzle,
  totalPuzzles,
  onNextPuzzle
}: GameStatusProps) {
  return (
    <>
      {/* ルール説明 */}
      <p className="text-sm text-gray-600 text-center mb-4">
        各行・列・2×2ブロックに1〜4を1つずつ入れよう！
      </p>

      {/* エラー・ヒント表示 */}
      {errorCells.length > 0 && (
        <p className="text-red-600 text-center mb-2">⚠️ 同じ数字が重複しています</p>
      )}
      {showHint && (
        <p className="text-green-600 text-center mb-2">💡 ヒントを入れました！</p>
      )}
      {showSolution && (
        <p className="text-blue-600 text-center mb-2">📖 正解を表示中</p>
      )}

      {/* 完成メッセージ */}
      {isComplete && (
        <div className="text-center mb-4 p-4 bg-green-100 rounded-lg">
          <div className="text-4xl mb-2">🎉</div>
          <p className="text-green-800 font-bold">おめでとう！クリアしました！</p>
          <button
            onClick={onNextPuzzle}
            className="mt-2 bg-white text-green-600 font-bold py-2 px-4 rounded border-2 border-green-600 hover:bg-green-50"
          >
            次の問題へ →
          </button>
        </div>
      )}

      {/* 進捗表示 */}
      <div className="text-center mb-4">
        <p className="text-gray-600">問題 {currentPuzzle + 1} / {totalPuzzles}</p>
      </div>

      {/* 応援メッセージ */}
      <div className="text-center">
        <div className="text-4xl mb-2">🦁</div>
        <p className="text-orange-600 font-bold">
          {isComplete 
            ? "よくできました！次も頑張って！" 
            : "落ち着いて考えれば必ずできるよ！"}
        </p>
      </div>
    </>
  );
}