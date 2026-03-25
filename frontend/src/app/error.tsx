"use client";

import { Sprout, AlertTriangle, RefreshCw } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f0f4eb] px-4">
      <div className="text-center max-w-md">
        <div className="mx-auto w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mb-6 border-2 border-red-100">
          <AlertTriangle className="w-10 h-10 text-red-500" />
        </div>
        <h1 className="text-3xl font-black text-[#004d2b] mb-3">
          Something Went Wrong
        </h1>
        <p className="text-[#004d2b]/60 font-medium mb-8">
          An unexpected error occurred. Please try again.
        </p>
        <button
          onClick={() => reset()}
          className="inline-flex items-center px-6 py-3 bg-[#004d2b] text-[#a4e320] font-bold rounded-xl shadow-lg hover:bg-[#003b20] transition-colors"
        >
          <RefreshCw className="w-4 h-4 mr-2" />
          Try Again
        </button>
      </div>
    </div>
  );
}
