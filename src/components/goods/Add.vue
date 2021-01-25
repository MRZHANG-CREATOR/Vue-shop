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
     <el-tabs v-model="activeIndex" :tab-position="tabPosition" :before-leave="beforeTabLeave" @tab-click="tabClick">
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
    <el-tab-pane label="商品参数" name="1">
    <el-form-item v-for="item in manyTabData" :label="item.attr_name" :key="item.attr_id">
    <!--复选框-->
    <el-checkbox-group v-model="item.attr_vals">
    <el-checkbox v-for="(it, i) in item.attr_vals" :label="it" :key="i" border></el-checkbox>
  </el-checkbox-group>
    </el-form-item>
    </el-tab-pane>
    <el-tab-pane label="商品属性" name="2">
    <el-form-item v-for="item in onlyTabData" :label="item.attr_name" :key="item.attr_id">
    <el-input v-model="item.attr_vals"></el-input>
    </el-form-item>
    </el-tab-pane>
    <el-tab-pane label="商品图片" name="3">
    <el-upload
    action=""
  :on-preview="handlePreview"
  :on-remove="handleRemove"
  list-type="picture"
  :headers="headerObj"
  :http-request="setRequest">
  <el-button size="small" type="primary">点击上传</el-button>
  <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
</el-upload>
    </el-tab-pane>
    <el-tab-pane label="商品内容" name="4">商品内容</el-tab-pane>
  </el-tabs>
    </el-form>
    </el-card>
    </div>
</template>

<script>
import { apiGetCateList, apiGetParams, apiUpload } from '../../api'
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
                    goods_cat: '',
                    pics: []
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
                },
                manyTabData: [], // 动态参数数据
                onlyTabData: [], // 静态参数数据
                headerObj: {} // 图片上传自定义请求头
            }
        },
        created () {
            this.getCateList()
        },
        computed: {
             cateId() {
                if (this.addForm.goods_cat.length === '') {
                    return this.addForm.goods_cat[2]
                }
                return null
            }
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
            },
            beforeTabLeave(activeName, oldActiveName) {
                if (oldActiveName === '0' && this.addForm.goods_cat.length !== 3) {
                    this.$message.error('未选择商品分类')
                    return false
                }
            },
            async tabClick() {
                if (this.activeIndex === '1') { // 获取参数面板
                    const { data: res } = await apiGetParams(this.cateId, 'many')
                    if (res.meta.status !== 200) {
                        return this.$message.error(res.meta.msg)
                    }
                     res.data.forEach((item) => {
                        item.attr_vals = item.attr_vals ? item.attr_vals.split(' ') : []
                    })
                    this.manyTabData = res.data
                } else if (this.activeIndex === '2') {
                    const { data: res } = await apiGetParams(this.cateId, 'only')
                    if (res.meta.status !== 200) {
                        return this.$message.error(res.meta.msg)
                    }
                    console.log(res)
                    this.onlyTabData = res.data
                }
            },
            handlePreview() { // 预览事件
            },
            handleRemove() { // 移除事件
            },
            async setRequest(params) { // 设置文件上传
                const { data: res } = await apiUpload(params)
                if (res.meta.status !== 200) return this.$message.error(res.meta.msg)
                this.addForm.pics.push({ pics: res.data.tem_path })
                console.log(this.addForm)
                this.$message.success(res.meta.msg)
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
.el-checkbox{
margin: 0 10px;
}
.el-form-item{
margin: 0;}
</style>
