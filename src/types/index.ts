import { Like, Tweet, User } from '@prisma/client';

export interface ResponseType<T> {
  [key: string]: any;
  data: T | null;
  isSuccess: boolean;
  message: null | string;
  statusCode: number;
}

export type Method = 'DELETE' | 'GET' | 'PATCH' | 'POST' | 'PUT';

export interface UserInput {
  email: string;
  password: string;
  username: string;
}

export interface TweetResponse extends Tweet {
  _count: { likes: number };
  isLiked?: boolean;
  likedTweetsByLoggedInUser?: boolean;
  likes?: Like[];
  user: User;
}
