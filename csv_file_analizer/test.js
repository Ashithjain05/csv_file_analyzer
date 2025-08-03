import DataFrame, { readCSV } from "./index.js";

const csv = "name,age\nAshi,23\nJohn,30";
const df = readCSV(csv);

console.log("Head:", df.head().data);
console.log("Describe:", df.describe());
df.info();
