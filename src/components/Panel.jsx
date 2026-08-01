import "./Panel.css";

export default function Panel({ title, children, className = "" }) {
  return (
    <div className={`panel ${className}`}>
      <h2 className="panel__title">{title}</h2>
      {children}
    </div>
  );
}
