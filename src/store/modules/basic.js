import {requestPaperLevels} from '@/api/basic';
export default{
    state:{
       paperLevels:[]
    },
    getters:{
       paperLevels:state=>state.paperLevels
    },
    actions:{
      getPaperLevels({commit}){
        return new Promise((resolve, reject) =>{
            requestPaperLevels()
            .then(res=>{
               console.log(res);
              console.log('paper-list >> ',res);
              const list = res;
              commit('SET_PAPER_LEVELS',list);
              resolve();
            })
            .catch(error=>{
              reject(error);
            });
           })
       }
    },
    mutations:{
       SET_PAPER_LEVELS:(state,data)=>{
           state.paperLevels = data;
       }
    }
}