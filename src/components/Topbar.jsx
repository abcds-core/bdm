import { Search, Bell, Sun, Moon, Menu } from "lucide-react";
import "./Topbar.css";

export default function Topbar({ mode, onToggleMode }) {
  return (
    <div className="topbar">
      <div className="topbar__left">
        <Menu size={18} className="topbar__icon-muted" />
        <div className="topbar__search">
          <Search size={15} className="topbar__icon-muted" />
          <input placeholder="Search participants..." className="topbar__search-input" />
        </div>
      </div>

      <div className="topbar__right">
        <button className="topbar__button" onClick={onToggleMode} aria-label="Toggle color mode">
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
