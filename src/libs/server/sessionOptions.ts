import { IronSessionOptions } from 'iron-session';

declare module 'iron-session' {
  interface IronSessionData {
    user?: {
      id: string;
    };
  }
}

const sessionOptions: IronSessionOptions = {
  cookieName: 'dam-witter',
  cookieOptions: {
    maxAge: undefined,
  },
  password: process.env.COOKIE_PASSWORD as string,
};

export default sessionOptions;
