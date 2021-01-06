<template>
    <div>
<h3>角色列表</h3>
<!-- 面包屑导航-->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item><a href="/">权限管理</a></el-breadcrumb-item>
      <el-breadcrumb-item>角色列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片视图-->
    <el-card>
    <!--添加角色列表-->
    <el-row>
    <el-col>
    <el-button type="primary">添加角色</el-button>
    </el-col>
    </el-row>
    </el-card>
    </div>
</template>

<script>
import { apiGetRolesList } from '../../api'
export default {
  data() {
    return {
      rolesList: []
    }
  },
  created () {
    this.getRolesList()
  },
  methods: {
    async  getRolesList() {
      const { data: res } = await apiGetRolesList()
      //   console.log(res)
      if (res.meta.status !== 200) {
        return this.$message.error(res.meta.msg)
      }
      this.rolesList = res.data
      this.$message.success(res.meta.msg)
      console.log(this.rolesList)
    }
  }
}
</script>

<style lang="less" scoped>

</style>
