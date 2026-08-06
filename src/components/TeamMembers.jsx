import team from "../data/team.json";
import { Link as LinkIcon } from "lucide-react";
import { getInitials, getLastName } from "../utils/team.js";
import "./TeamMembers.css";

export default function TeamMembers() {
  const sortedTeam = [...team].sort((a, b) =>
    getLastName(a.name).localeCompare(getLastName(b.name)),
  );

  return (
    <div className="team-members">
      {sortedTeam.map((member, index) => (
        <div key={index} className="team-member">
          {member.image ? (
            <img
              src={member.image}
              alt={member.name}
              className="team-member__avatar"
            />
          ) : (
            <div className="team-member__avatar team-member__avatar--initials">
              {getInitials(member.name)}
            </div>
          )}

          <div className="team-member__info">
            <div className="team-member__name-row">
              {member.link && (
                <a
                  href={member.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="team-member__link"
                  aria-label={`${member.name}'s profile link`}
                >
                  <LinkIcon size={14} />
                </a>
              )}
              <h3 className="team-member__name">{member.name}</h3>
            </div>

            <p className="team-member__title">{member.title}</p>
            <p className="team-member__org">{member.organization}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
