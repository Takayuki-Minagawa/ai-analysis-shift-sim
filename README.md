# AI解析サービス変化シミュレーター

AI解析サービス分野の変化を、複数のシミュレーションとグラフで可視化する静的Webアプリです。
React + TypeScript + Vite で実装されており、GitHub Pages 上で動作します。

> [!IMPORTANT]
> 本アプリで使用している数値・スコア・企業例・業界データは、すべて架空のサンプルデータです。
> 特定の企業・業界の実態を示すものではなく、シミュレーション結果は傾向理解を目的とした参考値に
> すぎません。投資判断・経営判断・業務判断の根拠として使用することは想定していません。

---

## 目次

- [概要](#概要)
- [主な機能](#主な機能)
- [ユーザー体験の機能](#ユーザー体験の機能)
- [技術構成](#技術構成)
- [セットアップ / 実行](#セットアップ--実行)
- [ディレクトリ構成](#ディレクトリ構成)
- [シミュレーションモデル](#シミュレーションモデル)
- [テーマ切替 / 多言語対応](#テーマ切替--多言語対応)
- [テスト](#テスト)
- [GitHub Pages へのデプロイ](#github-pages-へのデプロイ)
- [CI / 品質チェック](#ci--品質チェック)
- [設計上の制約と免責](#設計上の制約と免責)
- [ライセンス](#ライセンス)

---

## 概要

AIを活用した解析サービスが今後どのように変化しうるかを、市場規模・導入率・コスト構造・案件ファネル・
業界需要・企業競争力の観点から、ブラウザ上で操作可能なダッシュボードとして可視化します。

サーバーサイド処理・外部API・ログイン・個人情報の取り扱いはありません。すべての計算は
クライアントサイド (ブラウザ) で完結します。

### 対象ユーザー

- AI解析サービス分野に関する仮説や感度を、複数軸で素早く検討したい方
- シミュレーションUIの構築例として、コードやUI構成を参考にしたい方
- 複利成長、ロジスティック曲線、損益分岐、ファネル分析のUI実装例が必要な方

---

## 主な機能

| ページ | 主な内容 |
|---|---|
| トップ | 分析テーマ一覧のカード表示と仮説サマリー |
| 市場成長シミュレーション | 成長率シナリオ (Conservative / Base / Aggressive) の複利成長比較 |
| AI導入率シミュレーション | ロジスティック曲線 (S字カーブ) によるAI導入率の推移 |
| コスト比較分析 | 人手中心型とAI活用型の月間処理件数別コスト・利益・損益分岐点 |
| PoC本番移行ファネル | 問い合わせから拡張利用までの各ステージ件数と通過率・離脱率 |
| 業界別需要分析 | 業界×評価軸のヒートマップ、総合スコア、規制×ROIの散布図 |
| 競争力スコア分析 | 企業タイプ別のレーダーチャートと強み/弱みサマリー |
| 総合シナリオダッシュボード | 12パラメータと5種のKPIによる統合シミュレーション |
| 簡易マニュアル | 各機能の使い方・読み方の早見表 (日本語/英語) |
| 前提条件・読み取り方 | 使用モデル、サンプルデータの性質、グラフの読み取り方の解説 |

### 主な共通機能

- スライダーや数値入力によるパラメータ変更とグラフ即時更新
- 各ページのデータテーブルを CSV としてダウンロード (UTF-8 BOM 付き、Excel でそのまま閲覧可)
- 主要グラフを PNG としてダウンロード (Apache ECharts の `getDataURL` を利用)
- レスポンシブ対応 (PC: 3カラム / タブレット: 2カラム / スマートフォン: 1カラム)

## ユーザー体験の機能

- **ライト / ダークモード切替**: ヘッダー右上のトグルで切替。選択は `localStorage` に保存
  され、次回以降にも適用。初回アクセス時はブラウザ / OS の `prefers-color-scheme` に追従
- **多言語対応 (日本語 / 英語)**: ヘッダーの言語トグルで切替。既定は日本語。選択は
  `localStorage` に保存、`<html lang>` 属性も自動更新。ページタイトル、サイドバー、
  フッター、ホームページ、マニュアルページなど主要UIを両言語で提供
- **アクセシブルなナビゲーション**: キーボード操作対応、色以外のラベル・凡例併記、
  サンプルデータであることを示すバッジとフッター常設
- **Apache ECharts の連動**: テーマ切替に追従し、PNG 保存時の背景色も自動で変更

---

## 技術構成

| 項目 | 採用技術 |
|---|---|
| フレームワーク | React 18 |
| 言語 | TypeScript 5 |
| ビルドツール | Vite 5 |
| グラフ描画 | Apache ECharts (`echarts` / `echarts-for-react`) |
| ルーティング | React Router v6 (`HashRouter`) |
| スタイル | CSS Modules (カスタムプロパティでテーマ管理) |
| テスト | Vitest + jsdom |
| Lint / Format | ESLint / Prettier |
| デプロイ | GitHub Actions + GitHub Pages |

GitHub Pages での公開を前提に、以下の制約で設計しています。

- バックエンド処理を持たない静的Webアプリ
- 外部APIキーを必要とする通信を行わない
- ルーティングは `HashRouter` を使用し、サブディレクトリ公開でも動作する

---

## セットアップ / 実行

Node.js 20 以上を想定しています (開発確認は Node.js 22 LTS)。

```bash
# 依存関係のインストール (初回のみ)
npm install

# 開発サーバーの起動
npm run dev

# 本番ビルド
npm run build

# ビルド成果物のローカルプレビュー
npm run preview
```

開発サーバー起動後、Vite が出力する URL (既定では
`http://localhost:5173/ai-analysis-shift-sim/`) をブラウザで開きます。

---

## ディレクトリ構成

```text
.
├── .github/workflows/         GitHub Actions ワークフロー
│   ├── ci.yml                 PR 向け Lint / Test / Build
│   └── deploy.yml             main push 時に GitHub Pages へ自動デプロイ
├── public/
│   └── favicon.svg            アプリのファビコン (SVG)
├── src/
│   ├── app/                   ルーティング定義
│   │   ├── router.tsx
│   │   └── routes.ts
│   ├── components/
│   │   ├── layout/            AppLayout / Header / Sidebar / Footer
│   │   ├── charts/            EChart ラッパー, ChartCard
│   │   └── common/            PageTitle, InfoBox, DataTable,
│   │                          ParameterSlider, ExportButtons
│   ├── data/                  サンプルデータ定義
│   │   ├── marketScenarios.ts
│   │   ├── industryScores.ts
│   │   ├── companyScores.ts
│   │   └── pocFunnel.ts
│   ├── models/                シミュレーションモデル関数
│   │   ├── marketGrowth.ts
│   │   ├── adoptionCurve.ts
│   │   ├── costBenefit.ts
│   │   ├── funnel.ts
│   │   ├── industryDemand.ts
│   │   └── competitiveScore.ts
│   ├── theme/                 テーマ (ライト / ダーク) の Context と ECharts テーマ登録
│   │   ├── ThemeContext.tsx
│   │   └── echartsTheme.ts
│   ├── i18n/                  言語切替 (日本語 / 英語) の Context と翻訳辞書
│   │   ├── LanguageContext.tsx
│   │   └── translations.ts
│   ├── pages/                 各分析ページのコンポーネント (ManualPage を含む)
│   ├── types/                 共通の型定義
│   ├── utils/                 フォーマッタ / CSV 出力 / 画像保存 / 数式
│   ├── styles/                CSS 変数 (ライト / ダーク) とグローバルスタイル
│   ├── main.tsx               エントリーポイント (Theme / Language Provider)
│   └── vite-env.d.ts
├── tests/                     Vitest テスト (モデル関数)
├── index.html
├── package.json
├── tsconfig*.json
├── vite.config.ts
└── README.md
```

### 関心の分離

- **`src/models/`** はシミュレーションロジックを UI から独立して保持します。モデル関数は純関数で、
  Vitest で単体テスト可能です。
- **`src/data/`** はサンプルデータの定義のみを持ち、実データと差し替える際の変更点を局所化します。
- **`src/components/`** は表示専用の再利用可能なコンポーネントです。
- **`src/pages/`** で状態・パラメータ操作・グラフ描画を組み合わせます。
- **`src/theme/`** と **`src/i18n/`** は UI 横断の設定 (表示テーマ、言語) を管理します。

---

## シミュレーションモデル

いずれも教科書的な単純モデルで、傾向と感度を把握する用途に限定しています。

### 市場成長 (複利モデル)

```
marketSize(t) = initialMarketSize × (1 + growthRate) ^ t
```

飽和・景気変動・政策影響は織り込みません。

### AI導入率 (ロジスティック関数)

```
adoption(year) = L / (1 + exp(-k × (year - x0)))
  L  : 最大導入率 (天井)
  k  : 曲線の急峻さ
  x0 : 導入率が L/2 に達する年
```

### コスト比較 (線形モデル)

```
totalCost = fixedCost + costPerCase × monthlyCases
revenue   = revenuePerCase × monthlyCases
profit    = revenue − totalCost
breakEven = fixedCost / (revenuePerCase − costPerCase)
```

品質差、学習コスト、スケール障壁、価格弾力性は織り込みません。

### ファネル

```
passRate(i)    = stage(i).count / stage(i-1).count
overallRate(i) = stage(i).count / stage(0).count
```

入力側では件数が単調非増加となるようカスケード補正 (`sanitizeFunnelCounts`) を行い、
表示側でも `analyzeFunnel` が通過率・離脱率・全体通過率を `[0, 1]` にクランプします。

### 業界スコア / 競争力スコア

1〜5 点の定性スコアを複数軸で保持し、合計・ヒートマップ・レーダーで相対比較します。
本アプリに含まれるスコアは、特定の業界・企業の評価を意図したものではありません。

---

## テーマ切替 / 多言語対応

### テーマ (ライト / ダーク)

- ヘッダー右上のトグルボタンで切替
- 選択は `localStorage` (キー: `app:theme`) に保存され、次回以降にも適用
- 初回アクセス時は、`window.matchMedia("(prefers-color-scheme: dark)")` を参照して
  ブラウザ / OS の設定に追従
- 切替時は `<html>` 要素に `data-theme="light" | "dark"` 属性が付与され、CSS カスタム
  プロパティが一括で切り替わる構成。Apache ECharts にはカスタム `app-dark` テーマを
  登録し、グラフの文字色・軸色・背景色も連動
- PNG ダウンロード時のチャート背景色もテーマに応じて切り替わる

### 言語 (日本語 / 英語)

- ヘッダーの言語トグルボタンで切替 (既定: 日本語)
- 選択は `localStorage` (キー: `app:lang`) に保存され、`<html lang>` 属性も更新
- 翻訳辞書は `src/i18n/translations.ts` に集約し、`useLanguage().t(key)` で参照
- UI 全体 (ヘッダー / サイドバー / フッター / ホーム / 各分析ページのコントロール・
  グラフタイトル・凡例・KPI・本文テキスト / 簡易マニュアル / 前提条件ページ) を
  両言語で表示
- 数値・通貨も言語に追従 (`src/i18n/useFormatters.ts`)。日本語では `億円/万円/円`、
  英語では `Intl.NumberFormat` の compact 表記 (`¥1.2M` など) に切り替わる

### 翻訳の追加 / 修正

- 新しい文言は `src/i18n/translations.ts` の `ja` / `en` オブジェクトに同じキーで追加
- 配列文言は `tList(key)` で取得 (箇条書きなどで利用)
- 既存キーを修正する場合は両言語とも更新してください

---

## テスト

モデル関数のユニットテストを `tests/` に配置しています。

```bash
npm run test         # 1回実行
npm run test:watch   # watch モード
```

テストで検証している主な観点:

- 成長率 0% の場合、市場規模が一定に保たれる
- 成長率が正の場合、市場規模が単調増加する
- ロジスティック曲線の普及中心年で導入率が最大値の半分になる
- 処理件数が増加するほど平均コストが低下する
- 損益分岐点の公式 (固定費 / 限界利益) と一致する
- 無効な入力 (step = 0、終了年 < 開始年) で空配列を返す
- ファネルの通過率・離脱率・全体通過率が `[0, 1]` にクランプされる
- `sanitizeFunnelCounts` が後段の件数を前段以下に丸め、負値を 0 に補正する

---

## GitHub Pages へのデプロイ

`main` ブランチへの push、または GitHub Actions の手動実行で
`.github/workflows/deploy.yml` が起動し、ビルド結果 (`dist/`) が GitHub Pages に
公開されます。

### 初回の準備

1. GitHub 上でリポジトリの **Settings → Pages** を開く
2. **Source** を **GitHub Actions** に設定
3. `main` ブランチに push するか、Actions タブから `Deploy to GitHub Pages` を手動実行

### base パスの設定

`vite.config.ts` の `base` はリポジトリ名に合わせて設定します。

```ts
// vite.config.ts
export default defineConfig({
  base: "/ai-analysis-shift-sim/",
  // ...
});
```

- リポジトリ名を変更する場合は上記の値を一致させてください
- ユーザーサイト (`<account>.github.io`) やカスタムドメイン直下で公開する場合は `base: "/"` に
  変更します

---

## CI / 品質チェック

`.github/workflows/ci.yml` は Pull Request に対して以下を実行します。

- `npm run lint` (警告のみ継続、エラーは表示)
- `npm run test`
- `npm run build`

ローカルでも同じコマンドを実行できます。

```bash
npm run lint
npm run test
npm run build
npm run format   # Prettier
```

---

## 設計上の制約と免責

- 本アプリの内容は、シミュレーションUIの実装例および教育・検討用のデモです
- 入力値・出力値・グラフ・スコアは、すべて架空または一般化された例であり、特定の市場・業界・
  企業・サービスの実態を示すものではありません
- シミュレーション結果の利用によって生じた結果について、作者は一切の責任を負いません
- 本アプリの利用は、利用者自身の責任において行ってください

---

## ライセンス

MIT License を想定しています。リポジトリに `LICENSE` ファイルを追加する場合は、MIT の標準文面を
配置してください。

---

## 貢献

不具合報告・改善提案は Issue または Pull Request でお願いします。
Pull Request では `npm run lint`、`npm run test`、`npm run build` が成功することを事前に
確認してください。
