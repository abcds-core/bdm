import TeamMembers from "../components/TeamMembers";

export default function Team() {
  return (
    <div className="app">
      <div className="app__main">
        <div className="app__content">
          <div>
            <h1 className="app__title">Team</h1>
            <p className="app__subtitle">
              Our team is composed of dedicated professionals from various
              disciplines, all working together to advance our mission and
              achieve our goals.
            </p>
            <TeamMembers />
          </div>
        </div>
      </div>
    </div>
  );
}
