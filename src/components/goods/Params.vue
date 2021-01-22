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
            >添加参数</el-button>
          <!--动态参数表格-->
          <el-table :data="manyTableData" :border="true" :stripe="true">
           <el-table-column type='expand'>
           <template slot-scope="scope">
           <!--循环渲染tag-->
           <el-tag v-for="(item,index) in scope.row.attr_vals" :key="index" closable>{{item}}</el-tag>
           <!--动态编辑标签-->
           <el-input
            class="input-new-tag"
            v-if="scope.row.inputVisible"
            v-model="scope.row.inputValue"
            ref="saveTagInput"
            size="small"
            @keyup.enter.native="handleInputConfirm(scope.row)"
            @blur="handleInputConfirm(scope.row)">
            </el-input>
            <el-button v-else class="button-new-tag" size="small" @click="showInput(scope.row)">+ New Tag</el-button>
           </template>
           </el-table-column>
           <el-table-column type='index'></el-table-column>
           <el-table-column label="参数名称" prop="attr_name"></el-table-column>
           <el-table-column label="操作" >
           <template slot-scope="scope">
           <el-button type="primary" size="mini" icon="el-icon-edit" @click="showEditDialog(scope.row.attr_id)">修改</el-button>
           <el-button type="danger" size="mini" icon="el-icon-delete" @click="removeParams(scope.row.attr_id)">删除</el-button>
           </template>
           </el-table-column>
          </el-table>
          </el-tab-pane>
        <el-tab-pane label="静态属性" name="only"
          ><el-button size="mini" type="primary" :disabled="isBtnDisabled" @click="addDialogVisible=true"
            >添加属性</el-button>
           <el-table :data="manyTableData" :border="true" :stripe="true">
           <el-table-column type='expand'></el-table-column>
           <el-table-column type='index'></el-table-column>
           <el-table-column label="属性名称" prop="attr_name"></el-table-column>
           <el-table-column label="操作" >
           <template slot-scope="scope">
           <el-button type="primary" size="mini" icon="el-icon-edit" @click="showEditDialog(scope.row.attr_id)">修改</el-button>
           <el-button type="danger" size="mini" icon="el-icon-delete" @click="removeParams(scope.row.attr_id)">删除</el-button>
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
  <el-form-item :label="titleText+'名称'" prop="attr_name">
  <el-input v-model="addForm.attr_name"></el-input>
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
  <el-form-item :label="titleText+'名称'" prop="attr_name">
  <el-input v-model="editForm.attr_name"></el-input>
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
import { apiGetCateList, apiAddCate, apiDeleteParam, apiAddParamTag } from '../../api'
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
        attr_name: [{ required: true, message: '请添加名称', triggle: 'blur' }]
      },
      editDialogVisible: false,
      editForm: {
        attr_name: ''
      },
      editFormRules: {
        attr_name: [{ required: true, message: '请添加名称', trigger: 'blur' }]
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
    // 获取参数列表
    async getParamsData() {
      if (this.selectedCateKeys.length === 3) {
        const { data: res } = await apiGetCateList('3', this.activeName)
        if (res.meta.status !== 200) {
          return this.$message.error(res.meta.msg)
        }
        res.data.forEach((item) => {
          item.attr_vals = item.attr_vals ? item.attr_vals.split(' ') : []
          item.inputVisible = false
          item.inputValue = ''
        })
        if (this.activeName === 'many') {
          this.manyTableData = res.data
        } else if (this.activeName === 'only') {
          this.onlyTableData = res.data
        }
        console.log(res)
        console.log('hello')
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
    async showEditDialog (id) {
      this.editDialogVisible = true
      console.log(id)
      const { data: res } = await apiGetCateList()
      console.log(res.data)
    },
    editDialogClosed () {
      this.$refs.editFormRef.resetFields()
    },
    editFormClosed () {
    },
    editParams () {
      this.$refs.editFormRef.validate(async (valid) => {
        if (!valid) return
        this.editDialogVisible = false
        this.getParamsData()
      })
    },
    // 删除参数
    removeParams (attrid) {
      this.$confirm('此操作将永久删除, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }).then(async () => {
          const { data: res } = await apiDeleteParam(this.cateId, attrid)
          if (res.meta.status !== 200) return this.$message.error(res.meta.msg)
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
    // 动态编辑标签methods
    async handleInputConfirm (row) { // 文本框回车或失焦触发
    if (row.inputValue.trim().length === 0) { // 内容不合理
      row.inputVisible = false
      row.inputValue = ''
      return
    }
    // 内容合理
    row.attr_vals.push(row.inputValue.trim())
    row.inputVisible = false
    row.inputValue = ''
    const { data: res } = await apiAddParamTag(this.cateId, row.attrid, { attr_name: row.attr_name, attr_sel: row.attr_sel, attr_vals: row.attr_vals.join(' ') })
    if (res.meta.status !== 200) return this.$message.error(res.meta.msg)
    this.$message.success(res.meta.msg)
    },
    showInput (row) {
      row.inputVisible = true
      // $nextTick 就是页面元素重新渲染之后调用的代码
      this.$nextTick(_ => { // 文本框自动获得焦点
          this.$refs.saveTagInput.$refs.input.focus()
        })
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
.el-tag{
margin:  10px;
}
</style>
