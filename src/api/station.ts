// @ts-ignore
import request from '@/utils/request';

class StationApi {
  public baseUrl: string | undefined = 'https://api.open.crossevery.com';

  private get(url: string, params = {}) {
    return request({
      baseURL: this.baseUrl,
      url: url,
      method: 'get',
      params: params,
    });
  }

  private post(url: string, data = {}, params = {}) {
    return request({
      baseURL: this.baseUrl,
      url: url,
      method: 'post',
      data: data,
      params: params,
    });
  }
  /**
   * 获取空间基本信息
   * @param data {uuid:'',ticket:'',stationid:''}
   */
  public getStationDetail(data: Object) {
    return this.get('/station/manage/room/detail', data);
  }

  /**
   * 获取空间站编辑器配置信息
   * @param data {uuid:'',ticket:'',stationid:'',uid:1}
   */
  public getStationConfig(data: Object) {
    return this.get('/station/manage/config', data);
  }

  /**
   * 获取空间站的广告位信息
   * @param data {uuid:'',ticket:'',stationid:''}
   */
  public getBillboardList(data: Object) {
    return this.get('/station/editor/slot/list', data);
  }

  /**
   * 开启空间站容器
   * @param data
   * data.uuid
   * data.ticket,
   * data.token,
   * data.stationId,
   * data.clientSession: TCGSDK.getClientSession(),
   * data.screenWidth: 1920,
   * data.screenHeight: 1080,
   * data.ameParams: `-IP=${params.ip} -port=${params.port} -hasClient=true -ResX=${1920} -ResY=${1080}`,
   * data.gameContext: '',
   * @param params
   */
  public startEditStation(data: Object, params: Object) {
    return this.post('/station/container/start', data, params);
  }

  /**
   * 停止编辑空间站
   * @param data
   */
  public endEditStation(data: Object) {
    return this.get('/station/container/stop', data);
  }

  /**
   * 保存一个广告位信息
   * @param data {token:'',ticket:'',uuid:'',slotCode:'',stationId:0,elementStationId:0,path:''}
   * @param params {ticket:'',uuid:''}
   */
  public saveBillboard(data: Object, params: Object) {
    return this.post('/station/editor/slot/save', data, params);
  }
}

export default new StationApi();
