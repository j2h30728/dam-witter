export interface ResponseType {
  [key: string]: any;
  isSuccess: boolean;
  message?: string;
}

export type Method = 'DELETE' | 'GET' | 'PATCH' | 'POST' | 'PUT';

export interface UserInput {
  email: string;
  password: string;
  username: string;
}
