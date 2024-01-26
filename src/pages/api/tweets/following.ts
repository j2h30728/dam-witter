import type { ResponseType, TweetResponse } from '@/types';

import { METHOD } from '@/constants';
import { db } from '@/libs/server';
import { withApiSession, withHandler } from '@/libs/server';
import { NextApiRequest, NextApiResponse } from 'next';

async function handler(req: NextApiRequest, res: NextApiResponse<ResponseType<any[]>>) {
  const { user } = req.session;
  const { limit, pageIndex } = req.query;

  const take = Number(limit ?? 10);
  const skip = Number(pageIndex ?? 0) * take;

  if (req.method === METHOD.GET) {
    const followingUsers = await db.follow.findMany({
      select: {
        followingId: true,
      },
      where: {
        followerId: String(user?.id),
      },
    });

    const followingIds = followingUsers.map(follow => follow.followingId);

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
      where: {
        userId: {
          in: followingIds,
        },
      },
    });

    const transformedTweets = tweets.map(tweet => ({
      ...tweet,
      isFollowing: tweet.user.followers.some(follower => follower.followerId === user?.id),
      isLiked: tweet.likes.some(like => like.user.id === user?.id),
    }));

    return res.status(200).json({
      data: transformedTweets,
      isSuccess: true,
      message: null,
      statusCode: 200,
    });
  }
}

export default withApiSession(withHandler({ handler, isPrivate: true, methods: [METHOD.GET] }));
