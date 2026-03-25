import Link from "next/link";
import { Sprout, Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f0f4eb] px-4">
      <div className="text-center max-w-md">
        <h1 className="text-[8rem] font-black text-[#004d2b]/10 leading-none select-none">
          404
        </h1>
        <div className="mx-auto w-16 h-16 bg-[#004d2b] rounded-full flex items-center justify-center mb-6 -mt-8">
          <Sprout className="w-8 h-8 text-[#a4e320]" />
        </div>
        <h2 className="text-2xl font-black text-[#004d2b] mb-3">
          Page Not Found
        </h2>
        <p className="text-[#004d2b]/60 font-medium mb-8">
          The page you are looking for does not exist or has been moved.
        </p>
        <Link
          href="/dashboard"
          className="inline-flex items-center px-6 py-3 bg-[#004d2b] text-[#a4e320] font-bold rounded-xl shadow-lg hover:bg-[#003b20] transition-colors"
        >
          <Home className="w-4 h-4 mr-2" />
          Go to Dashboard
        </Link>
      </div>
    </div>
  );
}
