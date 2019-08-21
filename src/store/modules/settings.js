import defaultSettings from '@/settings'

// 页面相关设置
const { showSettings, fixedHeader, sidebarLogo } = defaultSettings
export default {
  state: {
    showSettings: showSettings,
    fixedHeader: fixedHeader,
    sidebarLogo: sidebarLogo
  },
  getters: {
    showSettings: state => state.showSettings,
    fixedHeader: state => state.fixedHeader,
    sidebarLogo: state => state.sidebarLogo
  },
  actions: {
    changeSetting({ commit }, data) {
      commit('CHANGE_SETTING', data)
    }
  },
  mutations: {
    CHANGE_SETTING: (state, { key, value }) => {
      if (state.hasOwnProperty(key)) {
        state[key] = value
      }
    }
  }
}

