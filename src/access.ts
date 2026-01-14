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

    /**系统管理 */
    canSystemUserList: has('system:user:list'),
    canSystemRoleList: has('system:role:list'),
    canSystemDictList: has('system:dict:list'),
    canSystemMenuList: has('system:menu:list'),
    canSystemOprelogList: has('system:operlog:list'),
    canSystemLoginforList: has('system:loginfor:list'),
    canSystemTenantList: has('system:tenant:list'),
    canSystemDeptList: has('system:dept:list'),
    canSystemPostList: has('system:post:list'),

    /** Dashboard*/
    canDashboardAnalysis: has('dashboard:analysis'),

    /**工作台 */
    canWorkplaceOverview: has('workplace:overview'),
    canWorkplaceApply: has('workplace:apply'),
    canWorkplaceTask: has('workplace:task'),
    canWorkplaceApprove: has('workplace:approve'),

    /**工作流管理 */
    canWorkDefinition: has('workflow:wfDefinition:list'),
    canWorkInstance: has('workflow:wfDefinition:query'),
    canWorkDesigner: has('workflow:wfDesigner:list'),
  };
}
