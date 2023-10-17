import useSWRMutation from 'swr/mutation';

const useLikeTweet = () => {
  return useSWRMutation('/api/tweets', async (url, { arg }: { arg: { tweetId: string } }) => {
    await fetch(`${url}/${arg.tweetId}/like`, {
      method: 'POST',
    });
  });
};

export default useLikeTweet;
