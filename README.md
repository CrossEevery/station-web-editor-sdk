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

   - api 使用，例如：

     ```javascript
     StationWebEditorSDK.stationApi.getStationDetail(...params);
     ```

     详细接口可查看 /src/api/station.ts 文件
