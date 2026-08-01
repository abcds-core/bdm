import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import "./DonutChart.css";

// Generic donut + legend — used for both enrollment status and sex breakdown
export default function DonutChart({ data, total, nameKey = "label", valueKey = "value" }) {
  return (
    <div className="donut-chart">
      <div className="donut-chart__graphic">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey={valueKey}
              nameKey={nameKey}
              innerRadius={45}
              outerRadius={65}
              paddingAngle={3}
            >
              {data.map((d) => (
                <Cell key={d[nameKey]} fill={d.color} stroke="none" />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{ background: "var(--surface)", borderRadius: 8, border: "1px solid var(--border)" }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="donut-chart__legend">
        {data.map((d) => (
          <div key={d[nameKey]} className="donut-chart__legend-row">
            <div className="donut-chart__legend-left">
              <span className="donut-chart__legend-dot" style={{ background: d.color }} />
              <span>{d[nameKey]}</span>
            </div>
            <span className="donut-chart__legend-value">
              {d[valueKey]} &middot; {((d[valueKey] / total) * 100).toFixed(0)}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
