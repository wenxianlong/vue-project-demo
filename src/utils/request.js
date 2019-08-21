import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'

// 使用axios发送http请求

// 创建axios实例
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, //跨域请求携带cookie
  timeout: 5000 //请求超时
})
console.log('process.env => ',process.env);
//请求拦截
service.interceptors.request.use(
  config => {
    //请求发送前相关处理
    if (store.getters.token) {
      //将token写入请求头
      config.headers['Authorization'] = getToken();
    }
    config.headers['content-type'] = 'application/json';
    return config;
  },
  error => {
    //处理错误
    console.log('request-error => ',error);
    return Promise.reject(error);
  }
)

// 响应拦截
service.interceptors.response.use(
  /**
   * 通过code判断请求状态
   */
  response => {
    const res = response;
    console.log(res);
    // 请求状态码不是200 提示错误
    if (res.status !== 200) {
      Message({
        message: res.data || 'Error',
        type: 'error',
        duration: 5 * 1000
      });
      //token过期重新登录
      if (res.status === 401 ) {
        //重新登录
        MessageBox.confirm('您的登录已经过期，是否重新登录？', '提示', {
          confirmButtonText: '重新登录',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          store.dispatch('resetToken').then(() => {
            location.reload()
          })
        })
      }
      return Promise.reject(new Error(res.data || 'Error'));
    } else {
      return res.data;
    }
  },
  error => {
    let lostToken = error.message ==='Request failed with status code 401';
    if(lostToken){
        MessageBox.confirm('您的登录已经过期，是否重新登录？', '提示', {
          confirmButtonText: '重新登录',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          store.dispatch('resetToken').then(() => {
            location.reload()
          })
        })
    }else{
      Message({
        message: error.message,
        type: 'error',
        duration: 5 * 1000
      })
      return Promise.reject(error);
    }
  }
)

export default service
