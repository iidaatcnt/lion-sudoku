# 🦁 ライオン数独 - キッズ向け

小学生でも楽しめる可愛いライオンテーマの4x4数独ゲームアプリです。

![ライオン数独](https://img.shields.io/badge/Status-Production%20Ready-green) ![Next.js](https://img.shields.io/badge/Next.js-15.3.5-black) ![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue) ![Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black)

## 🎮 デモ

🔗 **[ライブデモを見る](https://lion-sudoku.vercel.app)**

## ✨ 特徴

- 🎯 **4x4数独**: 初心者にやさしいサイズ
- 🦁 **ライオンテーマ**: 可愛いデザインで楽しく学習
- 🔊 **効果音**: 心地よいサウンドエフェクト
- 💡 **ヒント機能**: 困った時のお助け機能
- 📱 **レスポンシブ**: スマホ・タブレット対応
- 🎮 **3つの問題**: 段階的に楽しめる
- 🏳️ **ギブアップ機能**: 諦めても次の問題に進める

## 🚀 クイックスタート

### ローカル環境での実行

```bash
# リポジトリをクローン
git clone https://github.com/iidaatcnt/lion-sudoku.git
cd lion-sudoku

# 依存関係をインストール
npm install

# 開発サーバーを起動
npm run dev
```

ブラウザで [http://localhost:3000](http://localhost:3000) を開いてアプリを確認してください。

### 本番ビルド

```bash
# 本番用ビルド
npm run build

# 本番サーバー起動
npm start
```

## 🎮 遊び方

### 基本ルール
各行・列・2×2ブロックに **1〜4の数字を1つずつ** 配置してください。

### 操作方法
1. **セルをクリック**: ドロップダウンから数字を選択
2. **ヒント**: 💡ボタンで空白セルの1つを正解で埋める
3. **リセット**: 🔄ボタンで問題を初期状態に戻す
4. **ギブアップ**: 🏳️ボタンで答えを表示、次の問題に進める
5. **正解表示**: 📖ボタンで答えを確認（学習用）
6. **音声切り替え**: 🔊/🔇ボタンで効果音のオン/オフ

### ゲームの流れ
1. 問題1から順番にチャレンジ
2. 完成またはギブアップで次の問題へ
3. 問題3の後は問題1に戻る（循環式）

## 🛠️ 技術スタック

- **Framework**: Next.js 15.3.5 (React 18)
- **Language**: TypeScript
- **Styling**: インラインスタイル
- **Audio**: Tone.js
- **Deployment**: Vercel

## 📁 プロジェクト構造

```
src/
├── app/                 # Next.js App Router
├── components/          # Reactコンポーネント
├── types/              # TypeScript型定義
├── data/               # パズルデータ
└── utils/              # ユーティリティ関数
```

## 🤝 開発に参加

### 問題報告
バグや改善提案は [Issues](https://github.com/iidaatcnt/lion-sudoku/issues) でお知らせください。

### 開発ガイド
詳細な開発手順は [SPECIFICATION.md](./SPECIFICATION.md) をご覧ください。

### コントリビューション
1. このリポジトリをフォーク
2. 機能ブランチを作成 (`git checkout -b feature/AmazingFeature`)
3. 変更をコミット (`git commit -m 'Add some AmazingFeature'`)
4. ブランチにプッシュ (`git push origin feature/AmazingFeature`)
5. プルリクエストを作成

## 📄 ドキュメント

- **[仕様書](./SPECIFICATION.md)**: 完全な技術仕様とアーキテクチャ
- **[変更履歴](./CHANGELOG.md)**: バージョン別の変更内容

## 🎯 対象ユーザー

- **小学生**: メインターゲット、楽しく数独を学習
- **数独初心者**: 4x4で基本を理解
- **保護者・教育者**: 子供の論理思考力向上ツール

## 🏆 機能一覧

- ✅ 4x4数独パズル（3問）
- ✅ リアルタイムエラー検出
- ✅ ヒント機能
- ✅ ギブアップ機能（次問題遷移付き）
- ✅ 完成判定とお祝い演出
- ✅ 効果音システム
- ✅ レスポンシブデザイン

## 📞 サポート

質問や問題がある場合は、以下の方法でお気軽にお問い合わせください：

- **Issues**: [GitHub Issues](https://github.com/iidaatcnt/lion-sudoku/issues)
- **Discussions**: プロジェクトに関する議論

## 📜 ライセンス

このプロジェクトは MIT ライセンスの下で公開されています。

## 🙏 謝辞

- **Next.js チーム**: 素晴らしいReactフレームワーク
- **Tone.js**: 音声ライブラリ
- **Vercel**: ホスティングプラットフォーム

---

🦁 **楽しい数独ライフを！** 🎉

*Made with ❤️ for kids learning logic and problem-solving*