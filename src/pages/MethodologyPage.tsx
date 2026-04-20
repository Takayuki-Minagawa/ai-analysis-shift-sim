import { PageTitle } from "../components/common/PageTitle";
import { InfoBox } from "../components/common/InfoBox";
import { useLanguage } from "../i18n/LanguageContext";
import styles from "./MethodologyPage.module.css";

export function MethodologyPage() {
  const { t } = useLanguage();
  return (
    <>
      <PageTitle
        title={t("page.methodology.title")}
        subtitle={t("page.methodology.subtitle")}
      />

      <InfoBox title="本アプリの目的" variant="info">
        <p>
          AIを活用した解析サービス分野が、市場・導入率・コスト・案件ファネル・業界需要・企業競争力の観点で、
          どのように変化しうるかを総合的に可視化するためのWebアプリです。
          パラメータを動かして傾向や感度を掴むことを目的としています。
        </p>
      </InfoBox>

      <section className={styles.section}>
        <h2 className={styles.heading}>使用モデル</h2>

        <div className={styles.modelBlock}>
          <h3>1. 市場成長モデル (複利)</h3>
          <pre className={styles.code}>
{`marketSize(t) = initialMarketSize × (1 + growthRate) ^ t
  t       : 開始年からの経過年数 (0, 1, 2, ...)
  growth  : Conservative 8% / Base 15% / Aggressive 25% (初期値)`}
          </pre>
          <p>
            単純な複利モデル。飽和、景気、政策による変動は織り込んでいないため、中長期の感度分析に使います。
          </p>
        </div>

        <div className={styles.modelBlock}>
          <h3>2. AI導入率 (ロジスティック曲線)</h3>
          <pre className={styles.code}>
{`adoption(t) = L / (1 + exp(-k × (year - x0)))
  L  : 最大導入率 (例 0.85)
  k  : 普及速度 (曲線の急峻さ)
  x0 : 普及中心年 (導入率が L/2 に達する年)`}
          </pre>
          <p>
            多くの技術普及で観察されるS字カーブを近似するモデルです。
            初期は緩やか、中盤で急上昇し、後半は飽和します。
          </p>
        </div>

        <div className={styles.modelBlock}>
          <h3>3. コスト比較モデル</h3>
          <pre className={styles.code}>
{`totalCost = fixedCost + costPerCase × monthlyCases
revenue   = revenuePerCase × monthlyCases
profit    = revenue − totalCost
breakEven = fixedCost / (revenuePerCase − costPerCase)`}
          </pre>
          <p>
            固定費と線形変動費だけの単純化モデル。品質差、価格弾力性、スケール障壁は含めていません。
          </p>
        </div>

        <div className={styles.modelBlock}>
          <h3>4. ファネル分析</h3>
          <pre className={styles.code}>
{`passRate(i)     = stage(i).count / stage(i-1).count
overallRate(i)  = stage(i).count / stage(0).count`}
          </pre>
          <p>各ステージの通過率と累計通過率を算出。段差の大きい箇所が改善候補です。</p>
        </div>

        <div className={styles.modelBlock}>
          <h3>5. 業界スコア / 競争力スコア</h3>
          <p>
            1〜5点の定性スコアを複数軸で保持し、合計・ヒートマップ・レーダーで相対比較します。
            スコアは特定企業・業界の実態を示すものではなく、議論の出発点としてのサンプルです。
          </p>
        </div>
      </section>

      <InfoBox title="データの性質" variant="warn">
        <p>
          本アプリで使用しているデータは、特に明記がない限り仮想のサンプルです。
          将来予測はシミュレーションであり、実際の市場予測ではありません。
          結果は傾向理解のためのものであり、投資判断や経営判断にそのまま使用しないでください。
        </p>
      </InfoBox>

      <InfoBox title="実データを用いる場合の注意" variant="hint">
        <ul>
          <li>市場規模: 公式統計・調査会社データの定義と単位を揃える</li>
          <li>導入率: 母集団 (全企業 / 従業員数以上 / 業界限定) の定義が結果を大きく変える</li>
          <li>コスト: 人件費・ライセンス費・クラウド利用料など費用構造の切り分けを統一</li>
          <li>ファネル: ステージ定義 (PoC成功の判定基準など) を事前に合意する</li>
          <li>スコア: 主観評価は評価者間で揺れるため、複数人のレビューを推奨</li>
        </ul>
      </InfoBox>

      <InfoBox title="グラフの読み取り方">
        <ul>
          <li>折れ線: 推移と傾き。スプレッド(幅)は不確実性を示唆</li>
          <li>棒グラフ: 相対比較。スケールと基準線に注意</li>
          <li>ヒートマップ: 色濃度はスコア強度。行列の並びに意味がある</li>
          <li>レーダー: 各軸の強弱プロファイル。形状で特性を把握</li>
          <li>ファネル: 上から下への通過比率。段差に改善余地</li>
          <li>ゲージ: 単一スコアの位置付け。閾値の意味を事前に定義する</li>
        </ul>
      </InfoBox>
    </>
  );
}
