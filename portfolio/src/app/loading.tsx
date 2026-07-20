export default function Loading() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-base">
      <div className="h-10 w-10 rounded-full border-2 border-brand-cyan border-t-transparent animate-spin" />
    </div>
  );
}
