import { useEffect, useRef, useState } from "react";
import { TabulatorFull as Tabulator } from "tabulator-tables";
import { Download } from "lucide-react";
import Panel from "../components/Panel";
import "tabulator-tables/dist/css/tabulator.min.css";
import "./Dictionary.css";
import codebook from "../data/codebook.json";

function rowsToCsv(rows) {
  const headers = Object.keys(rows[0]);
  const lines = [
    headers.map(csvEscape).join(","),
    ...rows.map((row) => headers.map((h) => csvEscape(row[h])).join(",")),
  ];
  return lines.join("\n");
}

function csvEscape(val) {
  const str = String(val ?? "");
  return /[",\n]/.test(str) ? `"${str.replace(/"/g, '""')}"` : str;
}

const DOMAINS = [...new Set(codebook.map((d) => d.dd_crf_label))].sort((a, b) =>
  a.localeCompare(b, undefined, { sensitivity: "base" }),
);

export default function Dictionary() {
  const tableRef = useRef(null);
  const tabulatorRef = useRef(null);
  const [selectedDomain, setSelectedDomain] = useState("");
  const [selectedCount, setSelectedCount] = useState(0);

  useEffect(() => {
    tabulatorRef.current = new Tabulator(tableRef.current, {
      data: codebook,
      selectableRows: true,
      height: "480px",
      movableColumns: true,
      initialSort: [{ column: "field_name", dir: "asc" }],
      columnDefaults: { tooltip: true },
      columns: [
        {
          formatter: "rowSelection",
          titleFormatter: "rowSelection",
          hozAlign: "center",
          headerSort: false,
          width: 44,
        },
        { title: "Variable", field: "field_name", widthGrow: 1.2 },
        { title: "Label", field: "field_question", widthGrow: 2 },
        { title: "Domain", field: "dd_crf_label", widthGrow: 1.2 },
      ],
    });

    tabulatorRef.current.on("rowSelectionChanged", (data) => {
      setSelectedCount(data.length);
    });

    return () => {
      tabulatorRef.current?.destroy();
      tabulatorRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (!tabulatorRef.current) return;
    if (selectedDomain) {
      tabulatorRef.current.setFilter("dd_crf_label", "=", selectedDomain);
    } else {
      tabulatorRef.current.clearFilter();
    }
  }, [selectedDomain]);

  function handleDownload() {
    const selectedRows = tabulatorRef.current?.getSelectedData() ?? [];
    if (selectedRows.length === 0) {
      alert("Select at least one variable.");
      return;
    }
    const csv = rowsToCsv(selectedRows);
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "selected_variables.csv";
    link.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="app__content">
      <Panel title="Browse study variables and export a selection">
        <div className="dictionary__toolbar">
          <div className="dictionary__field">
            <label htmlFor="domain">Domain</label>
            <select
              id="domain"
              value={selectedDomain}
              onChange={(e) => setSelectedDomain(e.target.value)}
            >
              <option value="">All domains</option>
              {DOMAINS.map((label) => (
                <option key={label} value={label}>
                  {label}
                </option>
              ))}
            </select>
          </div>

          <button
            id="download-btn"
            className="dictionary__download-btn"
            onClick={handleDownload}
          >
            <Download size={15} />
            Download{selectedCount > 0 ? ` (${selectedCount})` : ""}
          </button>
        </div>

        <div id="variable-table" ref={tableRef} className="dictionary__table" />
      </Panel>
    </div>
  );
}
