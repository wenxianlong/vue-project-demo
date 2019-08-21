import { login } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'

// 用户数据  将原独立getters.js数据引入modules

export default {
  state: {
    token: getToken(),
    name: '',
    avatar: '',
    userPage: {}
  },
  getters: {
    avatar: state => state.avatar,
    name: state => state.name,
    userPage: state => state.userPage,
    token: state => state.token
  },
  actions: {
  // 用户登录
    login({ commit }, userInfo) {
      const { username, password } = userInfo
      return new Promise((resolve, reject) => {
        login({ username: username.trim(), password: password }).then(res => {
          const token = res
          if (!token) {
            reject('用户名或密码不正确！')
          }
          commit('SET_TOKEN', token)
          setToken(token)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 查询用户信息
    getInfo({ commit }) {
      return new Promise((resolve) => {
        const userInfo = {
          name: 'Admin',
          avatar: ''
        }
        commit('SET_NAME', userInfo.name)
        commit('SET_AVATAR', userInfo.avatar)
        resolve(userInfo)
      })
    },

    // 用户注销
    logout({ commit }) {
      return new Promise((resolve) => {
        commit('SET_TOKEN', '')
        removeToken()
        resetRouter()
        resolve()
      })
    },

    // 删除token
    resetToken({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        removeToken()
        resolve()
      })
    }
  },
  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    }
  }
}

