import React from "react";

function Analysis({ df }) {
  if (!df) {
    return <h2>No CSV uploaded yet! Go to Home page.</h2>;
  }

  return (
    <div className="page analysis">
      <h2>First 5 Rows</h2>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              {df.columns.map((col) => (
                <th key={col}>{col}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {df.head().data.map((row, idx) => (
              <tr key={idx}>
                {df.columns.map((col) => (
                  <td key={col}>{row[col]}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2>Data Summary (Describe)</h2>
      <div className="summary-container">
        <pre>{JSON.stringify(df.describe(), null, 2)}</pre>
      </div>
    </div>
  );
}

export default Analysis;
