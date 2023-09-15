/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface ApiCreateAdminUserBodyDto {
  /** 邮箱 */
  email: string;
  /** 姓名 */
  name: string;
  /** 密码 */
  password: string;
  /** 用户名 */
  username: string;
}

export interface ApiCreateCaptchaReqDto {
  /** 图形验证码的key */
  captcha_key: string;
  /** 输入的图形验证码 */
  captcha_value: string;
  /** 使用场景， 1-注册 */
  scenes: ConstsCaptchaScenes;
  /** 验证码类型， 1-手机 2-邮箱 Enums(1,2) */
  type: ConstsCaptchaType;
  /** 手机/邮箱账号 */
  value: string;
}

export interface ApiResetPasswordAdminUserBodyDto {
  /** 密码 */
  password: string;
}

export interface ApiUpdateAdminUserBodyDto {
  /** 姓名 */
  name: string;
}

export interface ApiAdminInitRootUserBodyDto {
  /** 邮箱 */
  email: string;
  /** 昵称 */
  name: string;
  /** 密码 */
  password: string;
  /** 用户名 */
  username: string;
}

export interface ApiAdminUserForgetPasswordBodyDto {
  /** 邮箱验证码 */
  captcha: string;
  /** 邮箱 */
  email: string;
  /** 密码 */
  password: string;
}

export interface ApiAdminUserLoginBodyDto {
  /** 密码 */
  password?: string;
  /** 用户名 */
  username?: string;
}

export interface ApiAdminUserLoginSuccessResponse {
  token?: string;
}

export interface ApiLoginBodyDto {
  /** 密码 */
  password?: string;
  /** 用户名 */
  username?: string;
}

export interface ApiLoginSuccessResponse {
  token?: string;
}

export interface ApiRegisterBodyDto {
  /** 邮箱验证码 */
  captcha?: string;
  /** 邮箱 */
  email: string;
  /** 密码 */
  password: string;
  /** 用户名 */
  username: string;
}

export interface CliCreateModuleBody {
  /** 模块名称 */
  name?: string;
}

export enum ConstsAdminUserStatus {
  AdminUserStatusNormal = 1,
  AdminUserStatusLocked = -1,
}

export enum ConstsCaptchaScenes {
  CaptchaScenesRegister = 1,
}

export enum ConstsCaptchaType {
  CaptchaTypePhone = 1,
  CaptchaTypeEmail = 2,
}

export interface GormDeletedAt {
  time?: string;
  /** Valid is true if Time is not NULL */
  valid?: boolean;
}

export interface ModelAdminUser {
  avatar?: string;
  createdAt?: string;
  deletedAt?: GormDeletedAt;
  email?: string;
  id?: number;
  /** 是否是超级管理员 */
  is_root?: boolean;
  name?: string;
  password?: string;
  status?: ConstsAdminUserStatus;
  updatedAt?: string;
  user_name?: string;
}

export interface RespResult {
  code?: number;
  data?: any;
  msg?: string;
}
