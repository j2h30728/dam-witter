import type { NextApiRequest, NextApiResponse } from 'next';

import { METHOD } from '@/constants';
import { db, withApiSession, withHandler } from '@/libs';
import { ResponseType } from '@/types';
import bcrypt from 'bcrypt';

async function handler(req: NextApiRequest, res: NextApiResponse<ResponseType>) {
  const { email, password } = req.body;

  if (!email) {
    return res.status(404).json({ isSuccess: false, message: '잘못된 입력입니다.' });
  }

  const user = await db.user.findUnique({
    where: {
      email: email,
    },
  });
  if (!user) {
    return res.status(409).json({
      isSuccess: false,
      message: '잘못된 입력입니다.',
    });
  }
  const isValidPassword = await bcrypt.compare(password, user.password);
  if (!isValidPassword) {
    return res.status(400).json({ isSuccess: false, message: '잘못된 비밀번호입니다.' });
  }

  req.session.user = { id: user.id };
  await req.session.save();

  return res.status(200).json({ isSuccess: true, message: '로그인 되었습니다.' });
}

export default withApiSession(withHandler({ handler, methods: [METHOD.POST] }));
