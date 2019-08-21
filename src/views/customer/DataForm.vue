<script>
import { mapGetters, mapActions } from 'vuex'
import { setTimeout } from 'timers'
export default {
  data() {
    return {
      form: {
        id:0,
        name:'',
        appId: '',
        appSecret: '',
        customerStatus: 0,
        startTime:'',
        endTime:'',
        formal:0,
        maxHourly:0,
        maxDaily:0,
        whiteIp:''
      },
      isEdit:false,
      rules: {
        name: [
          { required: true, message: '请输客户名称', trigger: 'blur' },
          { min: 1, max: 30, message: '长度在 1 到 30 个字符', trigger: 'blur' }
        ],
        appId: [
           { required: true, message: '请输客户应用id', trigger: 'blur' }
        ],
        appSecret: [
           { required: true, message: '请输客户应用安全码', trigger: 'blur' }
        ],
        startTime: [
          { type: 'date', required: true, message: '请选择合同开始时间', trigger: 'change' }
        ],
        endTime: [
          { type: 'date', required: true, message: '请选择合同截止时间', trigger: 'change' }
        ],
        formal: [
          { required: true, message: '选择版本', trigger: 'change' }
        ],
        customerStatus: [
          { required: true, message: '请选择状态', trigger: 'change' }
        ],
        maxHourly: [
          { required: true, message: '请填写最大每时访问数', trigger: 'blur' }
        ],
        maxDaily: [
          { required: true, message: '请填写最大每日访问数', trigger: 'blur' }
        ],
        whiteIp: [
          { required: true, message: '请填写ip白名单', trigger: 'blur' }
        ]
     }
  
    }
  },
  mounted(){
     let query = this.$route.query;
     if(typeof(query.index) != 'undefined'){
        let customer = this.customerPage.list[query.index];
        this.form.id = customer.id;
        this.form.name = customer.name;
        this.form.appId = customer.appId;
        this.form.appSecret = customer.appSecret;
        this.form.startTime = new Date(customer.startTime);
        this.form.endTime = new Date(customer.endTime);
        this.form.formal = customer.formal;
        this.form.customerStatus = customer.customerStatus;
        this.form.maxHourly = customer.maxHourly;
        this.form.maxDaily = customer.maxDaily;
        this.form.whiteIp = customer.whiteIp;
        this.isEdit = true;
     }
  },
  computed:{
    ...mapGetters(['customerPage'])
  },
  methods: {
    ...mapActions(['addCustomer','updateCustomer']),
    onSubmit() {
      this.$refs['form'].validate((valid) => {
          if (valid) {
            let whiteIp = this.form.whiteIp;
            if(whiteIp){
              let checkIp = true;
              let testIp = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/;
              let ips = whiteIp.split(',');
              ips.forEach(item=>{
                if(!testIp.test(item)){
                  checkIp = false;
                }
              });
              if(!checkIp){
                this.$message.error('请检查ip是否填写正确，多个IP使用英文逗号分隔!');
                return;
              }
            }
            //修改
            if(this.isEdit){
              this.edit();
              return;
            }
            //新增
            this.add();
          }else{
             return false;
          }
      });
    },
    onCancel() {
      this.$router.go(-1)
    },
    add(){
      const _this = this
      this.addCustomer(this.form).then(res => {
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
      this.updateCustomer(this.form).then(res => {
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
    <el-form ref="form" :model="form" :rules="rules" label-width="120px">
      <el-form-item label="名称"  prop="name">
        <el-input v-model="form.name" placeholder="请输入客户名称" />
      </el-form-item>

      <el-form-item label="应用id" prop="appId">
        <el-input v-model="form.appId" placeholder="请输入客户应用id" />
      </el-form-item>

      <el-form-item label="应用安全码" prop="appSecret">
        <el-input v-model="form.appSecret" placeholder="请输入客户应用安全码" />
      </el-form-item>

      <el-form-item label="版本" prop="formal">
        <el-select v-model="form.formal" placeholder="请选择版本">
          <el-option label="测试版" :value="0" />
          <el-option label="正式版" :value="1" />
        </el-select>
      </el-form-item>

      <el-form-item label="最大每时访问数" prop="maxHourly">
        <el-input-number v-model="form.maxHourly" label="请输入最大每小时访问数" />
      </el-form-item>
      <el-form-item label="最大每日访问数" prop="maxDaily">
        <el-input-number v-model="form.maxDaily" label="请输入最大每日访问数" />
      </el-form-item>

       <el-form-item label="IP白名单" prop="whiteIp">
        <el-input v-model="form.whiteIp" placeholder="请输入客户IP白名单,多个ip使用英文逗号分隔" />
      </el-form-item>     

      <el-form-item label="合同开始时间" prop="startTime">
        <el-date-picker
          v-model="form.startTime"
          type="datetime"
          placeholder="选择日期时间"
          default-time="12:00:00">
        </el-date-picker>
      </el-form-item>

      <el-form-item label="合同截止时间" prop="endTime">
        <el-date-picker
          v-model="form.endTime"
          type="datetime"
          placeholder="选择日期时间"
          default-time="12:00:00">
        </el-date-picker>
      </el-form-item>

      <el-form-item label="状态" prop="customerStatus">
        <el-select v-model="form.customerStatus" placeholder="请设置客户状态">
          <el-option label="无效" :value=0 />
          <el-option label="有效" :value=1 />
          <el-option label="锁定" :value=2 />
        </el-select>
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

