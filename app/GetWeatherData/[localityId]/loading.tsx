import Script from "next/script";

export default function Loader() {
  return (
    <div className="p-4 space-y-2">
      {/* Search Bar Skeleton */}
      <div className="flex justify-center">
        <div className="w-full max-w-xl">
          <div className="w-full h-12 bg-gray-300 rounded-full animate-pulse"></div>
        </div>
      </div>

      {/* Cards Skeleton */}
      <div className="flex justify-center  min-h-screen">
        <div className="w-[730px] h-[500px] bg-gray-300 rounded-lg animate-pulse">
          <div className="w-full h-full bg-gray-400 rounded"></div>{" "}
          {/* Square placeholder */}
        </div>
      </div>
    </div>
  );
}
