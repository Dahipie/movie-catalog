export default function SkeletonCard() {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="flex flex-col sm:flex-row">
        <div className="w-full sm:w-32 h-48 bg-gray-200 skeleton"></div>
        <div className="p-4 flex-1 space-y-3">
          <div className="h-6 w-3/4 bg-gray-200 rounded skeleton"></div>
          <div className="h-4 w-1/2 bg-gray-200 rounded skeleton"></div>
          <div className="h-4 w-2/3 bg-gray-200 rounded skeleton"></div>
          <div className="h-4 w-1/3 bg-gray-200 rounded skeleton"></div>
          <div className="flex gap-2 pt-2">
            <div className="h-8 w-20 bg-gray-200 rounded skeleton"></div>
            <div className="h-8 w-24 bg-gray-200 rounded skeleton"></div>
            <div className="h-8 w-16 bg-gray-200 rounded skeleton"></div>
          </div>
        </div>
      </div>
    </div>
  );
}