import CounselSubNav from "@/components/CounselSubNav";

const aboutLinks = [
  { href: "/about", label: "DPSY:ON 소개" },
  { href: "/about/bug-report", label: "버그 제보" },
];

export default function AboutLayout({ children }) {
  return (
    <div>
      <CounselSubNav links={aboutLinks} />
      {children}
    </div>
  );
}
