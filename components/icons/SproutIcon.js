export default function SproutIcon({ className = "", size = 20 }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M12 21 V10" />
      <path d="M12 16 C8 16 6 13 6 10 C10 10 12 13 12 16 Z" />
      <path d="M12 12 C16 12 18 9 18 6 C14 6 12 9 12 12 Z" />
    </svg>
  );
}
