import Layout from '@/components/common/Layout';
import Textarea from '@/components/common/Textarea';
import { METHOD, ROUTE_PATH } from '@/constants';
import { useForm, useSelectImage } from '@/hooks';
import { useMutation } from '@/libs/client';
import { parameterToString } from '@/libs/client/utils';
import { tweetValidator } from '@/libs/client/validators';
import { ResponseType, TweetResponse, UploadTweetInput } from '@/types';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { AiOutlinePicture } from 'react-icons/ai';

export default function Upload() {
  const [isTweetSubmissionInProgress, setIsTweetSubmissionInProgress] = useState(false);
  const router = useRouter();
  const [createTweet, { data: createdTweet, error: createdTweetError, isLoading: isCreateTweetApiLoading }] =
    useMutation<ResponseType<TweetResponse>>();
  const { errorMessage, errors, form, isError, onChange } = useForm<UploadTweetInput>(
    { tweet: '' },
    { tweet: tweetValidator }
  );
  const { cancelImage, imageId, isImageLoading, previewImage, selectedImage } = useSelectImage();

  useEffect(() => {
    if (createdTweet?.isSuccess) {
      router.push(ROUTE_PATH.HOME);
    } else if (createdTweetError) {
      alert(createdTweet?.message);
      console.error(createdTweetError);
    }
  }, [createdTweet, router, createdTweetError]);

  const handleCreateTweet = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isError) return alert(errorMessage.at(0));
    setIsTweetSubmissionInProgress(true);

    if (!previewImage) {
      await createTweet('/api/tweets', METHOD.POST, { text: form.tweet });
      setIsTweetSubmissionInProgress(false);
    }
  };

  useEffect(() => {
    if (!isImageLoading && imageId && isTweetSubmissionInProgress) {
      createTweet('/api/tweets', METHOD.POST, { imageId, text: form.tweet });
      setIsTweetSubmissionInProgress(false);
    }
  }, [imageId, form.tweet, createTweet, isImageLoading, isTweetSubmissionInProgress]);

  const isCreatingTweet = isTweetSubmissionInProgress || isCreateTweetApiLoading;

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
        <button className="button" disabled={isCreatingTweet} onClick={cancelImage} type="button">
          사진등록취소
        </button>
        <Textarea
          disabled={isCreatingTweet}
          errorMassage={form.tweet && !errors.tweet.isValid && errors.tweet.message}
          name="tweet"
          onChange={onChange}
          placeholder="텍스트를 입력해주세요."
          textareaStyle="w-11/12 h-40 p-2 mx-5 mt-10 text-lg border-2 resize-none rounded-xl border-stone-200"
          value={form.tweet}
        />
        <button
          className="w-3/5 text-center button disabled:border-none disabled:bg-stone-400"
          disabled={isCreatingTweet}
        >
          <span className={parameterToString('font-semibold ', isCreatingTweet ? 'text-stone-100' : '')}>
            {isCreatingTweet ? '트윗 등록중...' : '추가하기'}
          </span>
        </button>
      </form>
    </Layout>
  );
}
