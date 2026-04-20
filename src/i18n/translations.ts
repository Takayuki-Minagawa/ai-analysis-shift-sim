export type Language = "ja" | "en";

export const LANGUAGES: { code: Language; label: string }[] = [
  { code: "ja", label: "日本語" },
  { code: "en", label: "English" },
];

type Dict = Record<string, string | string[]>;

const ja: Dict = {
  "app.title": "AI解析サービス変化シミュレーター",
  "app.subtitle": "AI Analytics Service Simulator",
  "app.sampleBadge": "サンプルデータ",
  "app.githubLink": "GitHub",

  "theme.toggle.toDark": "ダークモードに切替",
  "theme.toggle.toLight": "ライトモードに切替",
  "language.toggle": "Language",
  "language.current": "言語",

  "nav.section": "分析テーマ",

  "route.home.label": "トップ",
  "route.home.desc": "AI解析サービス変化シミュレーターの入口",
  "route.marketGrowth.label": "市場成長",
  "route.marketGrowth.desc": "成長率シナリオ別の市場規模推移",
  "route.adoption.label": "AI導入率",
  "route.adoption.desc": "ロジスティック曲線によるS字カーブ",
  "route.cost.label": "コスト比較",
  "route.cost.desc": "人手 vs AI活用のコスト・利益比較",
  "route.funnel.label": "PoCファネル",
  "route.funnel.desc": "問い合わせから拡張利用までの転換率",
  "route.industry.label": "業界別需要",
  "route.industry.desc": "業界 × 評価軸のヒートマップ",
  "route.competitive.label": "競争力スコア",
  "route.competitive.desc": "企業別競争力のレーダー比較",
  "route.dashboard.label": "総合ダッシュボード",
  "route.dashboard.desc": "複数パラメータの統合シミュレーション",
  "route.manual.label": "簡易マニュアル",
  "route.manual.desc": "使い方・各機能の早見表",
  "route.methodology.label": "前提・読み方",
  "route.methodology.desc": "モデル・データ・注意事項の解説",

  "common.reset": "リセット",
  "common.csv": "CSV",
  "common.png": "PNG",
  "common.year": "年",
  "common.unit.cases": "件/月",
  "common.phase.early": "初期",
  "common.phase.growth": "成長期",
  "common.phase.mature": "成熟期",

  "footer.note":
    "本アプリで表示しているデータは、特に明記のない限り仮想のサンプルデータです。結果は傾向理解のためのものであり、投資判断や経営判断にそのまま使用しないでください。",
  "footer.meta": "© AI Analytics Service Simulator / GitHub Pages 公開用 静的Webアプリ",

  "home.kicker": "AI Analytics Service Simulator",
  "home.title": "AI解析サービス変化シミュレーター",
  "home.lead":
    "AIを積極的に活用した解析サービス分野が、今後どのように変化していくかを、複数のシミュレーションとグラフで可視化する静的Webアプリです。パラメータを動かしながら、市場規模、導入率、コスト構造、ファネル、業界需要、企業競争力の変化を総合的に確認できます。",
  "home.sectionTopics": "分析テーマ",
  "home.sectionHypotheses": "このアプリで確認できる仮説",
  "home.dataWarnTitle": "データに関する注意",
  "home.dataWarnBody":
    "本アプリで使用しているデータは、特に明記がない限り仮想のサンプルデータです。将来予測はシミュレーションであり、実際の市場予測ではありません。結果は傾向理解のためのものであり、投資判断や経営判断にそのまま使用しないでください。",

  "home.hypotheses": [
    "AI解析サービスは、単発のレポート提供から、継続的な意思決定支援・自動化サービスへ移行していく。",
    "AI導入率は直線ではなく、一定の時期から急速に立ち上がるS字カーブで普及しやすい。",
    "AI活用型は初期投資が大きいが、処理件数が増えるほど人手中心型よりも有利になりやすい。",
    "PoCから本番・継続・拡張利用に進める力が、AI解析サービス企業の収益性を左右する。",
    "今後の競争力は、AIモデル単体ではなく、業界知識、独自データ、運用力、セキュリティ、説明可能性、連携力で決まる。",
  ] as string[],

  "page.market.title": "市場成長シミュレーション",
  "page.market.subtitle": "AI解析サービス市場の成長率シナリオによる規模推移を比較",
  "page.adoption.title": "AI導入率シミュレーション",
  "page.adoption.subtitle": "ロジスティック関数で企業のAI解析サービス導入率を推計",
  "page.cost.title": "コスト比較分析",
  "page.cost.subtitle":
    "人手中心サービスとAI活用型サービスのコスト構造を月間処理件数別に比較",
  "page.funnel.title": "PoC本番移行ファネル",
  "page.funnel.subtitle":
    "AI解析サービス案件が、問い合わせから拡張利用までどう進むかを可視化",
  "page.industry.title": "業界別需要分析",
  "page.industry.subtitle": "業界ごとのAI解析サービス需要を複数評価軸で可視化",
  "page.competitive.title": "競争力スコア分析",
  "page.competitive.subtitle": "AI解析サービス提供企業の競争力を複数軸で比較",
  "page.dashboard.title": "総合シナリオダッシュボード",
  "page.dashboard.subtitle":
    "複数パラメータを同時に変更してAI解析サービスの将来像を確認",
  "page.methodology.title": "前提条件・読み取り方",
  "page.methodology.subtitle":
    "本アプリで使用しているデータ・数式・仮定の解説",
  "page.manual.title": "簡易マニュアル",
  "page.manual.subtitle": "各機能の使い方と読み方の早見表",

  "manual.intro":
    "本アプリは、AI解析サービス分野の変化を体感するためのシミュレーションツールです。パラメータを動かしながら、市場・導入率・コスト・案件ファネル・需要・競争力の観点で感度を確認できます。",
  "manual.sec.nav.title": "1. 画面の構成",
  "manual.sec.nav.body":
    "上部ヘッダーにアプリ名、言語切替、テーマ切替を配置しています。左側サイドバー(スマートフォンではヘッダー下)から各分析ページへ移動できます。フッターにはサンプルデータの注記が常に表示されます。",
  "manual.sec.params.title": "2. パラメータ操作",
  "manual.sec.params.body":
    "スライダーや入力欄を動かすと、グラフとテーブルが即時に再計算されます。数値の横に現在値が表示されるので、操作と結果を対応付けて確認してください。ページ右上の「リセット」で初期値に戻ります。",
  "manual.sec.export.title": "3. グラフ・データの書き出し",
  "manual.sec.export.body":
    "「CSV」ボタンで現在の計算結果をCSV (UTF-8 with BOM) として保存できます。Excelで文字化けせず開ける形式です。「PNG」ボタンで主要グラフを画像として保存できます。",
  "manual.sec.theme.title": "4. テーマ切替",
  "manual.sec.theme.body":
    "ヘッダー右側のテーマボタンで、ライトモードとダークモードを切り替えられます。選択は自動的に保存され、次回以降も適用されます。初回アクセス時はブラウザ/OSの設定に追従します。",
  "manual.sec.lang.title": "5. 言語切替",
  "manual.sec.lang.body":
    "ヘッダーの言語ボタンで、日本語と英語を切り替えられます。選択は保存され、次回以降も適用されます。既定は日本語です。",
  "manual.sec.data.title": "6. データについての重要事項",
  "manual.sec.data.body":
    "本アプリで使用している数値・業界名・企業名・スコアは、すべて架空のサンプルです。特定の実態を示すものではありません。シミュレーション結果は傾向把握を目的とした参考値であり、投資・経営・業務判断の根拠には利用しないでください。",
  "manual.sec.tips.title": "7. 使い方のヒント",
  "manual.sec.tips.body":
    "最初は「総合ダッシュボード」で全体感を掴み、次に興味のあるテーマ (市場成長、導入率、コスト、ファネル、需要、競争力) のページで詳細を確認すると把握しやすくなります。各ページの注釈パネルに、読み取り方と注意点をまとめています。",
};

const en: Dict = {
  "app.title": "AI Analytics Service Simulator",
  "app.subtitle": "AI解析サービス変化シミュレーター",
  "app.sampleBadge": "Sample Data",
  "app.githubLink": "GitHub",

  "theme.toggle.toDark": "Switch to dark mode",
  "theme.toggle.toLight": "Switch to light mode",
  "language.toggle": "言語",
  "language.current": "Language",

  "nav.section": "Analysis Topics",

  "route.home.label": "Home",
  "route.home.desc": "Entry point of the AI Analytics Service Simulator",
  "route.marketGrowth.label": "Market Growth",
  "route.marketGrowth.desc": "Market size trajectory by growth-rate scenario",
  "route.adoption.label": "AI Adoption",
  "route.adoption.desc": "Logistic-curve (S-curve) adoption model",
  "route.cost.label": "Cost Comparison",
  "route.cost.desc": "Human-led vs AI-assisted cost and profit comparison",
  "route.funnel.label": "PoC Funnel",
  "route.funnel.desc": "Conversion rates from inquiry to expanded usage",
  "route.industry.label": "Industry Demand",
  "route.industry.desc": "Industry × evaluation axis heatmap",
  "route.competitive.label": "Competitive Score",
  "route.competitive.desc": "Radar comparison of competitive scores",
  "route.dashboard.label": "Overview Dashboard",
  "route.dashboard.desc": "Integrated simulation with multiple parameters",
  "route.manual.label": "User Guide",
  "route.manual.desc": "Quick reference for features and usage",
  "route.methodology.label": "Methodology",
  "route.methodology.desc": "Models, data, and notes for interpretation",

  "common.reset": "Reset",
  "common.csv": "CSV",
  "common.png": "PNG",
  "common.year": "Year",
  "common.unit.cases": "cases/month",
  "common.phase.early": "Early",
  "common.phase.growth": "Growth",
  "common.phase.mature": "Mature",

  "footer.note":
    "Unless otherwise specified, all data in this app is fictional sample data. Results are intended for directional understanding only and should not be used as a basis for investment, management, or operational decisions.",
  "footer.meta":
    "© AI Analytics Service Simulator / Static web app for GitHub Pages",

  "home.kicker": "AI Analytics Service Simulator",
  "home.title": "AI Analytics Service Simulator",
  "home.lead":
    "A static web app that visualizes how the AI-driven analytics services sector may evolve, using multiple simulations and charts. Adjust parameters to explore market size, adoption rates, cost structures, pipeline funnels, industry demand, and competitive profiles.",
  "home.sectionTopics": "Analysis Topics",
  "home.sectionHypotheses": "Hypotheses you can explore",
  "home.dataWarnTitle": "About the data",
  "home.dataWarnBody":
    "Unless otherwise stated, all data in this app is fictional sample data. Forecasts are simulations, not actual market predictions. Results should not be used as a basis for investment or management decisions.",

  "home.hypotheses": [
    "AI analytics services are shifting from one-off report deliveries to ongoing decision-support and automation services.",
    "AI adoption tends to follow an S-curve rather than a linear trajectory, accelerating at a certain inflection point.",
    "AI-assisted delivery requires higher upfront cost but becomes advantageous over human-led delivery as case volume grows.",
    "Profitability in AI analytics depends on the ability to progress from PoC to production, retention, and expansion.",
    "Future competitiveness is determined not by AI models alone, but by domain knowledge, proprietary data access, operations, security, explainability, and integration.",
  ] as string[],

  "page.market.title": "Market Growth Simulation",
  "page.market.subtitle":
    "Compare market size trajectories across different growth-rate scenarios",
  "page.adoption.title": "AI Adoption Simulation",
  "page.adoption.subtitle":
    "Estimate enterprise AI adoption using a logistic function",
  "page.cost.title": "Cost Comparison",
  "page.cost.subtitle":
    "Compare cost structures of human-led vs AI-assisted delivery by monthly case volume",
  "page.funnel.title": "PoC to Production Funnel",
  "page.funnel.subtitle":
    "Visualize how AI engagement deals progress from inquiry to expanded usage",
  "page.industry.title": "Industry Demand Analysis",
  "page.industry.subtitle":
    "Visualize AI analytics demand across industries along multiple axes",
  "page.competitive.title": "Competitive Score Analysis",
  "page.competitive.subtitle":
    "Compare competitive profiles of AI analytics service providers",
  "page.dashboard.title": "Scenario Dashboard",
  "page.dashboard.subtitle":
    "Integrated simulation with multiple parameters in one view",
  "page.methodology.title": "Methodology & Interpretation",
  "page.methodology.subtitle":
    "Explanation of the data, formulas, and assumptions used in this app",
  "page.manual.title": "User Guide",
  "page.manual.subtitle": "Quick reference for features and how to read results",

  "manual.intro":
    "This app is a simulation tool for exploring how the AI analytics services sector may evolve. Adjust parameters to test sensitivities across markets, adoption, cost, funnels, demand, and competitive profiles.",
  "manual.sec.nav.title": "1. Layout",
  "manual.sec.nav.body":
    "The header shows the app name, language switch, and theme switch. Use the left sidebar (shown below the header on mobile) to navigate between analysis pages. The footer permanently displays the sample-data disclaimer.",
  "manual.sec.params.title": "2. Parameter controls",
  "manual.sec.params.body":
    "Moving a slider or changing an input instantly recalculates charts and tables. The current value is shown next to each label. Use the Reset button at the top right of each page to restore defaults.",
  "manual.sec.export.title": "3. Exporting charts and data",
  "manual.sec.export.body":
    "The CSV button downloads the current calculation as UTF-8 CSV (with BOM) so it opens cleanly in Excel. The PNG button saves the main chart as an image.",
  "manual.sec.theme.title": "4. Theme switch",
  "manual.sec.theme.body":
    "Use the theme button on the right of the header to switch between light and dark modes. Your choice is persisted for future visits. On first visit, the app follows the browser or OS setting.",
  "manual.sec.lang.title": "5. Language switch",
  "manual.sec.lang.body":
    "Use the language button in the header to switch between Japanese and English. Your choice is persisted. The default is Japanese.",
  "manual.sec.data.title": "6. Important notice about the data",
  "manual.sec.data.body":
    "All numbers, industry names, company names, and scores in this app are fictional samples. They do not represent any real entity. Results are intended only for directional understanding and must not be used as a basis for investment, management, or operational decisions.",
  "manual.sec.tips.title": "7. Usage tips",
  "manual.sec.tips.body":
    "We recommend starting with the Overview Dashboard to grasp the big picture, then drilling into a topic of interest (market growth, adoption, cost, funnel, demand, or competitiveness). Each page includes annotation panels describing how to read results and what to watch out for.",
};

export const TRANSLATIONS: Record<Language, Dict> = { ja, en };

export type TranslationKey = keyof typeof ja;
