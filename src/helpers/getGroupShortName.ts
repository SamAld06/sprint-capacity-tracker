export function getGroupShortName(name: string) {
  const nameWords = name.trim().split(/\s+/);
  if (nameWords.length > 1) {
    return nameWords
      .map((word) => word[0])
      .join("")
      .slice(0, 3)
      .toUpperCase();
  }
  return name.slice(0, 3).toUpperCase();
}
