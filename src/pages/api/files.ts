import { withApiSession, withHandler } from '@/libs/server';
import { ResponseType } from '@/types';
import { NextApiRequest, NextApiResponse } from 'next';

interface ImageURLResponse {
  errors: unknown;
  message: string[];
  result: {
    id: string;
    uploadURL: string;
  };
  success: boolean;
}

async function handler(req: NextApiRequest, res: NextApiResponse<ResponseType<ImageURLResponse>>) {
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
