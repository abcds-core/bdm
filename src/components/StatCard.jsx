import { TrendingUp, TrendingDown } from "lucide-react";
import "./StatCard.css";

// accent: "blue" | "green" | "amber" | "red"
export default function StatCard({ icon: Icon, label, value, delta, deltaLabel, positive, accent }) {
  return (
    <div className="stat-card">
      <div className="stat-card__top">
        <div className={`stat-card__icon stat-card__icon--${accent}`}>
          <Icon size={20} />
        </div>
        {delta !== undefined && (
          <div className={`stat-card__delta ${positive ? "stat-card__delta--up" : "stat-card__delta--down"}`}>
            {positive ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
            {delta}
          </div>
        )}
      </div>

      <div>
        <div className="stat-card__value">{value}</div>
        <div className="stat-card__label">{label}</div>
      </div>

      {deltaLabel && <div className="stat-card__delta-label">{deltaLabel}</div>}
    </div>
  );
}
