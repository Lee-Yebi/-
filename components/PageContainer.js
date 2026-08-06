export default function PageContainer({ children, className = "" }) {
  return (
    <div className={`mx-auto w-full px-4 py-10 md:max-w-[720px] ${className}`}>
      {children}
    </div>
  );
}
