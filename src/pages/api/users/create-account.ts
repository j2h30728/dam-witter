import type { ResponseType } from '@/types';
import type { NextApiRequest, NextApiResponse } from 'next';

import { METHOD } from '@/constants';
import { db, withHandler } from '@/libs/server';
import { User } from '@prisma/client';
import bcrypt from 'bcrypt';

async function handler(req: NextApiRequest, res: NextApiResponse<ResponseType<User>>) {
  const { email, name, password } = req.body;

  if (!email || !name || !password) {
    return res.status(404).json({ data: null, isSuccess: false, message: '잘못된 입력입니다.', statusCode: 404 });
  }

  const user = await db.user.findUnique({
    where: {
      email: email,
    },
  });
  if (user) {
    return res.status(400).json({
      data: null,
      isSuccess: false,
      message: '이미 존재하는 email 입니다.',
      statusCode: 400,
    });
  }

  const hashedPassword = await bcrypt.hash(password, 5);

  const createdUser = await db.user.create({
    data: {
      email,
      name,
      password: hashedPassword,
    },
  });

  return res
    .status(200)
    .json({ data: createdUser, isSuccess: true, message: '회원가입 완료되었습니다', statusCode: 200 });
}

export default withHandler({ handler, methods: [METHOD.POST] });
