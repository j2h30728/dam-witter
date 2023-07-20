import type { ResponseType, TweetResponse } from '@/types';

import { METHOD } from '@/constants';
import { db } from '@/libs/server';
import { withApiSession, withHandler } from '@/libs/server';
import { NextApiRequest, NextApiResponse } from 'next';

async function handler(req: NextApiRequest, res: NextApiResponse<ResponseType<TweetResponse | TweetResponse[]>>) {
  if (req.method === METHOD.GET) {
    const tweets = await db.tweet.findMany({
      include: {
        _count: {
          select: {
            likes: true,
          },
        },
        user: true,
      },
      orderBy: {
        id: 'desc',
      },
    });
    return res.status(200).json({ data: tweets, isSuccess: true, message: null, statusCode: 200 });
  }

  if (req.method === METHOD.POST) {
    const {
      body: { text },
      session: { user },
    } = req;

    const newTweet = await db.tweet.create({
      data: {
        text,
        user: {
          connect: {
            id: user?.id,
          },
        },
      },
      include: {
        _count: {
          select: {
            likes: true,
          },
        },
        user: true,
      },
    });
    return res.status(201).json({ data: newTweet, isSuccess: true, message: null, statusCode: 201 });
  }
}
export default withApiSession(withHandler({ handler, methods: [METHOD.GET, METHOD.POST] }));
