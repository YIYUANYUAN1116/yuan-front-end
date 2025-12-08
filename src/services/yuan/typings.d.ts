declare namespace API {
  type export1Params = {
    bo: SysRoleBo;
  };

  type exportUsingPOSTParams = {
    bo: SysUserBo;
  };

  type getInfo1Params = {
    roleId: number;
  };

  type getInfoParams = {
    userId: number;
  };

  type insertAuthRoleParams = {
    userId: number;
    roleIds: number[];
  };

  type list1Params = {
    bo: SysRoleBo;
    pageQuery: PageQuery;
  };

  type listParams = {
    bo: SysUserBo;
    pageQuery: PageQuery;
  };

  type LoginBody = {
    tenantId?: string;
    username: string;
    password: string;
    code?: string;
    uuid?: string;
  };

  type LoginUser = {
    tenantId?: string;
    userId?: number;
    deptId?: number;
    deptName?: string;
    token?: string;
    userType?: string;
    loginTime?: number;
    expireTime?: number;
    ipaddr?: string;
    loginLocation?: string;
    browser?: string;
    os?: string;
    menuPermission?: string[];
    rolePermission?: string[];
    username?: string;
    nickName?: string;
    avatar?: string;
    roles?: RoleDTO[];
    roleId?: number;
    kroleGroupType?: string;
    kroleGroupIds?: string;
    loginId?: string;
  };

  type LoginVo = {
    token?: string;
    access_token?: string;
    userInfo?: LoginUser;
  };

  type PageQuery = {
    pageSize?: number;
    pageNum?: number;
    orderByColumn?: string;
    isAsc?: string;
  };

  type remove1Params = {
    roleIds: number[];
  };

  type removeParams = {
    userIds: number[];
  };

  type RLoginVo = {
    code?: number;
    msg?: string;
    data?: LoginVo;
  };

  type RoleDTO = {
    roleId?: number;
    roleName?: string;
    roleKey?: string;
    dataScope?: string;
  };

  type RSysRoleVo = {
    code?: number;
    msg?: string;
    data?: SysRoleVo;
  };

  type RSysUserInfoVo = {
    code?: number;
    msg?: string;
    data?: SysUserInfoVo;
  };

  type RUserInfoVo = {
    code?: number;
    msg?: string;
    data?: UserInfoVo;
  };

  type RVoid = {
    code?: number;
    msg?: string;
    data?: any;
  };

  type SysRoleBo = {
    roleId?: number;
    tenantId?: string;
    roleName: string;
    roleKey: string;
    roleSort: number;
    dataScope?: string;
    menuCheckStrictly?: boolean;
    deptCheckStrictly?: boolean;
    status: string;
    delFlag?: string;
    createDept?: number;
    createBy?: number;
    createTime?: string;
    updateBy?: number;
    updateTime?: string;
    remark?: string;
  };

  type SysRoleVo = {
    roleId?: number;
    tenantId?: string;
    roleName?: string;
    roleKey?: string;
    roleSort?: number;
    dataScope?: string;
    menuCheckStrictly?: boolean;
    deptCheckStrictly?: boolean;
    status?: string;
    delFlag?: string;
    createDept?: number;
    createBy?: number;
    createTime?: string;
    updateBy?: number;
    updateTime?: string;
    remark?: string;
    superAdmin?: boolean;
  };

  type SysUserBo = {
    userId?: number;
    openId?: string;
    userGrade?: string;
    userBalance?: number;
    tenantId?: string;
    deptId?: number;
    userName: string;
    nickName: string;
    userType?: string;
    userPlan?: string;
    email: string;
    phonenumber?: string;
    sex?: string;
    avatar?: string;
    wxAvatar?: string;
    password?: string;
    status?: string;
    delFlag?: string;
    loginIp?: string;
    loginDate?: string;
    domainName?: string;
    createDept?: number;
    createBy?: number;
    createTime?: string;
    updateBy?: number;
    updateTime?: string;
    remark?: string;
    kroleGroupType?: string;
    kroleGroupIds?: string;
  };

  type SysUserInfoVo = {
    user?: SysUserVo;
    roleIds?: number[];
    roles?: SysRoleVo[];
    postIds?: number[];
  };

  type SysUserVo = {
    userId?: number;
    openId?: string;
    userGrade?: string;
    userBalance?: number;
    tenantId?: string;
    deptId?: number;
    userName?: string;
    nickName?: string;
    userType?: string;
    userPlan?: string;
    email?: string;
    phonenumber?: string;
    sex?: string;
    avatar?: string;
    wxAvatar?: string;
    password?: string;
    status?: string;
    delFlag?: string;
    loginIp?: string;
    loginDate?: string;
    domainName?: string;
    createDept?: number;
    createBy?: number;
    createTime?: string;
    updateBy?: number;
    updateTime?: string;
    remark?: string;
    kroleGroupType?: string;
    kroleGroupIds?: string;
    roles?: SysRoleVo[];
  };

  type TableDataInfoSysRoleVo = {
    total?: number;
    rows?: SysRoleVo[];
    code?: number;
    msg?: string;
  };

  type TableDataInfoSysUserVo = {
    total?: number;
    rows?: SysUserVo[];
    code?: number;
    msg?: string;
  };

  type UserInfoVo = {
    user?: SysUserVo;
    permissions?: string[];
    roles?: string[];
  };
}
