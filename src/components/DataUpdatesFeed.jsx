import { useState } from "react";
import {
  Snowflake,
  FilePlus,
  FileEdit,
  FileMinus,
  BookOpen,
  ChevronDown,
} from "lucide-react";
import updates from "../data/updates.json";
import "./DataUpdatesFeed.css";

const TYPE_CONFIG = {
  freeze: { icon: Snowflake, label: "Freeze", className: "freeze" },
  addition: { icon: FilePlus, label: "Addition", className: "addition" },
  correction: { icon: FileEdit, label: "Correction", className: "correction" },
  removal: { icon: FileMinus, label: "Removal", className: "removal" },
  documentation: {
    icon: BookOpen,
    label: "Documentation",
    className: "documentation",
  },
};

function formatDate(dateStr) {
  return new Date(dateStr + "T00:00:00").toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default function DataUpdatesFeed() {
  const [expandedId, setExpandedId] = useState(null);

  const sorted = [...updates].sort(
    (a, b) => new Date(b.date) - new Date(a.date),
  );

  return (
    <div className="updates-feed">
      {sorted.map((update) => {
        const config = TYPE_CONFIG[update.type] ?? TYPE_CONFIG.documentation;
        const Icon = config.icon;
        const isExpanded = expandedId === update.id;
        const isFreeze = update.type === "freeze";

        return (
          <div
            key={update.id}
            className={`updates-feed__item ${isFreeze ? "updates-feed__item--freeze" : ""}`}
          >
            <div
              className={`updates-feed__icon updates-feed__icon--${config.className}`}
            >
              <Icon size={16} />
            </div>

            <div className="updates-feed__content">
              <div className="updates-feed__meta">
                <span
                  className={`updates-feed__badge updates-feed__badge--${config.className}`}
                >
                  {config.label}
                </span>
                <span className="updates-feed__freeze-tag">
                  Freeze {update.freeze}
                </span>
                <span className="updates-feed__date">
                  {formatDate(update.date)}
                </span>
              </div>

              <h3 className="updates-feed__title">{update.title}</h3>
              <p className="updates-feed__summary">{update.summary}</p>

              {update.details?.length > 0 && (
                <>
                  <button
                    className="updates-feed__toggle"
                    onClick={() => setExpandedId(isExpanded ? null : update.id)}
                    aria-expanded={isExpanded}
                  >
                    <ChevronDown
                      size={14}
                      className={`updates-feed__chevron ${isExpanded ? "updates-feed__chevron--open" : ""}`}
                    />
                    {isExpanded ? "Hide details" : "Show details"}
                  </button>

                  {isExpanded && (
                    <ul className="updates-feed__details">
                      {update.details.map((line, i) => (
                        <li key={i} className="updates-feed__detail-item">
                          <span className="updates-feed__detail-marker" />
                          <span className="updates-feed__detail-text">
                            {line}
                          </span>
                        </li>
                      ))}
                    </ul>
                  )}
                </>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
