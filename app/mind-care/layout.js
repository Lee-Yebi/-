import MindCareSubNav from "@/components/MindCareSubNav";

export default function MindCareLayout({ children }) {
  return (
    <div>
      <MindCareSubNav />
      {children}
    </div>
  );
}
