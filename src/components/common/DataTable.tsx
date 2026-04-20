import { ReactNode } from "react";
import styles from "./DataTable.module.css";

export type DataTableColumn<Row> = {
  key: string;
  header: string;
  align?: "left" | "right" | "center";
  render: (row: Row) => ReactNode;
};

type Props<Row> = {
  columns: DataTableColumn<Row>[];
  rows: Row[];
  caption?: string;
  maxHeight?: number;
};

export function DataTable<Row>({ columns, rows, caption, maxHeight }: Props<Row>) {
  return (
    <div
      className={styles.wrapper}
      style={maxHeight ? { maxHeight, overflow: "auto" } : undefined}
    >
      <table className={styles.table}>
        {caption ? <caption className={styles.caption}>{caption}</caption> : null}
        <thead>
          <tr>
            {columns.map((c) => (
              <th key={c.key} style={{ textAlign: c.align ?? "left" }}>
                {c.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i}>
              {columns.map((c) => (
                <td key={c.key} style={{ textAlign: c.align ?? "left" }}>
                  {c.render(row)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
