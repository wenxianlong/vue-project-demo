<script>
import { mapGetters, mapActions } from 'vuex'
import { setTimeout } from 'timers'
export default {
  data() {
    return {
      form: {
        apiName: '',
        apiNote: '',
        id:0,
      },
      isEdit:false
    }
  },
  mounted(){
     let query = this.$route.query;
     if(typeof(query.index) != 'undefined'){
        let apiInfo = this.apiList[query.index];
        this.form.id = apiInfo.id;
        this.form.apiName = apiInfo.apiName;
        this.form.apiNote = apiInfo.apiNote;
        this.isEdit = true;
     }
  },
  computed:{
    ...mapGetters(['apiList'])
  },
  methods: {
    ...mapActions(['addApiInfo','updateApiInfo']),
    onSubmit() {
       //修改
       if(this.isEdit){
         this.edit();
         return;
       }
       //新增
       this.add();
    },
    onCancel() {
      //返回上一级路由
      this.$router.go(-1)
    },
    add(){
      const _this = this;
      let data = {
        id:0,
        apiName:this.form.apiName,
        apiNote:this.form.apiNote
      }
      this.addApiInfo(data).then(res => {
        if (res) {
          _this.$message.success('操作成功!')
          setTimeout(() => {
            _this.$router.go(-1)
          }, 1000)
        }
      })
    },
    edit(){
      const _this = this;
      let data = {
        id:this.form.id,
        apiName:this.form.apiName,
        apiNote:this.form.apiNote
      }
      this.updateApiInfo(data).then(res => {
        if (res) {
          _this.$message.success('操作成功!')
          setTimeout(() => {
            _this.$router.go(-1)
          }, 1000)
        }
      })
    }
  }
}
</script>

<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="120px">

      <el-form-item label="api名称">
        <el-input v-model="form.apiName" placeholder="请输入名称" />
      </el-form-item>

      <el-form-item label="api说明">
        <el-input v-model="form.apiNote" placeholder="请输入说明" />
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onSubmit">{{isEdit?"修改":"添加"}}</el-button>
        <el-button @click="onCancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<style scoped>
.line{
  text-align: center;
}
</style>

