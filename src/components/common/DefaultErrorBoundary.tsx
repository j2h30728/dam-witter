import { ROUTE_PATH } from '@/constants';
import { useRouter } from 'next/router';

import Button from './Button';
import Layout from './Layout';

interface ErrorBoundaryProps {
  error: Error;
  resetErrorBoundary: () => void;
}

const DefaultErrorBoundary = ({ error, resetErrorBoundary }: ErrorBoundaryProps) => {
  const router = useRouter();
  return (
    <Layout title={<h1>ERROR</h1>}>
      <div className="flex flex-col items-center justify-center w-full h-full space-y-8">
        <h2 className="text-3xl font-extrabold">오류가 발생했습니다!</h2>
        <span className="text-xl font-semibold">아래의 버튼을 사용해주세요.</span>
        <span className="font-semibold text-md text-slate-600">{error.message}</span>
        <div className="flex gap-3">
          <Button
            onClick={() => {
              resetErrorBoundary();
              router.replace(ROUTE_PATH.HOME);
            }}
          >
            홈으로 이동
          </Button>
          <Button onClick={() => resetErrorBoundary()} size="md" type="button">
            다시 시도하기
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default DefaultErrorBoundary;
