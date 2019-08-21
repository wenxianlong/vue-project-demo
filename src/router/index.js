import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* 页面布局组件 */
import Layout from '@/common/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * 公共路由
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/error/404'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/home',
    children: [{
      path: 'home',
      name: 'Home',
      component: () => import('@/views/home/index'),
      meta: { title: '首页', icon: 'dashboard' }
    }]
  },
  {
    path: '/manage',
    component: Layout,
    redirect: '/manage/customer/list',
    meta: { title: '系统管理', icon: 'example' },
    children: [
      // 客户管理路由
      {
        path: 'customer/list',
        name: 'Demo5',
        component: () => import('@/views/customer/DataTable'),
        meta: { title: '客户管理', icon: 'user' }
      },
      {
        path: 'customer/add_update',
        name: 'CustomerForm',
        component: () => import('@/views/customer/DataForm'),
        meta: { title: '添加/修改', icon: 'user' },
        hidden: true
      },
      // 接口管理路由
      {
        path: 'api_info/list',
        name: 'ApiList',
        component: () => import('@/views/api/DataTable'),
        meta: { title: '接口管理', icon: 'tree' }
      },
      {
        path: 'api_info/add_update',
        name: 'ApiForm',
        component: () => import('@/views/api/DataForm'),
        meta: { title: '添加/修改', icon: 'dashboard' },
        hidden: true
      }
    ]
  },
  {
    path: '/analys',
    component: Layout,
    redirect: '/analys/demo7',
    meta: { title: '数据分析', icon: 'example' },
    children: [
      {
        path: 'demo7',
        name: 'Demo7',
        component: () => import('@/views/analys/demo01'),
        meta: { title: '示例01', icon: 'dashboard' }
      },
      {
        path: 'demo8',
        name: 'Demo8',
        component: () => import('@/views/analys/demo02'),
        meta: { title: '示例02', icon: 'dashboard' }
      }

    ],
    hidden: true
  },
  // 404页面路由放到最后
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
