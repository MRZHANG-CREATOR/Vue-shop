<template>
    <div>
<h3>权限列表组件</h3>
<!-- 面包屑导航-->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item><a href="/">权限管理</a></el-breadcrumb-item>
      <el-breadcrumb-item>权限列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片视图-->
<el-card>
<el-table :data="rightsList" :border="true">
<el-table-column type="index"></el-table-column>
<el-table-column label="权限名称" prop="authName"></el-table-column>
<el-table-column label="路径" prop="path"></el-table-column>
<el-table-column label="权限等级" prop="level">
<template slot-scope="scope">
<el-tag v-if="scope.row.level===0">一级</el-tag>
<el-tag v-else-if="scope.row.level===1" type="success">二级</el-tag>
<el-tag type="danger"  v-else>三级</el-tag>
</template>
</el-table-column>
</el-table>
</el-card>
    </div>
</template>

<script>
import { apiGetRightsList } from '../../api'
export default {
  data() {
    return {
      rightsType: 'list',
      rightsList: []
    }
  },
  created () {
    this.getRightsList(this.rightsType)
  },
  methods: {
    async   getRightsList(type) {
      const { data: res } = await apiGetRightsList(type)
      console.log(res)
      if (res.meta.status !== 200) {
        return this.$message.error(res.meta.msg)
      }
      this.rightsList = res.data
      console.log(this.rightsList)
    }
  }
}
</script>

<style lang="less" scoped>

</style>
