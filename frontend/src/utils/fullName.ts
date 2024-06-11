export function getFullName(firstName: string | null, lastName: string | null) {
  return `${firstName || ""} ${lastName || ""}`.trim();
}
