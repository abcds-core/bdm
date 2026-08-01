// Swap these for real exports from your R pipeline — see the shapes below.

export const SCREENED = 210;

export const STATUS = [
  { key: "active", label: "Active", value: 98, color: "var(--accent-green)" },
  { key: "completed", label: "Completed", value: 24, color: "var(--accent-blue)" },
  { key: "pending", label: "Pending final visit", value: 8, color: "var(--accent-amber)" },
  { key: "withdrawn", label: "Withdrawn", value: 12, color: "var(--accent-red)" },
];

export const ENROLLED = STATUS.reduce((sum, s) => sum + s.value, 0);

export const ENROLLMENT_OVER_TIME = [
  { month: "Jan", cumulative: 6 },
  { month: "Feb", cumulative: 15 },
  { month: "Mar", cumulative: 27 },
  { month: "Apr", cumulative: 41 },
  { month: "May", cumulative: 58 },
  { month: "Jun", cumulative: 73 },
  { month: "Jul", cumulative: 89 },
  { month: "Aug", cumulative: 101 },
  { month: "Sep", cumulative: 115 },
  { month: "Oct", cumulative: 126 },
  { month: "Nov", cumulative: 135 },
  { month: "Dec", cumulative: 142 },
];

export const AGE = { mean: 68.4, sd: 7.2, min: 55, max: 84 };

export const SEX = [
  { label: "Female", value: 87, color: "var(--accent-blue)" },
  { label: "Male", value: 55, color: "var(--accent-green)" },
];

export const RACE_ETHNICITY = [
  { label: "White", value: 84 },
  { label: "Black / Af. American", value: 31 },
  { label: "Hispanic / Latino", value: 15 },
  { label: "Asian", value: 8 },
  { label: "Other", value: 4 },
];

export const RECENT_ACTIVITY = [
  { id: "P-1042", event: "Enrolled", date: "Jul 24", color: "var(--accent-blue)" },
  { id: "P-0998", event: "Completed", date: "Jul 22", color: "var(--accent-green)" },
  { id: "P-1011", event: "Withdrawn", date: "Jul 19", color: "var(--accent-red)" },
  { id: "P-1039", event: "Active visit", date: "Jul 18", color: "var(--accent-green)" },
  { id: "P-1005", event: "Enrolled", date: "Jul 15", color: "var(--accent-blue)" },
];
