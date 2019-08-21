// 基础数据接口访问

import request from '@/utils/request'
import HU from '@/utils/http-util' // 接口配置

function requestPaperLevels() {
    return request({
      url: HU.GET_PAPER_LEVEL_LIST,
      method: 'get'
    })
}

export {
    requestPaperLevels
}