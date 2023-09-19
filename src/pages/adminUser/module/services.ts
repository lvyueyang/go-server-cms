import { ADMIN_USER_STATUS_ENUM, AIP_FIX } from '@/constants';
import {
  ApiCreateAdminUserBodyDto,
  ApiResetPasswordAdminUserBodyDto,
  UserAdminIdResponseDto,
  UserAdminInfoResponseDto,
  UserAdminListResponseDto,
  UserAdminUpdateDto,
  UserAdminUpdateRolesDto,
} from '@/interface/serverApi';
import { Pagination, Result, request } from '@/request';

/** 用户列表 */
export const getUserList = (query: Pagination & { keyword?: string }) => {
  return request.get<UserAdminListResponseDto>(`${AIP_FIX}/user`, {
    params: {
      ...query,
    },
  });
};

/** 详情 */
export const getUserDetail = (id: number) => {
  return request.post<UserAdminInfoResponseDto>(`${AIP_FIX}/user/${id}`);
};

/** 创建 */
export const createUser = (body: ApiCreateAdminUserBodyDto) => {
  return request.post<UserAdminIdResponseDto>(`${AIP_FIX}/user`, body);
};

/** 修改 */
export const updateUser = (id: number, body: UserAdminUpdateDto) => {
  return request.put<UserAdminIdResponseDto>(`${AIP_FIX}/user/${id}`, body);
};

/** 修改角色 */
export const updateRole = (id: number, body: UserAdminUpdateRolesDto) => {
  return request.put<Result<void>>(`${AIP_FIX}/admin-user/${id}/role`, body);
};

/** 重置密码 */
export const resetPassword = (id: number, body: ApiResetPasswordAdminUserBodyDto) => {
  return request.put<UserAdminIdResponseDto>(`${AIP_FIX}/user/reset-password/${id}`, body);
};

/** 封禁/解封 */
export const updateStatus = (id: number, status: ADMIN_USER_STATUS_ENUM) => {
  return request.put<UserAdminIdResponseDto>(`${AIP_FIX}/user/status/${id}`, {
    status,
  });
};
