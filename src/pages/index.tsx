import Modal from '@/components/Modal';
import CreateTweet from '@/components/Modal/CreateTweet';
import { METHOD } from '@/constants';
import { useInput, useMutation } from '@/libs/client';
import useControlModal from '@/libs/client/useControlModal';
import { ResponseType, TweetResponse } from '@/types';
import { useRouter } from 'next/router';
import useSWR from 'swr';

export default function Home() {
  const [logOut] = useMutation<ResponseType<null>>();
  const router = useRouter();
  const { handleCloseModal, handleOpenModal, isOpen } = useControlModal();
  const [input, onChange] = useInput('');
  const [createTweet] = useMutation<ResponseType<TweetResponse>>();

  const handleLogOut = () => {
    if (confirm('로그아웃 하시겠습니까?')) {
      logOut('/api/users/log-out', METHOD.POST);
      router.push('/log-in');
    }
  };
  const { data: responseTweets, mutate } = useSWR<ResponseType<TweetResponse[]>>('/api/tweets', {
    revalidateOnFocus: true,
  });

  return (
    <div>
      <main>HOME</main>
      <button onClick={handleOpenModal}>트윗추가하기</button>
      <button onClick={handleLogOut}>Log-Out</button>
      {responseTweets?.data?.map((tweet: TweetResponse) => (
        <div key={tweet.id}>
          <h3>{tweet.user.name}</h3>
          <small>{tweet.user.email}</small>
          <pre>{tweet.text}</pre>
        </div>
      ))}
      {isOpen && (
        <Modal onClose={handleCloseModal}>
          <CreateTweet
            createTweet={() => {
              createTweet('/api/tweets', METHOD.POST, { text: input });
              handleCloseModal();
              mutate();
            }}
            input={input}
            onChange={onChange}
          />
        </Modal>
      )}
    </div>
  );
}
