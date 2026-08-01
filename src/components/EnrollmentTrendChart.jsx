import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import "./EnrollmentTrendChart.css";

export default function EnrollmentTrendChart({ data }) {
  return (
    <div className="enrollment-trend-chart">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="fillGreen" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--accent-green)" stopOpacity={0.3} />
              <stop offset="100%" stopColor="var(--accent-green)" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid stroke="var(--border)" vertical={false} />
          <XAxis
            dataKey="month"
            tick={{ fontSize: 12, fill: "var(--text-muted)" }}
            axisLine={{ stroke: "var(--border)" }}
            tickLine={false}
          />
          <YAxis tick={{ fontSize: 12, fill: "var(--text-muted)" }} axisLine={false} tickLine={false} />
          <Tooltip
            contentStyle={{ background: "var(--surface)", borderRadius: 8, border: "1px solid var(--border)" }}
          />
          <Area
            type="monotone"
            dataKey="cumulative"
            stroke="var(--accent-green)"
            strokeWidth={2}
            fill="url(#fillGreen)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
