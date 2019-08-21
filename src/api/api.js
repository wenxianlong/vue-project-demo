// api接口访问

import request from '@/utils/request'
import HU from '@/utils/http-util' // 接口配置

function requestApiList() {
    return request({
      url: HU.GET_API_LIST,
      method: 'post'
    })
}

function requestApiAdd(data) {
  console.log('requestApiAdd-data >> ', data );
    return request({
      url: HU.ADD_API,
      method: 'post',
      data
    })
}

function requestApiUpdate(data) {
    return request({
      url: HU.UPDATE_API,
      method: 'post',
      data
    })
}

function requestApiStatusUpdate(data) {
    return request({
      url: HU.UPDATE_API_STATUS,
      method: 'post',
      data
    })
}


export {
    requestApiList,
    requestApiAdd,
    requestApiUpdate,
    requestApiStatusUpdate
  }
  