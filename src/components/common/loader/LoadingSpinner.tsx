export default function LoadingSpinner({ text }: { text?: String }) {
  return (
    <div className="flex flex-col items-center justify-center w-full gap-5 my-10 h-fit ">
      <div className="w-16 h-16 border-t-4 border-b-4 border-gray-900 rounded-full animate-spin"></div>
      <span>{text}</span>
    </div>
  );
}
