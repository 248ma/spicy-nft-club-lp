# SPICY NFT CLUB - Premium Membership NFT Landing Page

世界初・風俗業界のプレミアム会員権NFTプロジェクトの公式ランディングページ。

## 🚀 プロジェクト概要

- **プロジェクト名**: spicy-nft-club-lp
- **フレームワーク**: React 19 + Vite
- **スタイリング**: Tailwind CSS 4
- **デプロイ先**: Vercel (Static Site)

## 🛠️ 開発・デプロイガイド

### ⚠️ 重要: Vercelデプロイ時のルール

Vercelのセキュリティ設定により、デプロイをトリガーするためには、Gitコミットの作成者（Author）とコミッター（Committer）が、プロジェクト所有者と一致している必要があります。

**デプロイ（プッシュ）を行う際は、必ず以下の手順を遵守してください：**

1.  **Gitユーザー設定の確認・設定**
    ```bash
    git config user.name "248ma"
    git config user.email "mail@nishiyama.work"
    ```

2.  **コミット時の注意**
    コミットを作成する際は、上記の設定が反映されていることを確認してください。もし既存のコミットを修正する場合は、以下のコマンドでAuthorとCommitterの両方を書き換えてください：
    ```bash
    git commit --amend --author="248ma <mail@nishiyama.work>" --no-edit
    ```

3.  **プッシュ**
    ```bash
    git push origin main
    ```
    ※ 履歴を書き換えた場合は `--force` オプションが必要になる場合があります。

### ローカル開発

```bash
# 依存関係のインストール
pnpm install

# 開発サーバーの起動
pnpm dev
```

### ビルド

```bash
pnpm build
```

## 📁 ディレクトリ構成

- `client/src/pages/Home.tsx`: メインのランディングページ
- `client/src/locales/`: 多言語対応ファイル (ja.json, zh.json, en.json)
- `client/public/images/`: 画像アセット

## 🔗 リンク

- **Live Site**: [https://spicy-nft-club-lp.vercel.app](https://spicy-nft-club-lp.vercel.app)
- **GitHub Repo**: [https://github.com/248ma/spicy-nft-club-lp](https://github.com/248ma/spicy-nft-club-lp)
