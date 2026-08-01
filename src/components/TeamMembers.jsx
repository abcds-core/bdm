import team from "../data/team.json";
import { Link as LinkIcon } from "lucide-react";
import "./TeamMembers.css";

export default function TeamMembers() {
  return (
    <div className="team-members">
      {team.map((member, index) => (
        <div key={index} className="team-member">
          <img
            src={member.image}
            alt={member.name}
            className="team-member__avatar"
          />

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
