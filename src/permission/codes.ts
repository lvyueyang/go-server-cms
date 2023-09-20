export const PERMISSION_CODE = {
  /** 创建管理角色 */
  ADMIN_ROLE_CREATE: 'admin:role:create',
  /** 删除管理角色 */
  ADMIN_ROLE_DELETE: 'admin:role:delete',
  /** 查询管理角色列表 */
  ADMIN_ROLE_FIND_LIST: 'admin:role:find:list',
  /** 查询管理角色权限码列表 */
  ADMIN_ROLE_LIST_CODE: 'admin:role:list:code',
  /** 修改管理角色权限码列表 */
  ADMIN_ROLE_UPDATE_CODE: 'admin:role:update:code',
  /** 修改管理角色信息 */
  ADMIN_ROLE_UPDATE_INFO: 'admin:role:update:info',
  /** 创建管理员 */
  ADMIN_USER_CREATE: 'admin:user:create',
  /** 删除管理员 */
  ADMIN_USER_DELETE: 'admin:user:delete',
  /** 查询管理员列表 */
  ADMIN_USER_FIND_LIST: 'admin:user:find:list',
  /** 修改管理员基本信息 */
  ADMIN_USER_UPDATE_INFO: 'admin:user:update:info',
  /** 修改管理员密码 */
  ADMIN_USER_UPDATE_PASSWORD: 'admin:user:update:password',
  /** 修改管理员角色 */
  ADMIN_USER_UPDATE_ROLE: 'admin:user:update:role',
  /** 修改管理员状态 */
  ADMIN_USER_UPDATE_STATUS: 'admin:user:update:status',
} as const;

export const PERMISSION_MAP = {
  [PERMISSION_CODE.ADMIN_ROLE_CREATE]: '创建管理角色',
  [PERMISSION_CODE.ADMIN_ROLE_DELETE]: '删除管理角色',
  [PERMISSION_CODE.ADMIN_ROLE_FIND_LIST]: '查询管理角色列表',
  [PERMISSION_CODE.ADMIN_ROLE_LIST_CODE]: '查询管理角色权限码列表',
  [PERMISSION_CODE.ADMIN_ROLE_UPDATE_CODE]: '修改管理角色权限码列表',
  [PERMISSION_CODE.ADMIN_ROLE_UPDATE_INFO]: '修改管理角色信息',
  [PERMISSION_CODE.ADMIN_USER_CREATE]: '创建管理员',
  [PERMISSION_CODE.ADMIN_USER_DELETE]: '删除管理员',
  [PERMISSION_CODE.ADMIN_USER_FIND_LIST]: '查询管理员列表',
  [PERMISSION_CODE.ADMIN_USER_UPDATE_INFO]: '修改管理员基本信息',
  [PERMISSION_CODE.ADMIN_USER_UPDATE_PASSWORD]: '修改管理员密码',
  [PERMISSION_CODE.ADMIN_USER_UPDATE_ROLE]: '修改管理员角色',
  [PERMISSION_CODE.ADMIN_USER_UPDATE_STATUS]: '修改管理员状态',
} as const;
