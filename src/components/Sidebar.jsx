import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  ClipboardList,
  FileText,
  UserCog,
  Settings,
  ExternalLink,
} from "lucide-react";
import "./Sidebar.css";
import abcdsLogo from "/abcds.png";

const NAV_ITEMS = [
  { label: "Dashboard", icon: LayoutDashboard, path: "/" },
  { label: "Codebook", icon: FileText, path: "/codebook" },
  // { label: "Vignettes", icon: FileText, path: "/vignettes" },
  {
    label: "Documentation",
    icon: ClipboardList,
    href: "https://abcds-core.github.io/documentation/",
  },
  {
    label: "KBIT-2 Calculator",
    icon: ClipboardList,
    href: "https://bhelsel.github.io/kbit2/",
  },
  { label: "Team", icon: UserCog, path: "/team" },
  { label: "Data Updates", icon: Settings, path: "/data-updates" },
];

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar__brand">
        <div className="sidebar__brand-icon">
          <LayoutDashboard size={18} />
        </div>
        <span className="sidebar__brand-name">ABC-DS BDM Core</span>
      </div>

      <nav className="sidebar__nav">
        {NAV_ITEMS.map((item) =>
          item.href ? (
            <a
              key={item.label}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="sidebar__item"
            >
              <item.icon size={17} />
              {item.label}
              <ExternalLink size={13} className="sidebar__item-external" />
            </a>
          ) : (
            <NavLink
              key={item.label}
              to={item.path}
              end={item.path === "/"}
              className={({ isActive }) =>
                `sidebar__item ${isActive ? "sidebar__item--active" : ""}`
              }
            >
              <item.icon size={17} />
              {item.label}
            </NavLink>
          ),
        )}
      </nav>

      <div className="sidebar__footer">
        <img
          src={abcdsLogo}
          alt="ABC-DS Logo"
          className="sidebar__footer-logo"
        />
      </div>
    </aside>
  );
}
