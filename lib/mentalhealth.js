import fs from "fs";
import path from "path";
import imageManifest from "./mentalhealth-images.json";

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

function stripFixedSize(imgTag) {
  let tag = imgTag.replace(/\s(?:width|height)="[^"]*"/gi, "");
  tag = tag.replace(/style="([^"]*)"/i, (m, styleBody) => {
    const cleaned = styleBody
      .split(";")
      .map((decl) => decl.trim())
      .filter((decl) => decl && !/^(width|height)\s*:/i.test(decl))
      .join("; ");
    return cleaned ? `style="${cleaned}"` : "";
  });
  return tag;
}

function localizeImages(html, slug) {
  if (!html) return html;
  const slugManifest = imageManifest[slug] || {};
  return html.replace(/<img\b[^>]*>/gi, (imgTag) => {
    const match = imgTag.match(/\ssrc="([^"]+)"/i);
    const originalSrc = match ? match[1] : null;
    const localSrc = originalSrc ? slugManifest[originalSrc] : null;

    if (!localSrc) return "";

    const cleanedTag = stripFixedSize(imgTag);
    return cleanedTag.replace(/\ssrc="[^"]+"/i, ` src="${localSrc}"`);
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
    sections.push({ num: i, title: nm, html: localizeImages(cn, slug) });
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
