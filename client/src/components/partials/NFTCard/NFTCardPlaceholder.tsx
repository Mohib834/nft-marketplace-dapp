export default function NFTCardPlaceholder() {
  return (
    <div
      role="status"
      className="max-w-sm border border-gray-700 rounded-2xl shadow animate-pulse w-72 p-3 dark:border-gray-800"
    >
      <div className="flex items-center justify-center h-[280px] mb-4 bg-gray-700 rounded-2xl dark:bg-gray-800"></div>
      <div className="h-2.5 bg-gray-700 rounded-full dark:bg-gray-800 w-48 mb-4"></div>
      <span className="sr-only">Loading...</span>
    </div>
  );
}
