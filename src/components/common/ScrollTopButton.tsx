import { AiOutlineUp } from 'react-icons/ai';

const ScrollTopButton = ({ onClick }: { onClick: () => void }) => {
  return (
    <div
      className="absolute z-50 p-3 duration-200 ease-in rounded-full cursor-pointer right-5 bottom-20 bg-base2 hover:scale-110 hover:ease-out hover:transition hover:duration-300 active:scale-95"
      onClick={onClick}
    >
      <AiOutlineUp className="stroke-2 stroke-beige1 fill-beige1" size={33} />
    </div>
  );
};

export default ScrollTopButton;
