/**
 * @see https://umijs.org/docs/max/access#access
 * */
export default function access(
  initialState: { currentUser?: API.UserInfoVo } | undefined,
) {
  const { currentUser } = initialState ?? {};
  const perms = currentUser?.permissions || [];
  const has = (perm: string) =>
    perms.includes('*:*:*') || perms.includes(perm);
  return {
    canAccess: (perm: string) => currentUser?.permissions?.includes('*:*:*') || currentUser?.permissions?.includes(perm) || false,
    canSystemUserList: has('system:user:list'),
    canSystemRoleList: has('system:role:list'),
    canSystemDictList: has('system:dict:list'),
    canSystemMenuList: has('system:menu:list'),
    canSystemOprelogList: has('system:oprelog:list'),
    canSystemLoginforList: has('system:loginfor:list'),
    canDashboardWorkplace: has('dashboard:workplace'),
    canDashboardAnalysis: has('dashboard:analysis'),
    canSystemTenantList: has('system:tenant:list'),
    canSystemDeptList: has('system:dept:list'),
    canSystemPostList: has('system:post:list'),

    canWorkDefinition: has('workflow:definition:list'),
    canWorkInstance: has('workflow:instance:list'),
    canWorkNodeInstance: has('workflow:nodeInstance:list'),
    canWorkTask: has('workflow:task:list'),
    canWorkTaskLog: has('workflow:tasklog:list'),
    canWorkDesigner: has('workflow:designer:list'),
  };
}
