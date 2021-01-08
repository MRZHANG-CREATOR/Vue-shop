<template>
    <div>
<h3>购物车</h3>
<!-- 面包屑导航-->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item><a href="/">商品管理</a></el-breadcrumb-item>
      <el-breadcrumb-item>商品分类</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片视图-->
    <el-card>
<el-row>
<el-col>
<el-button type="primary">添加商品</el-button>
</el-col>
</el-row>
    123</el-card>
    </div>
</template>

<script>
import { apiGetCateList } from '../../api'
export default {
  data() {
    return {
      queryInfo: {
        type: '3',
        pagenum: 1,
        pagesize: 5
      },
      cateList: [] // 商品分类列表，默认空
    }
  },
  created () {
    this.getCateList()
  },
  methods: {
    async getCateList() { // 获取商品列表数据
      const { data: res } = await apiGetCateList(this.queryInfo)
      this.cateList = res.data.result// 分类列表
      this.total = res.data.total// 列表总数
      console.log(res)
    }
  }
}
</script>

<style lang="less" scoped>

</style>
