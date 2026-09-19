export default function MountainIcon({ className = "", size = 20 }) {
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
      <path d="M9 13 L11 8 L13 13" />
      <path d="M2 18 L8 9 L14 18" />
      <path d="M11 18 L17 6 L23 18" />
    </svg>
  );
}
