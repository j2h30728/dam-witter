import { createContext } from 'react';

import { TweetResponse } from '../../../types/index';
import { Author } from './Author';
import { Content, ContentWithLink } from './Content';
import { DeleteButton } from './DeleteButton';
import { Description } from './Description';

export const tweetContext = createContext<TweetResponse | null>(null);

export const TweetRoot = ({ children, tweet }: { children: React.ReactNode; tweet: TweetResponse }) => {
  return (
    <tweetContext.Provider value={tweet}>
      <div className="relative flex flex-col items-center w-full gap-4 px-2 py-3 mb-2 border-b border-stone-400">
        {children}
      </div>
    </tweetContext.Provider>
  );
};

export const Tweet = Object.assign(TweetRoot, { Author, Content, ContentWithLink, DeleteButton, Description });
