import Vue from 'vue'

import 'normalize.css/normalize.css' // css resets方案

import '@/plugins/element' // 引入element-ui
import '@/plugins/echarts' // 引入echarts

import '@/common/styles/index.scss' // 全局样式
import '@/common/icons' // 图标
import '@/permission' // 权限控制

import App from './App' // 视图文件
import store from './store' // vuex数据管理
import router from './router' // 路由管理

/**
 * 仅使用mock产生数据，而不启动mock-server
 * 上线时 关闭
 */
// import { mockXHR } from '../mock'
console.log(process.env.NODE_ENV)
if (process.env.NODE_ENV === 'production') {
  // mockXHR()
}

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
