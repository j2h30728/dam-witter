import type { NextApiRequest, NextApiResponse } from 'next';

import { METHOD } from '@/constants';
import { db, withApiSession, withHandler } from '@/libs/server';
import { ResponseType } from '@/types';
import { User } from '@prisma/client';
import bcrypt from 'bcrypt';

async function handler(req: NextApiRequest, res: NextApiResponse<ResponseType<User>>) {
  const { email, password } = JSON.parse(req.body);
  if (!email || !password) {
    return res.status(404).json({ data: null, isSuccess: false, message: '입력값을 채워주세요.', statusCode: 404 });
  }

  const user = await db.user.findUnique({
    where: {
      email: email,
    },
  });
  if (!user) {
    return res.status(400).json({
      data: null,
      isSuccess: false,
      message: '이메일 또는 비밀번호를 확인해주세요.',
      statusCode: 400,
    });
  }
  const isValidPassword = await bcrypt.compare(password, user.password);
  if (!isValidPassword) {
    return res
      .status(400)
      .json({ data: null, isSuccess: false, message: '이메일 또는 비밀번호를 확인해주세요.', statusCode: 400 });
  }

  req.session.user = { id: user.id };
  await req.session.save();

  return res.status(200).json({ data: user, isSuccess: true, message: '로그인 되었습니다.', statusCode: 200 });
}

export default withApiSession(withHandler({ handler, methods: [METHOD.POST] }));
