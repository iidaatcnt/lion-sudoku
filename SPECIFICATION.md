# ライオン数独アプリ 完全仕様書 v2.0

## 📋 プロジェクト概要

### アプリ名
**ライオン数独 - キッズ向け**

### 目的
小学生でも楽しめる可愛いライオンテーマの4x4数独ゲームアプリ

### ターゲット
- 小学生（メインターゲット）
- 数独初心者
- 可愛いデザインを好むユーザー

### 現在の状態
- ✅ 完全に動作する状態
- ✅ 3問の数独パズル実装済み
- ✅ ギブアップ後の次問題遷移機能実装済み
- ✅ Vercelデプロイ対応済み
- ✅ モジュラー構成でメンテナンス性確保

## 🛠️ 技術スタック

### フロントエンド
- **Framework**: Next.js 15.3.5 (React 18, App Router)
- **Language**: TypeScript
- **Styling**: インラインスタイル（Tailwind CSS問題回避のため）
- **Audio**: Tone.js v15.0.4
- **Deployment**: Vercel

### 開発環境
- **Node.js**: 18.x以上
- **Package Manager**: npm
- **Development Server**: Next.js dev server

## 🎮 機能仕様

### 1. 基本ゲーム機能

#### 1.1 4x4数独パズル
- **ルール**: 各行、各列、各2×2ブロックに1-4の数字を1つずつ配置
- **難易度**: 入門レベル（小学生向け）
- **問題数**: 3問（拡張可能）

#### 1.2 入力システム
- **方式**: ドロップダウンセレクト（タッチデバイス対応）
- **選択肢**: `?`（空白）、`1`、`2`、`3`、`4`
- **制約**: 初期値セル・ギブアップ後・正解表示後は編集不可

#### 1.3 バリデーション機能
- **リアルタイム検証**: 入力時に即座にルール違反をチェック
- **エラー表示**: 違反セルを赤色でハイライト
- **完成判定**: 全セル入力完了＋ルール適合で完成

### 2. ユーザー支援機能

#### 2.1 ヒント機能
- **動作**: 空白セルの中からランダムに1つを正解で埋める
- **制限**: 完成後・正解表示後・ギブアップ後は無効化
- **効果音**: チャイム音
- **表示**: 「💡 ヒントを入れました！」メッセージ

#### 2.2 ギブアップ機能 ⭐ 改善済み
- **動作**: 全ての答えを表示して諦める
- **表示**: 正解セルを緑色でハイライト
- **状態**: 完成扱いにはしない
- **次問題遷移**: ギブアップ後も「次の問題へ →」ボタンで進める
- **メッセージ**: 専用の黄色いギブアップメッセージボックス表示

#### 2.3 正解表示機能
- **動作**: いつでも答えを確認可能
- **用途**: 学習・答え合わせ用
- **表示**: 緑色ハイライト
- **制限**: ギブアップ後は無効化

#### 2.4 リセット機能
- **動作**: 現在の問題を初期状態に戻す
- **効果音**: シュッ音
- **状態**: エラー、ソリューション、ギブアップ状態をクリア

### 3. プログレッション機能

#### 3.1 問題切り替え
- **方式**: 完成後・ギブアップ後の「次の問題へ →」ボタン
- **順序**: 循環式（最後の問題の次は最初の問題）
- **状態**: 新しい問題は初期状態から開始

#### 3.2 進捗表示
- **表示**: `問題 X / Y`形式
- **位置**: ゲームボード下部

### 4. 効果音システム

#### 4.1 効果音の種類
- **セル選択音**: `C5`, 0.1秒（軽やかなピッ音）
- **ヒント音**: `G4`→`C5`の連続音（優しいチャイム）
- **完成音**: `C4`→`E4`→`G4`→`C5`の勝利ファンファーレ
- **リセット音**: `F3`, 0.15秒（シュッ音）
- **ボタン音**: `A4`, 0.1秒（ポップ音）
- **ギブアップ音**: `E3`→`C3`の下降音

#### 4.2 音声制御
- **切り替え**: 右上の🔊/🔇ボタン
- **状態管理**: ローカルstate（soundEnabled）
- **デフォルト**: 音声オン

## 🎨 デザイン仕様

### 1. カラーパレット

#### 1.1 背景
- **メインBG**: `linear-gradient(to bottom, #fef08a, #fed7aa)`
- **カードBG**: `white`

#### 1.2 セルの色分け
- **初期値セル**: `#fcd34d` 背景、`#b45309` 文字
- **入力可能セル**: `white` 背景、`#2563eb` 文字
- **エラーセル**: `#fecaca` 背景、`#dc2626` 文字、`#dc2626` ボーダー
- **正解表示セル**: `#dcfce7` 背景、`#166534` 文字、`#16a34a` ボーダー

#### 1.3 ボーダー
- **全セル**: `2px solid #f59e0b`（オレンジ）

#### 1.4 ボタンカラー
- **ヒント**: `#10b981`（緑）
- **リセット**: `#3b82f6`（青）
- **ギブアップ**: `#f59e0b`（オレンジ）
- **正解表示**: `#8b5cf6`（紫）
- **次の問題**: `#16a34a`（緑ボーダー、白背景）

#### 1.5 メッセージボックス
- **完成**: `#dcfce7` 背景（薄緑）
- **ギブアップ**: `#fef3c7` 背景、`#f59e0b` ボーダー（黄色）

### 2. レイアウト

#### 2.1 全体構成
```
┌─────────────────────┐
│   🦁 タイトル 🔊     │
├─────────────────────┤
│                     │
│   ┌─────────────┐   │
│   │ 4x4 Grid   │   │
│   │             │   │
│   └─────────────┘   │
│   ルール説明        │
│   エラー・正解表示  │
├─────────────────────┤
│  [ヒント][リセット] │
│[ギブアップ][正解]   │
├─────────────────────┤
│   完成/ギブアップ   │
│   メッセージ        │
├─────────────────────┤
│    問題 X / Y      │
├─────────────────────┤
│ 🦁 応援メッセージ   │
└─────────────────────┘
```

#### 2.2 レスポンシブ
- **最大幅**: `448px`（max-w-md相当）
- **パディング**: `16px`（全体）、`24px`（カード内）
- **ボタン間隔**: `8px` gap

### 3. タイポグラフィ

#### 3.1 フォントサイズ
- **タイトル**: `30px`、`bold`
- **セル数字**: `20px`、`bold`
- **ルール説明**: `14px`
- **ボタンテキスト**: `bold`

#### 3.2 絵文字・アイコン
- **メインキャラ**: 🦁（`60px`）
- **ヒント**: 💡
- **リセット**: 🔄
- **ギブアップ**: 🏳️
- **正解**: 📖
- **完成**: 🎉
- **ギブアップ**: 😅
- **音声**: 🔊/🔇

## 📁 ファイル構成（モジュラー構成）

```
lion-sudoku/
├── src/
│   ├── app/
│   │   ├── layout.tsx          # ルートレイアウト
│   │   ├── page.tsx            # ホームページ
│   │   └── globals.css         # グローバルスタイル
│   ├── components/
│   │   ├── LionSudoku.tsx      # メインゲームコンポーネント
│   │   ├── GameBoard.tsx       # ゲームボードコンポーネント
│   │   ├── GameControls.tsx    # ボタン群コンポーネント
│   │   └── GameStatus.tsx      # ステータス表示コンポーネント
│   ├── types/
│   │   └── types.ts            # 型定義
│   ├── data/
│   │   └── puzzleData.ts       # パズルデータ
│   └── utils/
│       ├── sudokuUtils.ts      # 数独ロジック
│       └── soundUtils.ts       # 音声関連
├── package.json                # 依存関係定義
├── tailwind.config.ts          # Tailwind設定
├── tsconfig.json              # TypeScript設定
├── next.config.mjs            # Next.js設定
├── README.md                  # プロジェクト説明
├── SPECIFICATION.md           # このファイル（詳細仕様書）
└── CHANGELOG.md               # 変更履歴
```

## 💾 データ構造

### 1. 型定義（src/types/types.ts）

```typescript
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
```

### 2. パズルデータ形式（src/data/puzzleData.ts）

```typescript
// 問題1
{
  initial: [
    [1, 0, 0, 4],
    [0, 3, 0, 0],
    [0, 0, 4, 0],
    [3, 0, 0, 1]
  ],
  solution: [
    [1, 2, 3, 4],
    [4, 3, 1, 2],
    [2, 1, 4, 3],
    [3, 4, 2, 1]
  ]
}

// 問題2
{
  initial: [
    [2, 0, 0, 3],
    [0, 4, 1, 0],
    [0, 3, 2, 0],
    [1, 0, 0, 4]
  ],
  solution: [
    [2, 1, 4, 3],
    [3, 4, 1, 2],
    [4, 3, 2, 1],
    [1, 2, 3, 4]
  ]
}

// 問題3
{
  initial: [
    [0, 3, 1, 0],
    [1, 0, 0, 3],
    [4, 0, 0, 1],
    [0, 2, 4, 0]
  ],
  solution: [
    [2, 3, 1, 4],
    [1, 4, 2, 3],
    [4, 1, 3, 2],
    [3, 2, 4, 1]
  ]
}
```

### 3. 状態管理

```typescript
const [gameState, setGameState] = useState<GameState>({
  currentPuzzle: 0,
  board: [],
  initialBoard: [],
  isComplete: false,
  showHint: false,
  soundEnabled: true,
  errorCells: [],
  showSolution: false,
});

// ギブアップ状態は独立管理
const [isGivenUp, setIsGivenUp] = useState<boolean>(false);
```

## 🔧 実装詳細

### 1. エラー検出アルゴリズム（src/utils/sudokuUtils.ts）

```typescript
export const findErrorCells = (board: number[][]): string[] => {
  const errors = new Set<string>();
  
  // 行の重複チェック
  // 列の重複チェック
  // 2×2ブロックの重複チェック
  
  return Array.from(errors);
};
```

### 2. 完成判定ロジック

```typescript
export const isGameComplete = (board: number[][], solution: number[][]): boolean => {
  // 全セル入力チェック
  // 正解との照合
  return true/false;
};
```

### 3. 効果音実装（src/utils/soundUtils.ts）

```typescript
export const playSound = async (type: SoundType, soundEnabled: boolean): Promise<void> => {
  if (!soundEnabled) return;
  
  // Tone.js使用
  // 各効果音の実装
};
```

## 🚀 デプロイ手順

### 1. 開発環境セットアップ

```bash
# Next.jsプロジェクト作成
npx create-next-app@latest lion-sudoku --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"

# ディレクトリ移動
cd lion-sudoku

# 音声ライブラリインストール
npm install tone

# 開発サーバー起動
npm run dev
```

### 2. Vercelデプロイ

```bash
# Vercel CLI使用（推奨）
npx vercel

# 本番デプロイ
npx vercel --prod
```

### 3. GitHub連携

```bash
# GitHubリポジトリ作成・プッシュ
git init
git add .
git commit -m "Initial commit: Lion Sudoku app"
git branch -M main
git remote add origin https://github.com/username/lion-sudoku.git
git push -u origin main
```

## 🔧 重要な実装注意事項

### 1. スタイリング
- **Tailwind CSS使用不可**: インラインスタイルを使用
- **理由**: Tailwind CSSコンパイル問題回避のため
- **対応**: 全てのスタイルをインラインで記述

### 2. ギブアップ機能
- **状態管理**: `isGivenUp`を独立したstateで管理
- **UI制御**: ギブアップ後は入力無効化、専用メッセージ表示
- **遷移**: ギブアップ後も次の問題に進める

### 3. TypeScript型管理
- **GameState**: `isGivenUp`は含めない（独立管理のため）
- **パズルデータ**: initial配列は0で空白を表現

### 4. Next.js 15対応
- **viewport設定**: `metadata`ではなく`viewport`exportを使用
- **App Router**: src/app構造を使用

## 🔍 トラブルシューティング

### 1. ビルドエラー
- **`isGivenUp`型エラー**: GameState型に含めず、独立state使用
- **viewport警告**: layout.tsxでviewport exportを使用

### 2. 音声エラー
- **再生されない**: ユーザーアクション後にTone.start()を呼び出し
- **メモリリーク**: 1秒後にsynth.dispose()でクリーンアップ

### 3. スタイル問題
- **表示崩れ**: Tailwind使用せず、インラインスタイルを使用
- **レスポンシブ**: インラインでレスポンシブ対応

### 4. GitHubプッシュエラー
- **ファイルサイズ制限**: `.gitignore`でnode_modulesを除外
- **LFS警告**: 大容量ファイルは含めない

## 📈 拡張可能性

### 1. 機能拡張
- 6x6、9x9数独への対応
- タイマー機能
- スコアシステム
- ユーザー進捗保存（localStorage）
- 全問クリア記念画面
- 問題自動生成機能

### 2. デザイン拡張
- 他の動物テーマ（クマ、ウサギ等）
- ダークモード
- アニメーション追加
- パーティクルエフェクト
- 季節限定テーマ

### 3. 技術拡張
- PWA対応
- オフライン機能
- 多言語対応
- AI問題自動生成
- オンライン対戦機能

## 📝 完成チェックリスト

- ✅ 3つの数独問題が論理的に解ける
- ✅ エラー検出が正確に動作
- ✅ ヒント機能が正常動作
- ✅ ギブアップ後の次問題遷移
- ✅ 音声効果（オン/オフ切り替え）
- ✅ リセット機能
- ✅ 完成判定とお祝い演出
- ✅ 循環式問題切り替え
- ✅ レスポンシブデザイン
- ✅ TypeScript型安全性
- ✅ Vercelデプロイ対応

## 🎯 現在の状態

**バージョン**: v2.0  
**最終更新**: 2025年7月5日  
**デプロイ状況**: Vercel本番環境で稼働中  
**品質**: 小学生向け本格運用可能レベル

## 🔄 新しいチャットでの開発継続手順

新しいチャットでこのプロジェクトの開発を継続する場合：

1. **リポジトリ情報を共有**:
   ```
   GitHubリポジトリ: https://github.com/iidaatcnt/lion-sudoku
   このSPECIFICATION.mdが完全な技術仕様書です。
   ```

2. **現在の状態を説明**:
   - 完全に動作するライオン数独アプリ
   - 3つの数独問題実装済み
   - ギブアップ後の次問題遷移機能実装済み
   - Vercelで本番運用中

3. **開発したい機能を明確化**:
   - 新機能追加、バグ修正、デザイン改善等

---

**この仕様書により、新しいチャットでも完全な開発継続が可能です！** 🦁✨