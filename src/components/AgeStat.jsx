import "./AgeStat.css";

export default function AgeStat({ age }) {
  return (
    <div className="age-stat">
      <span className="age-stat__value">{age.mean}</span>
      <span className="age-stat__label">mean years (SD {age.sd})</span>
      <span className="age-stat__range">
        range {age.min}&ndash;{age.max} yrs
      </span>
    </div>
  );
}
