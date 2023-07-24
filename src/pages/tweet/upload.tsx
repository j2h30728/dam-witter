import Layout from '@/components/common/Layout';
import { METHOD, ROUTE_PATH } from '@/constants';
import { useInput, useSelectImage } from '@/hooks';
import { useMutation } from '@/libs/client';
import getImageId from '@/libs/client/getImageId';
import { ResponseType, TweetResponse } from '@/types';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { AiOutlinePicture } from 'react-icons/ai';

export default function Upload() {
  const [input, onChange, reset] = useInput('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const [createTweet, { data: createdTweet, error: createdTweetError }] = useMutation<ResponseType<TweetResponse>>();

  const { cancelImage, imageFile, previewImage, selectedImage } = useSelectImage();

  useEffect(() => {
    if (createdTweet?.isSuccess) {
      setIsLoading(false);
      router.push(ROUTE_PATH.HOME);
    } else if (createdTweetError) {
      alert(createdTweet?.message);
      console.error(createdTweetError);
    }
  }, [createdTweet, router, createdTweetError]);

  const handleCreateTweet = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    if (imageFile) {
      const id = await getImageId(imageFile, input);
      await createTweet('/api/tweets', METHOD.POST, { imageId: id, text: input });
    } else {
      await createTweet('/api/tweets', METHOD.POST, { text: input });
    }
    reset();
  };

  return (
    <Layout hasBackButton isLoggedIn title="TWEET UPLOAD">
      <form className="flex flex-col items-center justify-center space-y-4 " onSubmit={handleCreateTweet}>
        <label
          className="relative flex items-center justify-center w-full border-2 border-dashed rounded-lg cursor-pointer h-60 border-beige3"
          htmlFor="image"
        >
          <input accept="image/*" className="hidden" id="image" name="image" onChange={selectedImage} type="file" />
          {previewImage ? (
            <Image alt="preview Image" className="object-contain w-full h-60 " fill src={previewImage} />
          ) : (
            <div className="r">
              <AiOutlinePicture className="text-beige3" size={80} />
            </div>
          )}
        </label>
        <button className="button" onClick={cancelImage}>
          사진등록취소
        </button>
        <textarea
          className="w-11/12 h-40 p-2 mx-5 mt-10 text-lg border-2 resize-none rounded-xl border-stone-200"
          id="text"
          inputMode="text"
          name="text"
          onChange={onChange}
          placeholder="텍스트를 입력해주세요."
          required
          value={input}
        />
        <button className="w-3/5 text-center button">
          <span className="font-semibold "> {isLoading ? '등록중...' : '추가하기'}</span>
        </button>
      </form>
    </Layout>
  );
}
