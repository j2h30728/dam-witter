import Layout from '@/components/common/Layout';
import { ROUTE_PATH } from '@/constants';
import { makeImagePath } from '@/libs/client';
import { ResponseType, TweetResponse } from '@/types';
import Image from 'next/image';
import Link from 'next/link';
import useSWR from 'swr';

export default function Home() {
  const { data: responseTweets, mutate } = useSWR<ResponseType<TweetResponse[]>>('/api/tweets', {
    revalidateOnFocus: true,
  });

  return (
    <Layout isLoggedIn title="DAM">
      {responseTweets?.data?.map((tweet: TweetResponse) => (
        <Link href={`${ROUTE_PATH.TWEETS}/${tweet.id}`} key={tweet.id}>
          <h3>{tweet.user.name}</h3>
          <small>{tweet.user.email}</small>
          {tweet.image && (
            <div className="relative w-full h-60 bg-slate-500">
              <Image alt={tweet.image} className="object-contain" fill src={makeImagePath(tweet.image)}></Image>
            </div>
          )}
          <pre>{tweet.text}</pre>
        </Link>
      ))}
    </Layout>
  );
}
