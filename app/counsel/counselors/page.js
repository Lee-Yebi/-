import PageContainer from "@/components/PageContainer";
import MountainIcon from "@/components/icons/MountainIcon";

// 출처: docs/덕성여자대학교 학생상담센터 구성원 이력(26.09.18).xlsx
// A열(직위/직급)의 병합 셀을 해제하고, B열(학위/자격증)의 줄바꿈 단위로 한 사람씩 분리했다.
// 문구·줄 순서는 원문 그대로이며, 1~7은 객원상담원 7인을 구분하기 위한 표시일 뿐 엑셀에는 없다.

const director = {
  title: "센터장",
  lines: [
    "덕성여자대학교 심리학전공 교수",
    "덕성여자대학교 학생상담센터 센터장",
    "임상심리전문가(한국임상심리학회)",
    "정신건강임상심리사 1급(보건복지부)",
  ],
};

const staff = [
  {
    title: "책임연구원 1인",
    lines: [
      "심리학 박사(임상건강심리학 전공)",
      "임상심리전문가(한국임상심리학회)",
      "상담심리사 1급(한국상담심리학회)",
      "청소년 상담사 1급(성평등가족부)",
      "임상심리사 1급(한국산업인력공단)",
      "전문상담사 1급(한국상담학회)",
    ],
  },
  {
    title: "전임상담원 1인",
    lines: ["심리학 석사(임상건강심리학 전공)", "임상심리사 2급(한국산업인력공단)"],
  },
];

const guests = [
  {
    title: "객원상담원 1",
    lines: [
      "상담심리학 석사(상담심리학전공)",
      "상담심리사 2급(한국상담심리학회)",
      "임상심리사 1급(한국산업인력공단)",
      "청소년상담사 2급(성평등가족부)",
    ],
  },
  {
    title: "객원상담원 2",
    lines: [
      "심리학 박사(임상건강심리학 전공)",
      "상담심리사 2급(한국상담심리학회)",
      "임상심리사 1급(한국산업인력공단)",
    ],
  },
  {
    title: "객원상담원 3",
    lines: [
      "교육학 박사 수료(상담심리학 전공)",
      "정신건강임상심리사 1급(보건복지부)",
      "임상심리사 2급(한국산업인력공단)",
    ],
  },
  {
    title: "객원상담원 4",
    lines: [
      "보건학 박사(중독상담재활학 전공)",
      "전문상담사 1급(한국상담학회)",
      "임상심리사 1급(한국산업인력공단)",
      "청소년상담사 1급(성평등가족부)",
    ],
  },
  {
    title: "객원상담원 5",
    lines: [
      "교육학 박사 수료(상담심리학 전공)",
      "상담심리사 1급 (한국상담심리학회)",
      "임상심리사 2급(한국산업인력공단)",
      "청소년상담사 2급(성평등가족부)",
    ],
  },
  {
    title: "객원상담원 6",
    lines: [
      "상담심리학 석사(위기관리 전공)",
      "상담심리사 2급 (한국상담심리학회)",
      "임상심리사 2급(한국산업인력공단)",
      "청소년상담사 2급(성평등가족부)",
    ],
  },
  {
    title: "객원상담원 7",
    lines: ["심리학 석사(정신분석학 전공)", "상담심리지도사 1급(전국대학상담학과협의회)"],
  },
];

const admin = {
  title: "행정원 1인",
  lines: ["행정업무 지원"],
};

function CounselorCard({ title, lines }) {
  return (
    <div className="h-full rounded-2xl border border-[var(--color-border)] bg-card p-5">
      <p className="text-[16px] font-semibold text-moss">{title}</p>
      <ul className="mt-2 space-y-0.5">
        {lines.map((line, i) => (
          <li
            key={i}
            className={`text-[14px] leading-[1.6] ${i === 0 ? "text-text" : "text-text-sub"}`}
          >
            · {line}
          </li>
        ))}
      </ul>
    </div>
  );
}

function SectionLabel({ children }) {
  return (
    <span className="inline-block rounded-full bg-blush px-3 py-1 text-sm font-medium text-maroon">
      {children}
    </span>
  );
}

export default function CounselorsPage() {
  return (
    <div className="brand-scope min-h-screen w-full bg-cream">
      <PageContainer>
        <h1 className="flex items-center gap-2 text-xl font-semibold text-moss">
          <MountainIcon className="text-moss" />
          상담사 소개
        </h1>

        <div className="mt-9 rounded-2xl border border-maroon/20 bg-blush p-6 text-sm leading-relaxed text-maroon">
          모든 상담사는 임상심리사 또는 상담심리사 1·2급 이상의 자격증을 보유한
          전문가입니다.
        </div>
        <p className="mt-2 text-[14px] text-text-sub">
          상담사 개인의 이름은 공개하지 않으며, 아래는 직위별 자격 현황입니다.
        </p>

        {/* 1층 — 센터장 */}
        <div className="mx-auto mt-12 w-full md:w-1/2">
          <CounselorCard {...director} />
        </div>

        {/* 연결선 */}
        <div className="mx-auto h-6 w-px bg-[var(--color-sprout)]" />
        <div className="mx-auto h-px w-full max-w-[560px] bg-[var(--color-sprout)]" />

        {/* 2층 — 상담 인력 */}
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          {staff.map((s) => (
            <div key={s.title} className="flex flex-col items-center">
              <div className="h-6 w-px bg-[var(--color-sprout)]" />
              <div className="w-full">
                <CounselorCard {...s} />
              </div>
            </div>
          ))}
        </div>

        {/* 3층 — 객원상담원 */}
        <div className="mt-12">
          <SectionLabel>객원상담원 7인</SectionLabel>
          <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {guests.map((g) => (
              <CounselorCard key={g.title} {...g} />
            ))}
          </div>
        </div>

        {/* 맨 아래 — 행정 */}
        <div className="mt-20">
          <SectionLabel>행정</SectionLabel>
          <div className="mt-4">
            <CounselorCard {...admin} />
          </div>
        </div>
      </PageContainer>
    </div>
  );
}
