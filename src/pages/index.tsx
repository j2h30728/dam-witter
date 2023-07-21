import Modal from '@/components/Modal';
import CreateTweet from '@/components/Modal/CreateTweet';
import { METHOD, ROUTE_PATH } from '@/constants';
import { useControlModal, useInput } from '@/hooks';
import useLogOut from '@/hooks/users/useLogOut';
import useMutation from '@/libs/client/useMutation';
import { ResponseType, TweetResponse } from '@/types';
import Link from 'next/link';
import { useEffect } from 'react';
import useSWR from 'swr';

export default function Home() {
  const { handleCloseModal, handleOpenModal, isOpen } = useControlModal();
  const [input, onChange] = useInput('');
  const handleLogOut = useLogOut();

  const [createTweet, { data: createdTweet, error: createdTweetError }] = useMutation<ResponseType<TweetResponse>>();

  const { data: responseTweets, mutate } = useSWR<ResponseType<TweetResponse[]>>('/api/tweets', {
    revalidateOnFocus: true,
  });
  useEffect(() => {
    if (createdTweet?.isSuccess) {
      mutate();
    } else if (createdTweetError) {
      alert(createdTweet?.message);
      console.error(createdTweetError);
    }
  }, [createdTweet, mutate, createdTweetError]);

  return (
    <div>
      <main>HOME</main>
      <button onClick={handleOpenModal}>트윗추가하기</button>
      <button onClick={handleLogOut}>Log-Out</button>
      {responseTweets?.data?.map((tweet: TweetResponse) => (
        <Link href={`${ROUTE_PATH.TWEETS}/${tweet.id}`} key={tweet.id}>
          <h3>{tweet.user.name}</h3>
          <small>{tweet.user.email}</small>
          <pre>{tweet.text}</pre>
        </Link>
      ))}
      {isOpen && (
        <Modal onClose={handleCloseModal}>
          <CreateTweet
            createTweet={() => {
              createTweet('/api/tweets', METHOD.POST, { text: input });
              handleCloseModal();
            }}
            input={input}
            onChange={onChange}
          />
        </Modal>
      )}
    </div>
  );
}
