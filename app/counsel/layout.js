import CounselSubNav from "@/components/CounselSubNav";

export default function CounselLayout({ children }) {
  return (
    <div>
      <CounselSubNav />
      {children}
    </div>
  );
}
