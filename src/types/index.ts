import { Tweet, User } from '@prisma/client';

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

export type TweetResponse = Tweet & { user: User } & { _count: { likes: number } };
