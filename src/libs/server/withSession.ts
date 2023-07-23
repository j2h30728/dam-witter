import { withIronSessionApiRoute, withIronSessionSsr } from 'iron-session/next';
import { GetServerSidePropsContext, GetServerSidePropsResult, NextApiHandler } from 'next';

declare module 'iron-session' {
  interface IronSessionData {
    user?: {
      id: string;
    };
  }
}

const cookieOptions = {
  cookieName: 'dam-witter',
  password: process.env.COOKIE_PASSWORD as string,
};

export function withApiSession(fn: NextApiHandler) {
  return withIronSessionApiRoute(fn, cookieOptions);
}

export function withSsrSession<
  P extends {
    [key: string]: unknown;
  },
>(fn: (context: GetServerSidePropsContext) => GetServerSidePropsResult<P> | Promise<GetServerSidePropsResult<P>>) {
  return withIronSessionSsr(fn, cookieOptions);
}
