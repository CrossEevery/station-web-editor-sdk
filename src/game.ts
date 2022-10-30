import TCGSDK, { InitConfig } from '@/utils/tcg-sdk';
import { joystick } from '@/utils/tcg-sdk/plugin';
import { GameOptions } from '@/types/config';
import device from 'current-device';
import Bottom from '@/buttons/bottom';
import StationApi from '@/api/station';
import UeDataComm from '@/ue';

class Game {
  private ue_data_comm?: UeDataComm;
  private isConnect: boolean = false;
  private dataState: number = 0;
  private cameraState: number = 0; // 摄像头状态
  private cameraInterval?: any;
  private gameInterval?: any;
  private currentBillboardId?: string;

  start(options: InitConfig, params: GameOptions, failCallback: any) {
    this.ue_data_comm = new UeDataComm();

    TCGSDK.init({
      ...options,
      onLog: (res) => {
        // console.log(res)
      },
      // 连接成功回调
      onConnectSuccess: async (res) => {
        // 设置流分辨率，设置鼠标不可锁定
        // this.isConnect = true;
        TCGSDK.setStreamProfile({ fps: 60, max_bitrate: 10, min_bitrate: 8 });
        TCGSDK.setMoveSensitivity(2.0);

        await this.TransferCameraData('start');
      },
      onGameStartComplete: async (res) => {
        // 开启传送门数据通道
        await this.TransferData('start');
      },
      // 网络中断/被踢触发此回调
      onDisconnect: (res) => {
        // this.handleAutoDisconnect(res);
      },
      onWebrtcStatusChange: (res) => {
        // console.log('onWebrtcStatusChange', res)
      },
      onInitSuccess: async (res) => {
        // console.log('%c onInitSuccess', 'color: red', res)
        await this.StartGame(params, failCallback, this);
      },
    });
  }

  async StartGame(params: GameOptions, failCallback: any, t: any) {
    // 接口 StartGame 其实就是后台串行调用了云API的 TrylockWorker + CreateSession
    // 尝试锁定机器（TrylockWorker） https://cloud.tencent.com/document/api/1162/40738
    // 创建会话（CreateSession） https://cloud.tencent.com/document/api/1162/40740
    const that = t;
    console.log(params);

    StationApi.startEditStation(
      {
        uuid: params.uuid,
        ticket: params.ticket,
        stationId: params.stationId,
        clientSession: TCGSDK.getClientSession(),
        // screenWidth: width,
        // screenHeight: height,
        screenWidth: 1920,
        screenHeight: 1080,
        gameParams: ` -IP=${params.ip} -port=${params.port} -hasClient=true -ResX=${1920} -ResY=${1080}`,
        gameContext: '',
      },
      {
        uuid: params.uuid,
        ticket: params.ticket,
        token: params.ticket,
        stationId: params.stationId,
      },
    ).then((res: any) => {
      const { code, data } = res;

      if (code === 200 && data) {
        TCGSDK.start(data.serverSession);
        // that.gameUUID = data.gameUUID;
        // that.hostUUID = data.hostUUID;
      } else {
        // Message.error(message)
        TCGSDK.destroy();
        // your logics
        if (failCallback) {
          failCallback();
        }
      }
    });
  }

  async TransferCameraData(msg: string) {
    if (!this.isConnect) {
      console.log('未连接画面，无法开启数据通道');
      return;
    }

    // 接收云端数据的回调
    const onMessage = (msg: string) => {
      console.log('收到云端应用回传数据:', msg);
      this.cameraState = 1;
      if (this.dataState === 1 && this.cameraState === 1) {
        UeDataComm.handleMsg(msg, () => {});
      }
      if (this.cameraInterval) {
        clearInterval(this.cameraInterval);
        this.cameraInterval = null;
      }
    };

    if (UeDataComm.camera_data_channel == null) {
      // 定时重复创建直到成功
      const result: any = await new Promise((resolve, reject) => {
        let count = 0;
        const timer = setInterval(async (_) => {
          // 创建数据通道

          const ret = await TCGSDK.createCustomDataChannel({
            destPort: 18784,
            onMessage, // destPort: xxxx ，xxxx端口范围为10000～20000
          });

          count++;

          if (ret.code === 0) {
            resolve(ret);
            clearInterval(timer);
          }

          if (count > 20) {
            this.isConnect = false;
            clearInterval(timer);
          }
        }, 2000); // 2秒间隔
      });
      /*
       * 判断是否成功
       * result的结构{code: number, msg: string, sendMessage: Function }
       */
      // console.log('sendresult=>', result)
      if (result.code === 0) {
        console.log('18784:', msg);
        // 随便发送一个绑定包，使云端应用的UDP服务能获得代理端口
        result.sendMessage('start');
        this.cameraInterval = setInterval(this.getCameras, 2000);
        UeDataComm.camera_data_channel = result;
      }
    } else {
      console.log('18784:', msg);
      let payload = null;
      payload = msg;
      UeDataComm.camera_data_channel.sendMessage(payload || 'start');
    }
  }

  async TransferData(msg: string) {
    if (!this.isConnect) {
      // console.log('未连接画面，无法开启数据通道')
      return;
    }

    // 接收云端数据的回调
    const onMessage = (msg: string) => {
      console.log('收到云端应用回传数据:', msg);
      this.dataState = 1;
      if (this.dataState === 1 && this.cameraState === 1) {
        UeDataComm.handleMsg(msg, () => {});
      }

      if (this.gameInterval) {
        clearInterval(this.gameInterval);
        this.gameInterval = null;
      }
    };

    if (UeDataComm.data_channel == null) {
      // 定时重复创建直到成功
      const result: any = await new Promise((resolve, reject) => {
        let count = 0;
        const timer = setInterval(async (_) => {
          // 创建数据通道

          const ret = await TCGSDK.createCustomDataChannel({
            destPort: 18786,
            onMessage, // destPort: xxxx ，xxxx端口范围为10000～20000
          });

          count++;

          if (ret.code === 0) {
            resolve(ret);
            clearInterval(timer);
          }

          if (count > 20) {
            this.isConnect = false;
            clearInterval(timer);
          }
        }, 2000); // 2秒间隔
      });
      /*
       * 判断是否成功
       * result的结构{code: number, msg: string, sendMessage: Function }
       */
      // console.log('sendresult=>', result)
      if (result.code === 0) {
        // 随便发送一个绑定包，使云端应用的UDP服务能获得代理端口
        result.sendMessage('start');
        this.gameInterval = setInterval(this.getGates, 2000);
        UeDataComm.data_channel = result;
      }
    } else {
      let payload = null;
      payload = msg;
      console.log('18786:', msg);
      UeDataComm.data_channel.sendMessage(payload || 'start');
    }
  }

  async getGates() {
    await this.TransferData('start');
  }

  async getCameras() {
    await this.TransferCameraData('start');
  }

  public async enterEditMode() {
    await this.TransferData(UeDataComm.enterEditMode());
  }

  public async switchBillboard(id: string, path: string) {
    this.currentBillboardId = id;
    if (!UeDataComm.edit_mode) {
      await this.enterEditMode();

      setTimeout(() => {
        this.TransferData(UeDataComm.setCamera(id));
      }, 50);
    } else {
      await this.TransferData(UeDataComm.setCamera(id));
    }

    if (path) {
      setTimeout(() => {
        this.TransferData(UeDataComm.setBillboard(0, id, path));
      }, 100);
    }
  }
}

export default Game;
