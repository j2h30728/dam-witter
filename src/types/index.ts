import { Comment, Follow, Like, Profile, Tweet, User } from '@prisma/client';

export interface ResponseType<T> {
  [key: string]: any;
  data: T | null;
  isSuccess: boolean;
  message: null | string;
  statusCode: number;
}

export type Method = 'DELETE' | 'GET' | 'PATCH' | 'POST' | 'PUT';
type UserWithoutPassword = Omit<User, 'password'>;
type IncludeUser = {
  email: string;
  id: string;
  name: string;
  profile: Profile | null;
};
export interface UserInput {
  email: string;
  name: string;
  password: string;
}

export interface TweetInComment extends Comment {
  user: IncludeUser;
}

export interface TweetResponse extends Tweet {
  _count: { comments: number; likes: number };
  comments?: TweetInComment[];
  isFollowing?: boolean;
  isLiked?: boolean;
  likedTweetsByLoggedInUser?: boolean;
  likes?: Like[];
  user: IncludeUser;
}

export interface ProfileResponse extends UserWithoutPassword {
  followers: Follow[];
  following: Follow[];
  isFollowing?: boolean;
  likes: Like[];
  profile: Profile | null;
  tweets: Tweet[];
}
export interface CommentResponse extends Comment {
  tweet?: {
    id: string;
    text: string;
  };
  user: IncludeUser;
}

export type UploadBasicInputText = { imageId?: string; text: string };
export type EditProfileInput = { avatarId?: string; bio: string; name: string };
