// 客户接口访问

import request from '@/utils/request'
import HU from '@/utils/http-util' // 接口配置

function requestCustomerList(data) {
    return request({
      url: HU.GET_CUSTOMER_LIST,
      method: 'post',
      data
    })
}

function requestCustomerAdd(data) {
    console.log('requestApiAdd-data >> ', data );
    return request({
      url: HU.ADD_CUSTOMER,
      method: 'post',
      data
    })
}

function requestCustomerUpdate(data) {
    return request({
      url: HU.UPDATE_CUSTOMER,
      method: 'post',
      data
    })
}

function requestCustomerStatusUpdate(data) {
    return request({
      url: HU.UPDATE_CUSTOMER_STATUS,
      method: 'post',
      data
    })
}

//客户权限相关
function requestCustomerPermission(data){
  return request({
    url: HU.GET_CUSTOMER_PERMISSION_LIST,
    method: 'post',
    data
  })
}

function requestCustomerPermissionAdd(data){
  return request({
    url: HU.ADD_CUSTOMER_PERMISSION,
    method: 'post',
    data
  })
}

function requestCustomerPermissionUpdate(data){
  return request({
    url: HU.UPDATE_CUSTOMER_PERMISSION,
    method: 'post',
    data
  })
}

export {
    requestCustomerList,
    requestCustomerAdd,
    requestCustomerUpdate,
    requestCustomerStatusUpdate,
    requestCustomerPermission,
    requestCustomerPermissionAdd,
    requestCustomerPermissionUpdate
  }
  