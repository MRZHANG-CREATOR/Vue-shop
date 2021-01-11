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
          <el-button type="primary" @click="showAddCateDialog">添加商品</el-button>
        </el-col>
      </el-row>
      <tree-table
        :data="cateList"
        :columns="columns"
        :selection-type="false"
        show-index
        index-text="#"
        border
        :expand-type="false"
        class="treeTable"
      >
        <template slot="isok" slot-scope="scope">
          <i
            class="el-icon-success"
            v-if="scope.row.cat_deleted === false"
            style="color: lightgreen"
          ></i>
          <i class="el-icon-error" v-else style="color: red"></i>
        </template>
        <!--排序-->
        <template slot="order" slot-scope="scope">
          <el-tag size="mini" v-if="scope.row.cat_level === 0">一级</el-tag>
          <el-tag type="success" size="mini" v-else-if="scope.row.cat_level === 1"
            >二级</el-tag
          >
          <el-tag type="warning" size="mini" v-else>三级</el-tag>
        </template>
        <template slot="opt">
          <el-button type="primary" icon="el-icon-edit"></el-button>
          <el-button type="danger" icon="el-icon-delete"></el-button>
        </template>
      </tree-table>
      <!--分页-->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.pagenum"
        :page-sizes="[2, 5, 10]"
        :page-size="queryInfo.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
      <!--添加分类对话框-->
      <el-dialog
        title="提示"
        :visible.sync="addCateDialogVisible"
        width="30%"
        :before-close="handleClose"
      >
        <el-form ref="addCateFormRef" :model="addCateForm" rules="addCateFormRules" label-width="100px">
          <el-form-item label="分类名称">
            <el-input v-model="addCateForm.cat_name" prop="cat_name"></el-input>
          </el-form-item>
          <el-form-item label="父级分类">
            <el-input v-model="addCateForm.cat_name" ></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
        </span>
      </el-dialog>
    </el-card>
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
      cateList: [], // 商品分类列表，默认空
      columns: [
        {
          label: '分类名称',
          prop: 'cat_name'
        },
        {
          label: '是否有效',
          type: 'template', // 当前这一列是模板列
          template: 'isok' // 选择插槽
        },
        {
          label: '排序',
          type: 'template', // 当前这一列是模板列
          template: 'order' // 选择插槽
        },
        {
          label: '操作',
          type: 'template', // 当前这一列是模板列
          template: 'opt' // 选择插槽
        }
      ],
      total: 5,
      addCateDialogVisible: false, // 控制添加分类对话框显示隐藏
      addCateForm: {
        cat_name: '',
        cat_pid: 0,
        cat_level: 0
      },
      addCateFormRules: {
        cat_name: [{ required: true, message: '输入分类名称', triggle: 'blur' }]
      },
      parentCateList: []
    }
  },
  created() {
    this.getCateList()
  },
  methods: {
    async getCateList() {
      // 获取商品列表数据
      const { data: res } = await apiGetCateList(this.queryInfo)
      this.cateList = res.data.result // 分类列表
      this.total = res.data.total // 列表总数
      console.log(res)
    },
    handleSizeChange(newSize) {
      // 监听 pagesize change
      this.queryInfo.pagesize = newSize
      this.getCateList()
    },
    handleCurrentChange(newPage) {
      // 监听pagenum change
      this.queryInfo.pagenum = newPage
      this.getCateList()
    },
    showAddCateDialog() {
      this.addCateDialogVisible = true
    },
    getParentCateList() { // 获取父级列表

    }
  }
}
</script>

<style lang="less" scoped>
.treeTable {
  margin-top: 10px;
}
.el-pagination {
  margin-top: 10px;
}
</style>
