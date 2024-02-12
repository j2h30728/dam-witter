import TweetImage from '@/components/images/TweetImage';
import { ROUTE_PATH } from '@/constants';
import { parameterToString } from '@/libs/client';
import Link from 'next/link';

import useTweetContext from './useTweetContext';

export const ContentWithLink = () => {
  const { tweet } = useTweetContext();

  return (
    <Link className="w-full" href={ROUTE_PATH.TWEET(tweet?.id)}>
      {tweet?.image && <TweetImage imageId={tweet.image} />}
      <p className="px-3 whitespace-pre-line">{tweet?.text}</p>
    </Link>
  );
};
export const BasicTweetContent = () => {
  const { tweet } = useTweetContext();

  return (
    <div className="w-full xl:hidden">
      {tweet?.image && <TweetImage imageId={tweet.image} />}
      <p className="px-3 whitespace-pre-line">{tweet?.text}</p>
    </div>
  );
};
export const DesktopTweetContent = () => {
  const { tweet } = useTweetContext();

  return (
    <div className="items-start hidden w-full px-5 xl:flex">
      <p className={parameterToString(tweet?.image ? 'w-1/2' : '', 'px-3 whitespace-pre-line py-5')}>{tweet?.text}</p>
      {tweet?.image && (
        <div className="w-1/2">
          <TweetImage imageId={tweet.image} />
        </div>
      )}
    </div>
  );
};
