import Modal from '@/components/Modal';
import CreateTweet from '@/components/Modal/CreateTweet';
import { METHOD, ROUTE_PATH } from '@/constants';
import { useControlModal, useInput, useSelectImage } from '@/hooks';
import useLogOut from '@/hooks/users/useLogOut';
import { makeImagePath } from '@/libs/client';
import useMutation from '@/libs/client/useMutation';
import { ResponseType, TweetResponse } from '@/types';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect } from 'react';
import useSWR from 'swr';

export default function Home() {
  const { handleCloseModal, handleOpenModal, isOpen } = useControlModal();
  const [input, onChange, reset] = useInput('');
  const handleLogOut = useLogOut();

  const [createTweet, { data: createdTweet, error: createdTweetError }] = useMutation<ResponseType<TweetResponse>>();

  const { cancelImage, imageFile, previewImage, selectedImage } = useSelectImage();

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

  const handleCreateTweet = async () => {
    if (imageFile) {
      const {
        data: { uploadURL },
      } = await (await fetch('/api/files')).json();
      const form = new FormData();
      form.append('file', imageFile, input.slice(5));
      const {
        result: { id },
      } = await (await fetch(uploadURL, { body: form, method: 'POST' })).json();
      createTweet('/api/tweets', METHOD.POST, { imageId: id, text: input });
    } else {
      createTweet('/api/tweets', METHOD.POST, { text: input });
    }
    handleCloseModal();
    reset();
  };

  return (
    <div>
      <main>HOME</main>
      <button onClick={handleOpenModal}>트윗추가하기</button>
      <button onClick={handleLogOut}>Log-Out</button>
      {responseTweets?.data?.map((tweet: TweetResponse) => (
        <Link href={`${ROUTE_PATH.TWEETS}/${tweet.id}`} key={tweet.id}>
          <h3>{tweet.user.name}</h3>
          <small>{tweet.user.email}</small>
          {tweet.image && (
            <div className="relative w-full h-60 bg-slate-500">
              <Image alt={tweet.image} className="object-contain" fill src={makeImagePath(tweet.image)}></Image>
            </div>
          )}
          <pre>{tweet.text}</pre>
        </Link>
      ))}
      {isOpen && (
        <Modal
          onClose={() => {
            handleCloseModal();
            reset();
            cancelImage();
          }}
        >
          <CreateTweet
            createTweet={handleCreateTweet}
            input={input}
            onChange={onChange}
            onClickCloseModal={handleCloseModal}
            previewImage={previewImage}
            selectedImage={selectedImage}
          />
        </Modal>
      )}
    </div>
  );
}
