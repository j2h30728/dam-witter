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
export type UserInformation = {
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
  user: UserInformation;
}

export interface TweetResponse extends Tweet {
  _count: { comments: number; likes: number };
  comments?: TweetInComment[];
  isFollowing?: boolean;
  isLiked?: boolean;
  likedTweetsByLoggedInUser?: boolean;
  likes?: Like[];
  user: UserInformation;
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
  user: UserInformation;
}
export interface FollowResponse {
  followers: ({ follower: UserInformation } & Follow)[];
  following: ({ following: UserInformation } & Follow)[];
  profile: (Profile & { user: { email: string; id: string; name: string } }) | null;
}

export type UploadBasicInputText = { imageId?: string; text: string };
export type EditProfileInput = { avatarId?: string; bio: string; name: string };
