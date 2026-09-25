import PageContainer from "@/components/PageContainer";
import MountainIcon from "@/components/icons/MountainIcon";

// 출처: docs/덕성여자대학교 학생상담센터 구성원 이력(26.09.18).xlsx
// 열: 직위/직급, 학위/자격증 (이름 열은 파일에 없음 — 직위/직급을 카드 제목으로 사용)
const counselors = [
  {
    title: "센터장",
    tag: "센터장",
    detail:
      "덕성여자대학교 심리학전공 교수\n덕성여자대학교 학생상담센터 센터장\n임상심리전문가(한국임상심리학회)\n정신건강임상심리사 1급(보건복지부)",
  },
  {
    title: "책임연구원 1인",
    tag: "책임연구원 1인",
    detail:
      "심리학 박사(임상건강심리학 전공)\n임상심리전문가(한국임상심리학회)\n상담심리사 1급(한국상담심리학회)\n청소년 상담사 1급(성평등가족부)\n임상심리사 1급(한국산업인력공단)\n전문상담사 1급(한국상담학회)",
  },
  {
    title: "전임상담원 1인",
    tag: "전임상담원 1인",
    detail: "심리학 석사(임상건강심리학 전공)\n임상심리사 2급(한국산업인력공단)",
  },
  {
    title: "행정원 1인",
    tag: "행정원 1인",
    detail: "행정업무 지원",
  },
  {
    title: "객원상담원 1",
    tag: "객원상담원 7인",
    detail:
      "상담심리학 석사(상담심리학전공)\n상담심리사 2급(한국상담심리학회)\n임상심리사 1급(한국산업인력공단)\n청소년상담사 2급(성평등가족부)",
  },
  {
    title: "객원상담원 2",
    tag: "객원상담원 7인",
    detail:
      "심리학 박사(임상건강심리학 전공)\n상담심리사 2급(한국상담심리학회)\n임상심리사 1급(한국산업인력공단)",
  },
  {
    title: "객원상담원 3",
    tag: "객원상담원 7인",
    detail:
      "교육학 박사 수료(상담심리학 전공)\n정신건강임상심리사 1급(보건복지부)\n임상심리사 2급(한국산업인력공단)",
  },
  {
    title: "객원상담원 4",
    tag: "객원상담원 7인",
    detail:
      "보건학 박사(중독상담재활학 전공)\n전문상담사 1급(한국상담학회)\n임상심리사 1급(한국산업인력공단)\n청소년상담사 1급(성평등가족부)",
  },
  {
    title: "객원상담원 5",
    tag: "객원상담원 7인",
    detail:
      "교육학 박사 수료(상담심리학 전공)\n상담심리사 1급 (한국상담심리학회)\n임상심리사 2급(한국산업인력공단)\n청소년상담사 2급(성평등가족부)",
  },
  {
    title: "객원상담원 6",
    tag: "객원상담원 7인",
    detail:
      "상담심리학 석사(위기관리 전공)\n상담심리사 2급 (한국상담심리학회)\n임상심리사 2급(한국산업인력공단)\n청소년상담사 2급(성평등가족부)",
  },
  {
    title: "객원상담원 7",
    tag: "객원상담원 7인",
    detail: "심리학 석사(정신분석학 전공)\n상담심리지도사 1급(전국대학상담학과협의회)",
  },
];

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

      <div className="mt-9 grid grid-cols-1 gap-3 md:grid-cols-2">
        {counselors.map((c, i) => (
          <div
            key={`${c.title}-${i}`}
            className="flex h-full flex-col rounded-2xl border border-[var(--color-border)] bg-card p-5"
          >
            <p className="text-[16px] font-semibold text-moss">{c.title}</p>
            {c.detail && (
              <p className="mt-1 text-[14px] leading-relaxed text-text-sub">
                학위/자격증 ·{" "}
                {c.detail.split("\n").map((line, idx) => (
                  <span key={idx}>
                    {idx > 0 && <br />}
                    {line}
                  </span>
                ))}
              </p>
            )}
            <span className="mt-2 inline-block w-fit rounded-[20px] bg-blush px-3 py-1 text-[13px] font-medium text-maroon">
              {c.tag}
            </span>
          </div>
        ))}
      </div>
      </PageContainer>
    </div>
  );
}
