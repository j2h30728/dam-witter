import { useRouter } from 'next/router';

const useRouteToPath = (routePath: string) => {
  const router = useRouter();
  return () => router.push(routePath);
};

export default useRouteToPath;
