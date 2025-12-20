/**
 * @see https://umijs.org/docs/max/access#access
 * */
export default function access(
  initialState: { currentUser?: API.UserInfoVo } | undefined,
) {
  const { currentUser } = initialState ?? {};
  // return {
  //   canAccess: currentUser && currentUser.access === 'admin',
  // };
  return {
    canAccess: (perm: string) => currentUser?.permissions?.includes(perm) || currentUser?.permissions?.includes('*:*:*'),
  };
}
