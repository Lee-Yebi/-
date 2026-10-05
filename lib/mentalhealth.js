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

// href 안에 섞여 들어간 &nbsp;(U+00A0) 등 보이지 않는 공백을 제거하고,
// 외부(http/https) 링크에 target="_blank"·rel="noopener noreferrer"가
// 빠져 있으면 채워 넣는다. 화면에 보이는 링크 글자(텍스트)는 건드리지 않는다.
function fixLinks(html) {
  if (!html) return html;
  return html.replace(/<a\s[^>]*>/gi, (tag) => {
    let fixed = tag.replace(
      /href="([^"]*)"/i,
      (m, href) => `href="${href.replace(/[\s ]+$/g, "").replace(/^[\s ]+/g, "")}"`,
    );
    if (/href="https?:\/\//i.test(fixed)) {
      if (!/target="/i.test(fixed)) {
        fixed = fixed.replace(/\s*\/?>$/, ' target="_blank">');
      }
      if (!/rel="/i.test(fixed)) {
        fixed = fixed.replace(/\s*\/?>$/, ' rel="noopener noreferrer">');
      }
    }
    return fixed;
  });
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
    let html = fixLinks(localizeImages(cn, slug));
    // pmdd "지원체계" 섹션: 괄호 안 URL이 일반 텍스트로만 있어 클릭할 수 없다.
    // 화면에 보이는 글자는 그대로 두고 URL 부분만 <a>로 감싼다.
    if (slug === "pmdd" && i === 46) {
      html = html.replace(
        /\((https?:\/\/[^\s)]+)\)/g,
        (m, url) => `(<a href="${url}" target="_blank" rel="noopener noreferrer">${url}</a>)`,
      );
    }
    // pmdd "지원체계" 섹션: 중앙자살예방센터 설명 중 1393 안내 문장은 2024-01-01 109로
    // 통합되어 더 이상 연결되지 않으므로 그 문장만 화면에서 뺀다(JSON 원본은 그대로).
    if (slug === "pmdd" && i === 46) {
      html = html.replace(/\s*24시간 자살관련 상담전화\(1393\)[\s\S]*?받을 수 있습니다\./, "");
    }
    // 중독(의존) "지원체계" 섹션: 나크형제회(NA) 주소가 죽어 있어 새 주소로 교체.
    if (slug === "addiction" && i === 46) {
      html = html.replaceAll("http://m.nakorea.org/", "https://nakorea.org/");
    }
    rawSections.push({ num: i, title: nm, html });
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
        let html = section.html;
        // 거식증 개요 Intro: 개요 그림 아래에 있던 문단 하나("최근 10~20대..."로
        // 시작해 "...섭식장애로 이어질 수 있다는 점입니다."로 끝남)를 화면에서 뺀다.
        // 공공누리 제4유형이라 API 원문을 잘라내지 않고, 그 문장만 담고 있는
        // <div> 블록 전체를 표시하지 않는 방식으로 처리한다. JSON 원본은 그대로 둔다.
        if (slug === "anorexia") {
          html = html.replace(
            /<div>최근 10~20대[\s\S]*?섭식장애로 이어질 수 있다는 점입니다\.<\/div>/,
            "",
          );
        }
        // 불안장애 개요 Intro: 개요 그림과 같은 <div> 안에 사례 글이 붙어 있어
        // EXCLUDED_SECTIONS로는(섹션 제목이 "Intro"라 다른 주제 개요 그림까지
        // 같이 빠짐) 뺄 수 없다. 그림은 그대로 두고 사례 글 구간만 제거한다.
        if (slug === "anxiety") {
          html = html.replace(
            /가슴이 답답하고, 소화도 안돼요\.[\s\S]*?최악의 상황만 생각이 들어요\./,
            "",
          );
        }
        topicByTitle["개요"].sections.push({
          ...section,
          title: "개요",
          isOverviewIntro: true,
          html,
        });
      }
      continue;
    }

    const group = TOPIC_GROUPS.find((g) => g.match.includes(section.title));
    if (group) {
      topicByTitle[group.title].sections.push(section);
    }
  }

  // "스스로 돕는 법" 대주제 안에서는 소주제 순서를 "스스로 돕는 법" → "지원체계" →
  // "참고문헌"로 강제한다(원본 데이터의 번호 순서와 무관하게).
  const selfHelpOrder = { "스스로 돕는 법": 0, "지원체계": 1, "참고문헌": 2 };
  topicByTitle["스스로 돕는 법"].sections.sort(
    (a, b) => (selfHelpOrder[a.title] ?? 99) - (selfHelpOrder[b.title] ?? 99),
  );

  // 거식증: "스스로 돕는 법" 대주제에 실제 내용 없이 참고문헌만 있어 제목만 감춘다.
  // 제목이 있던 줄의 높이는 그대로 남겨 위 내용과의 간격이 같게 보이도록
  // 페이지에서 빈 칸으로 그린다. 다른 주제의 같은 제목은 그대로 둔다.
  if (slug === "anorexia") {
    topicByTitle["스스로 돕는 법"].hideTitle = true;
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
