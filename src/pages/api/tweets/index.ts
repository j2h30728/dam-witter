import type { ResponseType, TweetResponse } from '@/types';

import { METHOD } from '@/constants';
import { db } from '@/libs/server';
import { withApiSession, withHandler } from '@/libs/server';
import { NextApiRequest, NextApiResponse } from 'next';

async function handler(req: NextApiRequest, res: NextApiResponse<ResponseType<TweetResponse | TweetResponse[]>>) {
  const { user } = req.session;
  const { limit, pageIndex } = req.query;

  const skip = Number(pageIndex ?? 0) * (Number(limit) ?? 10);
  const take = Number(limit) ?? 10;

  const tweets = await db.tweet.findMany({
    include: {
      _count: {
        select: {
          comments: true,
          likes: true,
        },
      },
      likes: {
        where: {
          userId: user?.id,
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
    orderBy: {
      createdAt: 'desc',
    },
    skip,
    take,
  });
  const transformedTweets = tweets.map(tweet => ({
    ...tweet,
    isLiked: tweet.likes.some(like => like.userId === user?.id),
  }));
  if (req.method === METHOD.GET) {
    return res.status(200).json({ data: transformedTweets, isSuccess: true, message: null, statusCode: 200 });
  }

  if (req.method === METHOD.POST) {
    const { imageId, text } = JSON.parse(req.body);
    const { user } = req.session;
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
    return res
      .status(201)
      .json({ data: [newTweet, ...transformedTweets], isSuccess: true, message: '추가 되었습니다.', statusCode: 201 });
  }
}
export default withApiSession(withHandler({ handler, isPrivate: true, methods: [METHOD.GET, METHOD.POST] }));
