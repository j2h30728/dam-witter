import { METHOD } from '@/constants';
import { db, withApiSession, withHandler } from '@/libs/server';
import { ProfileResponse, ResponseType } from '@/types';
import { NextApiRequest } from 'next';
import { NextApiResponse } from 'next';

async function handler(req: NextApiRequest, res: NextApiResponse<ResponseType<ProfileResponse>>) {
  const {
    session: { user },
  } = req;

  const profile = await db.user.findUnique({
    select: {
      comments: true,
      createdAt: true,
      email: true,
      id: true,
      likes: true,
      name: true,
      password: false,
      profile: true,
      tweets: true,
      updatedAt: true,
    },
    where: {
      id: user?.id,
    },
  });
  if (!profile) return res.json({ data: null, isSuccess: false, message: '로그인이 필요합니다.', statusCode: 401 });

  if (req.method === METHOD.GET)
    return res.status(200).json({ data: profile, isSuccess: true, message: '', statusCode: 200 });

  if (req.method === METHOD.PUT) {
    const { avatarId, bio, name } = JSON.parse(req.body);
    if (profile.profile) {
      await db.profile.update({
        data: { avatar: avatarId, bio: bio },
        where: { id: profile.profile.id },
      });
    } else {
      await db.profile.create({
        data: {
          avatar: avatarId,
          bio: bio,
          user: {
            connect: {
              id: user?.id,
            },
          },
        },
      });
    }

    const updatedProfile = await db.user.update({
      data: {
        name: name ? name : '기본 이름',
      },
      include: {
        likes: true,
        profile: true,
        tweets: true,
      },
      where: {
        id: user?.id,
      },
    });
    return res
      .status(200)
      .json({ data: updatedProfile, isSuccess: true, message: '프로필이 수정되었습니다.', statusCode: 200 });
  }

  return res.json({
    data: null,
    isSuccess: false,
    message: '잘못된 요청입니다.',
    statusCode: 400,
  });
}

export default withApiSession(withHandler({ handler, isPrivate: true, methods: [METHOD.GET, METHOD.PUT] }));
