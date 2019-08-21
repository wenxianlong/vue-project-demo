// 用户接口访问

import request from '@/utils/request'
import HU from '@/utils/http-util' // 接口配置

function login(data) {
  // console.log('login-data >> ', data )
  return request({
    url: HU.USER_LOGIN,
    method: 'post',
    data
  })
}

function getInfo(token) {
  // return request({
  //   url: HU.GET_USER_INFO,
  //   method: 'get',
  //   params: { token }
  // })
  return {
    code: 200,
    data: {
      roles: ['admin'],
      introduction: 'I am a super administrator',
      avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
      name: 'Super Admin'
    }
  }
}

function logout() {
  // return request({
  //   url: HU.USER_LOGOUT,
  //   method: 'post'
  // })
  return new Promise.resolve ({
    code: 200,
    data: 'success'
  })
}

function addUser(params) {
  return request({
    url: HU.ADD_USER,
    method: 'post',
    params: params
  })
}

function requestUserPage(params) {
  return request({
    url: HU.GET_USER_LIST, // 接口地址
    method: 'post',
    params: params
  })
}

export {
  login,
  getInfo,
  logout,
  addUser,
  requestUserPage
}
