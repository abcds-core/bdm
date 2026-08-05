import "./RecentActivity.css";

export default function RecentActivity({ items }) {
  return (
    <div className="recent-activity">
      {items.map((item) => (
        <div
          key={`${item.site_initials}-${item.examdate}`}
          className="recent-activity__row"
        >
          <div className="recent-activity__left">
            <span
              className="recent-activity__dot"
              style={{ background: item.color }}
            />
            <div className="recent-activity__meta">
              <span className="recent-activity__id">{item.site_initials}</span>
              <span className="recent-activity__event">{item.event_code}</span>
            </div>
          </div>
          <span className="recent-activity__date">{item.examdate}</span>
        </div>
      ))}
    </div>
  );
}
