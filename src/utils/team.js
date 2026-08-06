export function getLastName(fullName) {
  const nameOnly = fullName.split(",")[0].trim();
  const parts = nameOnly.split(/\s+/);
  return parts[parts.length - 1];
}

export function getInitials(fullName) {
  const nameOnly = fullName.split(",")[0].trim();
  const parts = nameOnly.split(/\s+/);
  const first = parts[0][0];
  const last = parts[parts.length - 1][0];
  return `${first}${last}`.toUpperCase();
}
