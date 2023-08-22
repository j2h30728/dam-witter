import { Layout, Textarea } from '@/components';
import { METHOD, ROUTE_PATH } from '@/constants';
import { useForm, useSelectImage } from '@/hooks';
import { basicTextValidator, mutateData, parameterToString } from '@/libs/client';
import { ResponseType, TweetResponse, UploadBasicInputText } from '@/types';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { AiOutlinePicture } from 'react-icons/ai';
import useSWRMutation from 'swr/mutation';

export default function Upload() {
  const [isTweetSubmissionInProgress, setIsTweetSubmissionInProgress] = useState(false);
  const router = useRouter();

  const {
    data: uploadedTweet,
    isMutating: isUploadTweetMutating,
    trigger,
  } = useSWRMutation<ResponseType<TweetResponse>, any, string, UploadBasicInputText>(
    '/api/tweets',
    mutateData<UploadBasicInputText>(METHOD.POST),
    {
      onError: error => console.error(error),
      onSuccess: data => (data.isSuccess ? router.push(ROUTE_PATH.HOME) : alert(uploadedTweet?.message)),
    }
  );
  const { errorMessage, errors, form, isError, onChange } = useForm<UploadBasicInputText>(
    { text: '' },
    { text: basicTextValidator }
  );
  const { cancelImage, imageId, isImageLoading, previewImage, selectedImage } = useSelectImage();

  const handleCreateTweet = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isError) return alert(errorMessage.at(0));
    setIsTweetSubmissionInProgress(true);

    if (!previewImage) {
      trigger({ text: form.text });
      setIsTweetSubmissionInProgress(false);
    }
  };

  useEffect(() => {
    if (!isImageLoading && imageId && isTweetSubmissionInProgress) {
      trigger({ imageId, text: form.text });
      setIsTweetSubmissionInProgress(false);
    }
  }, [imageId, form.text, trigger, isImageLoading, isTweetSubmissionInProgress]);

  const isCreatingTweet = isTweetSubmissionInProgress || isUploadTweetMutating;

  return (
    <Layout hasBackButton isLoggedIn title="TWEET UPLOAD">
      <form className="flex flex-col items-center justify-center space-y-4 " onSubmit={handleCreateTweet}>
        <label
          className="relative flex items-center justify-center w-full border-2 border-dashed rounded-lg cursor-pointer h-60 border-beige3"
          htmlFor="image"
        >
          <input accept="image/*" className="hidden" id="image" name="image" onChange={selectedImage} type="file" />
          {previewImage ? (
            <Image
              alt="preview Image"
              className="object-contain w-full h-60 "
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              src={previewImage}
            />
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
          errorMassage={form.text && !errors.text.isValid && errors.text.message}
          name="text"
          onChange={onChange}
          placeholder="텍스트를 입력해주세요."
          textareaStyle="w-11/12 h-40 p-2 mx-5 mt-10 text-lg border-2 resize-none rounded-xl border-stone-200"
          value={form.text}
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
