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

// 치료 방법(학생이 스스로 판단하게 둘 수 있는 내용)과, 대주제 3개 중
// 어디에도 정확히 대응하지 않는 섹션. 화면에서만 숨기고 JSON 원본은
// 건드리지 않는다. 나중에 다시 켜려면 이 목록에서 이름을 지우면 된다.
export const EXCLUDED_SECTIONS = [
  // 치료 관련
  "약물치료",
  "정신치료",
  "그외의 치료",
  // 대주제 3개(개요/진단/스스로 돕는 법) 중 어디에도 명확히 속하지 않아
  // 사용자 확인 후 제외하기로 한 섹션
  "종류",
  "경과 및 예후",
  "역학 및 통계",
  "검사",
  "동반질환",
  "생활습관 관리",
  "위험요인 및 예방",
  "자주하는 질문",
];

// 대주제 3개와, 그 안에 들어갈 소주제(CATEGORY_NM) 목록.
// 소주제는 이 배열 순서가 아니라 원본 CATEGORY_NM 번호 순서로 채워진다
// (마침 두 순서가 일치한다).
const TOPIC_GROUPS = [
  { title: "개요", match: ["정의", "원인"] },
  { title: "진단", match: ["사례", "증상", "진단기준"] },
  { title: "스스로 돕는 법", match: ["지원체계", "스스로 돕는 법", "참고문헌"] },
];

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

  const rawSections = [];
  for (let i = 10; i <= 50; i++) {
    const nm = obj[`CATEGORY_NM${i}`];
    const cn = obj[`DISS_CN${i}`];
    if (!nm && !cn) continue;
    rawSections.push({ num: i, title: nm, html: localizeImages(cn, slug) });
  }

  const topics = TOPIC_GROUPS.map((group) => ({ title: group.title, sections: [] }));
  const topicByTitle = Object.fromEntries(topics.map((t) => [t.title, t]));
  let introUsed = false;

  for (const section of rawSections) {
    if (EXCLUDED_SECTIONS.includes(section.title)) continue;

    if (section.title === "Intro") {
      // 첫 번째 Intro만 "개요"의 맨 앞줄로 쓰고, 나머지(치료/도움 섹션의
      // 도입부였던 Intro)는 숨긴다.
      if (!introUsed) {
        introUsed = true;
        topicByTitle["개요"].sections.push({ ...section, title: "개요", isOverviewIntro: true });
      }
      continue;
    }

    const group = TOPIC_GROUPS.find((g) => g.match.includes(section.title));
    if (group) {
      topicByTitle[group.title].sections.push(section);
    }
  }

  const visibleTopics = topics.filter((t) => t.sections.length > 0);

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
    topics: visibleTopics,
    keywords,
  };
}

export function loadAllDiseases() {
  return SLUGS.map((slug) => loadDisease(slug));
}
