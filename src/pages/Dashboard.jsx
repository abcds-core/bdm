import { useState } from "react";
import { Users, CheckCircle2, ClipboardList, UserMinus } from "lucide-react";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import StatCard from "../components/StatCard";
import Panel from "../components/Panel";
import EnrollmentTrendChart from "../components/EnrollmentTrendChart";
import RecentActivity from "../components/RecentActivity";
import DonutChart from "../components/DonutChart";
import AgeStat from "../components/AgeStat";
import RaceEthnicityChart from "../components/RaceEthnicityChart";
import {
  SCREENED,
  STATUS,
  ENROLLED,
  ENROLLMENT_OVER_TIME,
  AGE,
  SEX,
  RACE_ETHNICITY,
  RECENT_ACTIVITY,
} from "../data/mockData";
import "../App.css";

export default function Dashboard() {
  const [mode, setMode] = useState("dark");
  const sexTotal = SEX.reduce((sum, s) => sum + s.value, 0);

  return (
    <div className="app" data-theme={mode}>
      <div className="app__main">
        <div className="app__content">
          <div>
            <h1 className="app__title">Lifestyle &amp; Brain Health Cohort</h1>
            <p className="app__subtitle">
              {SCREENED} screened &middot; last updated Jul 27, 2026
            </p>
          </div>

          <div className="app__stat-grid">
            <StatCard
              icon={Users}
              label="Enrolled"
              value={ENROLLED}
              delta={`${((ENROLLED / SCREENED) * 100).toFixed(0)}%`}
              deltaLabel="of screened"
              positive
              accent="blue"
            />
            <StatCard
              icon={CheckCircle2}
              label="Active"
              value={STATUS[0].value}
              delta="+6"
              deltaLabel="this month"
              positive
              accent="green"
            />
            <StatCard
              icon={ClipboardList}
              label="Completed"
              value={STATUS[1].value}
              delta="+2"
              deltaLabel="this month"
              positive
              accent="blue"
            />
            <StatCard
              icon={UserMinus}
              label="Withdrawn"
              value={STATUS[3].value}
              delta={`${((STATUS[3].value / ENROLLED) * 100).toFixed(0)}%`}
              deltaLabel="of enrolled"
              positive={false}
              accent="red"
            />
          </div>

          <div className="app__row">
            <Panel title="Cumulative enrollment" className="app__col-8">
              <EnrollmentTrendChart data={ENROLLMENT_OVER_TIME} />
            </Panel>
            <Panel title="Recent activity" className="app__col-4">
              <RecentActivity items={RECENT_ACTIVITY} />
            </Panel>
          </div>

          <div className="app__row">
            <Panel title="Enrollment status" className="app__col-4">
              <DonutChart data={STATUS} total={ENROLLED} />
            </Panel>
            <Panel title="Sex" className="app__col-4">
              <DonutChart data={SEX} total={sexTotal} />
            </Panel>
            <Panel title="Age" className="app__col-4">
              <AgeStat age={AGE} />
            </Panel>
          </div>

          <Panel title="Race / ethnicity">
            <RaceEthnicityChart data={RACE_ETHNICITY} />
          </Panel>
        </div>
      </div>
    </div>
  );
}
