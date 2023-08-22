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
  const tweet = await db.tweet.findUnique({
    include: {
      _count: {
        select: {
          comments: true,
          likes: true,
        },
      },
      comments: {
        select: {
          createdAt: true,
          id: true,
          text: true,
          user: {
            select: {
              email: true,
              id: true,
              name: true,
              profile: true,
            },
          },
        },
      },
      user: {
        select: {
          email: true,
          id: true,
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

  if (req.method === METHOD.GET) {
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
    const { text } = JSON.parse(req.body);
    const { user } = req.session;

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
            comments: true,
            likes: true,
          },
        },
        user: {
          select: {
            email: true,
            id: true,
            name: true,
            profile: true,
          },
        },
      },
    });
    return res.status(201).json({ data: newTweet, isSuccess: true, message: null, statusCode: 201 });
  }

  if (req.method === METHOD.DELETE) {
    await db.tweet.delete({
      where: {
        id: tweet.id,
      },
    });
    return res.status(200).json({ data: null, isSuccess: true, message: '삭제되었습니다.', statusCode: 204 });
  }
}

export default withApiSession(withHandler({ handler, methods: [METHOD.GET, METHOD.POST, METHOD.DELETE] }));
