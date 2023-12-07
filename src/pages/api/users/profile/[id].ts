import { METHOD } from '@/constants';
import { db, withApiSession, withHandler } from '@/libs/server';
import { ResponseType } from '@/types';
import { User } from '@prisma/client';
import { NextApiRequest } from 'next';
import { NextApiResponse } from 'next';

async function handler(req: NextApiRequest, res: NextApiResponse<ResponseType<User>>) {
  const {
    query: { id },
  } = req;
  const profile = await db.user.findUnique({
    include: {
      likes: {
        include: {
          tweet: true,
        },
      },
      profile: true,
      tweets: true,
    },
    where: {
      id: String(id),
    },
  });
  if (!profile)
    return res.json({
      data: null,
      isSuccess: false,
      message: '존재하지않는 사용자입니다.',
      statusCode: 400,
    });

  if (req.method === 'GET')
    return res.status(200).json({ data: profile, isSuccess: true, message: '유효한 사용자입니다.', statusCode: 200 });

  return res.json({
    data: null,
    isSuccess: false,
    message: '잘못된 요청입니다.',
    statusCode: 400,
  });
}

export default withApiSession(withHandler({ handler, isPrivate: true, methods: [METHOD.GET] }));
