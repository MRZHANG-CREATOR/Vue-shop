<template>
    <div>
<h3>商品列表</h3>
<!-- 面包屑导航-->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item><a href="/">商品管理</a></el-breadcrumb-item>
      <el-breadcrumb-item>商品列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片视图-->
    <el-card>
    <el-row>
    <el-col :span="8">
    <el-input placeholder="请输入内容" v-model="queryInfo.query" clearable>
    <el-button icon="el-icon-search" slot="append"></el-button>
    </el-input>
    </el-col>
    <el-col :span="4">
    <el-button type="primary" @click="goAddPage">添加商品</el-button>
    </el-col>
    </el-row>
    <!--表格-->
    <el-table :data="goodsList" border stripe>
    <el-table-column type="index"></el-table-column>
    <el-table-column label="商品名称" prop="goods_name"></el-table-column>
    <el-table-column label="商品价格(元)" prop="goods_price" width="100px"></el-table-column>
    <el-table-column label="商品重量(千克)" prop="goods_weight" width="80px"></el-table-column>
    <el-table-column label="创建时间"  width="150px">
    <template slot-scope="scope">{{scope.row.add_time | dateFormat}}</template>
    </el-table-column>
    <el-table-column label="操作" width="130px">
    <template slot-scope="scope">
    <el-button type="primary" size="mini" icon="el-icon-edit"></el-button>
    <el-button type="danger" size="mini" icon="el-icon-delete" @click="removeById(scope.row.goods_id)"></el-button>
    </template>
    </el-table-column>
    </el-table>
    <!--分页-->
     <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="queryInfo.pagenum"
      :page-sizes="[1, 2, 5, 10]"
      :page-size="queryInfo.pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total" background>
    </el-pagination>
    </el-card>
    </div>
</template>

<script>
import { apiGetGoodList, apiDeleteGood } from '../../api'
    export default {
        data() {
            return {
                queryInfo: {
                    query: '',
                    pagenum: 1,
                    pagesize: 5
                },
                goodsList: [],
                total: 0
            }
        },
        created () {
            this.getGoodList()
        },
        methods: {
            async getGoodList() {
                const { data: res } = await apiGetGoodList(this.queryInfo)
                if (res.meta.status !== 200) {
                    return this.$message.error(res.meta.msg)
                }
                this.goodsList = res.data.goods
                console.log(this.goodsList)
                this.total = res.total
                this.$message.success(res.meta.msg)
            },
            handleSizeChange(newSize) {
                this.queryInfo.pagesize = newSize
            },
            handleCurrentChange(newNum) {
                this.queryInfo.pagenum = newNum
            },
            async removeById(id) {
                this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
                center: true
                }).then(async () => {
                    const { data: res } = await apiDeleteGood(id)
                    if (res.meta.status !== 200) {
                    return this.$message.error(res.meta.msg)
                }
                this.getGoodList()
                this.$message.success(res.meta.msg)
                    this.$message({
                    type: 'success',
                    message: '删除成功!'
                })
                }).catch(() => {
                    this.$message({
                    type: 'info',
                    message: '已取消删除'
                    })
                })
            },
            goAddPage() {
                this.$router.push('/cartlist/add')
            }
            }
        }
</script>

<style lang="less" scoped>
.el-pagination{
margin-top: 10px;}
.el-table{
margin-top: 10px;
}
</style>
