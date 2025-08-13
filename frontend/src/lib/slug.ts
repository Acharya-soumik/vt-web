export function slugify(input: string): string {
  return input
    .toLowerCase()
    .normalize("NFKD")
    .replace(/\p{Diacritic}/gu, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function deslugify(slug: string): string {
  return slug
    .split("-")
    .map((part) => (part.length ? part[0].toUpperCase() + part.slice(1) : part))
    .join(" ");
}
