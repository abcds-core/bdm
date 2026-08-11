import { useEffect, useRef, useState } from "react";
import { TabulatorFull as Tabulator } from "tabulator-tables";
import { Download } from "lucide-react";
import Panel from "../components/Panel";
import "tabulator-tables/dist/css/tabulator.min.css";
import "./Dictionary.css";
import codebook from "../data/codebook.json";
import variables from "../data/variables.json";

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

const DOMAIN_NAMES = {
  "Medications Health History Worksheet": "Medications",
};

const changeDomainName = (domain) => DOMAIN_NAMES[domain] || domain;

const DOMAINS = [
  ...new Set(codebook.map((d) => changeDomainName(d.dd_crf_label))),
].sort((a, b) => a.localeCompare(b, undefined, { sensitivity: "base" }));

export default function Dictionary() {
  const tableRef = useRef(null);
  const tabulatorRef = useRef(null);
  const [selectedDomain, setSelectedDomain] = useState("");
  const [selectedVariables, setSelectedVariables] = useState([]);
  const [selectedCount, setSelectedCount] = useState(0);

  const excludedFields = [
    "subject_label",
    "event_sequence",
    "language_code",
    "language_label",
  ];

  const buttonColors = [
    "quickButtonGreen",
    "quickButtonPurple",
    "quickButtonBlue",
    "quickButtonOrange",
    "quickButtonRed",
    "quickButtonPink",
  ];

  useEffect(() => {
    if (selectedDomain === "") {
      // All domains: show one button for each domain
      setSelectedVariables(
        Object.keys(variables).map((domain, index) => ({
          text: domain,
          domain: domain,
          colorClass: buttonColors[index % buttonColors.length],
        })),
      );
      return;
    }

    // Specific domain: show its categories
    const shuffledColors = [...buttonColors].sort(() => Math.random() - 0.5);

    const domainVariables = variables[selectedDomain] || {};

    setSelectedVariables(
      Object.keys(domainVariables).map((category, index) => ({
        text: category,
        variables: domainVariables[category],
        colorClass: shuffledColors[index % shuffledColors.length],
      })),
    );
  }, [selectedDomain]);

  const selectDomain = (domain) => {
    const fields = Object.values(variables[domain] || {}).flat();

    selectFields(fields);
  };

  const selectFields = (fields) => {
    fields.forEach((field) => {
      const rows = tabulatorRef.current
        .getRows()
        .filter((row) => row.getData().field_name === field);

      rows.forEach((row) => row.select());
    });
  };

  const cleanedCodebook = codebook
    .filter((item) => !excludedFields.includes(item.field_name))
    .map((item) => ({
      ...item,
      _original_dd_crf_label: item.dd_crf_label,
      dd_crf_label: changeDomainName(item.dd_crf_label),
      field_question: item.field_question
        ?.replace(/^\d+[a-zA-Z]?\.\s*/, "")
        // .replace(/^Set\s+[A-Za-z]\s*[-:]\s*/, "") Needs adjusting....
        .trim(),
    }));

  useEffect(() => {
    tabulatorRef.current = new Tabulator(tableRef.current, {
      data: cleanedCodebook,
      selectableRows: true,
      height: "480px",
      movableColumns: true,
      columnDefaults: { tooltip: true },
      columns: [
        {
          formatter: "rowSelection",
          titleFormatter: "rowSelection",
          hozAlign: "center",
          headerSort: false,
          width: 44,
          titleFormatterParams: {
            rowRange: "active",
          },
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

    // Changes dd_crf_label back to the original
    const downloadRows = selectedRows.map((row) => {
      const { _original_dd_crf_label, ...downloadRow } = row;

      return {
        ...downloadRow,
        dd_crf_label: _original_dd_crf_label,
      };
    });

    const csv = rowsToCsv(downloadRows);
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
      {/* Selected Domains */}
      {selectedVariables.length > 0 && <p>Quick Select Buttons</p>}
      <div className="quickButtonsContainer">
        {selectedVariables.map((item, index) => (
          <button
            key={index}
            onClick={() =>
              selectedDomain === ""
                ? selectDomain(item.domain)
                : selectFields(item.variables)
            }
            className={`quickButton ${item.colorClass}`}
          >
            {item.text}
          </button>
        ))}
      </div>
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
