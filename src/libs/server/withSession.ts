import { withIronSessionApiRoute, withIronSessionSsr } from 'iron-session/next';
import { GetServerSidePropsContext, GetServerSidePropsResult, NextApiHandler } from 'next';

import sessionOptions from './sessionOptions';

export function withApiSession(fn: NextApiHandler) {
  return withIronSessionApiRoute(fn, sessionOptions);
}

export function withSsrSession<
  P extends {
    [key: string]: unknown;
  },
>(fn: (context: GetServerSidePropsContext) => GetServerSidePropsResult<P> | Promise<GetServerSidePropsResult<P>>) {
  return withIronSessionSsr(fn, sessionOptions);
}
