import { Layout, Textarea } from '@/components';
import Button from '@/components/common/Button';
import useUploadTweet from '@/hooks/tweets/useUploadTweet';
import Image from 'next/image';
import { AiOutlinePicture } from 'react-icons/ai';

export default function Upload() {
  const {
    form: { onChange, value },
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
        <Button className="button" disabled={isCreatingTweet} onClick={cancelImage} size="sm">
          사진등록취소
        </Button>
        <Textarea
          disabled={isCreatingTweet}
          name="text"
          onChange={onChange}
          placeholder="텍스트를 입력해주세요."
          value={value.text}
        />
        <Button disabled={isCreatingTweet} type="submit" width="w-full">
          {isCreatingTweet ? '트윗 등록중...' : '추가하기'}
        </Button>
      </form>
    </Layout>
  );
}
