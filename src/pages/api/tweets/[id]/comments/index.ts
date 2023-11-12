import { METHOD } from '@/constants';
import { db, withApiSession, withHandler } from '@/libs/server';
import { CommentResponse, ResponseType } from '@/types';
import { NextApiRequest, NextApiResponse } from 'next';

async function handler(req: NextApiRequest, res: NextApiResponse<ResponseType<CommentResponse | CommentResponse[]>>) {
  const {
    query: { id },
    session: { user },
  } = req;
  if (req.method === METHOD.GET) {
    const comments = await db.comment.findMany({
      include: {
        tweet: {
          select: {
            id: true,
            text: true,
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
        createdAt: 'asc',
      },
      where: {
        tweetId: String(id),
      },
    });

    return res
      .status(200)
      .json({ data: comments, isSuccess: true, message: '코멘트를 작성했습니다.', statusCode: 201 });
  }
  if (req.method === METHOD.POST) {
    const { text } = JSON.parse(req.body);

    if (!text)
      return res
        .status(404)
        .json({ data: null, isSuccess: false, message: '요휴하지 않는 입력입니다.', statusCode: 404 });

    const comment = await db.comment.create({
      data: {
        text: text,
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
      include: {
        tweet: {
          select: {
            id: true,
            text: true,
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
    return res.status(201).json({ data: comment, isSuccess: true, message: '코멘트를 작성했습니다.', statusCode: 201 });
  }
}

export default withApiSession(withHandler({ handler, isPrivate: true, methods: [METHOD.GET, METHOD.POST] }));
