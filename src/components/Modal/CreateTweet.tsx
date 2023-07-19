interface CreateTweetProp {
  createTweet: () => void;
  input: string;
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  // onClickCloseModal: () => void;
}

export default function CreateTweet({ createTweet, input, onChange }: CreateTweetProp) {
  return (
    <div className="flex flex-col items-center justify-center space-y-4 bg-blue-200 rounded-lg h-[500px]">
      <h1>Tweet</h1>
      <textarea
        className="w-3/4 h-3/5"
        id="text"
        name="text"
        onChange={onChange}
        placeholder="텍스트를 입력해주세요."
        value={input}
      />
      <button onClick={createTweet}>추가하기</button>
    </div>
  );
}
