import { METHOD } from '@/constants';
import { db, withApiSession, withHandler } from '@/libs/server';
import { ProfileResponse, ResponseType } from '@/types';
import { NextApiRequest } from 'next';
import { NextApiResponse } from 'next';

async function handler(req: NextApiRequest, res: NextApiResponse<ResponseType<ProfileResponse>>) {
  const {
    query: { id },
    session,
  } = req;
  if (!session.user)
    return res.json({ data: null, isSuccess: false, message: '로그인이 필요합니다.', statusCode: 401 });

  const profile = await db.user.findUnique({
    include: {
      followers: true,
      following: true,
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
  if (req.method === 'GET') {
    const isFollowing = await db.follow.findUnique({
      where: {
        follower_following: {
          followerId: session?.user?.id,
          followingId: String(id),
        },
      },
    });

    const ProfileResponse: ProfileResponse = {
      ...profile,
      isFollowing: !!isFollowing,
    };
    return res
      .status(200)
      .json({ data: ProfileResponse, isSuccess: true, message: '유효한 사용자입니다.', statusCode: 200 });
  }
  return res.json({
    data: null,
    isSuccess: false,
    message: '잘못된 요청입니다.',
    statusCode: 400,
  });
}

export default withApiSession(withHandler({ handler, isPrivate: true, methods: [METHOD.GET] }));
