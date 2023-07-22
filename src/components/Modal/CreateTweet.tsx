interface CreateTweetProp {
  createTweet: () => void;
  input: string;
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onClickCloseModal: () => void;
  previewImage : string;
  uploadImage: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function CreateTweet({
  createTweet,
  input,
  onChange,
  onClickCloseModal,
  previewImage,
  uploadImage,
}: CreateTweetProp) {
  console.log(previewImage);
  return (
    <div className="flex flex-col items-center justify-center space-y-4 bg-blue-200 rounded-lg h-[500px]">
      <h1>Tweet</h1>
      <label
        className="px-3 py-2 text-sm font-medium text-gray-700 border border-gray-300 rounded-md shadow-sm cursor-pointer hover:bg-gray-50 focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
        htmlFor="image"
      >
        Image
        <input accept="image/*" className="hidden" id="image" name="image" onChange={uploadImage} type="file" />
      </label>
      {previewImage && <img className="object-contain w-full h-60 " src={previewImage}></img>}
      <textarea
        className="w-3/4 h-3/5"
        id="text"
        name="text"
        onChange={onChange}
        placeholder="텍스트를 입력해주세요."
        value={input}
      />
      <button onClick={createTweet}>추가하기</button>
      <button onClick={onClickCloseModal}>취소하기</button>
    </div>
  );
}
