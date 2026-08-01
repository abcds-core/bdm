import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import "./RaceEthnicityChart.css";

export default function RaceEthnicityChart({ data }) {
  return (
    <div className="race-ethnicity-chart">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} layout="vertical" margin={{ top: 0, right: 20, left: 20, bottom: 0 }}>
          <CartesianGrid stroke="var(--border)" horizontal={false} />
          <XAxis type="number" tick={{ fontSize: 12, fill: "var(--text-muted)" }} axisLine={false} tickLine={false} />
          <YAxis
            type="category"
            dataKey="label"
            tick={{ fontSize: 12, fill: "var(--text-muted)" }}
            axisLine={false}
            tickLine={false}
            width={140}
          />
          <Tooltip
            contentStyle={{ background: "var(--surface)", borderRadius: 8, border: "1px solid var(--border)" }}
            cursor={{ fill: "var(--surface-alt)" }}
          />
          <Bar dataKey="value" fill="var(--accent-blue)" radius={[0, 4, 4, 0]} barSize={16} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
