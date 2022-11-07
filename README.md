# Station Web Editor SDK

## 构建

```bash
# clone the project
git clone https://github.com/CrossEevery/station-web-editor-sdk.git

# enter the project directory
cd station-web-editor-sdk

# install dependency
npm install

# develop
npm run dev

# build for production environment
npm run build
```

## 使用方法

1. 引入方式 

   import 方式引入

   ```javascript
   import StationWebEditorSDK from 'station-web-editor-sdk';
   ```

   或 script 标签引入

   ```javascript
   <script type="text/javascript" src="./station-web-editor-sdk.js"></script>
   ```

2. 详细用法

   - 启动界面

     ```javascript
     StationWebEditorSDK.init({
       uuid: '',
       ticket: '',
       stationId: 0, // 空间站id
       mount: 'station-editor', // 加载节点
       api: '', // api地址
     });
     StationWebEditorSDK.load();
     ```

   - 结束界面

     ```javascript
     StationWebEditorSDK.stop();
     ```

   - 获取广告牌列表(最佳方式是在load成功后10s左右再去获取广告牌，否则有可能会拿到空数据)

     ```javascript
       StationWebEditorSDK.getBillboards()
     ```

   - 在游戏中设置广告牌
     这个方法可以在游戏中设置广告牌上显示图片并且切换到广告牌正面视角
     
     ```javascript
       StationWebEditorSDK.switchBillboard("2","图片地址")
     ```

   - api 使用，例如：

     ```javascript
     StationWebEditorSDK.stationApi.saveBillboard(...params); // 保存广告牌信息
     StationWebEditorSDK.stationApi.getBillboard(...params); // 获取已设置的广告牌列表信息
     ```

     接口详情可查看 /src/api/station.ts 文件
