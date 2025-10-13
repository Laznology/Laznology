"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="bg-background flex items-center justify-center h-screen px-4">
      <div className="md:left-auto md:right-8 md:w-80">
        <div className="bg-gray-900/90 backdrop-blur-sm p-4 rounded-lg border border-gray-700 font-mono text-sm">
          <div className="text-green-400 mb-2">~/$ not-found.tsx</div>
          <div className="text-gray-300 space-y-1">
            <div>
              Status: <span className="text-red-400">404</span>
            </div>
            <div>
              Message: <span className="text-yellow-400">Page not found</span>
            </div>
            <div>
              Solution: <span className="text-blue-400">Navigate back</span>
            </div>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => router.back()}
              className="rounded-md border border-blue-500 px-3 py-1 text-blue-200 transition-colors duration-200 hover:bg-blue-500/20 hover:text-blue-100"
            >
              Go Back
            </button>
            <Link
              href="/"
              className="rounded-md border border-green-500 px-3 py-1 text-green-200 transition-colors duration-200 hover:bg-green-500/20 hover:text-green-100"
            >
              Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
