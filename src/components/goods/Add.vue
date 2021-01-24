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
    <el-steps align-center :active="activeIndex - 0" finish-status="success">
        <el-step title="基本信息"></el-step>
        <el-step title="商品参数"></el-step>
        <el-step title="商品属性"></el-step>
        <el-step title="商品图片"></el-step>
        <el-step title="商品内容"></el-step>
        <el-step title="完成"></el-step>
    </el-steps>
    <!--tab 栏-->
    <el-form :model="addForm" :rules="addFormRules" ref="addFormRef" label-width="100px" label-position="top">
     <el-tabs v-model="activeIndex" :tab-position="tabPosition">
    <el-tab-pane label="基本信息" name="0">
    <el-form-item label="商品名称" prop="goods_name">
    <el-input v-model="addForm.goods_name"></el-input>
    </el-form-item>
    <el-form-item label="商品价格" prop="goods_price">
    <el-input v-model="addForm.goods_price"></el-input>
    </el-form-item>
    <el-form-item label="商品重量" prop="goods_weight">
    <el-input v-model="addForm.goods_weight"></el-input>
    </el-form-item>
    <el-form-item label="商品数量" prop="goods_number">
    <el-input v-model="addForm.goods_number"></el-input>
    </el-form-item>
    <el-form-item label="商品分类" prop="goods_number">
            <el-cascader
            :options="cateList"
            :props="cateProps"
            v-model="addForm.goods_cat"
            @change="handleChange">
            </el-cascader>
    </el-form-item>
    </el-tab-pane>
    <el-tab-pane label="商品参数" name="1">商品参数</el-tab-pane>
    <el-tab-pane label="商品属性" name="2">商品属性</el-tab-pane>
    <el-tab-pane label="商品图片" name="3">商品图片</el-tab-pane>
    <el-tab-pane label="商品内容" name="4">商品内容</el-tab-pane>
  </el-tabs>
    </el-form>
    </el-card>
    </div>
</template>

<script>
import { apiGetCateList } from '../../api'
    export default {
        data() {
            return {
                activeIndex: '0',
                tabPosition: 'left',
                addForm: {
                    goods_name: '',
                    goods_price: 0,
                    goods_weight: 0,
                    goods_number: 0,
                    goods_cat: ''
                },
                addFormRules: {
                    goods_name: [{ required: true, message: '必填项', trigger: 'blur' }],
                    goods_price: [{ required: true, message: '必填项', trigger: 'blur' }],
                    goods_weight: [{ required: true, message: '必填项', trigger: 'blur' }],
                    goods_number: [{ required: true, message: '必填项', trigger: 'blur' }],
                    goods_cat: [{ required: true, message: '必填项', trigger: 'blur' }]
                },
                cateList: [],
                cateProps: {
                    expandTrigger: 'hover',
                    value: 'cat_id',
                    label: 'cat_name',
                    children: 'children'
                }
            }
        },
        created () {
            this.getCateList()
        },
        methods: {
            async getCateList() {
                const { data: res } = await apiGetCateList()
                if (res.meta.status !== 200) {
                    return this.$message.error(res.meta.msg)
                }
                this.cateList = res.data.result
            },
            handleChange() {
                console.log(this.addForm.goods_cat)
                if (this.addForm.goods_cat.length !== 3) {
                    this.addForm.goods_cat = []
                }
            }
        }
    }
</script>

<style lang="less" scoped>
.el-steps{
margin-top: 20px;
}
.el-tabs{
margin-top: 20px;
}
.el-tab-pane{
text-align: left;
}
</style>
