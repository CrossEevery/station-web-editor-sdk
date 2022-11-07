import * as Cookies from 'js-cookie';
import { GameOptions, InitOptions } from '@/types/config';
import StationApi from '@/api/station';
import Game from '@/game';

interface ConfigOptions {
  id: string;
  url: string;
}

interface InitGameOptions {
  role: number;
  ip: string;
  port: string;
}

/**
 * 调用方法如下：
 * ```typescript
 * // We can initialize like this
 * const sdk = new stationH5SDK();
 * ```
 */
class StationWebEditorSDK {
  constructor() {}

  public initOptions?: InitOptions;
  public stationApi?: any;
  public game?: Game;

  /**
   * init
   * 设置用户信息
   * @param options
   */
  init(options: InitOptions) {
    let bodyElement = document.body;
    bodyElement.style.margin = '0';
    bodyElement.style.width = '100%';
    bodyElement.style.height = '100%';
    bodyElement.style.overflow = 'hidden';

    Cookies.set('cross_sdk_token', options.ticket);
    Cookies.set('cross_sdk_uuid', options.uuid);
    Cookies.set('cross_sdk_station_id', String(options.stationId));

    this.initOptions = options;
    this.stationApi = StationApi;
    StationApi.baseUrl = options.api;
  }

  /**
   * 加载游戏
   * @param options
   */
  load(options?: InitGameOptions) {
    return new Promise((resolve, reject) => {
      const ticket = this.initOptions?.ticket;
      const uuid = this.initOptions?.uuid;
      const stationId = this.initOptions?.stationId;

      const params = {
        stationid: stationId,
        uuid,
        ticket,
        token: ticket,
      };
      StationApi.getStationDetail(params).then(async (res: any) => {
        if (res.code === 200 && res.data) {
          const response = await StationApi.getStationConfig(params);
          this.game = new Game();
          this.game.start(
            {
              appid: this.initOptions?.appid,
              mount: this.initOptions?.mount || 'station-editor',
              showLoading: false,
              loadingText: '',
              defaultCursorImgUrl: '',
              mic: false,
              reconnect: true,
              debugSetting: {
                showLog: false,
                showStats: false,
                showSendHbData: false,
                showOnHbMessage: false,
              },
            },
            { ...params, stationId, ip: response.data.ip, port: response.data.port },
            () => {},
          );
        } else {
          reject(res);
        }
      });
    });
  }

  /**
   * 进入编辑模式
   */
  enterEditMode() {
    this.game?.enterEditMode();
  }

  /**
   * 切换编辑的公告牌
   * @param id 广告牌Id，例如 1
   * @param path 图片路径
   */
  switchBillboard(id: string, path: string) {
    this.game?.switchBillboard(id, path);
  }

  /**
   * 结束
   */
  stop() {
    this.game?.stopGame({ uuid: this.initOptions?.uuid, ticket: this.initOptions?.ticket, gameuuid: '', hostuuid: '' });
  }

    /**
     * 获取游戏中的广告牌列表
     */
  public getBillboards() {
    return this.game?.billboardList;
  }
}

export default new StationWebEditorSDK();
