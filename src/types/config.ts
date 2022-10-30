import { InitConfig } from '@/utils/tcg-sdk';

export interface InitOptions extends InitConfig {
  appid: number;
  stationId: number;
  uuid: string;
  ticket: string;
  /**
   * api 地址
   */
  api?: string;
}

/**
 * 游戏相关参数
 */
export interface GameOptions {
  /**
   * 用户登录后的 ticket
   */
  ticket?: string;
  /**
   * 用户的UUID
   */
  uuid?: string;
  /**
   * 空间站ID
   */
  stationId?: number;
  /**
   * 客户端 Session
   */
  clientSession?: string;
  /**
   * 宽度，建议 1920
   */
  screenWidth?: number;
  /**
   * 高度，建议 1080
   */
  screenHeight?: number;
  /**
   * 游戏相关参数
   */
  gameParams?: string;
  /**
   * 游戏上下文信息
   */
  gameContext?: string;

  /**
   * 角色性别 101-女 102-男
   */
  type?: string;

  hair?: number;
  blouse?: number;
  pants?: number;
  shoe?: number;
  ip?: string;
  port?: number;
}

/**
 * 子场景参数
 */
export interface SceneOptions {
  /**
   * 空间站id
   */
  stationid: number;
  /**
   * uuid
   */
  uuid: string;
  /**
   * ticket
   */
  ticket: string;
  /**
   * 传送门id
   */
  deliveryid: number;
}
