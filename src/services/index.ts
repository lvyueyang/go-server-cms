import { TOKEN_COOKIE_KEY } from '@/constants';
import { ModelAdminUser } from '@/interface/serverApi';
import { AIP_FIX, Result, request } from '@/request';

/** 获取当前登录用户信息 */
export const getUserInfo = () => {
  return request.get<Result<ModelAdminUser>>(`${AIP_FIX}/user/current`, { ignoreNotice: true });
};

/** 退出登录 */
export const outLogin = () => {
  return request.post<Result<null>>(`${AIP_FIX}/outlogin`).then(() => {
    localStorage.removeItem(TOKEN_COOKIE_KEY);
  });
};

/** 文件上传 */
export const uploadFile = (
  file: File,
  options?: { onUploadProgress?: (p: ProgressEvent) => void },
) => {
  const formData = new FormData();
  formData.append('file', file);
  return request.post<Result<string>>(`${AIP_FIX}/upload`, formData, {
    onUploadProgress: options?.onUploadProgress,
  });
};

/** 发送手机号验证码 */
export const sendSmsCode = (phone: string) => {
  return request.post<Result<void>>(`${AIP_FIX}/user/send-code`, { phone });
};

/** 发送邮箱验证码 */
export const sendEmailCode = (email: string) => {
  return request.post<Result<void>>(`${AIP_FIX}/send-validate-code/forget-password`, { email });
};
