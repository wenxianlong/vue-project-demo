import {
  requestCustomerList,
  requestCustomerAdd,
  requestCustomerUpdate,
  requestCustomerStatusUpdate,
  requestCustomerPermission,
  requestCustomerPermissionAdd,
  requestCustomerPermissionUpdate } from '@/api/customer';

//客户相关数据
export default{
    state: {
        customerPage: [],
        customerPermission:{}
      },
      getters: {
        customerPage: state => state.customerPage,
        customerPermission:state => state.customerPermission
      },
      actions: {
         getCustomerList({commit},data){
          return new Promise((resolve, reject) =>{
            requestCustomerList(data)
            .then(res=>{
              console.log('customer-page >> ',res);
              const list = res;
              commit('SET_CUSTOMER_PAGE',list);
              resolve();
            })
            .catch(error=>{
              reject(error);
            });
           })
         },
         addCustomer({commit},data){
           return new Promise((resolve,reject)=>{
             requestCustomerAdd(data)
             .then(res=>{
                 if(res){
                   resolve(true);
                 }
             })
             .catch(error=>{
               reject(error);
             })
           })
         },
         updateCustomer({commit},data){
          return new Promise((resolve,reject)=>{
            requestCustomerUpdate(data)
            .then(res=>{
                if(res){
                  resolve(true);
                }
            })
            .catch(error=>{
              reject(error);
            })
          })
         },
         updateCustomerStatus({commit},params){
          return new Promise((resolve,reject)=>{
            requestCustomerStatusUpdate(params.data)
            .then(res=>{
                if(res){
                  commit('SET_CUSTOMER_INFO',{index:params.index,info:res});
                  resolve(true);
                }
            })
            .catch(error=>{
              reject(error);
            })
          })
         },
         getCustomerPermission({commit},data){
          return new Promise((resolve, reject) =>{
            requestCustomerPermission(data)
            .then(res=>{
              console.log('customer-permission >> ',res);
              const permission = res;
              commit('SET_CUSTOMER_PERMISSION',permission);
              resolve();
            })
            .catch(error=>{
              reject(error);
            });
           })
         },
         addCustomerPermission({commit},data){
          return new Promise((resolve, reject) =>{
            requestCustomerPermissionAdd(data)
            .then(res=>{
              if(res){
                const permission = res;
                commit('SET_CUSTOMER_PERMISSION',permission);
                resolve(true);
              }
            })
            .catch(error=>{
              reject(error);
            });
           })
         },
         updateCustomerPermission({commit},data){
          return new Promise((resolve, reject) =>{
            requestCustomerPermissionUpdate(data)
            .then(res=>{
              if(res){
                const permission = res;
                commit('SET_CUSTOMER_PERMISSION',permission);
                resolve(true);
              }
            })
            .catch(error=>{
              reject(error);
            });
           })
         }

      },
      mutations: {
          SET_CUSTOMER_PAGE: (state, data) => {
              state.customerPage = data;
          },
          SET_CUSTOMER_INFO:(state,data) => {
              state.customerPage.list[data.index] = data.info;
          },
          SET_CUSTOMER_PERMISSION:(state,data) => {
              state.customerPermission = data;
          }
      }
}