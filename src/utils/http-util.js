// 接口配置工具

const DOMAIN = 'http://localhost:9528'

export default {
  // ==============用户相关=================//
  USER_LOGIN: `login`,
  // GET_USER_INFO: `${CTX}/user/info`,
  // USER_LOGOUT: `${CTX}/user/logout`,
  // ADD_USER: `${CTX}/user/add`,
  // GET_USER_LIST: `${CTX}/user/list`,

  // ===============客户管理===============//
  GET_CUSTOMER_LIST: `customer/list`,
  ADD_CUSTOMER: `customer/add`,
  UPDATE_CUSTOMER: `customer/update`,
  UPDATE_CUSTOMER_STATUS: `customer/update_status`,

  // ===============客户权限===============//
  GET_CUSTOMER_PERMISSION_LIST: `customer_permission_info/list`,
  ADD_CUSTOMER_PERMISSION: `customer_permission_info/add`,
  UPDATE_CUSTOMER_PERMISSION: `customer_permission_info/update`,

  // ===============接口管理===============//
  GET_API_LIST: `api_info/list`,
  ADD_API: `api_info/add`,
  UPDATE_API: `api_info/update`,
  UPDATE_API_STATUS: `api_info/update_status`,

  // ===============基础数据===============//
  GET_PAPER_LEVEL_LIST: `paper_levels`

}
