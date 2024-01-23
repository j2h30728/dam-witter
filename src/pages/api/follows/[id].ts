import type { FollowResponse, ResponseType } from '@/types';

import { METHOD } from '@/constants';
import { db } from '@/libs/server';
import { withApiSession, withHandler } from '@/libs/server';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { NextApiRequest, NextApiResponse } from 'next';

async function handler(req: NextApiRequest, res: NextApiResponse<ResponseType<FollowResponse>>) {
  const {
    method,
    query: { id },
    session: { user },
  } = req;
  try {
    if (!user) {
      throw Error('로그인이 필요합니다.');
    }
    if (method === METHOD.GET) {
      const following = await db.follow.findMany({
        include: {
          following: {
            select: {
              email: true,
              id: true,
              name: true,
              profile: true,
            },
          },
        },
        where: {
          followerId: String(id),
        },
      });
      const followers = await db.follow.findMany({
        include: {
          follower: {
            select: {
              email: true,
              id: true,
              name: true,
              profile: true,
            },
          },
        },
        where: {
          followingId: String(id),
        },
      });
      const profile = await db.profile.findUnique({
        include: {
          user: {
            select: {
              email: true,
              id: true,
              name: true,
            },
          },
        },
        where: { userId: String(id) },
      });
      return res
        .status(200)
        .json({ data: { followers, following, profile }, isSuccess: true, message: null, statusCode: 200 });
    }

    const alreadyExists = await db.follow.findUnique({
      where: {
        follower_following: {
          followerId: user?.id,
          followingId: String(id),
        },
      },
    });

    if (method === METHOD.POST) {
      if (alreadyExists) {
        return res.status(204).end();
      }

      await db.follow.create({
        data: {
          follower: {
            connect: { id: user?.id },
          },
          following: {
            connect: { id: String(id) },
          },
        },
      });
      return res.status(201).json({ data: null, isSuccess: true, message: '팔로우 되었습니다.', statusCode: 201 });
    }

    if (method === METHOD.DELETE) {
      if (alreadyExists) {
        await db.follow.delete({
          where: {
            follower_following: {
              followerId: user?.id,
              followingId: String(id),
            },
          },
        });
      }
      return res.status(200).json({ data: null, isSuccess: true, message: '언팔로우 되었습니다.', statusCode: 200 });
    }
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      if (error.code === 'P2002') {
        return res.status(409).json({
          data: null,
          isSuccess: false,
          message: '이미 존재하는 데이터입니다.',
          statusCode: 409,
        });
      }
    }

    if (error instanceof Error)
      res.status(400).json({ data: null, isSuccess: false, message: error.message, statusCode: 400 });
  }
}

export default withApiSession(
  withHandler({ handler, isPrivate: true, methods: [METHOD.GET, METHOD.POST, METHOD.DELETE] })
);
