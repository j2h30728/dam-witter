import type { ResponseType, TweetResponse } from '@/types';

import { METHOD } from '@/constants';
import { db } from '@/libs/server';
import { withApiSession, withHandler } from '@/libs/server';
import { Like } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';

async function handler(req: NextApiRequest, res: NextApiResponse<ResponseType<Like>>) {
  const {
    method,
    query: { id },
    session: { user },
  } = req;
  try {
    if (!user) {
      throw Error('로그인이 필요합니다.');
    }
    await db.$transaction(async prisma => {
      if (method === METHOD.POST) {
        const like = await prisma.like.upsert({
          create: {
            tweet: {
              connect: {
                id: String(id),
              },
            },
            user: {
              connect: {
                id: user?.id,
              },
            },
          },
          update: {},
          where: {
            tweetId_userId: {
              tweetId: String(id),
              userId: user?.id,
            },
          },
        });

        return res
          .status(200)
          .json({ data: like, isSuccess: true, message: '좋아요가 처리되었습니다.', statusCode: 200 });
      }

      if (method === METHOD.DELETE) {
        const alreadyExists = await db.like.findFirst({
          where: {
            tweetId: String(id),
            userId: user?.id,
          },
        });
        if (alreadyExists) {
          await prisma.like.delete({
            where: {
              tweetId_userId: {
                tweetId: String(id),
                userId: user.id,
              },
            },
          });
        }

        return res
          .status(200)
          .json({ data: null, isSuccess: true, message: '좋아요가 삭제되었습니다.', statusCode: 200 });
      }
    });
  } catch (error) {
    if (error instanceof Error)
      res.status(400).json({ data: null, isSuccess: false, message: error.message, statusCode: 400 });
  }
}

export default withApiSession(withHandler({ handler, methods: [METHOD.POST, METHOD.DELETE] }));
