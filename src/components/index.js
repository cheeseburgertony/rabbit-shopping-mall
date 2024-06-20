// 通过插件的发送，把components中的所有组件进行全局化注册
import XtxImageView from './ImageView/index.vue'
import XtxSku from './XtxSku/index.vue'
export const componentPlugin = {
  install(app){
    // 组件注册的方法 app.component('组件名字', 组件配置对象)
    app.component('XtxImageView', XtxImageView)
    app.component('XtxSku', XtxSku)
  }
}