import { requestApiList,requestApiAdd,requestApiUpdate,requestApiStatusUpdate } from '@/api/api';

//接口相关数据
export default{
    state: {
        apiList: []
      },
      getters: {
        apiList: state => state.apiList
      },
      actions: {
         getApiList({commit}){
           return new Promise((resolve, reject) =>{
              requestApiList()
              .then(res=>{
                console.log('api-list >> ',res);
                const list = res;
                commit('SET_API_LIST',list);
                if(list){
                  resolve(true); 
                }
              })
              .catch(error=>{
                reject(error);
              });
           })

         },
         addApiInfo({commit},data){
          return new Promise((resolve, reject) =>{
              requestApiAdd(data)
              .then(res=>{
                  if(res){
                    resolve(true);
                  }
              })
              .catch(error =>{
                 reject(error);
              }
              );
          })
         },
         updateApiInfo({commit},data){
          return new Promise((resolve, reject) =>{
              requestApiUpdate(data)
              .then(res=>{
                if(res){
                  resolve(true);
                }
               })
              .catch(error =>{
                 reject(error);
              });
          })
         },
         updateApiStatus({commit},params){
          return new Promise((resolve, reject) =>{
              requestApiStatusUpdate(params.data)
              .then(res=>{
                if(res){
                  commit('SET_API_INFO',{index:params.index,info:res});
                  resolve(true);
                }
               })
              .catch();
         })
         }
         
      },
      mutations: {
        SET_API_LIST: (state, data) => {
            state.apiList = data;
        },
        SET_API_INFO:(state, data) => {
          state.apiList[data.index] = data.info;
        }
      }
}