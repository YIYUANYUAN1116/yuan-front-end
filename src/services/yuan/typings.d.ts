declare namespace API {
  type allocatedUserListParams = {
    bo: SysUserBo;
    pageQuery: PageQuery;
  };

  type AvatarVo = Record<string, any>;

  type cancelAuthUserAllParams = {
    /** 角色ID */
    roleId: string;
    /** 用户ID串 */
    userIds: string[];
  };

  type dictDictTypeParams = {
    /** 字典类型 */
    dictType: string;
  };

  type dictExportParams = {
    bo: SysDictDataBo;
  };

  type dictGetInfoParams = {
    /** 字典code */
    dictCode: string;
  };

  type dictListParams = {
    bo: SysDictDataBo;
    pageQuery: PageQuery;
  };

  type dictRemoveParams = {
    /** 字典code串 */
    dictCodes: string[];
  };

  type dictTypeAllParams = {
    bo: SysDictTypeBo;
    pageQuery: PageQuery;
  };

  type dictTypeExportParams = {
    bo: SysDictTypeBo;
  };

  type dictTypeGetInfoParams = {
    /** 字典ID */
    dictId: string;
  };

  type dictTypeListParams = {
    bo: SysDictTypeBo;
    pageQuery: PageQuery;
  };

  type dictTypeRemoveParams = {
    /** 字典ID串 */
    dictIds: string[];
  };

  type LoginBody = {
    /** 租户ID */
    tenantId?: string;
    /** 用户名 */
    username: string;
    /** 用户密码 */
    password: string;
    /** 验证码 */
    code?: string;
    /** 唯一标识 */
    uuid?: string;
  };

  type LoginUser = {
    /** 租户ID */
    tenantId?: string;
    /** 用户ID */
    userId?: string;
    /** 部门ID */
    deptId?: string;
    /** 部门名 */
    deptName?: string;
    /** 用户唯一标识 */
    token?: string;
    /** 用户类型 */
    userType?: string;
    /** 登录时间 */
    loginTime?: string;
    /** 过期时间 */
    expireTime?: string;
    /** 登录IP地址 */
    ipaddr?: string;
    /** 登录地点 */
    loginLocation?: string;
    /** 浏览器类型 */
    browser?: string;
    /** 操作系统 */
    os?: string;
    /** 菜单权限 */
    menuPermission?: string[];
    /** 角色权限 */
    rolePermission?: string[];
    /** 用户名 */
    username?: string;
    /** 用户名 */
    nickName?: string;
    /** 微信头像 */
    avatar?: string;
    /** 角色对象 */
    roles?: RoleDTO[];
    /** 数据权限 当前角色ID */
    roleId?: string;
    /** 关联角色类型 */
    kroleGroupType?: string;
    /** 关联角色id */
    kroleGroupIds?: string;
    /** 获取登录id */
    loginId?: string;
  };

  type LoginVo = {
    token?: string;
    access_token?: string;
    userInfo?: LoginUser;
  };

  type PageQuery = {
    /** 分页大小 */
    pageSize?: number;
    /** 当前页数 */
    pageNum?: number;
    current?: number;
    /** 排序列 */
    orderByColumn?: string;
    /** 排序的方向desc或者asc */
    isAsc?: string;
  };

  type ProfileVo = {
    /** 用户信息 */
    user?: SysUserVo;
    /** 用户所属角色组 */
    roleGroup?: string;
    /** 用户所属岗位组 */
    postGroup?: string;
  };

  type RAvatarVo = {
    code?: number;
    msg?: string;
    data?: AvatarVo;
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

  type RLoginVo = {
    code?: number;
    msg?: string;
    data?: LoginVo;
  };

  type RoleDTO = {
    /** 角色ID */
    roleId?: string;
    /** 角色名称 */
    roleName?: string;
    /** 角色权限 */
    roleKey?: string;
    /** 数据范围（1：所有数据权限；2：自定义数据权限；3：本部门数据权限；4：本部门及以下数据权限；5：仅本人数据权限） */
    dataScope?: string;
  };

  type RProfileVo = {
    code?: number;
    msg?: string;
    data?: ProfileVo;
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

  type RWfBizRefVo = {
    code?: number;
    msg?: string;
    data?: WfBizRefVo;
  };

  type RWfCcVo = {
    code?: number;
    msg?: string;
    data?: WfCcVo;
  };

  type RWfDefinitionVo = {
    code?: number;
    msg?: string;
    data?: WfDefinitionVo;
  };

  type RWfInstanceVo = {
    code?: number;
    msg?: string;
    data?: WfInstanceVo;
  };

  type RWfNodeInstanceVo = {
    code?: number;
    msg?: string;
    data?: WfNodeInstanceVo;
  };

  type RWfTaskLogVo = {
    code?: number;
    msg?: string;
    data?: WfTaskLogVo;
  };

  type RWfTaskVo = {
    code?: number;
    msg?: string;
    data?: WfTaskVo;
  };

  type selectAuthUserAllParams = {
    /** 角色ID */
    roleId: string;
    /** 用户ID串 */
    userIds: string[];
  };

  type SelectRolesVo = {
    roles?: SysRoleVo[];
    checkedKeys?: string[];
  };

  type SysDeptBo = {
    deptId?: string;
    /** 租户编号 */
    tenantId?: string;
    /** 父部门id */
    parentId?: string;
    /** 祖级列表 */
    ancestors?: string;
    /** 部门名称 */
    deptName?: string;
    /** 显示顺序 */
    orderNum?: number;
    /** 负责人 */
    leader?: string;
    /** 联系电话 */
    phone?: string;
    /** 邮箱 */
    email?: string;
    /** 部门状态（0正常 1停用） */
    status?: string;
    /** 删除标志（0代表存在 2代表删除） */
    delFlag?: string;
    /** 创建部门 */
    createDept?: string;
    /** 创建者 */
    createBy?: string;
    /** 创建时间 */
    createTime?: string;
    /** 更新者 */
    updateBy?: string;
    /** 更新时间 */
    updateTime?: string;
  };

  type sysDeptExportParams = {
    bo: SysDeptBo;
  };

  type sysDeptGetInfoParams = {
    /** 主键 */
    deptId: string;
  };

  type sysDeptListParams = {
    bo: SysDeptBo;
    pageQuery: PageQuery;
  };

  type sysDeptListTreeParams = {
    bo: SysDeptBo;
  };

  type sysDeptRemoveParams = {
    /** 主键串 */
    deptIds: string[];
  };

  type sysDeptTreeselectParams = {
    bo: SysDeptBo;
  };

  type SysDeptVo = {
    deptId: string;
    /** 租户编号 */
    tenantId?: string;
    /** 父部门id */
    parentId?: string;
    /** 祖级列表 */
    ancestors?: string;
    /** 部门名称 */
    deptName?: string;
    /** 显示顺序 */
    orderNum?: number;
    /** 负责人 */
    leader?: string;
    /** 联系电话 */
    phone?: string;
    /** 邮箱 */
    email?: string;
    /** 部门状态（0正常 1停用） */
    status?: string;
    /** 删除标志（0代表存在 2代表删除） */
    delFlag?: string;
    /** 创建部门 */
    createDept?: string;
    /** 创建者 */
    createBy?: string;
    /** 创建时间 */
    createTime?: string;
    /** 更新者 */
    updateBy?: string;
    /** 更新时间 */
    updateTime?: string;
    children?: any[];
  };

  type SysDictDataBo = {
    /** 创建部门 */
    createDept?: string;
    /** 创建者 */
    createBy?: string;
    /** 创建时间 */
    createTime?: string;
    /** 更新者 */
    updateBy?: string;
    /** 更新时间 */
    updateTime?: string;
    /** 请求参数 */
    params?: Record<string, any>;
    /** 字典编码 */
    dictCode?: string;
    /** 字典排序 */
    dictSort?: number;
    /** 字典标签 */
    dictLabel?: string;
    /** 字典键值 */
    dictValue?: string;
    /** 字典类型 */
    dictType?: string;
    /** 样式属性（其他样式扩展） */
    cssClass?: string;
    /** 表格回显样式 */
    listClass?: string;
    /** 是否默认（Y是 N否） */
    isDefault?: string;
    /** 状态（0正常 1停用） */
    status?: string;
    /** 备注 */
    remark?: string;
  };

  type SysDictDataVo = {
    /** 字典编码 */
    dictCode: string;
    /** 字典排序 */
    dictSort?: number;
    /** 字典标签 */
    dictLabel?: string;
    /** 字典键值 */
    dictValue?: string;
    /** 字典类型 */
    dictType?: string;
    /** 样式属性（其他样式扩展） */
    cssClass?: string;
    /** 表格回显样式 */
    listClass?: string;
    /** 是否默认（Y是 N否） */
    isDefault?: string;
    /** 状态（0正常 1停用） */
    status?: string;
    /** 备注 */
    remark?: string;
    /** 创建时间 */
    createTime?: string;
  };

  type SysDictTypeBo = {
    /** 创建部门 */
    createDept?: string;
    /** 创建者 */
    createBy?: string;
    /** 创建时间 */
    createTime?: string;
    /** 更新者 */
    updateBy?: string;
    /** 更新时间 */
    updateTime?: string;
    /** 请求参数 */
    params?: Record<string, any>;
    /** 字典主键 */
    dictId?: string;
    /** 字典名称 */
    dictName?: string;
    /** 字典类型 */
    dictType?: string;
    /** 状态（0正常 1停用） */
    status?: string;
    /** 备注 */
    remark?: string;
  };

  type SysDictTypeVo = {
    /** 字典主键 */
    dictId: string;
    /** 字典名称 */
    dictName?: string;
    /** 字典类型 */
    dictType?: string;
    /** 状态（0正常 1停用） */
    status?: string;
    /** 备注 */
    remark?: string;
    /** 创建时间 */
    createTime?: string;
  };

  type SysLogininforBo = {
    infoId?: string;
    /** 租户编号 */
    tenantId?: string;
    /** 用户Id */
    userId?: string;
    /** 用户账号 */
    userName?: string;
    /** 登录IP地址 */
    ipaddr?: string;
    /** 登录地点 */
    loginLocation?: string;
    /** 浏览器类型 */
    browser?: string;
    /** 操作系统 */
    os?: string;
    /** 登录状态（0成功 1失败） */
    status?: string;
    /** 提示消息 */
    msg?: string;
    /** 访问时间 */
    loginTime?: string;
    onlySelf?: boolean;
  };

  type SysLogininforExportParams = {
    bo: SysLogininforBo;
  };

  type SysLogininforGetInfoParams = {
    /** 主键 */
    infoId: string;
  };

  type SysLogininforListParams = {
    bo: SysLogininforBo;
    pageQuery: PageQuery;
  };

  type SysLogininforRemoveParams = {
    /** 主键串 */
    infoIds: string[];
  };

  type SysLogininforVo = {
    infoId: string;
    /** 租户编号 */
    tenantId?: string;
    /** 用户账号 */
    userName?: string;
    userId?: string;
    /** 登录IP地址 */
    ipaddr?: string;
    /** 登录地点 */
    loginLocation?: string;
    /** 浏览器类型 */
    browser?: string;
    /** 操作系统 */
    os?: string;
    /** 登录状态（0成功 1失败） */
    status?: string;
    /** 提示消息 */
    msg?: string;
    /** 访问时间 */
    loginTime?: string;
  };

  type SysMenuBo = {
    menuId?: string;
    /** 菜单名称 */
    menuName?: string;
    routeName?: string;
    /** 父菜单ID */
    parentId?: string;
    /** 显示顺序 */
    orderNum?: number;
    /** 路由地址 */
    path?: string;
    /** 组件路径 */
    component?: string;
    /** 路由参数 */
    queryParam?: string;
    /** 是否为外链（0是 1否） */
    isFrame?: number;
    /** 是否缓存（0缓存 1不缓存） */
    isCache?: number;
    /** 菜单类型（M目录 C菜单 F按钮） */
    menuType?: string;
    /** 显示状态（0显示 1隐藏） */
    visible?: string;
    /** 菜单状态（0正常 1停用） */
    status?: string;
    /** 权限标识 */
    perms?: string;
    /** 菜单图标 */
    icon?: string;
    /** 创建部门 */
    createDept?: string;
    /** 创建者 */
    createBy?: string;
    /** 创建时间 */
    createTime?: string;
    /** 更新者 */
    updateBy?: string;
    /** 更新时间 */
    updateTime?: string;
    /** 备注 */
    remark?: string;
    scope?: string;
    menuTypes?: string[];
  };

  type sysMenuExportParams = {
    bo: SysMenuBo;
  };

  type sysMenuGetInfoParams = {
    /** 主键 */
    menuId: string;
  };

  type sysMenuListParams = {
    bo: SysMenuBo;
    pageQuery: PageQuery;
  };

  type sysMenuListTreeParams = {
    bo: SysMenuBo;
  };

  type sysMenuRemoveParams = {
    /** 主键串 */
    menuIds: string[];
  };

  type sysMenuRoleMenuTreeselectParams = {
    roleId: string;
  };

  type sysMenuTreeselectParams = {
    bo: SysMenuBo;
    roleId: string;
  };

  type SysMenuVo = {
    menuId: string;
    /** 菜单名称 */
    menuName?: string;
    /** 菜单名称 */
    routeName?: string;
    /** 父菜单ID */
    parentId?: string;
    /** 显示顺序 */
    orderNum?: number;
    /** 路由地址 */
    path?: string;
    /** 组件路径 */
    component?: string;
    /** 路由参数 */
    queryParam?: string;
    /** 是否为外链（0是 1否） */
    isFrame?: number;
    /** 是否缓存（0缓存 1不缓存） */
    isCache?: number;
    /** 菜单类型（M目录 C菜单 F按钮） */
    menuType?: string;
    /** 显示状态（0显示 1隐藏） */
    visible?: string;
    /** 菜单状态（0正常 1停用） */
    status?: string;
    /** 权限标识 */
    perms?: string;
    /** 菜单图标 */
    icon?: string;
    /** 创建部门 */
    createDept?: string;
    /** 创建者 */
    createBy?: string;
    /** 创建时间 */
    createTime?: string;
    /** 更新者 */
    updateBy?: string;
    /** 更新时间 */
    updateTime?: string;
    /** 备注 */
    remark?: string;
    scope?: string;
    children?: any[];
  };

  type SysOperLogBo = {
    operId?: string;
    /** 租户编号 */
    tenantId?: string;
    /** 模块标题 */
    title?: string;
    /** 业务类型（0其它 1新增 2修改 3删除） */
    businessType?: number;
    /** 方法名称 */
    method?: string;
    /** 请求方式 */
    requestMethod?: string;
    /** 操作类别（0其它 1后台用户 2手机端用户） */
    operatorType?: number;
    /** 操作人员 */
    operName?: string;
    /** 部门名称 */
    deptName?: string;
    /** 请求URL */
    operUrl?: string;
    /** 主机地址 */
    operIp?: string;
    /** 操作地点 */
    operLocation?: string;
    /** 请求参数 */
    operParam?: string;
    /** 返回参数 */
    jsonResult?: string;
    /** 操作状态（0正常 1异常） */
    status?: number;
    /** 错误消息 */
    errorMsg?: string;
    /** 操作时间 */
    operTime?: string;
    /** 消耗时间 */
    costTime?: string;
  };

  type SysOperLogExportParams = {
    bo: SysOperLogBo;
  };

  type SysOperLogGetInfoParams = {
    /** 主键 */
    operId: string;
  };

  type SysOperLogListParams = {
    bo: SysOperLogBo;
    pageQuery: PageQuery;
  };

  type SysOperLogRemoveParams = {
    /** 主键串 */
    operIds: string[];
  };

  type SysOperLogVo = {
    operId: string;
    /** 租户编号 */
    tenantId?: string;
    /** 模块标题 */
    title?: string;
    /** 业务类型（0其它 1新增 2修改 3删除） */
    businessType?: number;
    /** 方法名称 */
    method?: string;
    /** 请求方式 */
    requestMethod?: string;
    /** 操作类别（0其它 1后台用户 2手机端用户） */
    operatorType?: number;
    /** 操作人员 */
    operName?: string;
    /** 部门名称 */
    deptName?: string;
    /** 请求URL */
    operUrl?: string;
    /** 主机地址 */
    operIp?: string;
    /** 操作地点 */
    operLocation?: string;
    /** 请求参数 */
    operParam?: string;
    /** 返回参数 */
    jsonResult?: string;
    /** 操作状态（0正常 1异常） */
    status?: number;
    /** 错误消息 */
    errorMsg?: string;
    /** 操作时间 */
    operTime?: string;
    /** 消耗时间 */
    costTime?: string;
  };

  type SysPostBo = {
    postId?: string;
    /** 租户编号 */
    tenantId?: string;
    /** 岗位编码 */
    postCode: string;
    /** 岗位名称 */
    postName: string;
    /** 显示顺序 */
    postSort: number;
    /** 状态（0正常 1停用） */
    status: string;
    /** 数据范围（1：所有数据权限；2：自定义数据权限；3：本部门数据权限；4：本部门及以下数据权限；5：仅本人数据权限） */
    dataScope?: string;
    /** 创建部门 */
    createDept?: string;
    /** 创建者 */
    createBy?: string;
    /** 创建时间 */
    createTime?: string;
    /** 更新者 */
    updateBy?: string;
    /** 更新时间 */
    updateTime?: string;
    /** 备注 */
    remark?: string;
  };

  type SysPostExportParams = {
    bo: SysPostBo;
  };

  type SysPostGetInfoParams = {
    /** 主键 */
    postId: string;
  };

  type SysPostListParams = {
    bo: SysPostBo;
    pageQuery: PageQuery;
  };

  type SysPostRemoveParams = {
    /** 主键串 */
    postIds: string[];
  };

  type SysPostVo = {
    postId: string;
    /** 租户编号 */
    tenantId?: string;
    /** 岗位编码 */
    postCode?: string;
    /** 岗位名称 */
    postName?: string;
    /** 显示顺序 */
    postSort?: number;
    /** 状态（0正常 1停用） */
    status?: string;
    /** 数据范围（1：所有数据权限；2：自定义数据权限；3：本部门数据权限；4：本部门及以下数据权限；5：仅本人数据权限） */
    dataScope?: string;
    /** 创建部门 */
    createDept?: string;
    /** 创建者 */
    createBy?: string;
    /** 创建时间 */
    createTime?: string;
    /** 更新者 */
    updateBy?: string;
    /** 更新时间 */
    updateTime?: string;
    /** 备注 */
    remark?: string;
  };

  type SysRoleBo = {
    roleId?: string;
    /** 租户编号 */
    tenantId?: string;
    /** 角色名称 */
    roleName: string;
    /** 角色权限字符串 */
    roleKey: string;
    /** 显示顺序 */
    roleSort: number;
    /** 数据范围（1：全部数据权限 2：自定数据权限 3：本部门数据权限 4：本部门及以下数据权限） */
    dataScope?: string;
    /** 菜单树选择项是否关联显示 */
    menuCheckStrictly?: boolean;
    /** 部门树选择项是否关联显示 */
    deptCheckStrictly?: boolean;
    /** 角色状态（0正常 1停用） */
    status: string;
    /** 删除标志（0代表存在 2代表删除） */
    delFlag?: string;
    /** 创建部门 */
    createDept?: string;
    /** 创建者 */
    createBy?: string;
    /** 创建时间 */
    createTime?: string;
    /** 更新者 */
    updateBy?: string;
    /** 更新时间 */
    updateTime?: string;
    /** 备注 */
    remark?: string;
    /** 菜单组 */
    menuIds?: string[];
    menuIdList?: string[];
    menuNames?: string[];
    amount?: number;
    superAdmin?: boolean;
  };

  type SysRoleDeptBo = {
    roleId?: string;
    deptId?: string;
  };

  type sysRoleDeptExportParams = {
    bo: SysRoleDeptBo;
  };

  type sysRoleDeptGetInfoParams = {
    /** 主键 */
    deptId: string;
  };

  type sysRoleDeptListParams = {
    bo: SysRoleDeptBo;
    pageQuery: PageQuery;
  };

  type sysRoleDeptRemoveParams = {
    /** 主键串 */
    deptIds: string[];
  };

  type SysRoleDeptVo = {
    roleId: string;
    deptId: string;
  };

  type sysRoleExportParams = {
    bo: SysRoleBo;
  };

  type sysRoleGetInfoParams = {
    /** 主键 */
    roleId: string;
  };

  type sysRoleListParams = {
    bo: SysRoleBo;
    pageQuery: PageQuery;
  };

  type SysRoleMenuBo = {
    roleId?: string;
    menuId?: string;
  };

  type sysRoleMenuExportParams = {
    bo: SysRoleMenuBo;
  };

  type sysRoleMenuGetInfoParams = {
    /** 主键 */
    menuId: string;
  };

  type sysRoleMenuListParams = {
    bo: SysRoleMenuBo;
    pageQuery: PageQuery;
  };

  type sysRoleMenuRemoveParams = {
    /** 主键串 */
    menuIds: string[];
  };

  type SysRoleMenuVo = {
    roleId: string;
    menuId: string;
  };

  type sysRoleOptionselectParams = {
    userId: string;
  };

  type sysRoleRemoveParams = {
    /** 主键串 */
    roleIds: string[];
  };

  type SysRoleVo = {
    roleId: string;
    /** 租户编号 */
    tenantId?: string;
    /** 角色名称 */
    roleName?: string;
    /** 角色权限字符串 */
    roleKey?: string;
    /** 显示顺序 */
    roleSort?: number;
    /** 数据范围（1：全部数据权限 2：自定数据权限 3：本部门数据权限 4：本部门及以下数据权限） */
    dataScope?: string;
    /** 菜单树选择项是否关联显示 */
    menuCheckStrictly?: boolean;
    /** 部门树选择项是否关联显示 */
    deptCheckStrictly?: boolean;
    /** 角色状态（0正常 1停用） */
    status?: string;
    /** 删除标志（0代表存在 2代表删除） */
    delFlag?: string;
    /** 创建部门 */
    createDept?: string;
    /** 创建者 */
    createBy?: string;
    /** 创建时间 */
    createTime?: string;
    /** 更新者 */
    updateBy?: string;
    /** 更新时间 */
    updateTime?: string;
    /** 备注 */
    remark?: string;
    checkedKeys?: string[];
    superAdmin?: boolean;
  };

  type SysTenantBo = {
    id?: string;
    /** 租户编号 */
    tenantId?: string;
    /** 联系人 */
    contactUserName?: string;
    /** 联系电话 */
    contactPhone?: string;
    /** 企业名称 */
    companyName?: string;
    /** 统一社会信用代码 */
    licenseNumber?: string;
    /** 地址 */
    address?: string;
    /** 企业简介 */
    intro?: string;
    /** 域名 */
    domain?: string;
    /** 备注 */
    remark?: string;
    /** 租户套餐编号 */
    packageId?: string;
    /** 过期时间 */
    expireTime?: string;
    /** 用户数量（-1不限制） */
    accountCount?: number;
    /** 租户状态（0正常 1停用） */
    status?: string;
    /** 删除标志（0代表存在 2代表删除） */
    delFlag?: string;
    /** 创建部门 */
    createDept?: string;
    /** 创建者 */
    createBy?: string;
    /** 创建时间 */
    createTime?: string;
    /** 更新者 */
    updateBy?: string;
    /** 更新时间 */
    updateTime?: string;
  };

  type sysTenantExportParams = {
    bo: SysTenantBo;
  };

  type sysTenantGetInfoParams = {
    /** 主键 */
    id: string;
  };

  type sysTenantListParams = {
    bo: SysTenantBo;
    pageQuery: PageQuery;
  };

  type sysTenantRemoveParams = {
    /** 主键串 */
    ids: string[];
  };

  type SysTenantVo = {
    id: string;
    /** 租户编号 */
    tenantId?: string;
    /** 联系人 */
    contactUserName?: string;
    /** 联系电话 */
    contactPhone?: string;
    /** 企业名称 */
    companyName?: string;
    /** 统一社会信用代码 */
    licenseNumber?: string;
    /** 地址 */
    address?: string;
    /** 企业简介 */
    intro?: string;
    /** 域名 */
    domain?: string;
    /** 备注 */
    remark?: string;
    /** 租户套餐编号 */
    packageId?: string;
    /** 过期时间 */
    expireTime?: string;
    /** 用户数量（-1不限制） */
    accountCount?: number;
    /** 租户状态（0正常 1停用） */
    status?: string;
    /** 删除标志（0代表存在 2代表删除） */
    delFlag?: string;
    /** 创建部门 */
    createDept?: string;
    /** 创建者 */
    createBy?: string;
    /** 创建时间 */
    createTime?: string;
    /** 更新者 */
    updateBy?: string;
    /** 更新时间 */
    updateTime?: string;
  };

  type SysUserBo = {
    userId?: string;
    /** 微信用户标识 */
    openId?: string;
    /** 用户等级 */
    userGrade?: string;
    /** 账户余额 */
    userBalance?: number;
    /** 租户编号 */
    tenantId?: string;
    /** 部门ID */
    deptId?: string;
    /** 用户账号 */
    userName: string;
    /** 用户昵称 */
    nickName: string;
    /** 用户类型（sys_user系统用户） */
    userType?: string;
    /** 用户套餐 */
    userPlan?: string;
    /** 用户邮箱 */
    email: string;
    /** 手机号码 */
    phonenumber?: string;
    /** 用户性别（0男 1女 2未知） */
    sex?: string;
    /** 头像地址 */
    avatar?: string;
    /** 微信头像地址 */
    wxAvatar?: string;
    /** 密码 */
    password?: string;
    /** 帐号状态（0正常 1停用） */
    status?: string;
    /** 删除标志（0代表存在 2代表删除） */
    delFlag?: string;
    /** 最后登录IP */
    loginIp?: string;
    /** 最后登录时间 */
    loginDate?: string;
    /** 注册域名 */
    domainName?: string;
    /** 创建部门 */
    createDept?: string;
    /** 创建者 */
    createBy?: string;
    /** 创建时间 */
    createTime?: string;
    /** 更新者 */
    updateBy?: string;
    /** 更新时间 */
    updateTime?: string;
    /** 备注 */
    remark?: string;
    /** 关联知识库角色/角色组 */
    kroleGroupType?: string;
    /** 关联知识库角色/角色组id */
    kroleGroupIds?: string;
    roleId?: string;
  };

  type sysUserExportParams = {
    bo: SysUserBo;
  };

  type sysUserGetAuthRoleParams = {
    /** 用户ID */
    userId: string;
  };

  type sysUserGetInfoParams = {
    /** 主键 */
    userId: string;
  };

  type SysUserInfoVo = {
    /** 用户信息 */
    user?: SysUserVo;
    /** 角色ID列表 */
    roleIds?: string[];
    /** 角色列表 */
    roles?: SysRoleVo[];
    /** 岗位ID列表 */
    postIds?: string[];
  };

  type sysUserInsertAuthRoleParams = {
    /** 用户Id */
    userId: string;
    /** 角色ID串 */
    roleIds: string[];
  };

  type sysUserListParams = {
    bo: SysUserBo;
    pageQuery: PageQuery;
  };

  type SysUserPasswordBo = {
    /** 旧密码 */
    oldPassword: string;
    /** 新密码 */
    newPassword: string;
  };

  type SysUserPostBo = {
    userId?: string;
    postId?: string;
  };

  type SysUserPostExportParams = {
    bo: SysUserPostBo;
  };

  type SysUserPostGetInfoParams = {
    /** 主键 */
    postId: string;
  };

  type SysUserPostListParams = {
    bo: SysUserPostBo;
    pageQuery: PageQuery;
  };

  type SysUserPostRemoveParams = {
    /** 主键串 */
    postIds: string;
  };

  type SysUserPostVo = {
    userId: string;
    postId: string;
  };

  type SysUserProfileBo = {
    /** 创建部门 */
    createDept?: string;
    /** 创建者 */
    createBy?: string;
    /** 创建时间 */
    createTime?: string;
    /** 更新者 */
    updateBy?: string;
    /** 更新时间 */
    updateTime?: string;
    /** 请求参数 */
    params?: Record<string, any>;
    /** 用户ID */
    userId?: string;
    /** 用户昵称 */
    nickName?: string;
    /** 用户邮箱 */
    email?: string;
    /** 手机号码 */
    phonenumber?: string;
    /** 用户性别（0男 1女 2未知） */
    sex?: string;
  };

  type sysUserRemoveParams = {
    /** 主键串 */
    userIds: string[];
  };

  type SysUserVo = {
    userId: string;
    /** 微信用户标识 */
    openId?: string;
    /** 用户等级 */
    userGrade?: string;
    /** 账户余额 */
    userBalance?: number;
    /** 租户编号 */
    tenantId?: string;
    /** 部门ID */
    deptId?: string;
    /** 用户账号 */
    userName?: string;
    /** 用户昵称 */
    nickName?: string;
    /** 用户类型（sys_user系统用户） */
    userType?: string;
    /** 用户套餐 */
    userPlan?: string;
    /** 用户邮箱 */
    email?: string;
    /** 手机号码 */
    phonenumber?: string;
    /** 用户性别（0男 1女 2未知） */
    sex?: string;
    /** 头像地址 */
    avatar?: string;
    /** 微信头像地址 */
    wxAvatar?: string;
    /** 密码 */
    password?: string;
    /** 帐号状态（0正常 1停用） */
    status?: string;
    /** 删除标志（0代表存在 2代表删除） */
    delFlag?: string;
    /** 最后登录IP */
    loginIp?: string;
    /** 最后登录时间 */
    loginDate?: string;
    /** 注册域名 */
    domainName?: string;
    /** 创建部门 */
    createDept?: string;
    /** 创建者 */
    createBy?: string;
    /** 创建时间 */
    createTime?: string;
    /** 更新者 */
    updateBy?: string;
    /** 更新时间 */
    updateTime?: string;
    /** 备注 */
    remark?: string;
    /** 关联知识库角色/角色组 */
    kroleGroupType?: string;
    /** 关联知识库角色/角色组id */
    kroleGroupIds?: string;
    /** 角色对象 */
    roles?: SysRoleVo[];
    /** 部门对象 */
    dept?: SysDeptVo;
    deptName?: string;
  };

  type TableDataInfoSysDeptVo = {
    /** 总记录数 */
    total?: string;
    /** 列表数据 */
    rows?: {
      deptId: number;
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
    /** 消息状态码 */
    code?: number;
    /** 消息内容 */
    msg?: string;
  };

  type TableDataInfoSysDictDataVo = {
    /** 总记录数 */
    total?: string;
    /** 列表数据 */
    rows?: SysDictDataVo[];
    /** 消息状态码 */
    code?: number;
    /** 消息内容 */
    msg?: string;
  };

  type TableDataInfoSysDictTypeVo = {
    /** 总记录数 */
    total?: string;
    /** 列表数据 */
    rows?: SysDictTypeVo[];
    /** 消息状态码 */
    code?: number;
    /** 消息内容 */
    msg?: string;
  };

  type TableDataInfoSysLogininforVo = {
    /** 总记录数 */
    total?: string;
    /** 列表数据 */
    rows?: SysLogininforVo[];
    /** 消息状态码 */
    code?: number;
    /** 消息内容 */
    msg?: string;
  };

  type TableDataInfoSysMenuVo = {
    /** 总记录数 */
    total?: string;
    /** 列表数据 */
    rows?: {
      menuId: number;
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
      scope?: string;
      children?: any[];
    }[];
    /** 消息状态码 */
    code?: number;
    /** 消息内容 */
    msg?: string;
  };

  type TableDataInfoSysOperLogVo = {
    /** 总记录数 */
    total?: string;
    /** 列表数据 */
    rows?: SysOperLogVo[];
    /** 消息状态码 */
    code?: number;
    /** 消息内容 */
    msg?: string;
  };

  type TableDataInfoSysPostVo = {
    /** 总记录数 */
    total?: string;
    /** 列表数据 */
    rows?: SysPostVo[];
    /** 消息状态码 */
    code?: number;
    /** 消息内容 */
    msg?: string;
  };

  type TableDataInfoSysRoleDeptVo = {
    /** 总记录数 */
    total?: string;
    /** 列表数据 */
    rows?: SysRoleDeptVo[];
    /** 消息状态码 */
    code?: number;
    /** 消息内容 */
    msg?: string;
  };

  type TableDataInfoSysRoleMenuVo = {
    /** 总记录数 */
    total?: string;
    /** 列表数据 */
    rows?: SysRoleMenuVo[];
    /** 消息状态码 */
    code?: number;
    /** 消息内容 */
    msg?: string;
  };

  type TableDataInfoSysRoleVo = {
    /** 总记录数 */
    total?: string;
    /** 列表数据 */
    rows?: SysRoleVo[];
    /** 消息状态码 */
    code?: number;
    /** 消息内容 */
    msg?: string;
  };

  type TableDataInfoSysTenantVo = {
    /** 总记录数 */
    total?: string;
    /** 列表数据 */
    rows?: SysTenantVo[];
    /** 消息状态码 */
    code?: number;
    /** 消息内容 */
    msg?: string;
  };

  type TableDataInfoSysUserPostVo = {
    /** 总记录数 */
    total?: string;
    /** 列表数据 */
    rows?: SysUserPostVo[];
    /** 消息状态码 */
    code?: number;
    /** 消息内容 */
    msg?: string;
  };

  type TableDataInfoSysUserVo = {
    /** 总记录数 */
    total?: string;
    /** 列表数据 */
    rows?: SysUserVo[];
    /** 消息状态码 */
    code?: number;
    /** 消息内容 */
    msg?: string;
  };

  type TableDataInfoWfBizRefVo = {
    /** 总记录数 */
    total?: string;
    /** 列表数据 */
    rows?: WfBizRefVo[];
    /** 消息状态码 */
    code?: number;
    /** 消息内容 */
    msg?: string;
  };

  type TableDataInfoWfCcVo = {
    /** 总记录数 */
    total?: string;
    /** 列表数据 */
    rows?: WfCcVo[];
    /** 消息状态码 */
    code?: number;
    /** 消息内容 */
    msg?: string;
  };

  type TableDataInfoWfDefinitionVo = {
    /** 总记录数 */
    total?: string;
    /** 列表数据 */
    rows?: WfDefinitionVo[];
    /** 消息状态码 */
    code?: number;
    /** 消息内容 */
    msg?: string;
  };

  type TableDataInfoWfInstanceVo = {
    /** 总记录数 */
    total?: string;
    /** 列表数据 */
    rows?: WfInstanceVo[];
    /** 消息状态码 */
    code?: number;
    /** 消息内容 */
    msg?: string;
  };

  type TableDataInfoWfNodeInstanceVo = {
    /** 总记录数 */
    total?: string;
    /** 列表数据 */
    rows?: WfNodeInstanceVo[];
    /** 消息状态码 */
    code?: number;
    /** 消息内容 */
    msg?: string;
  };

  type TableDataInfoWfTaskLogVo = {
    /** 总记录数 */
    total?: string;
    /** 列表数据 */
    rows?: WfTaskLogVo[];
    /** 消息状态码 */
    code?: number;
    /** 消息内容 */
    msg?: string;
  };

  type TableDataInfoWfTaskVo = {
    /** 总记录数 */
    total?: string;
    /** 列表数据 */
    rows?: WfTaskVo[];
    /** 消息状态码 */
    code?: number;
    /** 消息内容 */
    msg?: string;
  };

  type TreeLong = {
    name?: { empty?: boolean };
    id?: string;
    parentId?: string;
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
    /** 选中菜单列表 */
    checkedKeys?: string[];
    /** 菜单下拉树结构列表 */
    treeList?: TreeLong[];
  };

  type unallocatedUserListParams = {
    bo: SysUserBo;
    pageQuery: PageQuery;
  };

  type UserInfoVo = {
    /** 用户基本信息 */
    user?: SysUserVo;
    /** 菜单权限 */
    permissions?: string[];
    /** 角色权限 */
    roles?: string[];
  };

  type WfBizRefBo = {
    id?: string;
    /** 业务类型，如 LEAVE/REIMBURSE */
    bizType: string;
    /** 业务主键 */
    bizId: string;
    /** 流程实例ID */
    instanceId: string;
    /** RUNNING/APPROVED/REJECTED/CANCELED */
    status: string;
    /** createdBy */
    createdBy?: string;
    /** createdTime */
    createdTime: string;
    /** updatedTime */
    updatedTime: string;
  };

  type WfBizRefExportParams = {
    bo: WfBizRefBo;
  };

  type WfBizRefGetInfoParams = {
    /** 主键 */
    id: string;
  };

  type WfBizRefListParams = {
    bo: WfBizRefBo;
    pageQuery: PageQuery;
  };

  type WfBizRefRemoveParams = {
    /** 主键串 */
    ids: string[];
  };

  type WfBizRefVo = {
    id: string;
    /** 业务类型，如 LEAVE/REIMBURSE */
    bizType?: string;
    /** 业务主键 */
    bizId?: string;
    /** 流程实例ID */
    instanceId?: string;
    /** RUNNING/APPROVED/REJECTED/CANCELED */
    status?: string;
    /** createdBy */
    createdBy?: string;
    /** createdTime */
    createdTime?: string;
    /** updatedTime */
    updatedTime?: string;
  };

  type WfCcBo = {
    id?: string;
    /** 租户ID */
    tenantId: string;
    /** 流程实例ID */
    instanceId: string;
    /** 被抄送人 */
    userId: string;
    /** 是否已读(0未读 1已读) */
    readFlag?: string;
    /** createTime */
    createTime?: string;
  };

  type WfCcExportParams = {
    bo: WfCcBo;
  };

  type WfCcGetInfoParams = {
    /** 主键 */
    id: string;
  };

  type WfCcListParams = {
    bo: WfCcBo;
    pageQuery: PageQuery;
  };

  type WfCcRemoveParams = {
    /** 主键串 */
    ids: string[];
  };

  type WfCcVo = {
    id: string;
    /** 租户ID */
    tenantId?: string;
    /** 流程实例ID */
    instanceId?: string;
    /** 被抄送人 */
    userId?: string;
    /** 是否已读(0未读 1已读) */
    readFlag?: string;
    /** createTime */
    createTime?: string;
  };

  type WfDefinitionBo = {
    id?: string;
    /** 租户ID */
    tenantId?: string;
    /** 流程业务标识(leave, expense) */
    definitionKey: string;
    /** 流程名称 */
    definitionName: string;
    /** 版本号(递增) */
    version?: number;
    /** 状态(DRAFT/PUBLISHED) */
    status?: string;
    /** 表单定义(JSON Schema) */
    formSchema?: string;
    /** 流程定义JSON */
    flowJson?: string;
    /** 备注 */
    remark?: string;
    /** createBy */
    createBy?: string;
    /** createTime */
    createTime?: string;
    /** updateTime */
    updateTime?: string;
  };

  type WfDefinitionDto = {
    id?: string;
    formSchema?: string;
    flowJson?: string;
  };

  type WfDefinitionExportParams = {
    bo: WfDefinitionBo;
  };

  type WfDefinitionGetInfoParams = {
    /** 主键 */
    id: string;
  };

  type WfDefinitionListParams = {
    bo: WfDefinitionBo;
    pageQuery: PageQuery;
  };

  type WfDefinitionRemoveParams = {
    /** 主键串 */
    ids: string[];
  };

  type WfDefinitionVo = {
    id: string;
    /** 租户ID */
    tenantId?: string;
    /** 流程业务标识(leave, expense) */
    definitionKey?: string;
    /** 流程名称 */
    definitionName?: string;
    /** 版本号(递增) */
    version?: number;
    /** 状态(DRAFT/PUBLISHED) */
    status?: string;
    /** 表单定义(JSON Schema) */
    formSchema?: string;
    /** 流程定义JSON */
    flowJson?: string;
    /** 备注 */
    remark?: string;
    /** createBy */
    createBy?: string;
    /** createTime */
    createTime?: string;
    /** updateTime */
    updateTime?: string;
  };

  type WfInstanceBo = {
    id?: string;
    /** 租户ID */
    tenantId: string;
    /** 流程定义ID */
    definitionId: string;
    /** 流程业务标识 */
    definitionKey: string;
    /** 流程版本 */
    version: number;
    /** 业务单号(请假单ID等) */
    businessKey?: string;
    /** 状态(RUNNING/APPROVED/REJECTED/CANCELED) */
    status: string;
    /** 发起人 */
    startUserId: string;
    /** startTime */
    startTime?: string;
    /** 结束时间 */
    endTime?: string;
    variables?: string;
  };

  type WfInstanceExportParams = {
    bo: WfInstanceBo;
  };

  type WfInstanceGetInfoParams = {
    /** 主键 */
    id: string;
  };

  type WfInstanceListParams = {
    bo: WfInstanceBo;
    pageQuery: PageQuery;
  };

  type WfInstanceRemoveParams = {
    /** 主键串 */
    ids: string[];
  };

  type WfInstanceVo = {
    id: string;
    /** 租户ID */
    tenantId?: string;
    /** 流程定义ID */
    definitionId?: string;
    /** 流程业务标识 */
    definitionKey?: string;
    /** 流程版本 */
    version?: number;
    /** 业务单号(请假单ID等) */
    businessKey?: string;
    /** 状态(RUNNING/APPROVED/REJECTED/CANCELED) */
    status?: string;
    /** 发起人 */
    startUserId?: string;
    /** startTime */
    startTime?: string;
    /** 结束时间 */
    endTime?: string;
    variables?: string;
  };

  type WfNodeInstanceBo = {
    id?: string;
    /** 流程实例ID */
    instanceId: string;
    /** 节点标识(start/approve_1) */
    nodeKey: string;
    /** 节点类型(START/APPROVAL/GATEWAY/END) */
    nodeType: string;
    /** 审批人类型(USER/ROLE/DEPT) */
    assigneeType?: string;
    /** 审批人值 */
    assigneeValue?: string;
    /** 状态(WAIT/DONE) */
    status: string;
    /** 执行顺序 */
    orderNo: number;
    /** createTime */
    createTime?: string;
  };

  type WfNodeInstanceExportParams = {
    bo: WfNodeInstanceBo;
  };

  type WfNodeInstanceGetInfoParams = {
    /** 主键 */
    id: string;
  };

  type WfNodeInstanceListParams = {
    bo: WfNodeInstanceBo;
    pageQuery: PageQuery;
  };

  type WfNodeInstanceRemoveParams = {
    /** 主键串 */
    ids: string[];
  };

  type WfNodeInstanceVo = {
    id: string;
    /** 流程实例ID */
    instanceId?: string;
    /** 节点标识(start/approve_1) */
    nodeKey?: string;
    /** 节点类型(START/APPROVAL/GATEWAY/END) */
    nodeType?: string;
    /** 审批人类型(USER/ROLE/DEPT) */
    assigneeType?: string;
    /** 审批人值 */
    assigneeValue?: string;
    /** 状态(WAIT/DONE) */
    status?: string;
    /** 执行顺序 */
    orderNo?: number;
    /** createTime */
    createTime?: string;
  };

  type WfTaskBo = {
    id?: string;
    /** 租户ID */
    tenantId: string;
    /** 流程实例ID */
    instanceId: string;
    /** 节点实例ID */
    nodeInstanceId: string;
    /** 审批人ID */
    assigneeId: string;
    /** 状态(TODO/DONE/TRANSFERRED) */
    status: string;
    /** 操作(APPROVE/REJECT/TRANSFER) */
    action?: string;
    /** 审批意见 */
    comment?: string;
    /** createTime */
    createTime?: string;
    /** 完成时间 */
    finishTime?: string;
  };

  type WfTaskExportParams = {
    bo: WfTaskBo;
  };

  type WfTaskGetInfoParams = {
    /** 主键 */
    id: string;
  };

  type WfTaskListParams = {
    bo: WfTaskBo;
    pageQuery: PageQuery;
  };

  type WfTaskLogBo = {
    id?: string;
    /** 任务ID */
    taskId: string;
    /** 流程实例ID */
    instanceId: string;
    /** 操作(APPROVE/REJECT/TRANSFER) */
    action: string;
    /** 操作人 */
    operatorId: string;
    /** 操作意见 */
    comment?: string;
    /** operateTime */
    operateTime?: string;
  };

  type WfTaskLogExportParams = {
    bo: WfTaskLogBo;
  };

  type WfTaskLogGetInfoParams = {
    /** 主键 */
    id: string;
  };

  type WfTaskLogListParams = {
    bo: WfTaskLogBo;
    pageQuery: PageQuery;
  };

  type WfTaskLogRemoveParams = {
    /** 主键串 */
    ids: string[];
  };

  type WfTaskLogVo = {
    id: string;
    /** 任务ID */
    taskId?: string;
    /** 流程实例ID */
    instanceId?: string;
    /** 操作(APPROVE/REJECT/TRANSFER) */
    action?: string;
    /** 操作人 */
    operatorId?: string;
    /** 操作意见 */
    comment?: string;
    /** operateTime */
    operateTime?: string;
  };

  type WfTaskRemoveParams = {
    /** 主键串 */
    ids: string[];
  };

  type WfTaskVo = {
    id: string;
    /** 租户ID */
    tenantId?: string;
    /** 流程实例ID */
    instanceId?: string;
    /** 节点实例ID */
    nodeInstanceId?: string;
    /** 审批人ID */
    assigneeId?: string;
    /** 状态(TODO/DONE/TRANSFERRED) */
    status?: string;
    /** 操作(APPROVE/REJECT/TRANSFER) */
    action?: string;
    /** 审批意见 */
    comment?: string;
    /** createTime */
    createTime?: string;
    /** 完成时间 */
    finishTime?: string;
  };
}
