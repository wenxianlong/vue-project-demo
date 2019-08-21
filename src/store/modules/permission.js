import { constantRoutes } from '@/router'

// 路由访问数据 目前只有admin不做限制
export default {
  state: {
    routes: [],
    addRoutes: []
  },
  getters: {
    permission_routes: state => state.routes
  },
  actions: {

  },
  mutations: {
    SET_ROUTES: (state, routes) => {
      state.addRoutes = routes
      state.routes = constantRoutes.concat(routes)
    }
  }
}

