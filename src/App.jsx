import { useState } from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";
import Dashboard from "./pages/Dashboard";
import Codebook from "./pages/Codebook";
import Resources from "./pages/Resources";
import TitlePage from "./pages/TitlePage";

import Team from "./pages/Team";
import DataUpdates from "./pages/DataUpdates";
import "./App.css";

export default function App() {
  const [mode, setMode] = useState("dark");

  return (
    <HashRouter>
      <div className="app" data-theme={mode}>
        <Sidebar />

        <div className="app__main">
          <Topbar
            mode={mode}
            onToggleMode={() => setMode(mode === "dark" ? "light" : "dark")}
          />

          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/codebook" element={<Codebook />} />
            <Route path="/team" element={<Team />} />
            <Route path="/data-updates" element={<DataUpdates />} />
            <Route path="/title-page" element={<TitlePage />} />
            <Route path="/resources" element={<Resources />} />
          </Routes>
        </div>
      </div>
    </HashRouter>
  );
}
