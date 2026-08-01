import DataUpdatesFeed from "../components/DataUpdatesFeed";

export default function DataUpdates() {
  return (
    <div className="app__content">
      <div>
        <h1 className="app__title">Data Updates</h1>
        <p className="app__subtitle">
          Freeze history, corrections, and file changes
        </p>
      </div>

      <DataUpdatesFeed />
    </div>
  );
}
