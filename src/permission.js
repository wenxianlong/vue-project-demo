import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // 加载进度条
import 'nprogress/nprogress.css' // 进度条样式
import { getToken } from '@/utils/auth' // 从cookie获取token
import getPageTitle from '@/utils/get-page-title' // 获取页面标题

NProgress.configure({ showSpinner: false }) // 进度条配置

const whiteList = ['/login'] // 访问白名单

router.beforeEach(async(to, from, next) => {
  // 启动进度条
  NProgress.start()

  // 设置页面标题
  document.title = getPageTitle(to.meta.title)

  // 是否登录
  const hasToken = getToken()
  console.log('token => ', hasToken)
  if (hasToken) {
    if (to.path === '/login') {
      // 已经登录直接跳转首页
      next({ path: '/' })
      NProgress.done()
    } else {
      // 是否有用户信息
      const hasGetUserInfo = store.getters.name
      if (hasGetUserInfo) {
        next()
      } else {
        try {
          // 重新拉去用户信息
          await store.dispatch('getInfo')
          next()
        } catch (error) {
          // 删除token重新登录
          await store.dispatch('resetToken')
          Message.error(error || 'Has Error')
          next(`/login?redirect=${to.path}`)
          NProgress.done()
        }
      }
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      // 如果在白名单直接跳转
      next()
    } else {
      // 去登陆
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  // 完成
  NProgress.done()
})
