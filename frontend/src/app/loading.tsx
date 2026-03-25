export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f0f4eb]">
      <div className="text-center">
        <div className="relative mx-auto w-16 h-16 mb-6">
          <div className="absolute inset-0 rounded-full border-4 border-[#004d2b]/10"></div>
          <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-[#004d2b] animate-spin"></div>
        </div>
        <p className="text-[#004d2b]/60 font-bold text-sm uppercase tracking-widest">
          Loading...
        </p>
      </div>
    </div>
  );
}
