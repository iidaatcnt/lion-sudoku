# 🦁 ライオン数独 - キッズ向け

小学生でも楽しめる可愛いライオンテーマの4x4数独ゲームアプリです。

## ✨ 特徴

- 🎯 **4x4数独**: 初心者にやさしいサイズ
- 🦁 **ライオンテーマ**: 可愛いデザインで楽しく学習
- 🔊 **効果音**: Tone.jsによる心地よいサウンド
- 💡 **ヒント機能**: 困った時のお助け機能
- 📱 **レスポンシブ**: スマホ・タブレット対応
- 🎮 **3つの問題**: 段階的に楽しめる

## 🛠️ 技術スタック

- **Framework**: Next.js 15.3.5
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Audio**: Tone.js
- **Deployment**: Vercel

## 🚀 セットアップ手順

### 1. リポジトリのクローン

```bash
git clone <your-repo-url>
cd lion-sudoku
```

### 2. 依存関係のインストール

```bash
npm install
```

### 3. 開発サーバーの起動

```bash
npm run dev
```

ブラウザで [http://localhost:3000](http://localhost:3000) を開いてアプリを確認してください。

### 4. ビルド（本番環境用）

```bash
npm run build
npm start
```

## 📁 プロジェクト構成

```
lion-sudoku/
├── src/
│   ├── app/
│   │   ├── layout.tsx          # ルートレイアウト
│   │   ├── page.tsx            # ホームページ
│   │   └── globals.css         # グローバルスタイル
│   └── components/
│       └── LionSudoku.tsx      # メインゲームコンポーネント
├── package.json                # 依存関係定義
├── tailwind.config.ts          # Tailwind設定
├── tsconfig.json              # TypeScript設定
├── next.config.mjs            # Next.js設定
└── README.md                  # このファイル
```

## 🎮 ゲームの遊び方

1. **基本ルール**: 各行・列・2×2ブロックに1〜4の数字を1つずつ配置
2. **セル選択**: ドロップダウンから数字を選択
3. **ヒント**: 💡ボタンで空白セルの1つを正解で埋める
4. **リセット**: 🔄ボタンで問題を初期状態に戻す
5. **ギブアップ**: 🏳️ボタンで全ての答えを表示
6. **正解表示**: 📖ボタンで答えを確認（学習用）

## 🔧 カスタマイズ

### 新しい問題の追加

`src/components/LionSudoku.tsx`の`puzzles`配列に新しい問題を追加できます：

```typescript
const puzzles: Puzzle[] = [
  // 既存の問題...
  {
    initial: [
      [0, 1, 0, 3],
      [2, 0, 4, 0],
      [0, 4, 0, 2],
      [4, 0, 2, 0]
    ],
    solution: [
      [1, 1, 3, 3],
      [2, 3, 4, 1],
      [3, 4, 1, 2],
      [4, 2, 2, 4]
    ]
  }
];
```

### テーマの変更

`src/components/LionSudoku.tsx`内の絵文字とカラーパレットを変更することで、他の動物テーマに変更できます。

## 🚀 Vercelデプロイ

### 1. Vercel CLIを使用

```bash
# Vercel CLIのインストール
npm i -g vercel

# デプロイ
npx vercel

# 本番デプロイ
npx vercel --prod
```

### 2. GitHubとの連携

1. GitHubリポジトリにプッシュ
2. [Vercel](https://vercel.com)でリポジトリを連携
3. 自動デプロイの設定完了

## 🔧 トラブルシューティング

### 音声が再生されない
- ユーザーの操作後にTone.jsが初期化されるため、最初のクリック後から音声が有効になります
- 音声ボタン（🔊/🔇）で音声のオン/オフを切り替えできます

### ビルドエラーが発生する
```bash
# TypeScriptエラーをチェック
npm run build

# 依存関係を再インストール
rm -rf node_modules package-lock.json
npm install
```

## 📄 ライセンス

このプロジェクトはMITライセンスの下で公開されています。

## 🤝 コントリビューション

プルリクエストやイシューの報告を歓迎します！

---

🦁 **楽しい数独ライフを！** 🎉