import fs from "fs";
import path from "path";

export const SLUGS = [
  "stress",
  "anxiety",
  "adjustment",
  "adult-adhd",
  "pmdd",
  "anorexia",
  "bulimia",
  "addiction",
];

const DATA_DIR = path.join(process.cwd(), "data", "mentalhealth");

function decodeEntities(str) {
  return str
    .replace(/&#034;/g, '"')
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&");
}

function absolutizeImages(html) {
  if (!html) return html;
  return html.replace(/(<img[^>]*\ssrc=")([^"]+)(")/gi, (match, pre, src, post) => {
    if (/^https?:\/\//i.test(src)) return match;
    const absPath = src.startsWith("/") ? src : `/${src}`;
    return `${pre}https://www.mentalhealth.go.kr${absPath}${post}`;
  });
}

function readRaw(slug) {
  const filePath = path.join(DATA_DIR, `${slug}.json`);
  const raw = fs.readFileSync(filePath, "utf8");
  const inner = raw.replace(/^\s*<div>\s*/, "").replace(/\s*<\/div>\s*$/, "");
  const decoded = decodeEntities(inner);
  return JSON.parse(decoded)[0];
}

export function loadDisease(slug) {
  if (!SLUGS.includes(slug)) return null;

  const obj = readRaw(slug);

  const sections = [];
  for (let i = 10; i <= 50; i++) {
    const nm = obj[`CATEGORY_NM${i}`];
    const cn = obj[`DISS_CN${i}`];
    if (!nm && !cn) continue;
    sections.push({ num: i, title: nm, html: absolutizeImages(cn) });
  }

  const keywordsRaw = obj.DISS_CN60;
  const keywords = keywordsRaw
    ? keywordsRaw
        .split(",")
        .map((k) => k.replace(/&nbsp;/g, "").trim())
        .filter(Boolean)
    : [];

  return {
    slug,
    DISS_SJ: obj.DISS_SJ,
    KEY_WORD: obj.KEY_WORD,
    sections,
    keywords,
  };
}

export function loadAllDiseases() {
  return SLUGS.map((slug) => loadDisease(slug));
}
