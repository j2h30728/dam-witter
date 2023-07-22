import { withApiSession, withHandler } from '@/libs/server';
import { ResponseType } from '@/types';
import { NextApiRequest, NextApiResponse } from 'next';

async function handler(req: NextApiRequest, res: NextApiResponse<ResponseType<null>>) {
  const response = await (
    await fetch(
      `https://api.cloudflare.com/client/v4/accounts/${process.env.CLOUDFLARE_ACCOUNT_ID}/images/v1/direct_upload`,
      {
        headers: {
          Authorization: `Bearer ${process.env.CLOUDFLARE_API_TOKEN}`,
          'Content-Type': 'application/json',
        },
        method: 'POST',
      }
    )
  ).json();
  console.log(response);

  return res.json({
    data: { ...response.result },
    isSuccess: true,
    message: '이미지가 URL이 전달됩니다.',
    statusCode: 201,
  });
}

export default withApiSession(
  withHandler({
    handler,
    methods: ['GET'],
  })
);
