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
        return this.get('/station/manage/room/detail', data)
    }

    /**
     * 获取空间站的广告位信息
     * @param data {uuid:'',ticket:'',stationid:''}
     */
    public getBillboardList(data: Object) {
        return this.get('/station/editor/slot/list', data)
    }

    /**
     * 开启空间站容器
     * @param data
     * @param params
     */
    public startEditStation(data: Object, params: Object) {
        return this.post('/station/container/start', data, params)
    }

    /**
     * 停止编辑空间站
     * @param data
     */
    public endEditStation(data: Object) {
        return this.get('/station/container/stop', data)
    }

    /**
     * 删除素材文件夹
     * @param data {uuid:'',ticket:'',folderid:''}
     */
    public deleteMaterial(data: Object) {
        return this.get('/station/editor/element/delete', data)
    }

    /**
     * 保存一个广告位信息
     * @param data {token:'',ticket:'',uuid:'',slotCode:'',stationId:0,elementStationId:0,path:''}
     * @param params {ticket:'',uuid:''}
     */
    public saveBillboard(data: Object, params: Object) {
        return this.post('/station/editor/slot/save', data, params)
    }
}

export default new StationApi();
