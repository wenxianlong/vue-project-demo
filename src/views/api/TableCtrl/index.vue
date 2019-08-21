<script>
export default {
    data() {
    return {
      pickerOptions: {
        shortcuts: [{
          text: '最近一周',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近一个月',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近三个月',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
            picker.$emit('pick', [start, end])
          }
        }]
      },
      createTime: {},
      apiName:''
    }
  },
  props: ['routeName'],
  methods: {
    // 添加
    gotoForm() {
      this.$router.push({
        name: this.routeName
      })
    },
    // 批量删除
    // mutiDel() {
    //   console.log(this.delArr)
    // },
    // 搜索
    searchData() {
       let createTime = this.createTime;
       let apiName = this.apiName;
       let search = {apiName:apiName,createTime:createTime};
       this.$emit('func',search);//向父组件传值
    }
  }
}
</script>

<template>
  <div class="btn-ctrl">
    <el-input size="medium" placeholder="请输入名称" v-model="apiName" clearable class="input-search" />
    <el-date-picker 
      size="medium"
      v-model="createTime"
      type="datetimerange"
      :picker-options="pickerOptions"
      range-separator="至"
      start-placeholder="开始日期(创建时间)"
      end-placeholder="结束日期(创建时间)"
      align="right"
    />
    <el-button size="medium" class="btn-search" @click="searchData" icon="el-icon-search">搜索</el-button>
    <el-button size="medium" type="primary"  @click="gotoForm" icon="el-icon-circle-plus-outline">新增</el-button>
    <!-- <el-button size="medium" type="danger"  @click="mutiDel" icon="el-icon-delete">删除</el-button> -->
  </div>
</template>

<style lang="scss" scoped>
.btn-ctrl{
    margin-bottom: 16px;
    .input-search{
        max-width:300px;
        margin-right: 6px;
    }
    .btn-search{
        margin:0 6px 0 6px;
    }
}
</style>
