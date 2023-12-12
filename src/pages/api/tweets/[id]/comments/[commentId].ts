import { METHOD } from '@/constants';
import { db, withApiSession, withHandler } from '@/libs/server';
import { CommentResponse, ResponseType } from '@/types';
import { NextApiRequest, NextApiResponse } from 'next';

async function handler(req: NextApiRequest, res: NextApiResponse<ResponseType<CommentResponse | CommentResponse[]>>) {
  if (req.method === METHOD.DELETE) {
    const {
      query: { commentId, id },
      session: { user },
    } = req;

    const existComment = await db.comment.findFirst({
      where: {
        id: String(commentId),
        tweetId: String(id),
        userId: user?.id,
      },
    });
    if (user?.id !== existComment?.userId)
      return res.status(401).json({ data: null, isSuccess: false, message: '권한이 없습니다.', statusCode: 401 });

    if (!existComment)
      return res
        .status(404)
        .json({ data: null, isSuccess: false, message: '유효하지 않는 입력입니다.', statusCode: 404 });

    await db.comment.delete({
      where: {
        id: existComment.id,
      },
    });
    return res.status(204).json({ data: null, isSuccess: true, message: '삭제되었습니다.', statusCode: 204 });
  }
}

export default withApiSession(
  withHandler({ handler, isPrivate: true, methods: [METHOD.GET, METHOD.POST, METHOD.DELETE] })
);
