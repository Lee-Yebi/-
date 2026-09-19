export default function CrisisBanner() {
  return (
    <div className="sticky top-0 z-50 w-full border-b border-highlight-border bg-highlight text-highlight-foreground">
      <p className="mx-auto max-w-5xl px-4 py-2.5 text-center text-[13px] leading-relaxed md:text-sm">
        위기 상황이라면 즉시{" "}
        <a
          href="tel:109"
          className="font-semibold text-accent underline underline-offset-2 hover:text-accent-2"
        >
          109
        </a>
        (자살예방 상담전화, 24시간)로 연락하세요
      </p>
    </div>
  );
}
