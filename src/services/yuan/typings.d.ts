declare namespace API {
  type dictDictTypeParams = {
    dictType: string;
  };

  type dictExportParams = {
    dictData: SysDictDataBo;
  };

  type dictGetInfoParams = {
    dictCode: number;
  };

  type dictListParams = {
    dictData: SysDictDataBo;
    pageQuery: PageQuery;
  };

  type dictRemoveParams = {
    dictCodes: number[];
  };

  type dictTypeAllParams = {
    dictType: SysDictTypeBo;
    pageQuery: PageQuery;
  };

  type dictTypeExportParams = {
    dictType: SysDictTypeBo;
  };

  type dictTypeGetInfoParams = {
    dictId: number;
  };

  type dictTypeListParams = {
    dictType: SysDictTypeBo;
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

  type MenuTreeSelectVo = {
    checkedKeys?: number[];
    menus?: TreeLong[];
  };

  type PageQuery = {
    pageSize?: number;
    pageNum?: number;
    current?: number;
    orderByColumn?: string;
    isAsc?: string;
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

  type RMenuTreeSelectVo = {
    code?: number;
    msg?: string;
    data?: MenuTreeSelectVo;
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

  type RSysMenuVo = {
    code?: number;
    msg?: string;
    data?: SysMenuVo;
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

  type sysDeptRemoveParams = {
    deptIds: number[];
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

  type SysMenuBo = {
    menuId?: number;
    menuName?: string;
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
    menuTypes?:string[];
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
    menu: SysMenuBo;
    roleId: number;
  };

  type SysMenuVo = {
    menuId?: number;
    menuName?: string;
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
    rows?: SysDeptVo[];
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

  type TableDataInfoSysMenuVo = {
    total?: number;
    rows?: {
      menuId?: number;
      menuName?: string;
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

  type UserInfoVo = {
    user?: SysUserVo;
    permissions?: string[];
    roles?: string[];
  };
}
