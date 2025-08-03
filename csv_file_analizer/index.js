import DataFrame from "./src/dataframe.js";

// Helper function to read CSV
export function readCSV(csvText) {
  return DataFrame.fromCSV(csvText);
}

export function toCSV(df) {
  return df.toCSV();
}

// Export DataFrame class as default
export default DataFrame;
