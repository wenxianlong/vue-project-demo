import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app'
import settings from './modules/settings'
import user from './modules/user'
import tagsView from './modules/tagsView'
import permission from './modules/permission'
import api from './modules/api'
import customer from './modules/customer'
import basic from './modules/basic'

// 引入vuex数据状态管理
Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    settings,
    user,
    tagsView,
    basic,
    permission,
    api,
    customer
  }
})

export default store
