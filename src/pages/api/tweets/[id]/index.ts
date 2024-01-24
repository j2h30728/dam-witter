import type { ResponseType, TweetResponse } from '@/types';

import { METHOD } from '@/constants';
import { db } from '@/libs/server';
import { withApiSession, withHandler } from '@/libs/server';
import { NextApiRequest, NextApiResponse } from 'next';

async function handler(req: NextApiRequest, res: NextApiResponse<ResponseType<TweetResponse>>) {
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
        include: {
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
          createdAt: 'asc',
        },
      },
      likes: {
        include: {
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
    const isLiked = await db.like.findUnique({
      where: {
        tweetId_userId: {
          tweetId: tweet.id,
          userId: String(user?.id),
        },
      },
    });
    const isFollowing = await db.follow.findUnique({
      where: {
        follower_following: { followerId: String(user?.id), followingId: tweet.userId },
      },
    });
    return res.status(200).json({
      data: { ...tweet, isFollowing: !!isFollowing, isLiked: !!isLiked },
      isSuccess: true,
      message: null,
      statusCode: 200,
    });
  }

  if (req.method === METHOD.DELETE) {
    if (user?.id !== tweet.userId)
      return res.status(401).json({ data: null, isSuccess: false, message: '권한이 없습니다.', statusCode: 401 });

    await db.tweet.delete({
      where: {
        id: tweet.id,
      },
    });
    return res.status(200).json({ data: null, isSuccess: true, message: '삭제 되었습니다.', statusCode: 200 });
  }
}

export default withApiSession(withHandler({ handler, isPrivate: true, methods: [METHOD.GET, METHOD.DELETE] }));
