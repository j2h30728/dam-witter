import useDeleteTweet from '../api/useDeleteTweet';
import useProfile from '../api/useProfile';
import useTweet from '../api/useTweet';
import useLike from '../tweets/useLike';

const useTweetViewModel = () => {
  const { data, isLoading, isValidating, mutate } = useTweet();
  const { profile: loggedInUser } = useProfile({ option: { revalidateOnFocus: false } });

  const { toggleLike } = useLike();
  const { deleteTweet, isDeleting } = useDeleteTweet();

  const optimisticToggleLike = () => {
    if (data && data.data) {
      toggleLike(data.data);
      mutate(
        {
          ...data,
          data: {
            ...data.data,
            _count: {
              ...data.data._count,
              likes: data.data._count
                ? data.data.isLiked
                  ? data.data._count.likes - 1
                  : data.data._count.likes + 1
                : 1,
            },
            isLiked: !data.data.isLiked,
          },
        },
        false
      );
    }
  };

  const onDelete = () => {
    if (confirm('삭제하시겠습니까?')) {
      deleteTweet();
    }
  };

  return {
    like: { onToggleLike: optimisticToggleLike },
    loggedInUser,
    tweet: { data: data?.data, isDeleting, isLoading, isValidating, onDelete },
  };
};

export default useTweetViewModel;
