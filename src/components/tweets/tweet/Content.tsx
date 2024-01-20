import TweetImage from '@/components/images/TweetImage';
import { ROUTE_PATH } from '@/constants';
import Link from 'next/link';
import { useContext } from 'react';

import { tweetContext } from '.';

export const ContentWithLink = () => {
  const tweet = useContext(tweetContext);
  return (
    <Link className="w-full" href={`${ROUTE_PATH.TWEETS}/${tweet?.id}`}>
      {tweet?.image && <TweetImage imageId={tweet.image} />}
      <p className="px-3 whitespace-pre-line">{tweet?.text}</p>
    </Link>
  );
};
export const Content = () => {
  const tweet = useContext(tweetContext);
  return (
    <div className="w-full">
      {tweet?.image && <TweetImage imageId={tweet.image} />}
      <p className="px-3 whitespace-pre-line">{tweet?.text}</p>
    </div>
  );
};
