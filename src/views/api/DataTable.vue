
<script>
import { mapGetters, mapActions } from 'vuex'
import TableCtrl from './TableCtrl'

export default {
  data() {
    return {
      listLoading: false,//控制表格loding图标显示
      routeName: 'ApiForm',
      multipleSelection: [],
      statusName:{0:'禁用',1:'正常'},
      statusBtnName:{0:'启用',1:'禁用'},
      statusColor:{0:'success',1:'danger'},
      statusIcon:{0:'el-icon-check',1:'el-icon-close'},
      tagsType:{0:'danger',1:'success'},
      searchData:{
        apiName:'',
        createTime:{}
      },
      apiInfoList:[]
    }
  },
  components: {
    'table-ctrl': TableCtrl
  },
  created() {
    this.listLoading = true;
    this.getApiList().then(()=>{
      this.apiInfoList = this.apiList.slice(0);//浅复制一份，防止原始数据被修改
      this.listLoading = false;
    });
  },
  computed: {
    ...mapGetters(['apiList'])
  },
  methods: {
    ...mapActions(['getApiList','updateApiInfo','updateApiStatus']),
    handleSelectionChange(val) {
      this.multipleSelection = val;
      const ids = val.map(item => item.id);//获取选中的数据
    },
    handleEdit(index, row) {
      this.$router.push({
        name: this.routeName, //路由名称
        query:{index:index} //参数
      }); //路由跳转 
    },
    handleStatusUpdate(index, row) {
       this.$confirm(`您将${this.statusBtnName[row.apiStatus]}此接口, 是否继续?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          row.apiStatus = row.apiStatus==0?1:0;
          let params = {
             index:index,
             data:row
          };
          this.updateApiStatus(params).then(res=>{
            if(res){
               this.$message.success('操作成功!');
            }
          });
        }).catch(() => {        
        });
    },
    getSearchData(data){
      this.searchData = data;
      this.apiInfoList = this.apiList.filter(item => this.filterData(item));
    },
    filterData(item){
       let flag = false;
       let searchData = this.searchData;
       //检查名称字段是否匹配
       if(!searchData.apiName||item.apiName.toLowerCase().includes(searchData.apiName.toLowerCase())){
         flag = true;
       }else{
         flag = false;
         return flag;
       }
       //检查创建时间是否匹配
       if(searchData.createTime&&searchData.createTime[0]){
           let startTime  = searchData.createTime[0].getTime();
           let endTime  = searchData.createTime[1].getTime();
           let createTime = item.createdTime;
           createTime = createTime.substring(0,19);    
           createTime = createTime.replace(/-/g,'/'); 
           createTime = new Date(createTime).getTime();
           if(createTime>=startTime&&createTime<=endTime){
              flag = true;
           }else{
              flag = false;
              return flag;
           }
       }else{
          flag = true;
       }

       return flag;
    }
  }
}
</script>

<template>
  <div class="app-container">
    <table-ctrl :route-name="routeName" @func="getSearchData"/>
    <el-table
      ref="multipleTable"
      v-loading="listLoading"
      :data="apiInfoList"
      element-loading-text="Loading"
      height="680px"
      border
      fit
      highlight-current-row
      @selection-change="handleSelectionChange">

      <el-table-column
        type="selection"
        align="center"
        width="55">
      </el-table-column>

      <el-table-column align="center" label="序号" width="95">
        <template slot-scope="scope">
          {{ scope.$index+1 }}
        </template>
      </el-table-column>

      <el-table-column label="名称" align="center" width="250">
        <template slot-scope="scope">
          {{ scope.row.apiName }}
        </template>
      </el-table-column>

      <el-table-column label="注释" width="450" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.apiNote }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" prop="created_at" label="创建时间" width="200" sortable>
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span>{{ scope.row.createdTime }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" prop="created_at" label="修改时间" width="200" sortable>
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span>{{ scope.row.modifiedTime }}</span>
        </template>
      </el-table-column>

      <el-table-column label="状态" width="150" align="center">
        <template slot-scope="scope">
           <el-tag :type="tagsType[scope.row.apiStatus]">{{statusName[scope.row.apiStatus]}}</el-tag>
        </template>
      </el-table-column>

      <el-table-column align="center" prop="created_at" label="操作">
        <template slot-scope="scope">
          <div class="control">
            <!-- <span class="btn-edit" @click="handleEdit(scope.$index, scope.row)">编辑</span>
            <span class="btn-del" @click="handleStatusUpdate(scope.$index, scope.row)">{{statusBtnName[scope.row.apiStatus]}}</span> -->
            <el-button type="primary" icon="el-icon-edit" @click="handleEdit(scope.$index, scope.row)" size="mini" circle></el-button>
            <el-button :type="statusColor[scope.row.apiStatus]" :icon="statusIcon[scope.row.apiStatus]" @click="handleStatusUpdate(scope.$index, scope.row)" size="mini" circle></el-button>
          </div>
        </template>
      </el-table-column>

    </el-table>
  </div>
</template>

<style lang="scss" scoped>
@import '@/common/styles/color.scss';
.control{
    display: flex;
    justify-content:center;
    span{
      font-size: 12px;
      cursor: pointer;
      margin: 0 6px;
    }
    .btn-edit{
        color: $primary-color;
    }
    .btn-del{
        color: $danger-color;
    }
}

</style>

