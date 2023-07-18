import type { NextApiRequest, NextApiResponse } from 'next';

import { METHOD } from '@/constants';
import { withApiSession, withHandler } from '@/libs/server';
import { ResponseType } from '@/types';

async function handler(req: NextApiRequest, res: NextApiResponse<ResponseType>) {
  req.session.destroy();

  return res.status(200).json({ isSuccess: true, message: '로그아웃 되었습니다.' });
}

export default withApiSession(withHandler({ handler, methods: [METHOD.POST] }));
