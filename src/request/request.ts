import { TOKEN_COOKIE_KEY } from '@/constants';
import { notification } from '@/utils/notice';
import axios, { AxiosRequestConfig } from 'axios';
import { history } from 'umi';

export interface CustomConfig extends AxiosRequestConfig {
  // 请求错误时不弹出错误提示
  ignoreNotice?: boolean;
  // 身份过期不跳转登录页
  ignoreLogin?: boolean;
}

const request = axios.create({
  baseURL: '/',
});

const ignoreLoginPaths = ['/login', '/nopassword'].map((p) => `/${p}`);

/** 请求拦截 */
request.interceptors.request.use((config) => {
  const token = localStorage.getItem(TOKEN_COOKIE_KEY);
  if (token) {
    // @ts-ignore
    config.headers.set(TOKEN_COOKIE_KEY, token);
  }
  return config;
});

/** 响应拦截 */
request.interceptors.response.use(
  (response) => {
    return Promise.resolve(response);
  },
  (error) => {
    const response = error.response || {};
    const config = response.config as CustomConfig;
    const data = response.data || {};
    console.log('🚀 ~ file: request.ts:38 ~ data:', data);

    // 忽略身份过期重定向
    if (data.code !== 200) {
      // 是否忽略错误提示
      if (!config.ignoreNotice) {
        notification.error({ message: data.msg });
      }
      // 是否忽略身份过期跳转登录页
      if (
        !config.ignoreLogin &&
        data.code === 401 &&
        !ignoreLoginPaths.includes(history.location.pathname)
      ) {
        history.push('/login');
      }
    }
    return Promise.reject(error);
  },
);

class Request {
  get<T>(url: string, config?: CustomConfig) {
    return request.get<T>(url, config);
  }
  post<T>(url: string, data?: Record<string, any>, config?: CustomConfig) {
    return request.post<T>(url, data, config);
  }
  put<T>(url: string, data: Record<string, any>, config?: CustomConfig) {
    return request.put<T>(url, data, config);
  }
  delete<T>(url: string, config?: CustomConfig) {
    return request.delete<T>(url, config);
  }
}

export async function awaitRequest<T, E = any>(
  promiseFn: () => Promise<any>,
): Promise<[E | null, T | null]> {
  try {
    const result = await promiseFn();
    return [null, result];
  } catch (err: any) {
    return [err, null];
  }
}

export default new Request();
