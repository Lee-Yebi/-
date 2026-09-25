export default function PageContainer({ children, className = "", pt = "pt-7" }) {
  return (
    <div className={`mx-auto w-full px-4 pb-10 ${pt} md:max-w-[720px] ${className}`}>
      {children}
    </div>
  );
}
