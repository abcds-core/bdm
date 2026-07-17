let table;

async function init() {
  let data;
  try {
    const response = await fetch("codebook.json");
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    data = await response.json();
  } catch (err) {
    console.error("Failed to load codebook.json:", err);
    alert("Could not load variable data. Please refresh and try again.");
    return;
  }

  table = new Tabulator("#variable-table", {
    data: data,
    // layout: "fitColumns",
    selectableRows: true,
    pagination: "local", //paginate the data
    paginationSize: 7, //allow 7 rows per page of data
    paginationCounter: "rows", //display count of paginated rows in footer
    movableColumns: true, //allow column order to be changed
    initialSort: [
      //set the initial sort order of the data
      { column: "name", dir: "asc" },
    ],
    columnDefaults: {
      tooltip: true, //show tool tips on cells
    },

    columns: [
      {
        formatter: "rowSelection",
        titleFormatter: "rowSelection",
        hozAlign: "center",
        headerSort: false,
        width: 50,
      },
      { title: "Variable", field: "field_name" },
      { title: "Label", field: "field_question" },
      { title: "Domain", field: "dd_crf_label" },
    ],
  });

  document.getElementById("domain").addEventListener("change", (event) => {
    const domain = event.target.value;

    table.setFilter("dd_crf_label", "=", domain);
  });

  document.getElementById("download-btn").addEventListener("click", () => {
    const selectedRows = table.getSelectedData();

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
  });

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
}

init();

async function loadDomains() {
  const response = await fetch("codebook.json");
  const codebook = await response.json();

  const domains = [...new Set(codebook.map((d) => d.dd_crf_label))].sort(
    (a, b) => a.localeCompare(b, undefined, { sensitivity: "base" }),
  );

  const select = document.getElementById("domain");

  select.replaceChildren(...domains.map((label) => new Option(label, label)));
}

loadDomains();
