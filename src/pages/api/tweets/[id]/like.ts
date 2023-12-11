import type { ResponseType, TweetResponse } from '@/types';

import { METHOD } from '@/constants';
import { db } from '@/libs/server';
import { withApiSession, withHandler } from '@/libs/server';
import { Like } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
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
      const alreadyExists = await prisma.like.findUnique({
        where: {
          tweetId_userId: {
            tweetId: String(id),
            userId: user?.id,
          },
        },
      });
      if (method === METHOD.POST) {
        if (alreadyExists) {
          return res.status(204).end();
        }

        const like = await prisma.like.create({
          data: {
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
        });
        return res
          .status(200)
          .json({ data: like, isSuccess: true, message: '좋아요가 처리되었습니다.', statusCode: 201 });
      }

      if (method === METHOD.DELETE) {
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

export default withApiSession(withHandler({ handler, isPrivate: true, methods: [METHOD.POST, METHOD.DELETE] }));
