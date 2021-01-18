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
        <el-tab-pane label="动态参数" name="many" :disabled="isBtnDisabled"><el-button size="mini" type="primary" :disabled="isBtnDisabled">添加参数</el-button></el-tab-pane>
        <el-tab-pane label="静态属性" name="only" :disabled="isBtnDisabled"><el-button size="mini" type="primary" :disabled="isBtnDisabled">添加属性</el-button></el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
import { apiGetCateList } from '../../api'
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
      activeName: 'first'
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
        const { data: res } = await apiGetCateList()
        console.log(res)
      } else {
        this.selectedCateKeys = []
      }
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
</style>
