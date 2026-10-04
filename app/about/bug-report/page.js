import PageContainer from "@/components/PageContainer";

export default function BugReportPage() {
  return (
    <div className="brand-scope min-h-screen w-full bg-cream">
      <PageContainer>
        <h1 className="text-xl font-bold text-moss">버그 제보</h1>

        <p className="mt-4 text-base leading-relaxed text-text-sub">
          무궁담은 학생들이 직접 만들고 운영하는 사이트입니다.
          <br />
          링크가 열리지 않거나 글씨가 깨져 보이는 등 이상한 점을 발견하시면 알려주세요.
          <br />
          아래 네 가지를 함께 알려주시면 빠르게 고칠 수 있습니다.
        </p>

        <ol className="mt-4 list-decimal space-y-1 pl-5 text-base leading-relaxed text-text-sub">
          <li>어느 페이지에서 생겼는지</li>
          <li>무엇을 눌렀을 때 생겼는지</li>
          <li>어떤 기기로 보고 계신지 (아이폰 / 안드로이드 / PC)</li>
          <li>가능하면 화면 캡처</li>
        </ol>

        <a
          href="https://open.kakao.com/o/sBXi4MQi"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 flex min-h-11 w-full items-center justify-center rounded-2xl bg-moss-deep px-5 text-center text-sm font-normal text-white transition-opacity hover:opacity-90 sm:inline-flex sm:w-auto"
        >
          오픈채팅으로 제보하기
        </a>
      </PageContainer>
    </div>
  );
}
