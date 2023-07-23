import type { ResponseType, TweetResponse } from '@/types';

import { METHOD } from '@/constants';
import { db } from '@/libs/server';
import { withApiSession, withHandler } from '@/libs/server';
import { NextApiRequest, NextApiResponse } from 'next';

async function handler(req: NextApiRequest, res: NextApiResponse<ResponseType<TweetResponse | TweetResponse[]>>) {
  if (req.method === METHOD.GET) {
    const { user } = req.session;
    const tweets = await db.tweet.findMany({
      include: {
        _count: {
          select: {
            likes: true,
          },
        },
        likes: {
          where: {
            userId: user?.id,
          },
        },
        user: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
    const transformedTweets = tweets.map(tweet => ({
      ...tweet,
      isLiked: tweet.likes.some(like => like.userId === user?.id),
    }));
    return res.status(200).json({ data: transformedTweets, isSuccess: true, message: null, statusCode: 200 });
  }

  if (req.method === METHOD.POST) {
    const {
      body: { imageId, text },
      session: { user },
    } = req;
    if (imageId) {
      const newTweetWithImage = await db.tweet.create({
        data: {
          image: imageId,
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

      return res.status(201).json({ data: newTweetWithImage, isSuccess: true, message: null, statusCode: 201 });
    }
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
