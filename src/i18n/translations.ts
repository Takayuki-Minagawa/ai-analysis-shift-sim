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
  "common.cases": "件",
  "common.perMonth": "件/月",
  "common.score": "スコア",
  "common.total": "合計",
  "common.industry": "業界",
  "common.company": "企業",
  "common.type": "タイプ",
  "common.stage": "ステージ",
  "common.count": "件数",
  "common.passRate": "通過率",
  "common.dropRate": "離脱率",
  "common.overallRate": "累計通過率",

  "phase.early": "初期",
  "phase.growth": "成長期",
  "phase.mature": "成熟期",

  "funnel.stage.inquiry": "問い合わせ",
  "funnel.stage.proposal": "初回提案",
  "funnel.stage.poc_start": "PoC開始",
  "funnel.stage.poc_success": "PoC成功",
  "funnel.stage.production": "本番導入",
  "funnel.stage.retention": "継続利用",
  "funnel.stage.expansion": "拡張利用",

  "industry.manufacturing": "製造",
  "industry.finance": "金融",
  "industry.healthcare": "医療",
  "industry.retail": "小売",
  "industry.logistics": "物流",
  "industry.realEstate": "不動産",
  "industry.education": "教育",
  "industry.government": "行政",
  "industry.energy": "エネルギー",
  "industry.marketing": "マーケティング",

  "axis.industry.dataVolume": "データ量",
  "axis.industry.dataVolume.desc": "業界が保有・生成するデータ量",
  "axis.industry.automationPotential": "自動化余地",
  "axis.industry.automationPotential.desc": "AIによる業務自動化の余地",
  "axis.industry.regulationRisk": "規制リスク",
  "axis.industry.regulationRisk.desc": "規制・コンプライアンスの重さ",
  "axis.industry.roiPotential": "投資対効果",
  "axis.industry.roiPotential.desc": "短中期でのROI期待値",
  "axis.industry.aiReadiness": "AI準備度",
  "axis.industry.aiReadiness.desc": "AI導入基盤の整備度合い",
  "axis.industry.marketGrowth": "市場成長",
  "axis.industry.marketGrowth.desc": "業界自体の成長期待",

  "axis.competitive.domainKnowledge": "業界知識",
  "axis.competitive.domainKnowledge.desc": "対象業界に関する知見",
  "axis.competitive.dataAccess": "データ利活用",
  "axis.competitive.dataAccess.desc": "独自データへのアクセス",
  "axis.competitive.modelQuality": "モデル品質",
  "axis.competitive.modelQuality.desc": "AIモデルの精度と信頼性",
  "axis.competitive.operationCapability": "運用力",
  "axis.competitive.operationCapability.desc": "導入後の運用・改善能力",
  "axis.competitive.security": "セキュリティ",
  "axis.competitive.security.desc": "情報セキュリティ体制",
  "axis.competitive.explainability": "説明可能性",
  "axis.competitive.explainability.desc": "モデル判断の説明・監査性",
  "axis.competitive.integration": "システム連携",
  "axis.competitive.integration.desc": "既存システムとの統合容易性",
  "axis.competitive.costEfficiency": "コスト効率",
  "axis.competitive.costEfficiency.desc": "提供価格とコスト効率",

  "companyType.generalPlatform": "汎用AI分析プラットフォーム型",
  "companyType.manufacturingSpecialist": "製造業特化型",
  "companyType.healthcareSpecialist": "医療・ヘルスケア特化型",
  "companyType.biExtension": "BIツール拡張型",
  "companyType.consultingIntegrated": "コンサルティング一体型",

  "market.scenario.conservative": "Conservative",
  "market.scenario.conservative.desc": "規制・人材不足により成長が緩やかなケース",
  "market.scenario.base": "Base",
  "market.scenario.base.desc": "AI活用が一般化し、安定成長するケース",
  "market.scenario.aggressive": "Aggressive",
  "market.scenario.aggressive.desc": "AIエージェントと自動化が急速に普及するケース",

  "dashboard.scenario.pessimistic": "悲観",
  "dashboard.scenario.base": "標準",
  "dashboard.scenario.optimistic": "楽観",

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

  // Market page
  "market.group.conditions": "市場条件",
  "market.group.scenarios": "シナリオ別 成長率",
  "market.control.initialSize": "初期市場規模 (指数)",
  "market.control.initialSize.desc": "開始年の市場規模を指数(例:100=基準値)として設定",
  "market.control.startYear": "開始年",
  "market.control.endYear": "終了年",
  "market.control.conservativeRate": "Conservative 成長率",
  "market.control.baseRate": "Base 成長率",
  "market.control.aggressiveRate": "Aggressive 成長率",
  "market.trend.title": "シナリオ別 市場規模推移",
  "market.trend.desc": "複利成長を前提とした3シナリオの年次推移。Y軸は開始年を100とした指数。",
  "market.trend.footer":
    "注: 成長率は年率。シナリオ間で数%の差でも長期ではスプレッドが大きく開きます。",
  "market.trend.aria": "シナリオ別市場規模推移 折れ線グラフ",
  "market.final.titleTpl": "{year}年時点 シナリオ別市場規模",
  "market.final.desc": "各シナリオの最終年の市場規模指数を比較",
  "market.final.aria": "終了年時点の市場規模比較 棒グラフ",
  "market.yAxis.index": "市場規模指数 (初年=100基準)",
  "market.yAxis.finalTpl": "{year}年 市場規模指数",
  "market.table.title": "年別市場規模テーブル",
  "market.table.desc": "数値データを確認・エクスポートするためのテーブル",
  "market.aside.aria": "シミュレーションパラメータ",
  "market.comment.title": "分析コメント",
  "market.comment.body":
    "Aggressive シナリオでは、成長率の複利効果により最終年の市場規模がBaseを大きく上回ります。AI解析サービス市場は、導入率の上昇とともに線形ではなく加速的に成長する可能性があります。",
  "market.read.title": "読み取り方",
  "market.read.list": [
    "Y軸は初期年を基準(=初期市場規模)とした相対指数",
    "成長率の差は短期では小さく見えても、10年後には大きな差になります",
    "Conservative と Aggressive の開きが、シナリオ不確実性の幅を示す",
  ] as string[],
  "market.assumptions.title": "前提条件とサンプルデータ",
  "market.assumptions.body":
    "本ページの市場規模は、実データではなくサンプル入力です。モデルは単純な複利成長 marketSize = initial * (1 + g)^t に基づいており、飽和、景気変動、政策影響は織り込んでいません。",

  // Adoption page
  "adoption.group.logistic": "ロジスティックパラメータ",
  "adoption.group.period": "表示期間",
  "adoption.control.maxRate": "最大導入率 L",
  "adoption.control.maxRate.desc": "長期的に到達する導入率の上限",
  "adoption.control.speed": "普及速度 k",
  "adoption.control.speed.desc": "S字カーブの立ち上がりの急峻さ",
  "adoption.control.center": "普及中心年 x0",
  "adoption.control.center.desc": "導入率が上限の半分に達する年",
  "adoption.control.startYear": "開始年",
  "adoption.control.endYear": "終了年",
  "adoption.kpi.center": "普及中心年",
  "adoption.kpi.center.note": "最大導入率の50%到達",
  "adoption.kpi.firstCross": "50%到達年 (推定)",
  "adoption.kpi.firstCross.note": "最大値の半分に届く最初の年",
  "adoption.kpi.finalRateTpl": "{year}年の導入率",
  "adoption.kpi.finalRate.note": "表示期間最終年",
  "adoption.chart.title": "AI導入率のS字カーブ",
  "adoption.chart.descTpl": "L={L}, k={k}, x0={x0}",
  "adoption.chart.footer":
    "点の色はフェーズ (灰=初期 / 青=成長期 / 緑=成熟期) を示します。",
  "adoption.chart.aria": "AI導入率のS字カーブ 折れ線グラフ",
  "adoption.chart.markLine": "普及中心年",
  "adoption.chart.series": "AI導入率",
  "adoption.yAxis": "AI導入率 (%)",
  "adoption.table.title": "年別導入率テーブル",
  "adoption.table.phase": "フェーズ",
  "adoption.table.rate": "導入率",
  "adoption.aside.aria": "パラメータ操作",
  "adoption.comment.body":
    "AI導入率は初期には緩やかで、一定の時期を超えると急速に上昇します。このモデルでは、普及中心年 ({year}) 前後が導入加速期として表現されます。",
  "adoption.read.list": [
    "L は長期的な上限 (天井)、k はカーブの急峻さ、x0 が変曲点",
    "初期 (20% 未満)、成長期、成熟期 (80% 超) でフェーズ分け",
    "k を大きくするほど普及は急激に進む",
  ] as string[],
  "adoption.assumptions.body":
    "本モデルは単一ロジスティック関数で単純化したサンプルシミュレーションです。実際の普及には、規制、景気、競合、業界特性など多くの要因が影響します。",

  // Cost page
  "cost.group.range": "処理件数レンジ",
  "cost.group.human": "人手中心 コスト",
  "cost.group.ai": "AI活用 コスト",
  "cost.control.minCases": "最小件数/月",
  "cost.control.maxCases": "最大件数/月",
  "cost.control.step": "刻み",
  "cost.control.fixed": "固定費/月",
  "cost.control.perCaseCost": "1件あたり変動費",
  "cost.control.perCaseRevenue": "1件あたり売上",
  "cost.kpi.humanBE": "人手 損益分岐件数",
  "cost.kpi.aiBE": "AI 損益分岐件数",
  "cost.kpi.crossover": "AI優位となる件数",
  "cost.kpi.crossover.note": "この件数を超えるとAIが有利",
  "cost.kpi.unit": "件/月",
  "cost.chart.cost.title": "月間処理件数別 総コスト",
  "cost.chart.cost.desc": "固定費+変動費で総コストを比較",
  "cost.chart.profit.title": "月間処理件数別 利益 (損益分岐と逆転点)",
  "cost.chart.profit.desc": "縦破線は各モデルの損益分岐件数、AI vs 人手の利益逆転点",
  "cost.chart.avg.title": "1件あたり 平均コスト",
  "cost.chart.avg.desc": "件数が増えるほど固定費が薄まり、平均コストは下がる",
  "cost.series.human": "人手中心",
  "cost.series.ai": "AI活用",
  "cost.mark.humanBE": "人手 BE",
  "cost.mark.aiBE": "AI BE",
  "cost.mark.crossover": "逆転点",
  "cost.xAxis.cases": "月間処理件数",
  "cost.yAxis.total": "月間総コスト",
  "cost.yAxis.profit": "月間利益",
  "cost.yAxis.avg": "1件あたり平均コスト",
  "cost.table.title": "月別サマリーテーブル",
  "cost.table.human.profit": "人手 利益",
  "cost.table.ai.profit": "AI 利益",
  "cost.table.ai.advantage": "AI優位額",
  "cost.table.human.avg": "人手 平均",
  "cost.table.ai.avg": "AI 平均",
  "cost.comment.body":
    "少量案件では人手中心の方が有利な場合があります。一方で処理件数が増えるほどAI活用型の平均コストは下がり、利益率が高まりやすくなります。",
  "cost.read.list": [
    "損益分岐件数: その月間件数で利益ゼロ",
    "逆転点: これ以上の件数でAI活用の利益が人手を上回る",
    "固定費が大きいAIは、量が出ないと不利",
  ] as string[],
  "cost.assumptions.body":
    "本モデルは固定費と線形変動費のみの単純化モデルで、品質、スケール障壁、学習コスト、価格弾力性は考慮していません。",

  // Funnel page
  "funnel.group.stageCounts": "各ステージの件数",
  "funnel.warn.exceeds":
    "{stage} が前のステージ ({prev}) を超えています",
  "funnel.kpi.finalConversion": "最終転換率",
  "funnel.kpi.finalConversion.note": "問い合わせ → 拡張利用",
  "funnel.kpi.inquiryCount": "問い合わせ件数",
  "funnel.kpi.inquiryCount.note": "ファネル起点",
  "funnel.kpi.expansionCount": "拡張利用件数",
  "funnel.kpi.expansionCount.note": "最終ステージ",
  "funnel.chart.funnel.title": "案件ファネル",
  "funnel.chart.funnel.desc": "各ステージの件数と累計通過率",
  "funnel.chart.funnel.footer": "累計通過率 = 当該ステージ件数 / 問い合わせ件数",
  "funnel.chart.rates.title": "ステージ別 通過率と離脱率",
  "funnel.chart.rates.desc": "直前ステージからの遷移率を表示",
  "funnel.chart.summary.title": "ステージ別サマリー",
  "funnel.tooltip.count": "件数",
  "funnel.tooltip.overall": "累計通過率",
  "funnel.comment.body":
    "PoC開始までは進んでも、本番導入や継続利用に進む案件は大きく減少します。AI解析サービスでは、技術検証だけでなく業務実装、データ整備、運用体制が重要になります。",
  "funnel.read.list": [
    "大きな段差があるステージが改善機会",
    "PoC成功 → 本番導入の段差は業務実装・体制依存であることが多い",
    "拡張利用の増減は顧客満足・効果実証の指標",
  ] as string[],
  "funnel.assumptions.body":
    "本ファネルはサンプル値であり、自社実データに差し替えることで現実的な示唆が得られます。",

  // Industry page
  "industry.heatmap.title": "業界 × 評価軸 ヒートマップ",
  "industry.heatmap.desc": "1〜5点のスコア。総合スコアの高い順に並べ替え",
  "industry.heatmap.footer": "スコアは相対評価のサンプル値です。",
  "industry.total.title": "業界別 総合スコア",
  "industry.total.desc": "6軸合計スコアで業界を並べ替え",
  "industry.total.xAxis": "総合スコア",
  "industry.scatter.title": "規制リスク × ROI",
  "industry.scatter.desc": "右上は ROI が高く規制も厳しい業界 (潜在的高リターン × 高難易度)",
  "industry.scatter.xAxis": "規制リスク",
  "industry.scatter.yAxis": "ROI Potential",
  "industry.scatter.tooltipTpl": "{name}<br/>規制リスク: {x} / ROI: {y}",
  "industry.table.title": "業界スコアテーブル",
  "industry.comment.body":
    "製造、金融、医療はAI解析サービスの需要が大きい一方、規制や品質管理の重要性も高くなります。小売やマーケティングは、比較的導入しやすく、短期的なROIを確認しやすい領域です。",
  "industry.read.list": [
    "ヒートマップ: 濃い青=高スコア、薄い=低スコア",
    "総合スコアが高い = AI解析サービスの総合的な需要余地が大きい",
    "散布図: 右上=高ROI高規制、左上=高ROI低規制 (攻めやすい)",
  ] as string[],
  "industry.assumptions.body":
    "評価軸とスコアはサンプルであり、実際の導入検討には業界固有データと複数情報源の参照が必要です。",

  // Competitive page
  "competitive.total.title": "企業別 総合スコア",
  "competitive.total.desc": "8軸の合計点で相対比較",
  "competitive.total.xAxis": "総合スコア (合計点)",
  "competitive.radar.title": "競争力レーダーチャート",
  "competitive.radar.desc": "企業ごとの強み弱みプロファイルを重ね合わせ",
  "competitive.radar.footer":
    "レーダーの形が広いほど全方位に強く、尖っているほど特化型。",
  "competitive.grouped.title": "評価軸別 グループ比較",
  "competitive.grouped.desc": "各軸での企業間の相対差を確認",
  "competitive.strengths.title": "強み / 弱みサマリー",
  "competitive.strengths.label": "強み:",
  "competitive.weaknesses.label": "弱み:",
  "competitive.table.title": "スコアテーブル",
  "competitive.comment.body":
    "汎用AI分析プラットフォームはコスト効率や汎用性で強みがあります。一方で、規制産業や専門業界では、業界知識、説明可能性、セキュリティが競争力を左右します。",
  "competitive.read.list": [
    "合計スコアが高い = 総合力が強い (ただし特化型の価値は総合点で測れない)",
    "レーダーの形: 円に近い = バランス型 / 尖り = 特化型",
    "同一軸で全社低い場合、業界共通の構造的課題",
  ] as string[],
  "competitive.assumptions.body":
    "本企業データは架空の比較用サンプルです。実企業のスコアとは無関係であり、戦略判断には実調査が必要です。",

  // Dashboard page
  "dashboard.group.market": "市場条件",
  "dashboard.group.ai": "AI導入",
  "dashboard.group.risk": "リスク & 運用",
  "dashboard.group.funnel": "顧客ファネル",
  "dashboard.control.initialMarket": "初期市場規模",
  "dashboard.control.marketGrowth": "市場成長率",
  "dashboard.control.maxAdoption": "最大AI導入率",
  "dashboard.control.adoptionSpeed": "AI導入速度",
  "dashboard.control.adoptionCenter": "AI導入加速年",
  "dashboard.control.aiCostReduction": "AIコスト削減率",
  "dashboard.control.governance": "ガバナンス対応コスト率",
  "dashboard.control.talent": "人材不足影響度",
  "dashboard.control.regulation": "規制リスク",
  "dashboard.control.pocSuccess": "PoC成功率",
  "dashboard.control.production": "本番移行率",
  "dashboard.control.retention": "顧客継続率",
  "dashboard.kpi.marketTpl": "{year}年 市場規模指数",
  "dashboard.kpi.adoptionTpl": "{year}年 AI導入率",
  "dashboard.kpi.crossover": "AI活用 逆転件数",
  "dashboard.kpi.crossover.note": "件/月で AI > 人手",
  "dashboard.kpi.finalConversion": "最終転換率",
  "dashboard.kpi.finalConversion.note": "問い合わせ → 拡張利用",
  "dashboard.kpi.risk": "総合リスクスコア",
  "dashboard.kpi.risk.note": "0=低 / 100=高",
  "dashboard.kpi.baseNote": "標準シナリオ",
  "dashboard.chart.market.title": "市場規模予測 (悲観・標準・楽観)",
  "dashboard.chart.market.desc": "市場成長率を±5ptずつずらして3シナリオを並列表示",
  "dashboard.chart.adoption.title": "AI導入率予測",
  "dashboard.chart.adoption.desc": "最大導入率を±10ptずつずらした3シナリオ",
  "dashboard.chart.profit.title": "推定貢献度 (市場 × AI導入率 × 運用負担補正)",
  "dashboard.chart.profit.desc": "シナリオごとのビジネス貢献度の推移",
  "dashboard.chart.risk.title": "総合リスクスコア",
  "dashboard.chart.risk.desc": "規制・人材・ガバナンス・継続率・PoC成功率を合成",
  "dashboard.gauge.name": "リスクスコア",
  "dashboard.success.title": "成功条件コメント",
  "dashboard.success.list": [
    "PoC成功率と継続率が高いほど、リスクスコアは下がる",
    "規制リスク・人材不足は大きいほど実行難易度が上がる",
    "AIコスト削減率を上げると、AI貢献度の伸びが大きくなる",
    "規制リスクは市場規模と最大導入率を抑制し、楽観シナリオから外れやすくなる",
    "市場成長率と最大導入率が同時に上振れると楽観シナリオに寄る",
  ] as string[],
  "dashboard.compare.title": "シナリオ比較",
  "dashboard.compare.body":
    "グラフの上下の幅が「楽観 − 悲観」のレンジを示し、このレンジが大きいほど将来の不確実性が高いと解釈できます。標準シナリオを基準に、リスク要因 (規制・人材・ガバナンス) を抑制できれば楽観側に寄せやすくなります。",
  "dashboard.assumptions.title": "前提",
  "dashboard.assumptions.body":
    "本ダッシュボードは単純化した合成モデルで、意思決定にそのまま使える精度ではありません。方向感と感度を掴むためのツールとしてご利用ください。",
  "dashboard.yAxis.market": "市場規模指数",
  "dashboard.yAxis.adoption": "AI導入率 (%)",
  "dashboard.yAxis.profit": "推定貢献度 (仮想単位)",

  // Methodology page
  "methodology.purpose.title": "本アプリの目的",
  "methodology.purpose.body":
    "AIを活用した解析サービス分野が、市場・導入率・コスト・案件ファネル・業界需要・企業競争力の観点で、どのように変化しうるかを総合的に可視化するためのWebアプリです。パラメータを動かして傾向や感度を掴むことを目的としています。",
  "methodology.modelsHeading": "使用モデル",
  "methodology.market.title": "1. 市場成長モデル (複利)",
  "methodology.market.body":
    "単純な複利モデル。飽和、景気、政策による変動は織り込んでいないため、中長期の感度分析に使います。",
  "methodology.adoption.title": "2. AI導入率 (ロジスティック曲線)",
  "methodology.adoption.body":
    "多くの技術普及で観察されるS字カーブを近似するモデルです。初期は緩やか、中盤で急上昇し、後半は飽和します。",
  "methodology.cost.title": "3. コスト比較モデル",
  "methodology.cost.body":
    "固定費と線形変動費だけの単純化モデル。品質差、価格弾力性、スケール障壁は含めていません。",
  "methodology.funnel.title": "4. ファネル分析",
  "methodology.funnel.body":
    "各ステージの通過率と累計通過率を算出。段差の大きい箇所が改善候補です。",
  "methodology.score.title": "5. 業界スコア / 競争力スコア",
  "methodology.score.body":
    "1〜5点の定性スコアを複数軸で保持し、合計・ヒートマップ・レーダーで相対比較します。スコアは特定企業・業界の実態を示すものではなく、議論の出発点としてのサンプルです。",
  "methodology.dataNature.title": "データの性質",
  "methodology.dataNature.body":
    "本アプリで使用しているデータは、特に明記がない限り仮想のサンプルです。将来予測はシミュレーションであり、実際の市場予測ではありません。結果は傾向理解のためのものであり、投資判断や経営判断にそのまま使用しないでください。",
  "methodology.realData.title": "実データを用いる場合の注意",
  "methodology.realData.list": [
    "市場規模: 公式統計・調査会社データの定義と単位を揃える",
    "導入率: 母集団 (全企業 / 従業員数以上 / 業界限定) の定義が結果を大きく変える",
    "コスト: 人件費・ライセンス費・クラウド利用料など費用構造の切り分けを統一",
    "ファネル: ステージ定義 (PoC成功の判定基準など) を事前に合意する",
    "スコア: 主観評価は評価者間で揺れるため、複数人のレビューを推奨",
  ] as string[],
  "methodology.charts.title": "グラフの読み取り方",
  "methodology.charts.list": [
    "折れ線: 推移と傾き。スプレッド(幅)は不確実性を示唆",
    "棒グラフ: 相対比較。スケールと基準線に注意",
    "ヒートマップ: 色濃度はスコア強度。行列の並びに意味がある",
    "レーダー: 各軸の強弱プロファイル。形状で特性を把握",
    "ファネル: 上から下への通過比率。段差に改善余地",
    "ゲージ: 単一スコアの位置付け。閾値の意味を事前に定義する",
  ] as string[],

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
  "common.cases": "cases",
  "common.perMonth": "cases/mo",
  "common.score": "Score",
  "common.total": "Total",
  "common.industry": "Industry",
  "common.company": "Company",
  "common.type": "Type",
  "common.stage": "Stage",
  "common.count": "Count",
  "common.passRate": "Pass rate",
  "common.dropRate": "Drop rate",
  "common.overallRate": "Overall rate",

  "phase.early": "Early",
  "phase.growth": "Growth",
  "phase.mature": "Mature",

  "funnel.stage.inquiry": "Inquiry",
  "funnel.stage.proposal": "Initial proposal",
  "funnel.stage.poc_start": "PoC start",
  "funnel.stage.poc_success": "PoC success",
  "funnel.stage.production": "Production",
  "funnel.stage.retention": "Retention",
  "funnel.stage.expansion": "Expansion",

  "industry.manufacturing": "Manufacturing",
  "industry.finance": "Finance",
  "industry.healthcare": "Healthcare",
  "industry.retail": "Retail",
  "industry.logistics": "Logistics",
  "industry.realEstate": "Real estate",
  "industry.education": "Education",
  "industry.government": "Public sector",
  "industry.energy": "Energy",
  "industry.marketing": "Marketing",

  "axis.industry.dataVolume": "Data volume",
  "axis.industry.dataVolume.desc": "Volume of data held or generated by the industry",
  "axis.industry.automationPotential": "Automation potential",
  "axis.industry.automationPotential.desc": "Room for AI-driven automation",
  "axis.industry.regulationRisk": "Regulatory risk",
  "axis.industry.regulationRisk.desc": "Weight of regulation and compliance",
  "axis.industry.roiPotential": "ROI potential",
  "axis.industry.roiPotential.desc": "Expected short- to mid-term ROI",
  "axis.industry.aiReadiness": "AI readiness",
  "axis.industry.aiReadiness.desc": "Maturity of AI foundations in the industry",
  "axis.industry.marketGrowth": "Market growth",
  "axis.industry.marketGrowth.desc": "Growth outlook of the industry itself",

  "axis.competitive.domainKnowledge": "Domain knowledge",
  "axis.competitive.domainKnowledge.desc": "Insight into the target industry",
  "axis.competitive.dataAccess": "Data access",
  "axis.competitive.dataAccess.desc": "Access to proprietary data",
  "axis.competitive.modelQuality": "Model quality",
  "axis.competitive.modelQuality.desc": "Accuracy and reliability of AI models",
  "axis.competitive.operationCapability": "Operations",
  "axis.competitive.operationCapability.desc": "Post-launch operations and improvement",
  "axis.competitive.security": "Security",
  "axis.competitive.security.desc": "Information security posture",
  "axis.competitive.explainability": "Explainability",
  "axis.competitive.explainability.desc": "Auditability and explanation of model decisions",
  "axis.competitive.integration": "Integration",
  "axis.competitive.integration.desc": "Ease of integration with existing systems",
  "axis.competitive.costEfficiency": "Cost efficiency",
  "axis.competitive.costEfficiency.desc": "Pricing and cost efficiency",

  "companyType.generalPlatform": "General-purpose AI analytics platform",
  "companyType.manufacturingSpecialist": "Manufacturing specialist",
  "companyType.healthcareSpecialist": "Healthcare specialist",
  "companyType.biExtension": "BI-tool extension",
  "companyType.consultingIntegrated": "Consulting-integrated",

  "market.scenario.conservative": "Conservative",
  "market.scenario.conservative.desc":
    "Slow-growth case constrained by regulation and talent shortage",
  "market.scenario.base": "Base",
  "market.scenario.base.desc": "Steady growth as AI adoption becomes mainstream",
  "market.scenario.aggressive": "Aggressive",
  "market.scenario.aggressive.desc":
    "Rapid adoption driven by AI agents and automation",

  "dashboard.scenario.pessimistic": "Pessimistic",
  "dashboard.scenario.base": "Base",
  "dashboard.scenario.optimistic": "Optimistic",

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

  // Market page
  "market.group.conditions": "Market conditions",
  "market.group.scenarios": "Growth rate by scenario",
  "market.control.initialSize": "Initial market size (index)",
  "market.control.initialSize.desc":
    "Market size in the start year, expressed as an index (e.g. 100 = baseline)",
  "market.control.startYear": "Start year",
  "market.control.endYear": "End year",
  "market.control.conservativeRate": "Conservative growth rate",
  "market.control.baseRate": "Base growth rate",
  "market.control.aggressiveRate": "Aggressive growth rate",
  "market.trend.title": "Market size trajectory by scenario",
  "market.trend.desc":
    "Annual progression under compound growth across three scenarios. Y-axis is indexed to 100 in the start year.",
  "market.trend.footer":
    "Note: rates are annual. Even a few percentage points of difference compound into large spreads over time.",
  "market.trend.aria": "Line chart of market size trajectory by scenario",
  "market.final.titleTpl": "Market size by scenario in {year}",
  "market.final.desc":
    "Compare the indexed market size at the end year across scenarios",
  "market.final.aria": "Bar chart of end-year market size comparison",
  "market.yAxis.index": "Market size index (start year = 100)",
  "market.yAxis.finalTpl": "Market size index in {year}",
  "market.table.title": "Annual market size table",
  "market.table.desc": "Table to inspect and export the calculated values",
  "market.aside.aria": "Simulation parameters",
  "market.comment.title": "Analysis note",
  "market.comment.body":
    "Under the Aggressive scenario, compounding growth produces a final market size far above the Base scenario. As AI adoption rises, the market may grow non-linearly rather than along a straight line.",
  "market.read.title": "How to read",
  "market.read.list": [
    "The Y-axis is a relative index with the start year as baseline",
    "Small differences in growth rate compound into large gaps over a decade",
    "The spread between Conservative and Aggressive indicates scenario uncertainty",
  ] as string[],
  "market.assumptions.title": "Assumptions and sample data",
  "market.assumptions.body":
    "Market sizes on this page are sample inputs, not real data. The model uses simple compound growth marketSize = initial * (1 + g)^t and does not account for saturation, business cycles, or policy effects.",

  // Adoption page
  "adoption.group.logistic": "Logistic parameters",
  "adoption.group.period": "Display range",
  "adoption.control.maxRate": "Max adoption rate L",
  "adoption.control.maxRate.desc": "Long-term ceiling of the adoption rate",
  "adoption.control.speed": "Diffusion speed k",
  "adoption.control.speed.desc": "Steepness of the S-curve takeoff",
  "adoption.control.center": "Diffusion midpoint x0",
  "adoption.control.center.desc": "Year at which adoption reaches half of its ceiling",
  "adoption.control.startYear": "Start year",
  "adoption.control.endYear": "End year",
  "adoption.kpi.center": "Diffusion midpoint",
  "adoption.kpi.center.note": "Year of 50% of max adoption",
  "adoption.kpi.firstCross": "First year at 50% (estimated)",
  "adoption.kpi.firstCross.note": "First year reaching half of the ceiling",
  "adoption.kpi.finalRateTpl": "Adoption rate in {year}",
  "adoption.kpi.finalRate.note": "Final year of the displayed range",
  "adoption.chart.title": "S-curve of AI adoption",
  "adoption.chart.descTpl": "L={L}, k={k}, x0={x0}",
  "adoption.chart.footer":
    "Point colors mark phases (gray=early / blue=growth / green=mature).",
  "adoption.chart.aria": "Line chart of the AI adoption S-curve",
  "adoption.chart.markLine": "Diffusion midpoint",
  "adoption.chart.series": "AI adoption rate",
  "adoption.yAxis": "AI adoption rate (%)",
  "adoption.table.title": "Annual adoption rate table",
  "adoption.table.phase": "Phase",
  "adoption.table.rate": "Adoption rate",
  "adoption.aside.aria": "Parameter controls",
  "adoption.comment.body":
    "Adoption is slow in the early phase and rises quickly after a certain point. In this model, the midpoint year ({year}) represents the acceleration phase.",
  "adoption.read.list": [
    "L sets the long-term ceiling, k the steepness, x0 the inflection point",
    "Phases: Early (<20%), Growth, Mature (>80%)",
    "A larger k yields a sharper acceleration",
  ] as string[],
  "adoption.assumptions.body":
    "This is a sample simulation using a single logistic function. Real-world adoption is influenced by regulation, economic cycles, competition, and industry traits.",

  // Cost page
  "cost.group.range": "Case volume range",
  "cost.group.human": "Human-led costs",
  "cost.group.ai": "AI-assisted costs",
  "cost.control.minCases": "Min cases/month",
  "cost.control.maxCases": "Max cases/month",
  "cost.control.step": "Step",
  "cost.control.fixed": "Fixed cost/month",
  "cost.control.perCaseCost": "Variable cost per case",
  "cost.control.perCaseRevenue": "Revenue per case",
  "cost.kpi.humanBE": "Human break-even cases",
  "cost.kpi.aiBE": "AI break-even cases",
  "cost.kpi.crossover": "AI-advantage threshold",
  "cost.kpi.crossover.note": "Above this volume AI outperforms human",
  "cost.kpi.unit": "cases/mo",
  "cost.chart.cost.title": "Total cost by monthly volume",
  "cost.chart.cost.desc": "Total cost (fixed + variable) comparison",
  "cost.chart.profit.title": "Profit by monthly volume (break-even and crossover)",
  "cost.chart.profit.desc":
    "Dashed lines mark per-model break-even and the AI-vs-human profit crossover",
  "cost.chart.avg.title": "Average cost per case",
  "cost.chart.avg.desc":
    "Fixed cost is amortized as volume grows, lowering the per-case average",
  "cost.series.human": "Human-led",
  "cost.series.ai": "AI-assisted",
  "cost.mark.humanBE": "Human BE",
  "cost.mark.aiBE": "AI BE",
  "cost.mark.crossover": "Crossover",
  "cost.xAxis.cases": "Monthly case volume",
  "cost.yAxis.total": "Total cost per month",
  "cost.yAxis.profit": "Profit per month",
  "cost.yAxis.avg": "Average cost per case",
  "cost.table.title": "Monthly summary table",
  "cost.table.human.profit": "Human profit",
  "cost.table.ai.profit": "AI profit",
  "cost.table.ai.advantage": "AI advantage",
  "cost.table.human.avg": "Human avg",
  "cost.table.ai.avg": "AI avg",
  "cost.comment.body":
    "At low volumes, the human-led model can be more favorable. As volume grows, the AI-assisted average cost falls and profitability tends to improve.",
  "cost.read.list": [
    "Break-even: the volume at which profit is zero",
    "Crossover: volumes above this favor AI over human",
    "AI with high fixed costs is disadvantaged when volume is small",
  ] as string[],
  "cost.assumptions.body":
    "This is a simplified model with only fixed cost and linear variable cost. It does not capture quality, scale barriers, learning cost, or price elasticity.",

  // Funnel page
  "funnel.group.stageCounts": "Stage counts",
  "funnel.warn.exceeds": "{stage} exceeds the previous stage ({prev})",
  "funnel.kpi.finalConversion": "Final conversion rate",
  "funnel.kpi.finalConversion.note": "Inquiry → Expansion",
  "funnel.kpi.inquiryCount": "Inquiry count",
  "funnel.kpi.inquiryCount.note": "Funnel entry",
  "funnel.kpi.expansionCount": "Expansion count",
  "funnel.kpi.expansionCount.note": "Final stage",
  "funnel.chart.funnel.title": "Deal funnel",
  "funnel.chart.funnel.desc": "Count and overall conversion rate per stage",
  "funnel.chart.funnel.footer":
    "Overall rate = stage count / inquiry count",
  "funnel.chart.rates.title": "Pass and drop rates by stage",
  "funnel.chart.rates.desc": "Stage-to-stage transition rates",
  "funnel.chart.summary.title": "Stage summary",
  "funnel.tooltip.count": "Count",
  "funnel.tooltip.overall": "Overall rate",
  "funnel.comment.body":
    "Deals often reach PoC start, but those progressing to production and retention drop sharply. In AI analytics services, beyond technical validation, implementation, data readiness, and operations are decisive.",
  "funnel.read.list": [
    "Large gaps between stages are improvement opportunities",
    "PoC success → production gap often reflects implementation and organizational capability",
    "Movement in Expansion indicates customer satisfaction and demonstrated value",
  ] as string[],
  "funnel.assumptions.body":
    "This funnel uses sample values. Substituting your own data yields more actionable insights.",

  // Industry page
  "industry.heatmap.title": "Industry × axis heatmap",
  "industry.heatmap.desc":
    "Scores 1–5, sorted by total score in descending order",
  "industry.heatmap.footer":
    "Scores are sample values expressing relative evaluations.",
  "industry.total.title": "Total score by industry",
  "industry.total.desc": "Industries sorted by the sum of six axes",
  "industry.total.xAxis": "Total score",
  "industry.scatter.title": "Regulatory risk × ROI",
  "industry.scatter.desc":
    "Upper right: high ROI and heavy regulation (high potential return × high difficulty)",
  "industry.scatter.xAxis": "Regulatory risk",
  "industry.scatter.yAxis": "ROI potential",
  "industry.scatter.tooltipTpl": "{name}<br/>Regulatory risk: {x} / ROI: {y}",
  "industry.table.title": "Industry score table",
  "industry.comment.body":
    "Manufacturing, finance, and healthcare show strong demand for AI analytics, alongside higher regulatory and quality stakes. Retail and marketing are relatively easier to adopt with shorter ROI timelines.",
  "industry.read.list": [
    "Heatmap: darker blue = higher score, lighter = lower",
    "Higher total score = larger overall demand potential",
    "Scatter: upper right = high ROI and regulation, upper left = high ROI and low regulation (easier to target)",
  ] as string[],
  "industry.assumptions.body":
    "Axes and scores are samples. Real adoption decisions require industry-specific data and cross-referenced sources.",

  // Competitive page
  "competitive.total.title": "Total score by company",
  "competitive.total.desc": "Relative comparison using the sum of eight axes",
  "competitive.total.xAxis": "Total score (sum)",
  "competitive.radar.title": "Competitive radar",
  "competitive.radar.desc":
    "Overlays the strengths and weaknesses profile of each company",
  "competitive.radar.footer":
    "A wider radar indicates all-round strength; a pointed shape indicates specialization.",
  "competitive.grouped.title": "Axis-by-axis comparison",
  "competitive.grouped.desc":
    "Compare relative differences between companies on each axis",
  "competitive.strengths.title": "Strengths / Weaknesses summary",
  "competitive.strengths.label": "Strengths:",
  "competitive.weaknesses.label": "Weaknesses:",
  "competitive.table.title": "Score table",
  "competitive.comment.body":
    "General-purpose AI analytics platforms tend to lead in cost efficiency and breadth. In regulated or specialized industries, domain knowledge, explainability, and security often determine competitiveness.",
  "competitive.read.list": [
    "High total = strong overall (though specialization cannot be reduced to a single number)",
    "Radar shape: close to a circle = balanced; pointed = specialized",
    "A low score across all companies on an axis hints at a structural industry challenge",
  ] as string[],
  "competitive.assumptions.body":
    "Company data is a fictional comparison sample. It bears no relation to real companies; strategic decisions require primary research.",

  // Dashboard page
  "dashboard.group.market": "Market conditions",
  "dashboard.group.ai": "AI adoption",
  "dashboard.group.risk": "Risk & operations",
  "dashboard.group.funnel": "Customer funnel",
  "dashboard.control.initialMarket": "Initial market size",
  "dashboard.control.marketGrowth": "Market growth rate",
  "dashboard.control.maxAdoption": "Max AI adoption rate",
  "dashboard.control.adoptionSpeed": "AI adoption speed",
  "dashboard.control.adoptionCenter": "AI acceleration year",
  "dashboard.control.aiCostReduction": "AI cost reduction",
  "dashboard.control.governance": "Governance cost ratio",
  "dashboard.control.talent": "Talent-shortage impact",
  "dashboard.control.regulation": "Regulatory risk",
  "dashboard.control.pocSuccess": "PoC success rate",
  "dashboard.control.production": "Production conversion",
  "dashboard.control.retention": "Customer retention",
  "dashboard.kpi.marketTpl": "{year} market size index",
  "dashboard.kpi.adoptionTpl": "{year} AI adoption rate",
  "dashboard.kpi.crossover": "AI-advantage threshold",
  "dashboard.kpi.crossover.note": "Above this cases/mo AI > human",
  "dashboard.kpi.finalConversion": "Final conversion rate",
  "dashboard.kpi.finalConversion.note": "Inquiry → Expansion",
  "dashboard.kpi.risk": "Composite risk score",
  "dashboard.kpi.risk.note": "0 = low / 100 = high",
  "dashboard.kpi.baseNote": "Base scenario",
  "dashboard.chart.market.title": "Market-size forecast (Pessimistic / Base / Optimistic)",
  "dashboard.chart.market.desc":
    "Three scenarios with the growth rate offset by ±5 percentage points",
  "dashboard.chart.adoption.title": "AI adoption forecast",
  "dashboard.chart.adoption.desc":
    "Three scenarios with the max adoption rate offset by ±10 percentage points",
  "dashboard.chart.profit.title":
    "Estimated contribution (market × adoption × operations adjustment)",
  "dashboard.chart.profit.desc": "Business contribution trajectory per scenario",
  "dashboard.chart.risk.title": "Composite risk score",
  "dashboard.chart.risk.desc":
    "Composite of regulation, talent, governance, retention, and PoC success",
  "dashboard.gauge.name": "Risk score",
  "dashboard.success.title": "Success factors",
  "dashboard.success.list": [
    "Higher PoC success and retention lower the risk score",
    "Regulatory and talent constraints raise execution difficulty",
    "Higher AI cost reduction amplifies the AI-driven contribution",
    "Regulatory risk suppresses both market size and max adoption, pulling the projection away from Optimistic",
    "Simultaneous upside in growth rate and max adoption pushes toward Optimistic",
  ] as string[],
  "dashboard.compare.title": "Scenario comparison",
  "dashboard.compare.body":
    "The vertical spread of the chart represents the Optimistic−Pessimistic range; a wider spread implies greater future uncertainty. Relative to the Base scenario, controlling risk factors (regulation, talent, governance) tends to shift outcomes toward the Optimistic side.",
  "dashboard.assumptions.title": "Assumptions",
  "dashboard.assumptions.body":
    "This dashboard is a simplified composite model, not at a precision usable for direct decisions. Use it to build intuition about directionality and sensitivity.",
  "dashboard.yAxis.market": "Market size index",
  "dashboard.yAxis.adoption": "AI adoption rate (%)",
  "dashboard.yAxis.profit": "Estimated contribution (hypothetical unit)",

  // Methodology page
  "methodology.purpose.title": "Purpose of this app",
  "methodology.purpose.body":
    "A web app that visualizes how the AI-driven analytics services sector could evolve across market, adoption, cost, deal funnel, industry demand, and competitive dimensions. The goal is to build intuition and sensitivity by adjusting parameters.",
  "methodology.modelsHeading": "Models used",
  "methodology.market.title": "1. Market growth model (compound)",
  "methodology.market.body":
    "A simple compound-growth model. Saturation, business cycles, and policy are not modeled, so it is best used for mid-to-long term sensitivity analysis.",
  "methodology.adoption.title": "2. AI adoption (logistic curve)",
  "methodology.adoption.body":
    "Approximates the S-curve commonly observed in technology diffusion: slow early, steep in the middle, and saturating late.",
  "methodology.cost.title": "3. Cost comparison model",
  "methodology.cost.body":
    "A simplified model with only fixed cost and linear variable cost. Quality differences, price elasticity, and scale barriers are excluded.",
  "methodology.funnel.title": "4. Funnel analysis",
  "methodology.funnel.body":
    "Computes stage-to-stage pass rates and cumulative rates. Stages with large drop-offs are candidates for improvement.",
  "methodology.score.title": "5. Industry and competitive scores",
  "methodology.score.body":
    "Qualitative scores of 1–5 across multiple axes, compared by totals, heatmaps, and radars. Scores do not represent real entities and are meant as starting points for discussion.",
  "methodology.dataNature.title": "Nature of the data",
  "methodology.dataNature.body":
    "Unless otherwise stated, all data in this app is fictional sample data. Forecasts are simulations, not real market predictions. Results are for directional understanding only and should not be used as a basis for investment or management decisions.",
  "methodology.realData.title": "Notes when using real data",
  "methodology.realData.list": [
    "Market size: align definitions and units across official statistics or research sources",
    "Adoption rate: the definition of the population (all companies / company size / industry subset) greatly changes the result",
    "Cost: standardize the split of labor, licensing, and cloud cost",
    "Funnel: align stage definitions (e.g. PoC success criteria) beforehand",
    "Scores: qualitative judgments vary across evaluators; peer review is recommended",
  ] as string[],
  "methodology.charts.title": "How to read the charts",
  "methodology.charts.list": [
    "Line: trend and slope; spread implies uncertainty",
    "Bar: relative comparison; mind the scale and baseline",
    "Heatmap: color intensity = score magnitude; row/column order carries meaning",
    "Radar: shape of axes shows profile strengths and weaknesses",
    "Funnel: top-to-bottom pass ratios; large drops indicate improvement potential",
    "Gauge: position of a single score; pre-define threshold meaning",
  ] as string[],

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
