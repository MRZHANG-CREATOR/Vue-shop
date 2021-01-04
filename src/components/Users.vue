<template>
  <div>
    <h3>用户列表</h3>
    <!-- 面包屑导航-->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item><a href="/">用户管理</a></el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片视图-->
    <el-card class="box-card">
      <!-- 搜索框-->
      <el-row :gutter="20">
        <el-col :span="10">
          <el-input placeholder="请输入内容" class="input-with-select" v-model="queryInfo.query" :clearable="true" @clear="getUserList()">
            <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click='dialogVisible=true'>添加用户</el-button>
        </el-col>
      </el-row>
      <!--用户列表-->
      <el-table :data="userList" :border="true" :stripe="true">
        <!--索引列-->
        <el-table-column type="index"> </el-table-column>
        <el-table-column label="姓名" prop="username"> </el-table-column>
        <el-table-column label="邮箱" prop="email"> </el-table-column>
        <el-table-column label="角色" prop="role_name"> </el-table-column>
        <el-table-column label="电话" prop="mobile"> </el-table-column>
        <el-table-column label="状态">
          <!--作用域插槽 会覆盖prop-->
          <template slot-scope="scope">
            <!--当前行数据{{scope.row}}-->
            <el-switch
              v-model="scope.row.mg_state"
              active-color="#13ce66"
              inactive-color="#ff4949"
              @change="userStateChange(scope.row)"
            >
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="180px">
          <template>
            <el-button type="primary" icon="el-icon-edit" size="mini" @click='showEditDialog()'></el-button>
            <el-button type="danger" icon="el-icon-delete" size="mini"></el-button>
            <el-tooltip
              effect="dark"
              content="分配角色"
              placement="top"
              :enterable="false"
            >
              <el-button type="warning" icon="el-icon-setting" size="mini"></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
<!--分页部分-->
      <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="queryInfo.pageNum"
      :page-sizes="[1, 2, 5, 10]"
      :page-size="queryInfo.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
    </el-card>
    <!--添加用户对话框-->
    <el-dialog
  title="添加用户"
  :visible.sync="dialogVisible"
  width="50%"
  @close="addDialogClose">
    <!--内容主体-->
    <el-form :model="addForm" :rules="addFormRules" ref="addFormRef" label-width="70px" >
  <el-form-item label="用户名" prop="username">
    <el-input v-model="addForm.username"></el-input>
  </el-form-item>
  <el-form-item label="密码" prop="password">
    <el-input v-model="addForm.password"></el-input>
  </el-form-item>
  <el-form-item label="邮箱" prop="email">
    <el-input v-model="addForm.email"></el-input>
  </el-form-item>
  <el-form-item label="手机" prop="mobile">
    <el-input v-model="addForm.mobile"></el-input>
  </el-form-item>
    </el-form>
    <!--底部按钮-->
  <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="addUser">确 定</el-button>
  </span>
</el-dialog>

<!--修改用户的对话框-->
<el-dialog
  title="修改用户"
  :visible.sync="editDialogVisible"
  width="30%"
  :before-close="handleClose">
  <span>这是一段信息</span>
  <span slot="footer" class="dialog-footer">
    <el-button @click="editDialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="editDialogVisible = false">确 定</el-button>
  </span>
</el-dialog>
  </div>
</template>

<script>
import { apiGetUsersList, apiUserStateChange, apiAddUser } from '../api'
export default {
  data() {
    var checkEmail = (rule, value, cb) => {
      const regEmail = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/
      if (regEmail.test(value)) { return cb() }
      cb(new Error('请输入合法邮箱'))
    }// 校验邮箱规则
    var checkMobile = (rule, value, cb) => {
      const regMobile = /^(0|86|17921)?(13[0-9]|15[0123456789]|17[678]|18[0-9]|14[57])[0-9]{8}$/
      if (regMobile.test(value)) { return cb() }
      cb(new Error('请输入合法手机号码'))
    }// 校验手机号码规则
    return {
      queryInfo: {
        query: '', // 搜索用户关键字
        pageNum: 1,
        pageSize: 2
      },
      userList: [],
      total: 0,
      dialogVisible: false, // 控制添加用户对话框的隐藏显示
      addForm: { uaername: '', password: '', email: '', mobile: '' }, // 添加用户表单数据
      addFormRules: {
        username: [{ required: true, message: '请输入用户名', triggle: 'blur' }, { min: 2, max: 10, message: '长度在2-10个字符之间', triggle: 'blur' }],
        password: [{ required: true, message: '请输入密码', triggle: 'blur' }, { min: 2, max: 10, message: '长度在2-10个字符之间', triggle: 'blur' }],
        email: [{ required: true, message: '请输入邮箱', triggle: 'blur' }, { validator: checkEmail, triggle: 'blur' }],
        mobile: [{ required: true, message: '请输入手机号', triggle: 'blur' }, { validator: checkMobile, triggle: 'blur' }]
      }, // 添加用户表单规则
      editDialogVisible: false// 修改用户对话框显示隐藏
    }
  },
  created() {
    this.getUsersList(this.queryInfo)
  },
  methods: {
    async getUsersList(queryInfo) {
      const res = await apiGetUsersList(queryInfo)
      console.log(res)
      if (res.meta.status !== 200) return this.$message.error('获取用户列表失败')
      this.userList = res.data.users
      this.total = res.data.total
      console.log(this.userList)
    },
    handleSizeChange(newPageSize) { // 监听总页数改变
      console.log(newPageSize)
      this.pageSize = newPageSize
    },
    handleCurrentChange(newCurrentPage) {
      console.log(newCurrentPage)
      this.pageNum = newCurrentPage
    },
    async userStateChange(userInfo) {
      console.log(userInfo)
      const res = await apiUserStateChange(userInfo)
      console.log(res)
      if (res.meta.status !== 200) {
        userInfo.mg_state = !userInfo.mg_state
        return this.$message.error('用户状态更新失败')
      }
      this.$message.success(res.meta.msg)
    },
    addDialogClose() { // 监听添加用户对话框关闭事件
      this.$refs.addFormRef.resetFields()// 重置引用
    },
    addUser() { // 添加用户确定后校验与请求
      this.$refs.addFormRef.validate(async valid => {
        console.log(valid)
        if (!valid) return
        const res = await apiAddUser(this.addForm)
        console.log(res)
        if (res.meta.status !== 201) {
          return this.$message.error(res.meta.msg)
        }
        this.$message.success(res.meta.msg)
        this.dialogVisible = false// 隐藏添加用户对话框
        this.getUsersList(this.queryInfo)// 重新获取用户列表
      })
    },
    showEditDialog() {
      this.editDialogVisible = true
    }
  }
}
</script>
<style lang="less" scoped>
.el-table {
  margin-top: 15px;
  font-size: 12px;
}
.el-pagination{
  margin-top: 15px;
}
</style>
