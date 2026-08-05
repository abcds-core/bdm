import { useState } from "react";
import { UserPlus, Activity, HeartOff, UserMinus } from "lucide-react";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import StatCard from "../components/StatCard";
import Panel from "../components/Panel";
import EnrollmentTrendChart from "../components/EnrollmentTrendChart";
import RecentActivity from "../components/RecentActivity";
import DonutChart from "../components/DonutChart";
import AgeStat from "../components/AgeStat";
import RaceEthnicityChart from "../components/RaceEthnicityChart";
import data from "../data/atri.json";
import "../App.css";

export default function Dashboard() {
  const sexTotal = data.sex.reduce((sum, s) => sum + s.value, 0);

  return (
    <div className="app">
      <div className="app__main">
        <div className="app__content">
          <div>
            <h1 className="app__title">
              Alzheimer's Biomarker Consortium - Down Syndrome (ABC-DS)
            </h1>
            <p className="app__subtitle">
              {data.consented} consented &middot; last updated {data.date}
            </p>
          </div>

          <div className="app__stat-grid">
            <StatCard
              icon={UserPlus}
              label={data.status.find((s) => s.key === "enrolled")?.label}
              value={data.status.find((s) => s.key === "enrolled")?.value}
              accent={data.status.find((s) => s.key === "enrolled")?.color}
            />
            <StatCard
              icon={Activity}
              label={data.status.find((s) => s.key === "active")?.label}
              value={data.status.find((s) => s.key === "active")?.value}
              accent={data.status.find((s) => s.key === "active")?.color}
            />
            <StatCard
              icon={HeartOff}
              label={data.status.find((s) => s.key === "deaths")?.label}
              value={data.status.find((s) => s.key === "deaths")?.value}
              accent={data.status.find((s) => s.key === "deaths")?.color}
            />
            <StatCard
              icon={UserMinus}
              label={data.status.find((s) => s.key === "ltfu")?.label}
              value={data.status.find((s) => s.key === "ltfu")?.value}
              accent={data.status.find((s) => s.key === "ltfu")?.color}
            />
          </div>

          <div className="app__row">
            <Panel title="Cumulative enrollment" className="app__col-12">
              <EnrollmentTrendChart data={data.enrollment_over_time} />
            </Panel>
          </div>

          <div className="app__row">
            <Panel title="Sex" className="app__col-4">
              <DonutChart data={data.sex} total={sexTotal} />
            </Panel>
            <Panel title="Age" className="app__col-4">
              <AgeStat age={data.age} />
            </Panel>
            <Panel title="Recent activity" className="app__col-4">
              <RecentActivity items={data.site_activity} />
            </Panel>
          </div>

          <Panel title="Race / ethnicity">
            <RaceEthnicityChart data={data.race_ethnicity} />
          </Panel>
        </div>
      </div>
    </div>
  );
}
