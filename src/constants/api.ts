export const END_POINTS = {
  COMMENT: (tweetId: string, commentId: string) => `/api/tweets/${tweetId}/comments/${commentId}`,
  COMMENTS: (tweetId: string) => `/api/tweets/${tweetId}/comments`,
  CREATE_ACCOUNT: '/api/users/create-account',
  FILES: '/api/files',
  FOLLOW: `/api/follows`,
  FOLLOWS: (userId: string) => `/api/follows/${userId}`,
  LIKE: (tweetId: string) => `/api/tweets/${tweetId}/like`,
  LOGIN: '/api/users/log-in',
  LOGOUT: '/api/users/log-out',
  MY_PROFILE: '/api/users/profile',
  MY_PROFILE_EDIT: '/api/users/profile/edit',
  OPTION_TWEETS: (options: string) => `/api/tweets/${options}`,
  PROFILE: (userId: string) => `/api/users/profile/${userId}`,
  TWEET: (tweetId: string) => `/api/tweets/${tweetId}`,
  TWEETS: '/api/tweets',
};

export const DEFAULT_ERROR_MESSAGE = '잠시후 요청부탁드립니다.';

export const PAGE_SIZE = 10;
