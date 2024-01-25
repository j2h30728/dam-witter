import { Layout } from '@/components';
import Button from '@/components/common/Button';
import { ROUTE_PATH } from '@/constants';
import { NextPageContext } from 'next';
import { useRouter } from 'next/router';

function Error({ statusCode }: { statusCode: number }) {
  const router = useRouter();
  return (
    <Layout title={<h1>ERROR</h1>}>
      <div className="flex flex-col items-center justify-center w-full h-full space-y-8">
        <h2 className="text-3xl font-extrabold">{statusCode} : 오류가 발생했습니다!</h2>
        <div className="flex gap-3">
          <Button
            onClick={() => {
              router.replace(ROUTE_PATH.HOME);
            }}
          >
            홈으로 이동
          </Button>
        </div>
      </div>
    </Layout>
  );
}

Error.getInitialProps = ({ err, res }: NextPageContext) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default Error;
