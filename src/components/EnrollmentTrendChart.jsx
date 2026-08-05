import { useMemo } from "react";
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

const MONTH_ABBR = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

function formatLabel(dateStr) {
  const [year, month] = dateStr.split("-").map(Number);
  return `${MONTH_ABBR[month - 1] ?? month} '${String(year).slice(2)}`;
}

export default function EnrollmentTrendChart({ data }) {
  const chartData = useMemo(() => {
    if (!Array.isArray(data)) return [];

    return [...data]
      .sort((a, b) => a.examdate.localeCompare(b.examdate))
      .map((d) => ({
        label: formatLabel(d.examdate),
        examdate: d.examdate,
        cumulative: d.n,
      }));
  }, [data]);

  const ticks = useMemo(() => {
    return chartData.map((d) => d.label).filter((_, i) => i > 1 && i % 6 === 0); // skip first 2 points, then every 6th
  }, [chartData]);

  return (
    <div className="enrollment-trend-chart">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={chartData}
          margin={{ top: 5, right: 10, left: -20, bottom: 0 }}
        >
          <defs>
            <linearGradient id="fillGreen" x1="0" y1="0" x2="0" y2="1">
              <stop
                offset="0%"
                stopColor="var(--accent-green)"
                stopOpacity={0.3}
              />
              <stop
                offset="100%"
                stopColor="var(--accent-green)"
                stopOpacity={0}
              />
            </linearGradient>
          </defs>
          <CartesianGrid stroke="var(--border)" vertical={false} />
          <XAxis
            dataKey="label"
            ticks={ticks}
            tick={{ fontSize: 12, fill: "var(--text-muted)" }}
            axisLine={{ stroke: "var(--border)" }}
            tickLine={false}
          />
          <YAxis
            tick={{ fontSize: 12, fill: "var(--text-muted)" }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip
            contentStyle={{
              background: "var(--surface)",
              borderRadius: 8,
              border: "1px solid var(--border)",
            }}
            formatter={(value) => [value, "Enrollment"]}
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
