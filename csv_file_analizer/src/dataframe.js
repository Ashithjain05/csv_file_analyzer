class DataFrame {
  constructor(data) {
    this.data = Array.isArray(data) ? data : [];
  }

  static fromCSV(csvString) {
    const [headerLine, ...lines] = csvString.trim().split("\n");
    const headers = headerLine.split(",").map((h) => h.trim());

    const data = lines.map((line) => {
      const values = line.split(",").map((v) => v.trim());
      const row = {};
      headers.forEach((header, i) => {
        const num = Number(values[i]);
        row[header] = isNaN(num) ? values[i] : num;
      });
      return row;
    });

    return new DataFrame(data);
  }

  toCSV() {
    if (this.data.length === 0) return "";
    const headers = Object.keys(this.data[0]);
    const rows = this.data.map((row) => headers.map((h) => row[h]).join(","));
    return [headers.join(","), ...rows].join("\n");
  }

  head(n = 5) {
    return new DataFrame(this.data.slice(0, n));
  }

  tail(n = 5) {
    return new DataFrame(this.data.slice(-n));
  }

  get shape() {
    return [this.data.length, this.columns.length];
  }

  get columns() {
    return this.data[0] ? Object.keys(this.data[0]) : [];
  }

  row(index) {
    return this.data[index] || null;
  }

  column(name) {
    if (!this.data[0] || !(name in this.data[0])) return [];
    return this.data.map((row) => row[name]);
  }

  describe() {
    const result = {};
    const keys = this.columns;

    keys.forEach((key) => {
      const nums = this.data
        .map((row) => row[key])
        .filter((v) => typeof v === "number");
      if (nums.length) {
        result[key] = {
          count: nums.length,
          mean: (nums.reduce((a, b) => a + b, 0) / nums.length).toFixed(2),
          min: Math.min(...nums),
          max: Math.max(...nums),
        };
      }
    });

    return result;
  }

  info() {
    console.log("DataFrame Info:");
    console.log(`Rows: ${this.data.length}`);
    console.log(`Columns: ${this.columns.length}`);

    this.columns.forEach((col) => {
      const types = new Set(this.data.map((row) => typeof row[col]));
      console.log(`- ${col}: ${[...types].join(", ")}`);
    });

    const approxMemory = JSON.stringify(this.data).length;
    console.log(`Estimated memory usage: ${approxMemory} bytes`);
  }

  filter(callback) {
    const filteredData = this.data.filter(callback);
    return new DataFrame(filteredData);
  }

  sortBy(columnName, ascending = true) {
    if (!this.columns.includes(columnName)) {
      console.warn(`Column "${columnName}" not found.`);
      return new DataFrame([...this.data]);
    }

    const sorted = [...this.data].sort((a, b) => {
      if (a[columnName] < b[columnName]) return ascending ? -1 : 1;
      if (a[columnName] > b[columnName]) return ascending ? 1 : -1;
      return 0;
    });

    return new DataFrame(sorted);
  }
}

export default DataFrame;
