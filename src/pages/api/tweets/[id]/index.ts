import type { ResponseType, TweetResponse } from '@/types';

import { METHOD } from '@/constants';
import { db } from '@/libs/server';
import { withApiSession, withHandler } from '@/libs/server';
import { NextApiRequest, NextApiResponse } from 'next';

async function handler(req: NextApiRequest, res: NextApiResponse<ResponseType<TweetResponse | TweetResponse[]>>) {
  const {
    query: { id },
    session: { user },
  } = req;

  if (req.method === METHOD.GET) {
    const tweet = await db.tweet.findUnique({
      include: {
        _count: {
          select: {
            likes: true,
          },
        },
        user: {
          select: {
            email: true,
            name: true,
            profile: true,
          },
        },
      },
      where: {
        id: String(id),
      },
    });

    if (!tweet)
      return res.status(400).json({ data: null, isSuccess: false, message: '잘못된 접근입니다.', statusCode: 400 });

    const isLiked = Boolean(
      await db.like.findFirst({
        where: {
          tweetId: tweet.id,
          userId: String(user?.id),
        },
      })
    );

    return res.status(200).json({ data: tweet, isLiked, isSuccess: true, message: null, statusCode: 200 });
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
        user: {
          select: {
            email: true,
            name: true,
            profile: true,
          },
        },
      },
    });
    return res.status(201).json({ data: newTweet, isSuccess: true, message: null, statusCode: 201 });
  }
}
export default withApiSession(withHandler({ handler, methods: [METHOD.GET] }));
