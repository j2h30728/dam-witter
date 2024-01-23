import useDeleteTweet from '../api/useDeleteTweet';
import useFollowingMutation from '../api/useFollowingMutation';
import useMyProfile from '../api/useMyProfile';
import useTweet from '../api/useTweet';
import useLike from '../tweets/useLike';

const useTweetViewModel = () => {
  const { data, isLoading, isValidating, mutate } = useTweet();
  const { profile: loggedInUser } = useMyProfile({ option: { revalidateOnFocus: false } });

  const { toggleLike } = useLike();
  const { deleteTweet, isDeleting } = useDeleteTweet();
  const { postFollowing } = useFollowingMutation();

  const optimisticToggleLike = () => {
    if (data && data.data) {
      const { data: tweetData } = data;
      const target = { ...tweetData, _count: { ...tweetData._count } };
      target._count.likes = tweetData.isLiked ? tweetData._count.likes - 1 : tweetData._count.likes + 1;
      target.isLiked = !tweetData.isLiked;

      toggleLike(tweetData);
      mutate(
        {
          ...data,
          data: target,
        },
        false
      );
    }
  };
  const optimisticFollowing = () => {
    if (data && data.data) {
      const { data: tweetData } = data;
      const target = { ...tweetData };
      target.isFollowing = !tweetData.isFollowing;

      postFollowing(tweetData.userId);
      mutate(
        {
          ...data,
          data: target,
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
    following: { onFollowing: optimisticFollowing },
    like: { onToggleLike: optimisticToggleLike },
    loggedInUser,
    tweet: { data: data?.data, isDeleting, isLoading, isValidating, onDelete, refreshTweet: mutate },
  };
};

export default useTweetViewModel;
