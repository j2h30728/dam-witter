import { Layout, Textarea } from '@/components';
import useUploadTweet from '@/hooks/tweets/useUploadTweet';
import { parameterToString } from '@/libs/client';
import Image from 'next/image';
import { AiOutlinePicture } from 'react-icons/ai';

export default function Upload() {
  const {
    form: { isError, onChange, value },
    image: { cancelImage, previewImage, selectedImage },
    upload: { isCreatingTweet, onSubmit },
  } = useUploadTweet();

  return (
    <Layout hasBackButton isLoggedIn title="TWEET UPLOAD">
      <form className="flex flex-col items-center justify-center space-y-4 " onSubmit={onSubmit}>
        <label
          className="relative flex items-center justify-center w-full border-2 border-dashed rounded-lg cursor-pointer h-60 border-beige3"
          htmlFor="image"
        >
          <input
            accept="image/*"
            className="hidden"
            disabled={isCreatingTweet}
            id="image"
            name="image"
            onChange={selectedImage}
            type="file"
          />
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
          errorMassage={isError.text}
          name="text"
          onChange={onChange}
          placeholder="텍스트를 입력해주세요."
          textareaStyle="w-11/12 h-40 p-2 mx-5 mt-10 text-lg border-2 resize-none rounded-xl border-stone-200"
          value={value.text}
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
