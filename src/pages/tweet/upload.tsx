import Layout from '@/components/common/Layout';
import { METHOD, ROUTE_PATH } from '@/constants';
import { useInput, useSelectImage } from '@/hooks';
import { useMutation } from '@/libs/client';
import { ResponseType, TweetResponse } from '@/types';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import useSWR from 'swr';

export default function Upload() {
  const [input, onChange, reset] = useInput('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const [createTweet, { data: createdTweet, error: createdTweetError }] = useMutation<ResponseType<TweetResponse>>();

  const { imageFile, previewImage, selectedImage } = useSelectImage();

  useEffect(() => {
    if (createdTweet?.isSuccess) {
      router.push(ROUTE_PATH.HOME);
    } else if (createdTweetError) {
      alert(createdTweet?.message);
      console.error(createdTweetError);
    }
  }, [createdTweet, router, createdTweetError]);

  const handleCreateTweet = async () => {
    setIsLoading(true);
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
    reset();
    setIsLoading(false);
  };

  return (
    <Layout hasBackButton title="TWEET UPLOAD">
      <div className="flex flex-col items-center justify-center space-y-4 ">
        <h1>Tweet</h1>
        <label
          className="px-3 py-2 text-sm font-medium text-gray-700 border border-gray-300 rounded-md shadow-sm cursor-pointer hover:bg-gray-50 focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
          htmlFor="image"
        >
          Image
          <input accept="image/*" className="hidden" id="image" name="image" onChange={selectedImage} type="file" />
        </label>
        {previewImage && (
          <div className="relative w-full h-60 bg-slate-500">
            <Image alt="preview Image" className="object-contain w-full h-60 " fill src={previewImage} />
          </div>
        )}
        <textarea
          className="w-3/4 h-3/5"
          id="text"
          name="text"
          onChange={onChange}
          placeholder="텍스트를 입력해주세요."
          value={input}
        />
        {isLoading ? (
          <p>등록중...</p>
        ) : (
          <div>
            <button onClick={handleCreateTweet}>추가하기</button>
          </div>
        )}
      </div>
    </Layout>
  );
}
