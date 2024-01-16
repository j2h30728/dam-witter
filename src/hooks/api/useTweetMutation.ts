import { postFetcher } from '@/api/fetchers';
import { ROUTE_PATH } from '@/constants';
import { END_POINTS } from '@/constants/api';
import { toastMessage } from '@/libs/client/toastMessage';
import { TweetResponse, UploadBasicInputText } from '@/types';
import { useRouter } from 'next/router';
import { mutate } from 'swr';
import useSWRMutation from 'swr/mutation';

const useTweetMutation = () => {
  const router = useRouter();

  const { data, isMutating, trigger } = useSWRMutation(
    END_POINTS.TWEETS,
    postFetcher<UploadBasicInputText, TweetResponse>,
    {
      onSuccess: async data => {
        if (data.isSuccess) {
          await mutate(END_POINTS.TWEETS, () => fetch(END_POINTS.TWEETS));
          toastMessage('success', data.message);
          router.push(ROUTE_PATH.HOME);
        } else {
          toastMessage('error', data.message);
        }
      },
    }
  );
  return { createdTweet: data, isUploadTweetMutating: isMutating, uploadTweetMutate: trigger };
};

export default useTweetMutation;
