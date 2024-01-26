const ROUTE_PATH = {
  CREATE_ACCOUNT: '/create-account',
  EDIT: '/edit',
  FOLLOWERS: (profileUserId: string) => `${ROUTE_PATH.MY_PROFILE}/${profileUserId}/followers`,
  FOLLOWING: (profileUserId: string) => `${ROUTE_PATH.MY_PROFILE}/${profileUserId}/following`,
  FOLLOWING_TWEETS: `/tweet/following`,
  HOME: '/',
  LOG_IN: '/log-in',
  MY_PROFILE: '/profile',
  PROFILE: (userId: string) => `/profile/${userId}`,
  TWEET: (tweetId: string) => `/tweet/${tweetId}`,
  TWEETS: '/tweet',
  UPLOAD: '/upload',
} as const;

export default ROUTE_PATH;
