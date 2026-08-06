import { useState } from "react";
import { GripVertical, X, Plus, UserPlus } from "lucide-react";
import "./TitlePageBuilder.css";

const NOTE_COLORS = [
  "note--amber",
  "note--sky",
  "note--rose",
  "note--mint",
  "note--violet",
];
const NOTE_ROTATIONS = [-3, 2, -2, 3, -1, 1.5];

export default function TitlePageBuilder({ teamMembers = [], onGenerate }) {
  const [title, setTitle] = useState("");
  const [pool, setPool] = useState(
    teamMembers.map((m, i) => ({ id: `team-${i}`, ...m, isGuest: false })),
  );
  const [ordered, setOrdered] = useState([]);
  const [guestName, setGuestName] = useState("");
  const [guestOrg, setGuestOrg] = useState("");
  const [dragIndex, setDragIndex] = useState(null);

  function addFromPool(member) {
    setPool((p) => p.filter((m) => m.id !== member.id));
    setOrdered((o) => [...o, member]);
  }

  function removeFromOrdered(member) {
    setOrdered((o) => o.filter((m) => m.id !== member.id));
    if (!member.isGuest) {
      setPool((p) => [...p, member]);
    }
  }

  function addGuest() {
    if (!guestName.trim()) return;
    const guest = {
      id: `guest-${Date.now()}`,
      name: guestName.trim(),
      organization: guestOrg.trim(),
      isGuest: true,
    };
    setOrdered((o) => [...o, guest]);
    setGuestName("");
    setGuestOrg("");
  }

  function handleDragStart(index) {
    setDragIndex(index);
  }

  function handleDragOver(e, index) {
    e.preventDefault();
    if (dragIndex === null || dragIndex === index) return;
    setOrdered((o) => {
      const next = [...o];
      const [moved] = next.splice(dragIndex, 1);
      next.splice(index, 0, moved);
      return next;
    });
    setDragIndex(index);
  }

  function handleDragEnd() {
    setDragIndex(null);
  }

  function handleGenerate() {
    onGenerate?.({
      title: title.trim(),
      authors: ordered.map(({ name, organization, isGuest }) => ({
        name,
        organization,
        isGuest,
      })),
    });
  }
  return (
    <div className="tpb">
      <div className="tpb__notes-section">
        <h3 className="tpb__heading">Title Page Order</h3>
        {ordered.length === 0 && (
          <p className="tpb__empty">
            Add team members or authors below, then drag notes to reorder.
          </p>
        )}
        <div className="tpb__notes">
          {ordered.map((member, index) => (
            <div
              key={member.id}
              className={`tpb__note ${NOTE_COLORS[index % NOTE_COLORS.length]} ${
                dragIndex === index ? "tpb__note--dragging" : ""
              }`}
              style={{
                "--rotate": `${NOTE_ROTATIONS[index % NOTE_ROTATIONS.length]}deg`,
              }}
              draggable
              onDragStart={() => handleDragStart(index)}
              onDragOver={(e) => handleDragOver(e, index)}
              onDragEnd={handleDragEnd}
            >
              <div className="tpb__note-top">
                <GripVertical size={11} className="tpb__note-grip" />
                <span className="tpb__note-num">{index + 1}</span>
                <button
                  type="button"
                  className="tpb__note-remove"
                  onClick={() => removeFromOrdered(member)}
                  aria-label={`Remove ${member.name}`}
                >
                  <X size={11} />
                </button>
              </div>
              <span className="tpb__note-name">{member.name}</span>
              <span className="tpb__note-org">
                {member.organization}
                {member.isGuest && <em className="tpb__guest-tag"> · guest</em>}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="tpb__field">
        <label htmlFor="tpb-title">Title</label>
        <input
          id="tpb-title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="e.g. ABC-DS Annual Cognitive Aging Report"
          className="tpb__input"
        />
      </div>

      <div className="tpb__toolbar">
        <input
          type="text"
          value={guestName}
          onChange={(e) => setGuestName(e.target.value)}
          placeholder="Name"
          className="tpb__input tpb__input--sm"
        />
        <input
          type="text"
          value={guestOrg}
          onChange={(e) => setGuestOrg(e.target.value)}
          placeholder="Organization"
          className="tpb__input tpb__input--sm"
        />
        <button type="button" className="tpb__add-guest-btn" onClick={addGuest}>
          <UserPlus size={14} />
          Add
        </button>

        <button
          type="button"
          className="tpb__generate-btn"
          onClick={handleGenerate}
          disabled={!title.trim() || ordered.length === 0}
        >
          Generate Title Page
        </button>
      </div>

      <div className="tpb__pool">
        <h3 className="tpb__heading">Team</h3>
        {pool.length === 0 && (
          <p className="tpb__empty">All team members added.</p>
        )}
        <div className="tpb__pool-grid">
          {pool.map((member) => (
            <div key={member.id} className="tpb__pool-card">
              <div className="tpb__pool-card-text">
                <span className="tpb__name">{member.name}</span>
                <span className="tpb__org">{member.organization}</span>
              </div>
              <button
                type="button"
                className="tpb__icon-btn"
                onClick={() => addFromPool(member)}
                aria-label={`Add ${member.name}`}
              >
                <Plus size={14} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
