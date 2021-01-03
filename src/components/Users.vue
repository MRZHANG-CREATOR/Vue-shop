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
        <el-col :span="7">
          <el-input placeholder="请输入内容" class="input-with-select">
            <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input>
        </el-col>
        <el-col :span="3">
          <el-button type="primary">添加用户</el-button>
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
            <el-button type="primary" icon="el-icon-edit" size="mini"></el-button>
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
  </div>
</template>

<script>
import { apiGetUsersList, apiUserStateChange } from '../api'
export default {
  data() {
    return {
      queryInfo: {
        query: '',
        pageNum: 1,
        pageSize: 2
      },
      userList: [],
      total: 0
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
      if (res.meta.status !== 200 || res === undefined) return this.$message.error('用户状态更新失败')
      userInfo.mg_state = !userInfo.mg_state
      this.$message.success('用户登录状态更新成功')
    }
  }
}
</script>
<style lang="less" scoped>
.el-table {
  margin-top: 15px;
  font-size: 12px;
}
</style>
