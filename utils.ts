import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Highlight keywords inside a block of text. Returns React nodes with simple
// span highlights. `matchedKeywords` can be passed to mark which keywords
// were actually found (green) vs missing (red/underlined).
// Return an HTML string with matched keywords wrapped in spans. This is
// intentionally a string to keep this file as .ts. Use `dangerouslySetInnerHTML`
// when rendering the result.
export function highlightKeywordsHtml(
  text: string,
  keywords: string[] = [],
  matchedKeywords: string[] = []
): string {
  if (!text) return '';
  if (!keywords || keywords.length === 0) return escapeHtml(text);

  const escapeRegex = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const terms = keywords.filter(Boolean).map((k) => escapeRegex(k));
  if (terms.length === 0) return escapeHtml(text);

  const re = new RegExp(`\\b(${terms.join('|')})\\b`, 'gi');
  let lastIndex = 0;
  let out = '';
  let m: RegExpExecArray | null;

  while ((m = re.exec(text)) !== null) {
    const idx = m.index;
    if (idx > lastIndex) out += escapeHtml(text.slice(lastIndex, idx));
    const word = m[0];
    const matched = matchedKeywords.some((k) => k.toLowerCase() === word.toLowerCase());
    if (matched) {
      out += `<span class="bg-green-200 text-green-900 font-semibold px-1 rounded-sm">${escapeHtml(word)}</span>`;
    } else {
      out += `<span class="bg-red-100 text-red-900 underline px-1 rounded-sm">${escapeHtml(word)}</span>`;
    }
    lastIndex = idx + word.length;
  }

  if (lastIndex < text.length) out += escapeHtml(text.slice(lastIndex));
  return out;
}

function escapeHtml(s: string) {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}