import { PropsWithChildren } from 'react';

import { Author } from './Author';
import { BasicTweetContent, ContentWithLink, DesktopTweetContent } from './Content';
import { DeleteButton } from './DeleteButton';
import { Description } from './Description';
import { TweetContext, tweetContext } from './useTweetContext';

export const TweetRoot = ({ children, loggedInUserId, tweet }: PropsWithChildren<TweetContext>) => {
  return (
    <tweetContext.Provider value={{ loggedInUserId, tweet }}>
      <div className="relative flex flex-col items-center w-full gap-4 px-2 py-3 mb-2 border-b border-stone-400">
        {children}
      </div>
    </tweetContext.Provider>
  );
};

export const Tweet = Object.assign(TweetRoot, {
  Author,
  BasicTweetContent,
  ContentWithLink,
  DeleteButton,
  Description,
  DesktopTweetContent,
});
