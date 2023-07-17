import type { ResponseType } from '@/types';
import type { NextApiRequest, NextApiResponse } from 'next';

import { METHOD } from '@/constants';
import { db, withHandler } from '@/libs';
import bcrypt from 'bcrypt';

async function handler(req: NextApiRequest, res: NextApiResponse<ResponseType>) {
  const { email, name, password } = req.body;

  if (!email || !name || !password) {
    return res.status(404).json({ isSuccess: false, message: '잘못된 입력입니다.' });
  }

  const user = await db.user.findUnique({
    where: {
      email: email,
    },
  });
  if (user) {
    return res.status(409).json({
      isSuccess: false,
      message: '이미 존재하는 email 입니다.',
    });
  }

  const hashedPassword = await bcrypt.hash(password, 5);

  await db.user.create({
    data: {
      email,
      name,
      password: hashedPassword,
    },
  });

  return res.status(200).json({ isSuccess: true, message: '회원가입 완료되었습니다' });
}

export default withHandler({ handler, methods: [METHOD.POST] });
