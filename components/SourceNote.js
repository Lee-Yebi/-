// Single place to update the "last verified" date shown under
// content sourced from the 학생상담센터/학생경력개발처 reference doc.
const LAST_VERIFIED = "2026년 8월";

export default function SourceNote() {
  return (
    <p className="mt-10 text-xs leading-relaxed text-[#8C8087]">
      출처: 덕성여자대학교 학생상담센터 · 학생경력개발처
      <br />
      최종 확인 {LAST_VERIFIED}
    </p>
  );
}
