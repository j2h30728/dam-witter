import type { ResponseType, TweetResponse } from '@/types';

import { METHOD } from '@/constants';
import { db } from '@/libs/server';
import { withApiSession, withHandler } from '@/libs/server';
import { NextApiRequest, NextApiResponse } from 'next';

async function handler(req: NextApiRequest, res: NextApiResponse<ResponseType<TweetResponse[]>>) {
  const { user } = req.session;
  const { limit, pageIndex } = req.query;

  const take = Number(limit ?? 10);
  const skip = Number(pageIndex ?? 0) * take;
  if (req.method === METHOD.GET) {
    const tweets = await db.tweet.findMany({
      include: {
        _count: {
          select: {
            comments: true,
            likes: true,
          },
        },
        likes: {
          select: {
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
            followers: true,
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
      isFollowing: tweet.user.followers.some(follower => follower.followerId === user?.id),
      isLiked: tweet.likes.some(like => like.user.id === user?.id),
    }));
    return res.status(200).json({ data: transformedTweets, isSuccess: true, message: null, statusCode: 200 });
  }

  if (req.method === METHOD.POST) {
    const { imageId, text } = JSON.parse(req.body);
    const { user } = req.session;
    await db.tweet.create({
      data: {
        image: imageId ?? null,
        text,
        user: {
          connect: {
            id: user?.id,
          },
        },
      },
    });

    return res.status(201).json({ data: null, isSuccess: true, message: null, statusCode: 201 });
  }
}
export default withApiSession(withHandler({ handler, isPrivate: true, methods: [METHOD.GET, METHOD.POST] }));
