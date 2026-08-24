export default function Footer() {
  return (
    <footer className="mt-auto border-t border-border bg-background py-6 text-center text-xs text-muted">
      <div className="mx-auto max-w-5xl space-y-1.5 px-4 leading-relaxed">
        <p>상담실 덕우당(한옥) 1층 106호 (서울 도봉구 삼양로144길 33)</p>
        <p>
          <a href="tel:029018056" className="text-accent hover:text-accent-2">
            02-901-8056
          </a>{" "}
          ·{" "}
          <a href="mailto:counsel@duksung.ac.kr" className="text-accent hover:text-accent-2">
            counsel@duksung.ac.kr
          </a>
        </p>
        <p>학기 중 월~금 10:00~16:00 (점심 12:00~13:00 제외)</p>
        <p>
          위기 상황이라면{" "}
          <a href="tel:109" className="font-medium text-accent hover:text-accent-2">
            109
          </a>{" "}
          (24시간)
        </p>
      </div>
    </footer>
  );
}
