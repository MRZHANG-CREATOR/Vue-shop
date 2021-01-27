<template>
    <div>
<h3>订单管理</h3>
<!-- 面包屑导航-->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item><a href="/">订单管理</a></el-breadcrumb-item>
      <el-breadcrumb-item>订单列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片视图-->
    <el-card>
        <el-row>
            <el-col :span="8">
                <el-input placeholder="请输入内容" v-model="queryInfo.query">
                    <el-button slot="append"  icon="el-icon-search"></el-button>
                </el-input>
            </el-col>
        </el-row>
        <!-- 订单列表数据-->
        <el-table :data='orderList' stripe border>
            <el-table-column type="index"></el-table-column>
            <el-table-column label="订单编号" prop="order_number" width="180px"></el-table-column>
            <el-table-column label="订单价格" prop="order_price"></el-table-column>
            <el-table-column label="是否付款" prop="pay_status" width="80px">
                <template slot-scope="scope">
                    <el-tag v-if="scope.row.pay_status === 0" type="danger">未付款</el-tag>
                    <el-tag v-else type="success">已付款</el-tag>
                </template>
            </el-table-column>
            <el-table-column label="是否发货" prop="is_send" width="80px"></el-table-column>
            <el-table-column label="下单时间" prop="create_time">
                <template slot-scope="scope">
                    {{scope.row.create_time | dateFormat}}
                </template>
            </el-table-column>
            <el-table-column label="操作">
                <template>
                    <el-button icon="el-icon-edit" type="primary" size="mini" @click="showBox"></el-button>
                    <el-button icon="el-icon-location" type="success" size="mini" @click="showProgressBox"></el-button>
                </template>
            </el-table-column>
        </el-table>
        <!-- 分页-->
        <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.pagenum"
        :page-sizes="[1, 2, 5, 10]"
        :page-size="queryInfo.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total" background>
        </el-pagination>
        <!--修改地址对话框-->
        <el-dialog
        title="修改地址"
        :visible.sync="addressVisible"
        width="50%"
        @close="addressDialogClosed">
        <el-form :model="addressForm" :rules="addressRules" ref="addressFormRef" label-width="100px" class="demo-ruleForm">
            <el-form-item label="省市/区/县" prop="address1">
            <el-cascader
            v-model="addressForm.address1"
            :options="cityData"
            :props="{ expandTrigger: 'hover' }"
            ></el-cascader>
            </el-form-item>
            <el-form-item label="详细地址" prop="address2">
                <el-input v-model="addressForm.address2"></el-input>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="addressVisible = false">取 消</el-button>
            <el-button type="primary" @click="addressVisible = false">确 定</el-button>
        </span>
        </el-dialog>
        <!--修改地址对话框-->
        <el-dialog
        title="物流信息"
        :visible.sync="progressVisible"
        width="50%"
        >
        <el-form label-width="100px" class="demo-ruleForm">
        <el-timeline>
            <el-timeline-item
            v-for="(activity, index) in progressInfo"
            :key="index"
            :timestamp="activity.time">
            {{activity.context}}
            </el-timeline-item>
        </el-timeline>
        </el-form>
        </el-dialog>
    </el-card>
    </div>
</template>

<script>
import { apiGetOrderList, apiGetKuaiDi } from '../../api'
import cityData from './citydata'
    export default {
        data() {
            return {
                queryInfo: {
                    query: '',
                    pagenum: 1,
                    pagesize: 5
                },
                total: 0,
                orderList: [],
                addressVisible: false,
                addressForm: {
                    address1: [],
                    address2: ''
                },
                addressRules: {
                    address1: [{ required: true, message: '请填写省市地址', trigger: 'blur' }],
                    address2: [{ required: true, message: '请填写详细地址', trigger: 'blur' }]
                },
                cityData,
                progressVisible: false,
                progressInfo: []
            }
        },
        created () {
            this.getOrderList()
        },
        methods: {
            async getOrderList() {
                const { data: res } = await apiGetOrderList(this.queryInfo)
                if (res.meta.status !== 200) return this.$message.error(res.meta.msg)
                this.total = res.data.total
                this.orderList = res.data.goods
                this.$message.success(res.meta.msg)
            },
            handleSizeChange(newSize) {
                console.log(newSize)
            },
            handleCurrentChange(newNum) {
                console.log(newNum)
            },
            showBox() {
                this.addressVisible = true
            },
            addressDialogClosed() {
                this.$refs.addressFormRef.resetFields()
            },
            async showProgressBox() {
                const { data: res } = await apiGetKuaiDi(1106975712662)
                if (res.meta.status !== 200) {
                    return this.$message.error(res.meta.msg)
                }
                this.progressInfo = res.data
                this.progressVisible = true
                console.log(this.progressInfo)
            }
        }
    }
</script>

<style lang="less" scoped>
.el-timeline-item{
text-align: left;}
</style>
