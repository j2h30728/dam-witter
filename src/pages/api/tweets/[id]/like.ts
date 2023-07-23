import type { ResponseType, TweetResponse } from '@/types';

import { METHOD } from '@/constants';
import { withApiSession, withHandler } from '@/libs/server';
import { db } from '@/libs/server';
import { Like } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';

async function handler(req: NextApiRequest, res: NextApiResponse<ResponseType<Like>>) {
  const {
    query: { id },
    session: { user },
  } = req;

  const alreadyExists = await db.like.findFirst({
    where: {
      tweetId: String(id),
      userId: user?.id,
    },
  });

  if (alreadyExists) {
    await db.like.delete({
      where: {
        id: alreadyExists.id,
      },
    });
    return res.status(200).json({ data: null, isSuccess: true, message: '좋아요가 삭제되었습니다.', statusCode: 200 });
  }
  const like = await db.like.create({
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
  return res.status(200).json({ data: like, isSuccess: true, message: '좋아요가 활성화되었습니다.', statusCode: 200 });
}
export default withApiSession(withHandler({ handler, methods: [METHOD.POST] }));
