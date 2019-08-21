
<script>
import { mapGetters, mapActions } from 'vuex'
import TableCtrl from './TableCtrl'

export default {
  data() {
    return {
      listLoading: false,
      routeName: 'CustomerForm',
      multipleSelection: [],
      delArr: [],
      customerInfoList: [],
      currentPage: 1,
      pageSize: 10,
      statusName: { 0: '无效', 1: '有效', 2: '锁定' },
      tagsType: { 0: 'info', 1: 'success', 2: 'danger' },
      formalName: { 0: '非正式', 1: '正式' },
      showApiSetModal: false,
      showStatusSetModal: false,
      customerStatusSetting: 0,
      currentItemIndex: 0,
      currentItemRow: {},
      currentPermission: { allowApi: '', maxPageSize: 0, showAnswer: 0, showParse: 0, showSplit: 0 },
      apiIds: [],
      paperIds: []
    }
  },
  components: {
    'table-ctrl': TableCtrl
  },
  created() {
    this.loadData()
  },
  computed: {
    ...mapGetters(['customerPage', 'apiList', 'customerPermission', 'paperLevels']),
    openApis() {
      return this.apiList.filter(item => item.apiStatus);
    }
  },
  methods: {
    ...mapActions(['getCustomerList', 'updateCustomerStatus', 'getApiList', 'getCustomerPermission', 'getPaperLevels', 'addCustomerPermission', 'updateCustomerPermission']),
    // 加载数据
    loadData() {
      this.listLoading = true
      this.getCustomerList({ pageIndex: this.currentPage, pageSize: this.pageSize }).then(() => {
        this.customerInfoList = this.customerPage.list.slice(0) // 浅复制一份，防止原始数据被修改
        this.listLoading = false
      })
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
      const ids = val.map(item => item.id)
      this.delArr = ids
    },
    handleApiSelectionChange(val) {
      this.apiIds = val.map(item => item.id)
    },
    handleLevelSelectionChange(val) {
      this.paperIds = val.map(item => item.id)
    },
    // 跳转到编辑页面
    handleEdit(index, row) {
      this.$router.push({
        name: this.routeName, // 路由名称
        query: { index: index } // 参数
      }) // 路由跳转
    },
    // 改变用户状态
    handleStatusUpdate() {
      this.currentItemRow.customerStatus = this.customerStatusSetting
      const params = {
        index: this.currentItemIndex,
        data: this.currentItemRow
      }
      this.updateCustomerStatus(params).then(res => {
        if (res) {
          this.$message.success('操作成功!')
          this.handleClose()
        }
      })
    },
    // 提交权限设置
    handleApiListSet() {
      const isEditPermission = this.customerPermission
      if (isEditPermission) {
        const p = this.currentPermission
        p.allowApi = this.apiIds.join(',')
        p.paperLevel = this.paperIds.join(',')
        p.showAnswer = p.showAnswer ? 1 : 0
        p.showParse = p.showParse ? 1 : 0
        p.showSplit = p.showSplit ? 1 : 0
        this.updateCustomerPermission(p).then(res => {
          if (res) {
            this.$message.success('操作成功!')
            this.handleClose()
          }
        })
      } else {
        const data = {
          id: this.currentItemRow.id,
          allowApi: this.apiIds.join(','),
          maxPageSize: this.currentPermission.maxPageSize,
          paperLevel: this.paperIds.join(','),
          showAnswer: this.currentPermission.showAnswer ? 1 : 0,
          showParse: this.currentPermission.showParse ? 1 : 0,
          showSplit: this.currentPermission.showSplit ? 1 : 0
        }
        console.log(data)
        this.addCustomerPermission(data).then(res => {
          if (res) {
            this.$message.success('操作成功!')
            this.handleClose()
          }
        })
      }
    },
    handleSizeChange(val) {
      this.pageSize = val
      this.loadData()
    },
    handleCurrentChange(val) {
      this.currentPage = val
      this.loadData()
    },
    getSearchData(data) {

    },
    // 关闭弹窗
    handleClose() {
      if (this.$refs.apiTable) {
        this.$refs.apiTable.clearSelection()
      }
      if (this.$refs.paperTable) {
        this.$refs.paperTable.clearSelection()
      }

      this.showApiSetModal = false
      this.showStatusSetModal = false

      // 重置数据
      this.currentPermission.showAnswer = 0
      this.currentPermission.showParse = 0
      this.currentPermission.showSplit = 0
    },
    // 打开权限设置窗体
    openApiSetModal(index, row) {
      if (!this.apiList || !this.apiList.length) {
        this.getApiList()
      }
      this.currentItemIndex = index
      this.currentItemRow = row
      this.showApiSetModal = true
      this.getPaperLevels().then(data => {
        this.getCustomerPermission(row.id).then(res => {
          if (this.customerPermission){
            this.currentPermission = this.customerPermission
            const allowApis = this.currentPermission.allowApi
            const paperLevels = this.currentPermission.paperLevel

            console.log('权限设置 => ', this.currentPermission)
            // 选中已有接口
            const apiRows = this.$refs.apiTable.data
            const apiIds = allowApis.split(',')
            console.log('apis => ', apiIds)
            apiRows.forEach(row => {
              if (apiIds.indexOf(String(row.id)) > -1) {
                this.$refs.apiTable.toggleRowSelection(row, true)
              }
            })
            // 选中已有试卷级别
            console.log(this.$refs.paperTable.data)
            const paperRows = this.$refs.paperTable.data
            const paperIds = paperLevels.split(',')
            console.log('papers => ', paperIds)
            paperRows.forEach(row => {
              if (paperIds.indexOf(String(row.id)) > -1) {
                console.log('aaaa')
                this.$refs.paperTable.toggleRowSelection(row, true)
              }
            })
            // 显示控制部分设置情况
            this.currentPermission.showAnswer = this.currentPermission.showAnswer ? true : false
            this.currentPermission.showParse = this.currentPermission.showParse ? true : false
            this.currentPermission.showSplit = this.currentPermission.showSplit ? true: false
          }
        })
      })
    },
    openStatusSetModalModal(index, row) {
      this.currentItemIndex = index
      this.currentItemRow = row
      this.customerStatusSetting = row.customerStatus
      this.showStatusSetModal = true
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
      :data="customerInfoList"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
      @selection-change="handleSelectionChange"
    >
      <el-table-column
        type="selection"
        align="center"
        width="55"
      />

      <el-table-column label="名称" align="center" width="200">
        <template slot-scope="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>

      <el-table-column label="应用id" width="100" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.appId }}</span>
        </template>
      </el-table-column>

      <el-table-column label="客户应用安全码" width="100" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.appSecret }}</span>
        </template>
      </el-table-column>

      <el-table-column label="版本" width="80" align="center">
        <template slot-scope="scope">
          <span>{{ formalName[scope.row.formal] }}</span>
        </template>
      </el-table-column>

      <el-table-column label="IP白名单" width="200" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.whiteIp==""?"无":scope.row.whiteIp }}</span>
        </template>
      </el-table-column>

      <el-table-column label="每小时最大访问量" width="100" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.maxHourly }}</span>
        </template>
      </el-table-column>

      <el-table-column label="每日最大访问量" width="100" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.maxDaily }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center"  label="合同开始时间" width="200">
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span>{{ scope.row.startTime }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center"  label="合同结束时间" width="200">
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span>{{ scope.row.endTime }}</span>
        </template>
      </el-table-column>

      <el-table-column label="状态" width="80" align="center">
        <template slot-scope="scope">
          <el-tag :type="tagsType[scope.row.customerStatus]">{{ statusName[scope.row.customerStatus] }}</el-tag>
        </template>
      </el-table-column>

      <el-table-column align="center" prop="created_at" label="操作">
        <template slot-scope="scope">
          <div class="control">
            <el-button type="primary" icon="el-icon-edit" @click="handleEdit(scope.$index, scope.row)" size="mini" circle></el-button>
            <el-button type="primary" icon="el-icon-setting"  @click="openApiSetModal(scope.$index, scope.row)" size="mini" circle></el-button>
            <el-button type="info" icon="el-icon-edit-outline" @click="openStatusSetModalModal(scope.$index, scope.row)" size="mini" circle></el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
       class="pager"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[10, 25, 50, 100]"
      :page-size="pageSize"
      layout="total, prev, pager, next ,jumper"
      :total="customerPage.total">
    </el-pagination>

    <!--设置接口权限弹出窗口-->
    <el-dialog title="请设置客户权限" :visible="showApiSetModal" width="40%" center  :before-close="handleClose">

        <div class="permission-set">
          <el-table :data="openApis" ref="apiTable" height="460px" class="api-list" @selection-change="handleApiSelectionChange" >
            <el-table-column
              type="selection"
              align="center"
              width="55"/>
            <el-table-column label="允许访问接口"  min-width="100%">
              <template slot-scope="scope">
                {{ scope.row.apiName }}
              </template>
            </el-table-column>
          </el-table>

          <el-table :data="paperLevels" ref="paperTable" height="460px" class="level-list" @selection-change="handleLevelSelectionChange">
            <el-table-column
              type="selection"
              align="center"
              width="55"/>
            <el-table-column label="允许访问试卷级别"  min-width="100%">
              <template slot-scope="scope">
                {{ scope.row.name }}
              </template>
            </el-table-column>
          </el-table>

          <div class="permission-ctrl">
            <el-switch class="ctrl-item"
              v-model="currentPermission.showAnswer"
              active-text="显示答案">
            </el-switch>
            <el-switch class="ctrl-item"
              v-model="currentPermission.showParse"
              active-text="显示解析">
            </el-switch>
            <el-switch class="ctrl-item"
              v-model="currentPermission.showSplit"
              active-text="拆分小题">
            </el-switch>
            <div class="input-label">单页最大容量</div>
            <el-input-number size="mini" controls-position="right" v-model="currentPermission.maxPageSize"></el-input-number>
          </div>
        </div>

        <div class="btn-group">
          <el-button type="primary" size="small" @click="handleApiListSet" >确定</el-button>
          <el-button size="small"  @click="handleClose">取消</el-button>
        </div>

    </el-dialog>

    <!--设置用户状态弹出窗口-->
    <el-dialog title="请选择状态" :visible="showStatusSetModal" width="20%" center  :before-close="handleClose">

        <el-select v-model="customerStatusSetting">
          <el-option label="无效" :value=0 />
          <el-option label="有效" :value=1 />
          <el-option label="锁定" :value=2 />
        </el-select>

        <div class="btn-group">
          <el-button type="primary" size="small" @click="handleStatusUpdate" >确定</el-button>
          <el-button size="small"  @click="handleClose">取消</el-button>
        </div>

    </el-dialog>
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
.pager{
  margin-top: 20px;
}
.btn-group{
  width: 100%;
  // display: flex;
  // justify-content: flex-end;
  margin-top: 26px;
}
.permission-set{
  display: flex;
  .api-list{
    flex: 3;
  }
  .level-list{
    flex: 3;
    margin-left: 20px;
    border-left: 1px solid #dcdfe6;
    padding-left: 10px;
  }
  .permission-ctrl{
    flex: 2;
    margin-left: 20px;
    border-left: 1px solid #dcdfe6;
    padding-left: 10px;
    padding: 40px 0 0 20px;
    .ctrl-item{
      margin-bottom: 20px;
    }
    .input-label{
      margin-bottom: 10px;
    }
  }

}

</style>

