import LoadingSpinner from './LoadingSpinner';

const Loader = ({ loaderText }: { loaderText: string }) => {
  return (
    <div className="flex items-center justify-center h-[calc(100vh-8rem)]">
      <LoadingSpinner text={loaderText} />
    </div>
  );
};

export default Loader;
