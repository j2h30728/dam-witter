import { Comment, Like, Profile, Tweet, User } from '@prisma/client';

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
  _count: { comments: number; likes: number };
  isLiked?: boolean;
  likedTweetsByLoggedInUser?: boolean;
  likes?: Like[];
  user: {
    email: string;
    id: string;
    name: string;
    profile: Profile | null;
  };
}

type UserWithoutPassword = Omit<User, 'password'>;

export interface ProfileResponse extends UserWithoutPassword {
  likes: Like[];
  profile: Profile | null;
  tweets: Tweet[];
}

export interface CommentResponse extends Comment {
  tweet?: {
    id: string;
    text: string;
  };
  user: {
    email: string;
    id: string;
    name: string;
    profile: Profile | null;
  };
}

export type UploadBasicInputText = { text: string };
