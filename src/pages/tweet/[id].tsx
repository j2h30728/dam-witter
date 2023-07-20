import { METHOD } from '@/constants';
import { useMutation } from '@/libs/client';
import { ResponseType, TweetResponse } from '@/types';
import { useRouter } from 'next/router';
import useSWR from 'swr';

export default function DetailTweet() {
  const router = useRouter();
  const { data: responseTweet, mutate: tweetMutate } = useSWR<ResponseType<TweetResponse>>(
    router.query.id ? `/api/tweets/${router.query.id}` : null
  );
  const [likeMutate, { data }] = useMutation<ResponseType<TweetResponse>>();
  console.log('like', data);
  console.log(responseTweet);
  return (
    <div>
      <h1>Detail Tweet</h1>
      <small>{responseTweet?.data?.user.name}</small>
      <pre>{responseTweet?.data?.text}</pre>
      <p>{responseTweet?.isLiked ? '좋아요 됨' : '좋아요 아님'}</p>
      <p>{responseTweet?.data?._count.likes}</p>
      <button
        onClick={() => {
          if (responseTweet && responseTweet.data) {
            likeMutate(`/api/tweets/${router.query.id}/like`, METHOD.POST);
            tweetMutate(
              {
                ...responseTweet,
                data: {
                  ...responseTweet.data,
                  _count: {
                    ...responseTweet.data._count,
                    likes: responseTweet.data._count
                      ? responseTweet.isLiked
                        ? responseTweet.data._count.likes - 1
                        : responseTweet.data._count.likes + 1
                      : 1,
                  },
                },
                isLiked: !responseTweet.isLiked,
              },
              false
            );
          }
        }}
      >
        좋아요버튼
      </button>
    </div>
  );
}
