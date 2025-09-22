export default function NotFound() {
  return (
    <div className="bg-background flex items-center justify-center h-full">
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
        </div>
      </div>
    </div>
  );
}
