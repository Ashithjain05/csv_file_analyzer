import React from "react";

function History({ history }) {
  return (
    <div className="page history">
      <h2>📜 Upload History</h2>

      {history.length === 0 ? (
        <p>No files uploaded yet.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>File Name</th>
              <th>Upload Time</th>
              <th>Rows</th>
            </tr>
          </thead>
          <tbody>
            {history.map((item, idx) => (
              <tr key={idx}>
                <td>{item.fileName}</td>
                <td>{item.time}</td>
                <td>{item.rows}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default History;
