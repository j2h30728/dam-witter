import { Method, ResponseType } from '@/types';
import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';

interface ConfigType {
  handler: NextApiHandler;
  isPrivate?: boolean;
  methods: Method[];
}

export default function withHandler({ handler, isPrivate, methods }: ConfigType) {
  return async function (req: NextApiRequest, res: NextApiResponse<ResponseType>) {
    if (req.method && !methods.includes(req.method as any)) {
      return res.status(405).end();
    }
    if (isPrivate && !req.session.user) {
      return res.status(401).json({ isSuccess: false, message: 'aaaa잘못된 접근입니다.' });
    }
    try {
      await handler(req, res);
    } catch (error) {
      return res.status(500).json({ isSuccess: false, message: JSON.stringify(error) });
    }
  };
}
