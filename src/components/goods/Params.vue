<template>
  <div>
    <h3>分类参数</h3>
    <!-- 面包屑导航-->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item><a href="/">商品管理</a></el-breadcrumb-item>
      <el-breadcrumb-item>分类参数</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片视图-->
    <el-card>
      <!--警告-->
      <el-alert title="警告提示的文案" type="warning" :closable="false" :show-icon="true">
      </el-alert>
      <el-row>
        <el-col>
          <span>选择商品分类： </span>
          <el-cascader
            :options="cateList"
            :props="cateProps"
            v-model="selectedCateKeys"
            @change="handleChange"
          >
          </el-cascader>
        </el-col>
      </el-row>
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="动态参数" name="many"
          ><el-button size="mini" type="primary" :disabled="isBtnDisabled" @click="addDialogVisible=true"
            >添加参数</el-button
          >
          <!--动态参数表格-->
          <el-table :data="manyTableData" :border="true" :stripe="true">
           <el-table-column type='expand'></el-table-column>
           <el-table-column type='index'></el-table-column>
           <el-table-column label="参数名称" prop="attr_name"></el-table-column>
           <el-table-column label="操作" >
           <template slot-scope="scope">
           <el-button type="primary" size="mini" icon="el-icon-edit" @click="showEditDialog(scope.row.attr_id)">修改</el-button>
           <el-button type="danger" size="mini" icon="el-icon-delete">删除</el-button>
           </template>
           </el-table-column>
          </el-table>
          </el-tab-pane
        >
        <el-tab-pane label="静态属性" name="only"
          ><el-button size="mini" type="primary" :disabled="isBtnDisabled" @click="addDialogVisible=true"
            >添加属性</el-button
          >
           <el-table :data="manyTableData" :border="true" :stripe="true">
           <el-table-column type='expand'></el-table-column>
           <el-table-column type='index'></el-table-column>
           <el-table-column label="属性名称" prop="attr_name"></el-table-column>
           <el-table-column label="操作" >
           <template slot-scope="scope">
           <el-button type="primary" size="mini" icon="el-icon-edit" @click="showEditDialog(scope.row.attr_id)">修改</el-button>
           <el-button type="danger" size="mini" icon="el-icon-delete">删除</el-button>
           </template>
           </el-table-column>
          </el-table>
          </el-tab-pane
        >
      </el-tabs>
    </el-card>
<!--添加对话框-->
    <el-dialog
  :title="'添加'+titleText"
  :visible.sync="addDialogVisible"
  width="50%"
  @close="addFormClosed">
  <el-form :model="addForm" :rules="addFormRules" ref="addFormRef" label-width="100px">
  <el-form-item :label="titleText+'名称'" prop="name">
  <el-input v-model="addForm.name"></el-input>
  </el-form-item>
  </el-form>
  <span slot="footer" class="dialog-footer">
    <el-button @click="addDialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="addParams">确 定</el-button>
  </span>
</el-dialog>

<!--修改对话框-->
    <el-dialog
  :title="'添加'+titleText"
  :visible.sync="editDialogVisible"
  width="50%"
  @close="editFormClosed">
  <el-form :model="editForm" :rules="editFormRules" ref="editFormRef" label-width="100px">
  <el-form-item :label="titleText+'名称'" prop="name">
  <el-input v-model="editForm.name"></el-input>
  </el-form-item>
  </el-form>
  <span slot="footer" class="dialog-footer">
    <el-button @click="editDialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="editParams">确 定</el-button>
  </span>
</el-dialog>
  </div>
</template>

<script>
import { apiGetCateList, apiAddCate } from '../../api'
export default {
  data() {
    return {
      cateList: [],
      cateProps: {
        expandTrigger: 'hover',
        value: 'cat_id',
        label: 'cat_name',
        children: 'children'
      },
      selectedCateKeys: [], // 级联选择框绑定数组
      activeName: 'many',
      manyTableData: [], // 动态参数数据
      onlyTableData: [], // 静态参数数据
      addDialogVisible: false,
      addForm: {
        attr_name: ''
      },
      addFormRules: {
        attr_name: { require: true, message: '请添加名称', triggle: 'blur' }
      },
      editDialogVisible: false,
      editForm: {
        attr_name: ''
      },
      editFormRules: {
        attr_name: { require: true, message: '请添加名称', triggle: 'blur' }
      }
    }
  },
  created() {
    this.getCateList()
  },
  computed: {
    isBtnDisabled() {
      if (this.selectedCateKeys.length !== 3) {
        return true
      }
      return false
    },
    cateId() {
      if (this.selectedCateKeys.length === 3) {
        return this.selectedCateKeys[this.selectedCateKeys.length - 1]
      }
      return null
    },
    titleText() {
      if (this.activeName === 'many') {
        return '参数'
      } else {
        return '属性'
      }
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
    async handleChange() {
      console.log(this.selectedCateKeys)
      this.getParamsData()
    },
    handleClick() {
      console.log(this.activeName)
      this.getParamsData()
    },
    async getParamsData() {
      if (this.selectedCateKeys.length === 3) {
        const { data: res } = await apiGetCateList('3', this.activeName)
        if (this.activeName === 'many') {
          this.manyTableData = res.data
        }
        console.log(res)
      } else {
        this.selectedCateKeys = []
      }
    },
    addFormClosed () {
      this.$refs.addFormRef.resetFields()
    },
    addParams () {
      this.$refs.addFormRef.validate(async (valid) => {
        if (!valid) return
        const { data: res } = await apiAddCate({ id: this.cateId, attr_name: this.addForm.attr_name, attr_sel: this.activeName })
        console.log(res)
        if (res.meta.status !== 200) {
          return this.$message.error(res.meta.msg)
        }
        this.$message.success(res.meta.msg)
        this.addDialogVisible = false
        this.getParamsData()
      })
    },
    showEditDialog (id) {
      this.editDialogVisible = true
    },
    editDialogClosed () {
      this.$refs.editFormRef.resetFields()
    },
    editParams () {
    }
  }
}
</script>

<style lang="less" scoped>
.el-row {
  margin-top: 15px;
  .el-col {
    text-align: left;
  }
}
.el-table{
margin-top: 10px;
}
</style>
