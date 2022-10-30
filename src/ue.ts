class UeDataComm {
  public static data_channel: any;
  public static camera_data_channel: any;
  public static edit_mode: boolean;

  public static convertBoxData(msg: string) {
    const obj = JSON.parse(msg);
    return {
      id: obj['CI-BOX-ID'],
      timestamp: obj['CI-BOX-TIMESTAMP'],
      sign: obj['CI-BOX-MD5'],
    };
  }

  public static handleMsg(msg: string, callback: Function) {
    if (msg.includes('CI-BILLBOARD-COUNT')) {
      // 返回广告牌名字列表
      const billboard = JSON.parse(msg);
      if (callback) {
        callback(billboard['CI-BILLBOARD-PROPERTY']);
      }
    }
    if (msg.includes('CI-EDITMODE-SET')) {
      UeDataComm.edit_mode = true;
    }
  }

  public static enterEditMode() {
    return JSON.stringify({ 'CI-EDITMODE': 1 });
  }

  public static setCamera(id: string) {
    return JSON.stringify({ 'CI-EDITMODE-CAM-ID': id });
  }

  public static setBillboard(type: number, id: string, url: string) {
    const params = {
      'CI-BILLBOARD-TYPE': type || 0, // type:0：图片，1 视频
      'CI-BILLBOARD-NAME': id, // Name是ID
      'CI-BILLBOARD-URL': url,
      'CI-BILLBOARD-INSTSET': 1,
    };

    return JSON.parse(JSON.stringify(params));
  }
}

export default UeDataComm;
