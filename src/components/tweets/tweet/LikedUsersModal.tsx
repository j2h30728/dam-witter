import type { UserInformation } from '@/types';

import Button from '@/components/common/Button';
import Modal from '@/components/common/Modal';
import UserInformationItem from '@/components/common/UserInformationItem';

const LikedUsersModal = ({
  isOpen,
  likedUser,
  onClose,
}: {
  isOpen: boolean;
  likedUser: UserInformation[];
  onClose: () => void;
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="flex flex-col justify-between w-72 h-[500px] min-h-fit ">
        <h3 className="mt-5 text-xl font-bold text-center text-base3">좋아하는 사람</h3>
        <div className="flex flex-col h-[65%] gap-3 my-5 overflow-y-auto overflow-x-hidden">
          {likedUser.map(user => (
            <UserInformationItem key={user.id} user={user} />
          ))}
        </div>
        <Button className="mb-3" onClick={onClose} size="sm">
          닫기
        </Button>
      </div>
    </Modal>
  );
};

export default LikedUsersModal;
