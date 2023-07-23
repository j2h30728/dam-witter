export default function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center w-full h-[600px]">
      <div className="w-16 h-16 border-t-4 border-b-4 border-gray-900 rounded-full animate-spin"></div>
    </div>
  );
}
