import type { NextApiRequest, NextApiResponse } from 'next';

import { METHOD } from '@/constants';
import { withApiSession, withHandler } from '@/libs/server';
import { ResponseType } from '@/types';

async function handler(req: NextApiRequest, res: NextApiResponse<ResponseType<null>>) {
  req.session.destroy();

  return res.status(200).json({ data: null, isSuccess: true, message: '로그아웃 되었습니다.', statusCode: 200 });
}

export default withApiSession(withHandler({ handler, methods: [METHOD.POST] }));
