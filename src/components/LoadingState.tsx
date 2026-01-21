export function LoadingState() {
  return (
    <div className="flex flex-col items-center justify-center py-16">
      <div className="w-12 h-12 border-4 border-[#F7F7F7] dark:border-[#2A2A2A] border-t-[#111111] dark:border-t-white rounded-full animate-spin mb-4"></div>
      <p className="text-[#8E8E93] dark:text-[#A0A0A0]">Loading...</p>
    </div>
  );
}
