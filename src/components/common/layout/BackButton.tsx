import { AiOutlineLeft } from 'react-icons/ai';

const BackButton = ({ onClick }: { onClick: () => void }) => {
  return (
    <AiOutlineLeft className="cursor-pointer stroke-beige2 fill-beige2" onClick={onClick} size={25} strokeWidth={40} />
  );
};

export default BackButton;
