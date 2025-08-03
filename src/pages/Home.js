import React from "react";
import { useNavigate } from "react-router-dom";
import { readCSV } from "csv_file_analizer";

function Home({ setDf, addHistory }) {
  const navigate = useNavigate();

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const csvText = event.target.result;
      const dataframe = readCSV(csvText);
      setDf(dataframe);

      // Add to history
      addHistory({
        fileName: file.name,
        time: new Date().toLocaleString(),
        rows: dataframe.shape[0],
      });

      navigate("/analysis");
    };
    reader.readAsText(file);
  };

  return (
    <div
      className="home-page"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "10px",
        backgroundColor: "#f5f6fa",
        padding: "10px",
      }}>
      <h2
        style={{ marginBottom: "30px", fontSize: "2rem", fontWeight: "bold" }}>
        Upload Your CSV File
      </h2>

      {/* Upload Box */}
      <div
        style={{
          border: "2px dashed #3498db",
          borderRadius: "12px",
          padding: "10px",
          width: "60%",
          maxWidth: "600px",
          textAlign: "center",
          background: "#ffffff",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        }}>
        <div style={{ fontSize: "64px", marginBottom: "20px" }}>📂</div>
        <p style={{ fontSize: "1.1rem", marginBottom: "20px" }}>
          Drag & Drop your CSV file here
          <br /> or click the button below
        </p>

        <label
          style={{
            display: "inline-block",
            backgroundColor: "#3498db",
            color: "#fff",
            padding: "12px",
            fontSize: "1rem",
            borderRadius: "8px",
            cursor: "pointer",
            transition: "all 0.3s",
          }}>
          Click to Upload CSV
          <input type="file" accept=".csv" onChange={handleFileUpload} hidden />
        </label>

        <p style={{ fontSize: "0.85rem", color: "#777", marginTop: "15px" }}>
          Supported formats: <b>.csv</b> | Max size: 50MB
        </p>
      </div>
    </div>
  );
}

export default Home;
