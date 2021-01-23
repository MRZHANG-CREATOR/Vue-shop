<template>
    <div>
<h3>添加商品页面</h3>
<!-- 面包屑导航-->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item><a href="">商品管理</a></el-breadcrumb-item>
      <el-breadcrumb-item>添加列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片视图-->
    <el-card>
    <el-alert center title='添加商品信息' type="info" show-icon :closable="false"></el-alert>
    <el-steps align-center :active="activeIndex" finish-status="success">
        <el-step title="基本信息"></el-step>
        <el-step title="商品参数"></el-step>
        <el-step title="商品属性"></el-step>
        <el-step title="商品图片"></el-step>
        <el-step title="商品内容"></el-step>
        <el-step title="完成"></el-step>
    </el-steps>
    </el-card>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                activeIndex: 0
            }
        }
    }
</script>

<style lang="less" scoped>
.el-steps{
margin-top: 20px;
}
</style>
