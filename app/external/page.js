import PageContainer from "@/components/PageContainer";

function tel(number) {
  return `tel:${number.replace(/-/g, "")}`;
}

const featuredHotline = {
  name: "정신건강위기상담전화",
  number: "1577-0799",
  hours: "24시간",
};

const otherHotlines = [
  { name: "한국생명의전화", number: "1588-9191", hours: "24시간" },
  { name: "여성긴급전화", number: "1366", hours: "24시간" },
  { name: "보건복지상담센터", number: "129", hours: "24시간" },
  { name: "덕성여대 학생상담센터", number: "02-901-8056", hours: "평일 운영시간 내" },
];

const crisisSigns = [
  "일상생활이 어려울 정도의 극심한 정서적 고통과 혼란",
  "자살에 대한 생각이나 계획",
  "극심한 우울·불안, 감당하기 힘든 스트레스",
  "중독 문제",
  "폭력 피해",
];

const partnerCategories = [
  {
    category: "정신건강",
    orgs: [
      {
        name: "서울심리지원동북센터",
        number: "02-901-8652",
        hours: "평일 10:00~20:00, 토 10:00~14:00",
        url: "http://spd8652.15440835.com/web/home.php?go=main",
      },
      {
        name: "도봉구 정신건강복지센터",
        number: "02-2091-5232",
        extraLabel: "야간",
        extraNumber: "1577-0199",
        hours: "운영시간 확인 중",
        url: "http://dobongmind.co.kr/",
      },
      {
        name: "웰빙건강심리센터",
        number: "02-901-8167",
        hours: "평일 09:00~17:00 (방학 중 09:00~16:00)",
        url: "https://www.mamdoctor.com/25",
      },
    ],
  },
  {
    category: "의료기관",
    orgs: [
      {
        name: "푸른고래 정신건강의학과",
        number: "070-8880-0999",
        hours: "월수금 10:00~18:00, 화토 10:00~14:00, 목 10:00~19:00",
        url: "https://blog.naver.com/bwnp0218",
      },
      {
        name: "베이직병원",
        number: "02-990-2999",
        hours: "평일 09:30~17:30, 토 09:00~12:00",
        url: "http://basicmh.com/",
      },
    ],
  },
  {
    category: "섭식 문제",
    orgs: [
      {
        name: "모즐리 회복센터",
        number: "02-775-1009",
        hours: "평일 10:00~18:00, 주말 09:00~15:00",
        url: "https://www.eatingcenter.kr/",
      },
    ],
  },
  {
    category: "중독 문제",
    orgs: [
      {
        name: "도봉중독관리통합지원센터",
        number: "02-6082-6793",
        hours: "월~금 09:00~18:00",
        url: "https://www.dbalcohol.or.kr/",
      },
    ],
  },
  {
    category: "여성·폭력 피해",
    orgs: [
      {
        name: "한국여성의전화",
        number: "02-2263-6464",
        hours: "10:00~17:00 (점심 13:00~14:00)",
        url: "https://hotline.or.kr/",
      },
      {
        name: "한국여성상담센터",
        number: "02-953-1503",
        hours: "운영시간 확인 중",
        url: "https://www.iffeminist.or.kr",
      },
      {
        name: "한국성폭력상담소",
        number: "02-338-5801",
        hours: "10:00~17:00 (점심 13:00~14:00)",
        url: null,
      },
    ],
  },
  {
    category: "가족·복지",
    orgs: [
      {
        name: "도봉구 가족센터",
        number: "02-955-6800",
        hours: "운영시간 확인 중",
        url: "https://dobong.familynet.or.kr/center/index.do",
      },
      {
        name: "보건복지상담센터",
        number: "129",
        hours: "24시간",
        url: "https://www.129.go.kr/",
      },
    ],
  },
];

export default function ExternalPage() {
  return (
    <PageContainer>
      <h1 className="text-xl font-semibold">교외 도움 찾기</h1>

      {/* 24시간 상담 전화 — 맨 위, 스크롤 없이 보이도록 */}
      <section className="mt-3">
        <a
          href={tel(featuredHotline.number)}
          className="block rounded-xl border border-highlight-border bg-highlight p-5 transition-opacity hover:opacity-90"
        >
          <p className="text-sm font-medium text-highlight-foreground">
            {featuredHotline.name} · {featuredHotline.hours}
          </p>
          <p className="mt-1 text-[32px] font-semibold text-highlight-foreground">
            {featuredHotline.number}
          </p>
        </a>

        <div className="mt-3 divide-y divide-border rounded-xl border border-border bg-card">
          {otherHotlines.map((line) => (
            <a
              key={line.name}
              href={tel(line.number)}
              className="flex min-h-11 items-center justify-between gap-4 px-5 py-3"
            >
              <span className="text-sm text-foreground">
                {line.name}
                <span className="block text-xs text-muted">{line.hours}</span>
              </span>
              <span className="text-lg font-semibold text-accent whitespace-nowrap">
                {line.number}
              </span>
            </a>
          ))}
        </div>
      </section>

      {/* 이럴 때는 바로 연락하세요 */}
      <section className="mt-10">
        <h2 className="text-base font-semibold text-foreground">
          이럴 때는 바로 연락하세요
        </h2>
        <ul className="mt-4 space-y-2 rounded-xl border border-border bg-card p-5">
          {crisisSigns.map((sign) => (
            <li key={sign} className="text-sm leading-relaxed text-muted">
              · {sign}
            </li>
          ))}
        </ul>
      </section>

      {/* 주요 연계기관 */}
      <section className="mt-10">
        <h2 className="text-base font-semibold text-foreground">주요 연계기관</h2>
        <div className="mt-4 space-y-8">
          {partnerCategories.map((group) => (
            <div key={group.category}>
              <span className="inline-block rounded-full bg-highlight px-3 py-1 text-sm font-medium text-highlight-foreground">
                {group.category}
              </span>
              <div className="mt-3 grid grid-cols-1 gap-3 md:grid-cols-2">
                {group.orgs.map((org) => (
                  <div
                    key={org.name}
                    className="rounded-xl border border-border bg-card p-[18px]"
                  >
                    <h3 className="text-base font-semibold text-accent">{org.name}</h3>
                    <a
                      href={tel(org.number)}
                      className="mt-2 flex min-h-11 items-center text-lg font-semibold text-accent"
                    >
                      {org.number}
                    </a>
                    {org.extraNumber && (
                      <a
                        href={tel(org.extraNumber)}
                        className="-mt-1 block text-sm text-muted"
                      >
                        {org.extraLabel} {org.extraNumber}
                      </a>
                    )}
                    <p className="mt-1 text-sm text-muted">{org.hours}</p>
                    {org.url && (
                      <a
                        href={org.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-2 inline-block text-sm text-accent underline underline-offset-2 hover:text-accent-2"
                      >
                        홈페이지 →
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </PageContainer>
  );
}
