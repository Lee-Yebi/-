export default function Footer() {
  return (
    <footer className="mt-auto border-t border-border bg-background py-6 text-center text-xs text-muted">
      <p className="mx-auto max-w-5xl px-4 leading-relaxed">
        상담실 덕우당 1층 106호 ·{" "}
        <a href="tel:0290018056" className="text-accent hover:text-accent-2">
          02-901-8056
        </a>{" "}
        ·{" "}
        <a href="mailto:counsel@duksung.ac.kr" className="text-accent hover:text-accent-2">
          counsel@duksung.ac.kr
        </a>
      </p>
    </footer>
  );
}
