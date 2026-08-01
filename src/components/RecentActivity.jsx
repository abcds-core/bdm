import "./RecentActivity.css";

export default function RecentActivity({ items }) {
  return (
    <div className="recent-activity">
      {items.map((item) => (
        <div key={`${item.id}-${item.date}`} className="recent-activity__row">
          <div className="recent-activity__left">
            <span className="recent-activity__dot" style={{ background: item.color }} />
            <div className="recent-activity__meta">
              <span className="recent-activity__id">{item.id}</span>
              <span className="recent-activity__event">{item.event}</span>
            </div>
          </div>
          <span className="recent-activity__date">{item.date}</span>
        </div>
      ))}
    </div>
  );
}
