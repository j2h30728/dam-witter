import { Tweet } from '@prisma/client';

export interface ResponseType<T> {
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

export type TweetResponse = Tweet & { user: { email: string; name: string } };
