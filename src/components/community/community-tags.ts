export function parseCommunityTags(value: string) {
  const tokens = value.match(/#[^\s,]+|[^\s,]+/g) ?? [];
  const tags = tokens
    .map((tag) => tag.trim().replace(/^#+/, ""))
    .filter(Boolean)
    .map((tag) => `#${tag}`);

  return Array.from(new Set(tags));
}

export function formatCommunityTags(tags: string[] = []) {
  return parseCommunityTags(tags.join(" ")).join(", ");
}
