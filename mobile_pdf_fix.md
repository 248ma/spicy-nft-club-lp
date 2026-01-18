# モバイルPDF表示問題の修正

## 問題の症状
モバイルSafariでPDFを開くと、1〜2ページ目の一部だけが表示され、その下が真っ白になる。

## 原因
モバイルブラウザでのPDF埋め込み表示の互換性問題。特にiOSのSafariでは、大きなPDFファイルの埋め込み表示に制限がある。

## 実施した修正

### 1. Vercel設定の追加 (`vercel.json`)
PDFファイルに適切なHTTPヘッダーを設定：

```json
{
  "headers": [
    {
      "source": "/documents/(.*).pdf",
      "headers": [
        {
          "key": "Content-Type",
          "value": "application/pdf"
        },
        {
          "key": "Content-Disposition",
          "value": "inline; filename=\"whitepaper.pdf\""
        },
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    }
  ]
}
```

**効果**:
- `Content-Type: application/pdf` - ブラウザにPDFとして認識させる
- `Content-Disposition: inline` - ブラウザ内で表示（ダウンロードではない）
- `Cache-Control` - キャッシュによる高速化

### 2. PDF開く処理の簡素化 (`Whitepaper.tsx`)

**変更前**:
```typescript
const link = document.createElement('a');
link.href = pdfUrl;
link.download = 'SPICY-NFT-CLUB-Whitepaper.pdf';
link.target = '_blank';
link.rel = 'noopener noreferrer';
document.body.appendChild(link);
link.click();
document.body.removeChild(link);
```

**変更後**:
```typescript
window.open('/documents/whitepaper-ja.pdf', '_blank');
```

**効果**:
- シンプルで確実な実装
- モバイルでネイティブPDFビューアーが起動
- Vercelのヘッダー設定が正しく適用される

## デプロイ情報
- **コミットSHA**: 58a9d074faa943ec03659c5fd0263986829968d3
- **デプロイステータス**: READY (本番環境)
- **デプロイ日時**: 2026-01-16 08:18

## 期待される動作
1. モバイルで「PDFをダウンロード」ボタンをタップ
2. 新しいタブでPDFが開く
3. iOSの場合、SafariのネイティブPDFビューアーで全ページが表示される
4. スクロールして全18ページを閲覧可能

## テスト手順
1. モバイルSafariで https://spicy-nft-club-lp-main.vercel.app/whitepaper にアクセス
2. 「PDFをダウンロード」ボタンをタップ
3. PDFが新しいタブで開き、全ページがスクロール可能か確認

## 追加の注意事項
- ファイルサイズ: 5.9MB（モバイル通信で約5〜10秒の読み込み時間）
- 初回アクセス時はキャッシュがないため、読み込みに時間がかかる場合がある
- 2回目以降はキャッシュにより高速表示
