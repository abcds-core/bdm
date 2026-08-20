import { useLocation } from "react-router-dom";
import { Search, Bell, Sun, Moon, Menu } from "lucide-react";
import "./Topbar.css";

const page_title = {
  "/": "Dashboard",
  "/codebook": "Codebook",
  "/resources": "Resources",
  "/team": "Team",
  "/data-updates": "Data Updates",
  "/title-page": "Title Page Builder",
};

export default function Topbar({ mode, onToggleMode }) {
  const location = useLocation();
  const title = page_title[location.pathname] ?? page_title["/"];

  return (
    <div className="topbar">
      <div className="topbar__left">
        <h1 className="topbar__title">{title}</h1>
      </div>
      <div className="topbar__right">
        <button
          className="topbar__button"
          onClick={onToggleMode}
          aria-label="Toggle color mode"
        >
          {mode === "dark" ? <Sun size={16} /> : <Moon size={16} />}
        </button>
        <button className="topbar__button" aria-label="Notifications">
          <Bell size={16} />
        </button>
        <div className="topbar__avatar">BH</div>
      </div>
    </div>
  );
}
