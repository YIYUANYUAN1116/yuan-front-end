declare namespace API {
  type allocatedUserListParams = {
    bo: SysUserBo;
    pageQuery: PageQuery;
  };

  type cancelAuthUserAllParams = {
    roleId: number;
    userIds: number[];
  };

  type dictDictTypeParams = {
    dictType: string;
  };

  type dictExportParams = {
    bo: SysDictDataBo;
  };

  type dictGetInfoParams = {
    dictCode: number;
  };

  type dictListParams = {
    bo: SysDictDataBo;
    pageQuery: PageQuery;
  };

  type dictRemoveParams = {
    dictCodes: number[];
  };

  type dictTypeAllParams = {
    bo: SysDictTypeBo;
    pageQuery: PageQuery;
  };

  type dictTypeExportParams = {
    bo: SysDictTypeBo;
  };

  type dictTypeGetInfoParams = {
    dictId: number;
  };

  type dictTypeListParams = {
    bo: SysDictTypeBo;
    pageQuery: PageQuery;
  };

  type dictTypeRemoveParams = {
    dictIds: number[];
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
    current?: number;
    orderByColumn?: string;
    isAsc?: string;
  };

  type ReactRouterVo = {
    name?: string;
    path?: string;
    icon?: string;
    component?: string;
    layout?: boolean;
    hideInMenu?: boolean;
    access?: string;
  };

  type RListReactRouterVo = {
    code?: number;
    msg?: string;
    data?: ReactRouterVo[];
  };

  type RListSysDeptVo = {
    code?: number;
    msg?: string;
    data?: {
      deptId?: number;
      tenantId?: string;
      parentId?: number;
      ancestors?: string;
      deptName?: string;
      orderNum?: number;
      leader?: string;
      phone?: string;
      email?: string;
      status?: string;
      delFlag?: string;
      createDept?: number;
      createBy?: number;
      createTime?: string;
      updateBy?: number;
      updateTime?: string;
      children?: any[];
    }[];
  };

  type RListSysDictDataVo = {
    code?: number;
    msg?: string;
    data?: SysDictDataVo[];
  };

  type RListSysDictTypeVo = {
    code?: number;
    msg?: string;
    data?: SysDictTypeVo[];
  };

  type RListSysMenuVo = {
    code?: number;
    msg?: string;
    data?: {
      menuId?: number;
      menuName?: string;
      routeName?: string;
      parentId?: number;
      orderNum?: number;
      path?: string;
      component?: string;
      queryParam?: string;
      isFrame?: number;
      isCache?: number;
      menuType?: string;
      visible?: string;
      status?: string;
      perms?: string;
      icon?: string;
      createDept?: number;
      createBy?: number;
      createTime?: string;
      updateBy?: number;
      updateTime?: string;
      remark?: string;
      children?: any[];
    }[];
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

  type RSelectRolesVo = {
    code?: number;
    msg?: string;
    data?: SelectRolesVo;
  };

  type RSysDeptVo = {
    code?: number;
    msg?: string;
    data?: SysDeptVo;
  };

  type RSysDictDataVo = {
    code?: number;
    msg?: string;
    data?: SysDictDataVo;
  };

  type RSysDictTypeVo = {
    code?: number;
    msg?: string;
    data?: SysDictTypeVo;
  };

  type RSysLogininforVo = {
    code?: number;
    msg?: string;
    data?: SysLogininforVo;
  };

  type RSysMenuVo = {
    code?: number;
    msg?: string;
    data?: SysMenuVo;
  };

  type RSysOperLogVo = {
    code?: number;
    msg?: string;
    data?: SysOperLogVo;
  };

  type RSysPostVo = {
    code?: number;
    msg?: string;
    data?: SysPostVo;
  };

  type RSysRoleDeptVo = {
    code?: number;
    msg?: string;
    data?: SysRoleDeptVo;
  };

  type RSysRoleMenuVo = {
    code?: number;
    msg?: string;
    data?: SysRoleMenuVo;
  };

  type RSysRoleVo = {
    code?: number;
    msg?: string;
    data?: SysRoleVo;
  };

  type RSysTenantVo = {
    code?: number;
    msg?: string;
    data?: SysTenantVo;
  };

  type RSysUserInfoVo = {
    code?: number;
    msg?: string;
    data?: SysUserInfoVo;
  };

  type RSysUserPostVo = {
    code?: number;
    msg?: string;
    data?: SysUserPostVo;
  };

  type RTreeSelectVo = {
    code?: number;
    msg?: string;
    data?: TreeSelectVo;
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

  type selectAuthUserAllParams = {
    roleId: number;
    userIds: number[];
  };

  type SelectRolesVo = {
    roles?: SysRoleVo[];
    checkedKeys?: number[];
  };

  type SysDeptBo = {
    deptId?: number;
    tenantId?: string;
    parentId?: number;
    ancestors?: string;
    deptName?: string;
    orderNum?: number;
    leader?: string;
    phone?: string;
    email?: string;
    status?: string;
    delFlag?: string;
    createDept?: number;
    createBy?: number;
    createTime?: string;
    updateBy?: number;
    updateTime?: string;
  };

  type sysDeptExportParams = {
    bo: SysDeptBo;
  };

  type sysDeptGetInfoParams = {
    deptId: number;
  };

  type sysDeptListParams = {
    bo: SysDeptBo;
    pageQuery: PageQuery;
  };

  type sysDeptListTreeParams = {
    bo: SysDeptBo;
  };

  type sysDeptRemoveParams = {
    deptIds: number[];
  };

  type sysDeptTreeselectParams = {
    bo: SysDeptBo;
  };

  type SysDeptVo = {
    deptId?: number;
    tenantId?: string;
    parentId?: number;
    ancestors?: string;
    deptName?: string;
    orderNum?: number;
    leader?: string;
    phone?: string;
    email?: string;
    status?: string;
    delFlag?: string;
    createDept?: number;
    createBy?: number;
    createTime?: string;
    updateBy?: number;
    updateTime?: string;
    children?: any[];
  };

  type SysDictDataBo = {
    createDept?: number;
    createBy?: number;
    createTime?: string;
    updateBy?: number;
    updateTime?: string;
    params?: Record<string, any>;
    dictCode?: number;
    dictSort?: number;
    dictLabel?: string;
    dictValue?: string;
    dictType?: string;
    cssClass?: string;
    listClass?: string;
    isDefault?: string;
    status?: string;
    remark?: string;
  };

  type SysDictDataVo = {
    dictCode?: number;
    dictSort?: number;
    dictLabel?: string;
    dictValue?: string;
    dictType?: string;
    cssClass?: string;
    listClass?: string;
    isDefault?: string;
    status?: string;
    remark?: string;
    createTime?: string;
  };

  type SysDictTypeBo = {
    createDept?: number;
    createBy?: number;
    createTime?: string;
    updateBy?: number;
    updateTime?: string;
    params?: Record<string, any>;
    dictId?: number;
    dictName?: string;
    dictType?: string;
    status?: string;
    remark?: string;
  };

  type SysDictTypeVo = {
    dictId?: number;
    dictName?: string;
    dictType?: string;
    status?: string;
    remark?: string;
    createTime?: string;
  };

  type SysLogininforBo = {
    infoId?: number;
    tenantId?: string;
    userName?: string;
    ipaddr?: string;
    loginLocation?: string;
    browser?: string;
    os?: string;
    status?: string;
    msg?: string;
    loginTime?: string;
  };

  type SysLogininforExportParams = {
    bo: SysLogininforBo;
  };

  type SysLogininforGetInfoParams = {
    infoId: number;
  };

  type SysLogininforListParams = {
    bo: SysLogininforBo;
    pageQuery: PageQuery;
  };

  type SysLogininforRemoveParams = {
    infoIds: number[];
  };

  type SysLogininforVo = {
    infoId?: number;
    tenantId?: string;
    userName?: string;
    ipaddr?: string;
    loginLocation?: string;
    browser?: string;
    os?: string;
    status?: string;
    msg?: string;
    loginTime?: string;
  };

  type SysMenuBo = {
    menuId?: number;
    menuName?: string;
    routeName?: string;
    parentId?: number;
    orderNum?: number;
    path?: string;
    component?: string;
    queryParam?: string;
    isFrame?: number;
    isCache?: number;
    menuType?: string;
    visible?: string;
    status?: string;
    perms?: string;
    icon?: string;
    createDept?: number;
    createBy?: number;
    createTime?: string;
    updateBy?: number;
    updateTime?: string;
    remark?: string;
    menuTypes?: string[];
  };

  type sysMenuExportParams = {
    bo: SysMenuBo;
  };

  type sysMenuGetInfoParams = {
    menuId: number;
  };

  type sysMenuListParams = {
    bo: SysMenuBo;
    pageQuery: PageQuery;
  };

  type sysMenuListTreeParams = {
    bo: SysMenuBo;
  };

  type sysMenuRemoveParams = {
    menuIds: number[];
  };

  type sysMenuRoleMenuTreeselectParams = {
    roleId: number;
  };

  type sysMenuTreeselectParams = {
    bo: SysMenuBo;
    roleId: number;
  };

  type SysMenuVo = {
    menuId?: number;
    menuName?: string;
    routeName?: string;
    parentId?: number;
    orderNum?: number;
    path?: string;
    component?: string;
    queryParam?: string;
    isFrame?: number;
    isCache?: number;
    menuType?: string;
    visible?: string;
    status?: string;
    perms?: string;
    icon?: string;
    createDept?: number;
    createBy?: number;
    createTime?: string;
    updateBy?: number;
    updateTime?: string;
    remark?: string;
    children?: any[];
  };

  type SysOperLogBo = {
    operId?: number;
    tenantId?: string;
    title?: string;
    businessType?: number;
    method?: string;
    requestMethod?: string;
    operatorType?: number;
    operName?: string;
    deptName?: string;
    operUrl?: string;
    operIp?: string;
    operLocation?: string;
    operParam?: string;
    jsonResult?: string;
    status?: number;
    errorMsg?: string;
    operTime?: string;
    costTime?: number;
  };

  type SysOperLogExportParams = {
    bo: SysOperLogBo;
  };

  type SysOperLogGetInfoParams = {
    operId: number;
  };

  type SysOperLogListParams = {
    bo: SysOperLogBo;
    pageQuery: PageQuery;
  };

  type SysOperLogRemoveParams = {
    operIds: number[];
  };

  type SysOperLogVo = {
    operId?: number;
    tenantId?: string;
    title?: string;
    businessType?: number;
    method?: string;
    requestMethod?: string;
    operatorType?: number;
    operName?: string;
    deptName?: string;
    operUrl?: string;
    operIp?: string;
    operLocation?: string;
    operParam?: string;
    jsonResult?: string;
    status?: number;
    errorMsg?: string;
    operTime?: string;
    costTime?: number;
  };

  type SysPostBo = {
    postId?: number;
    tenantId?: string;
    postCode: string;
    postName: string;
    postSort: number;
    status: string;
    createDept?: number;
    createBy?: number;
    createTime?: string;
    updateBy?: number;
    updateTime?: string;
    remark?: string;
  };

  type SysPostExportParams = {
    bo: SysPostBo;
  };

  type SysPostGetInfoParams = {
    postId: number;
  };

  type SysPostListParams = {
    bo: SysPostBo;
    pageQuery: PageQuery;
  };

  type SysPostRemoveParams = {
    postIds: number[];
  };

  type SysPostVo = {
    postId?: number;
    tenantId?: string;
    postCode?: string;
    postName?: string;
    postSort?: number;
    status?: string;
    createDept?: number;
    createBy?: number;
    createTime?: string;
    updateBy?: number;
    updateTime?: string;
    remark?: string;
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
    menuIds?: number[];
  };

  type SysRoleDeptBo = {
    roleId?: number;
    deptId?: number;
  };

  type sysRoleDeptExportParams = {
    bo: SysRoleDeptBo;
  };

  type sysRoleDeptGetInfoParams = {
    deptId: number;
  };

  type sysRoleDeptListParams = {
    bo: SysRoleDeptBo;
    pageQuery: PageQuery;
  };

  type sysRoleDeptRemoveParams = {
    deptIds: number[];
  };

  type SysRoleDeptVo = {
    roleId?: number;
    deptId?: number;
  };

  type sysRoleExportParams = {
    bo: SysRoleBo;
  };

  type sysRoleGetInfoParams = {
    roleId: number;
  };

  type sysRoleListParams = {
    bo: SysRoleBo;
    pageQuery: PageQuery;
  };

  type SysRoleMenuBo = {
    roleId?: number;
    menuId?: number;
  };

  type sysRoleMenuExportParams = {
    bo: SysRoleMenuBo;
  };

  type sysRoleMenuGetInfoParams = {
    menuId: number;
  };

  type sysRoleMenuListParams = {
    bo: SysRoleMenuBo;
    pageQuery: PageQuery;
  };

  type sysRoleMenuRemoveParams = {
    menuIds: number[];
  };

  type SysRoleMenuVo = {
    roleId?: number;
    menuId?: number;
  };

  type sysRoleOptionselectParams = {
    userId: number;
  };

  type sysRoleRemoveParams = {
    roleIds: number[];
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
    checkedKeys?: number[];
    superAdmin?: boolean;
  };

  type SysTenantBo = {
    id?: number;
    tenantId: string;
    contactUserName?: string;
    contactPhone?: string;
    companyName?: string;
    licenseNumber?: string;
    address?: string;
    intro?: string;
    domain?: string;
    remark?: string;
    packageId?: number;
    expireTime?: string;
    accountCount?: number;
    status?: string;
    delFlag?: string;
    createDept?: number;
    createBy?: number;
    createTime?: string;
    updateBy?: number;
    updateTime?: string;
  };

  type sysTenantExportParams = {
    bo: SysTenantBo;
  };

  type sysTenantGetInfoParams = {
    id: number;
  };

  type sysTenantListParams = {
    bo: SysTenantBo;
    pageQuery: PageQuery;
  };

  type sysTenantRemoveParams = {
    ids: number[];
  };

  type SysTenantVo = {
    id?: number;
    tenantId?: string;
    contactUserName?: string;
    contactPhone?: string;
    companyName?: string;
    licenseNumber?: string;
    address?: string;
    intro?: string;
    domain?: string;
    remark?: string;
    packageId?: number;
    expireTime?: string;
    accountCount?: number;
    status?: string;
    delFlag?: string;
    createDept?: number;
    createBy?: number;
    createTime?: string;
    updateBy?: number;
    updateTime?: string;
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
    roleId?: number;
  };

  type sysUserExportParams = {
    bo: SysUserBo;
  };

  type sysUserGetAuthRoleParams = {
    userId: number;
  };

  type sysUserGetInfoParams = {
    userId: number;
  };

  type SysUserInfoVo = {
    user?: SysUserVo;
    roleIds?: number[];
    roles?: SysRoleVo[];
    postIds?: number[];
  };

  type sysUserInsertAuthRoleParams = {
    userId: number;
    roleIds: number[];
  };

  type sysUserListParams = {
    bo: SysUserBo;
    pageQuery: PageQuery;
  };

  type SysUserPostBo = {
    userId?: number;
    postId?: number;
  };

  type SysUserPostExportParams = {
    bo: SysUserPostBo;
  };

  type SysUserPostGetInfoParams = {
    postId: number;
  };

  type SysUserPostListParams = {
    bo: SysUserPostBo;
    pageQuery: PageQuery;
  };

  type SysUserPostRemoveParams = {
    postIds: number[];
  };

  type SysUserPostVo = {
    userId?: number;
    postId?: number;
  };

  type sysUserRemoveParams = {
    userIds: number[];
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
    dept?: SysDeptVo;
  };

  type TableDataInfoSysDeptVo = {
    total?: number;
    rows?: {
      deptId?: number;
      tenantId?: string;
      parentId?: number;
      ancestors?: string;
      deptName?: string;
      orderNum?: number;
      leader?: string;
      phone?: string;
      email?: string;
      status?: string;
      delFlag?: string;
      createDept?: number;
      createBy?: number;
      createTime?: string;
      updateBy?: number;
      updateTime?: string;
      children?: any[];
    }[];
    code?: number;
    msg?: string;
  };

  type TableDataInfoSysDictDataVo = {
    total?: number;
    rows?: SysDictDataVo[];
    code?: number;
    msg?: string;
  };

  type TableDataInfoSysDictTypeVo = {
    total?: number;
    rows?: SysDictTypeVo[];
    code?: number;
    msg?: string;
  };

  type TableDataInfoSysLogininforVo = {
    total?: number;
    rows?: SysLogininforVo[];
    code?: number;
    msg?: string;
  };

  type TableDataInfoSysMenuVo = {
    total?: number;
    rows?: {
      menuId?: number;
      menuName?: string;
      routeName?: string;
      parentId?: number;
      orderNum?: number;
      path?: string;
      component?: string;
      queryParam?: string;
      isFrame?: number;
      isCache?: number;
      menuType?: string;
      visible?: string;
      status?: string;
      perms?: string;
      icon?: string;
      createDept?: number;
      createBy?: number;
      createTime?: string;
      updateBy?: number;
      updateTime?: string;
      remark?: string;
      children?: any[];
    }[];
    code?: number;
    msg?: string;
  };

  type TableDataInfoSysOperLogVo = {
    total?: number;
    rows?: SysOperLogVo[];
    code?: number;
    msg?: string;
  };

  type TableDataInfoSysPostVo = {
    total?: number;
    rows?: SysPostVo[];
    code?: number;
    msg?: string;
  };

  type TableDataInfoSysRoleDeptVo = {
    total?: number;
    rows?: SysRoleDeptVo[];
    code?: number;
    msg?: string;
  };

  type TableDataInfoSysRoleMenuVo = {
    total?: number;
    rows?: SysRoleMenuVo[];
    code?: number;
    msg?: string;
  };

  type TableDataInfoSysRoleVo = {
    total?: number;
    rows?: SysRoleVo[];
    code?: number;
    msg?: string;
  };

  type TableDataInfoSysTenantVo = {
    total?: number;
    rows?: SysTenantVo[];
    code?: number;
    msg?: string;
  };

  type TableDataInfoSysUserPostVo = {
    total?: number;
    rows?: SysUserPostVo[];
    code?: number;
    msg?: string;
  };

  type TableDataInfoSysUserVo = {
    total?: number;
    rows?: SysUserVo[];
    code?: number;
    msg?: string;
  };

  type TreeLong = {
    name?: { empty?: boolean };
    id?: number;
    parentId?: number;
    config?: TreeNodeConfig;
    weight?: any;
    empty?: boolean;
  };

  type TreeNodeConfig = {
    idKey?: string;
    parentIdKey?: string;
    weightKey?: string;
    nameKey?: string;
    childrenKey?: string;
    deep?: number;
  };

  type TreeSelectVo = {
    checkedKeys?: number[];
    treeList?: TreeLong[];
  };

  type unallocatedUserListParams = {
    bo: SysUserBo;
    pageQuery: PageQuery;
  };

  type UserInfoVo = {
    user?: SysUserVo;
    permissions?: string[];
    roles?: string[];
  };
}
