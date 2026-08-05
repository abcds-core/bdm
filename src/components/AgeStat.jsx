import { CalendarRange } from "lucide-react";
import "./AgeStat.css";

export default function AgeStat({ age }) {
  const { mean, sd, min, max } = age;

  const clamp = (val) => Math.min(100, Math.max(0, val));
  const toPct = (val) => clamp(((val - min) / (max - min)) * 100);

  const meanPct = toPct(mean);
  const sdLowPct = toPct(mean - sd);
  const sdHighPct = toPct(mean + sd);

  return (
    <div className="age-stat">
      <div className="age-stat__icon">
        <CalendarRange size={48} strokeWidth={2} />
      </div>

      <span className="age-stat__value">{mean}</span>
      <span className="age-stat__label">mean years (SD {sd})</span>

      <div className="age-stat__bar">
        <div
          className="age-stat__sd-band"
          style={{
            left: `${sdLowPct}%`,
            width: `${sdHighPct - sdLowPct}%`,
          }}
        />
        <div className="age-stat__marker" style={{ left: `${meanPct}%` }} />
      </div>

      <span className="age-stat__range">
        range {min}&ndash;{max} yrs
      </span>
    </div>
  );
}
