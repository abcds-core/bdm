import team from "../data/team.json";
import TitlePageBuilder from "../components/TitlePageBuilder";
import { generateTitlePageDocx } from "../utils/generateTitlePageDocx";
import { getInitials, getLastName } from "../utils/team.js";

function downloadBlob(blob, filename) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export default function TitlePageBuilderPage() {
  const sortedTeam = [...team].sort((a, b) =>
    getLastName(a.name).localeCompare(getLastName(b.name)),
  );

  async function handleGenerate(payload) {
    const blob = await generateTitlePageDocx(payload);
    downloadBlob(blob, `${payload.title || "title-page"}.docx`);
  }

  return (
    <TitlePageBuilder teamMembers={sortedTeam} onGenerate={handleGenerate} />
  );
}
