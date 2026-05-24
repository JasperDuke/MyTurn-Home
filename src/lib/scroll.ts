/** Matches sticky AppBar Toolbar minHeight in Header.tsx */
export const HEADER_OFFSET_PX = 74;

export function isHomeHashLink(href: string): boolean {
  return href.startsWith("/#") && href.length > 2;
}

export function hashFromHomeLink(href: string): string {
  return href.slice(2);
}

export function scrollToSection(
  id: string,
  behavior: ScrollBehavior = "smooth",
): boolean {
  const el = document.getElementById(id);
  if (!el) return false;

  const top =
    el.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET_PX;
  window.scrollTo({ top, behavior });
  return true;
}
