export type CsvRow = Record<string, string | number>;

const escapeCell = (value: string | number): string => {
  const text = String(value);
  if (/[",\n\r]/.test(text)) {
    return `"${text.replace(/"/g, '""')}"`;
  }
  return text;
};

export function rowsToCsv(rows: CsvRow[], headers?: string[]): string {
  if (rows.length === 0) return "";
  const keys = headers ?? Object.keys(rows[0]);
  const lines = [keys.map(escapeCell).join(",")];
  for (const row of rows) {
    lines.push(keys.map((k) => escapeCell(row[k] ?? "")).join(","));
  }
  return lines.join("\r\n");
}

export function downloadCsv(rows: CsvRow[], filename: string, headers?: string[]): void {
  const csv = rowsToCsv(rows, headers);
  // UTF-8 BOM for Excel compatibility
  const blob = new Blob(["\uFEFF", csv], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
