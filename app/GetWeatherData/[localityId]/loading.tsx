import Script from 'next/script';


export default function Loader() {
  return (
    <div className="p-4 space-y-4">
    {/* Search Bar Skeleton */}
    <div className="flex justify-center">
      <div className="w-full max-w-xl">
        <div className="w-full h-12 bg-gray-300 rounded-full animate-pulse"></div>
      </div>
    </div>

    {/* Cards Skeleton */}
    <div className="space-y-4">
      {Array.from({ length: 5 }).map((_, index) => (
        <div
          key={index}
          className="w-full max-w-xl mx-auto p-4 bg-gray-300 rounded-lg animate-pulse"
        >
          <div className="h-4 bg-gray-400 rounded w-3/4 mb-2"></div>
          <div className="h-4 bg-gray-400 rounded w-1/2"></div>
        </div>
      ))}
    </div>
  </div>
  );
}
