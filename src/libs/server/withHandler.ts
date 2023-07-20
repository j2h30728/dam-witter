import { Method, ResponseType } from '@/types';
import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';

interface ConfigType {
  handler: NextApiHandler;
  isPrivate?: boolean;
  methods: Method[];
}

export default function withHandler({ handler, isPrivate, methods }: ConfigType) {
  return async function (req: NextApiRequest, res: NextApiResponse<ResponseType<null>>) {
    if (req.method && !methods.includes(req.method as any)) {
      return res.status(405).end();
    }
    if (isPrivate && !req.session.user) {
      return res.status(401).json({ data: null, isSuccess: false, message: '잘못된 접근입니다.', statusCode: 401 });
    }
    try {
      await handler(req, res);
    } catch (error) {
      return res.status(500).json({ data: null, isSuccess: false, message: JSON.stringify(error), statusCode: 500 });
    }
  };
}
