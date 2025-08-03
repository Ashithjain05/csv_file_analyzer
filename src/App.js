import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.js";
import Footer from "./components/Footer.js";
import Home from "./pages/Home.js";
import Analysis from "./pages/Analysis.js";
import History from "./pages/History.js";
import "./App.css";

function App() {
  const [df, setDf] = useState(null);
  const [history, setHistory] = useState([]);

  const addHistory = (entry) => {
    setHistory((prev) => [...prev, entry]);
  };

  return (
    <Router>
      <div className="app-container">
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route
              path="/"
              element={<Home setDf={setDf} addHistory={addHistory} />}
            />
            <Route path="/analysis" element={<Analysis df={df} />} />
            <Route path="/history" element={<History history={history} />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
