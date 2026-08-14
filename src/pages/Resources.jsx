import { ExternalLink, ClipboardList } from "lucide-react";
import "./Resources.css";

const RESOURCES = [
  {
    label: "Documentation",
    description: "Project documentation and guides.",
    href: "https://abcds-core.github.io/documentation/",
  },
  {
    label: "Vignettes",
    description: "Tutorials on How to Work with ABC-DS Data",
    href: "https://abcds-core.github.io/documentation/",
  },
  {
    label: "KBIT-2 Calculator",
    description: "Calculator tool for KBIT-2 scoring.",
    href: "https://bhelsel.github.io/kbit2/",
  },
  {
    label: "Data Request Form",
    description: "Submit a request for study data.",
    href: "https://pitt.co1.qualtrics.com/jfe/form/SV_cu0pNCZZlrdSxUN",
  },
];

export default function Resources() {
  return (
    <div className="resources">
      <h1 className="resources__title">Resources</h1>
      <p className="resources__subtitle">
        External tools and links related to the ABC-DS project.
      </p>

      <div className="resources__grid">
        {RESOURCES.map((r) => (
          <a
            key={r.label}
            href={r.href}
            target="_blank"
            rel="noopener noreferrer"
            className="resources__card"
          >
            <div className="resources__card-header">
              <ClipboardList size={18} />
              <span>{r.label}</span>
              <ExternalLink size={14} className="resources__card-icon" />
            </div>
            <p className="resources__card-desc">{r.description}</p>
          </a>
        ))}
      </div>
    </div>
  );
}
