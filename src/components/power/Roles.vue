<template>
  <div>
    <h3>角色列表</h3>
    <!-- 面包屑导航-->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item><a href="/">权限管理</a></el-breadcrumb-item>
      <el-breadcrumb-item>角色列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片视图-->
    <el-card>
      <!--添加角色列表-->
      <el-row>
        <el-col>
          <el-button type="primary">添加角色</el-button>
        </el-col>
      </el-row>
      <el-table :data="rolesList" border stripe>
        <!--展开列-->
        <el-table-column type="expand">
          <template slot-scope="scope">
            <el-row
              :class="['bdbottom', index1 === 0 ? 'bdtop' : '', 'vcenter']"
              v-for="(item1, index1) in scope.row.children"
              :key="item1.authName"
            >
              <!--一级权限-->
              <el-col :span="5">
                <el-tag :closable="true" @close="removeRightById(scope.row, item1.id)">{{
                  item1.authName
                }}</el-tag>
                <i class="el-icon-caret-right"></i>
              </el-col>
              <!--二级权限-->
              <el-col :span="19">
                <el-row
                  :class="[index2 === 0 ? '' : 'bdtop', 'vcenter']"
                  v-for="(item2, index2) in item1.children"
                  :key="item2.authName"
                >
                  <el-col :span="6">
                    <el-tag
                      type="success"
                      :closable="true"
                      @close="removeRightById(scope.row, item2.id)"
                      >{{ item2.authName }}</el-tag
                    >
                    <i class="el-icon-caret-right"></i>
                  </el-col>
                  <el-col :span="18">
                    <el-tag
                      :closable="true"
                      type="warning"
                      :class="[index3 === 0 ? '' : 'bdtop']"
                      v-for="(item3, index3) in item2.children"
                      :key="item3.authName"
                      @close="removeRightById(scope.row, item3.id)"
                      >{{ item3.authName }}</el-tag
                    >
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
            <!-- <pre>
      {{scope.row}}
  </pre>-->
          </template>
        </el-table-column>
        <!--索引列-->

        <el-table-column type="index"></el-table-column>
        <el-table-column lable="角色名称" prop="roleName"></el-table-column>
        <el-table-column lable="角色描述" prop="roleDesc"></el-table-column>
        <el-table-column lable="操作" width="300px">
          <template slot-scope="scope">
            <el-button type="primary" icon="el-icon-edit" size="mini">编辑</el-button>
            <el-button type="danger" icon="el-icon-delete" size="mini">删除</el-button>
            <el-button
              type="warning"
              icon="el-icon-setting"
              size="mini"
              @click="showSetRightDialog(scope.row)"
              >分配权限</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <!--分配权限弹框-->
    <el-dialog
      title="分配权限"
      :visible.sync="setRightdialogVisible"
      width="50%"
    >
      <el-tree :data="rightsList" :props="treeProps" :show-checkbox="true" node-key="id" :default-expand-all="true" :default-checked-keys="defKeys"></el-tree>
      <span slot="footer" class="dialog-footer">
        <el-button @click="setRightdialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="setRightdialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {
  apiGetRolesList,
  apiGetRightsList
} from '../../api'
export default {
  data() {
    return {
      rolesList: [],
      setRightdialogVisible: false, // 控制分配权限对话框显示隐藏
      rightsList: [],
      defKeys: [], // 默认选中的id值数组
      treeProps: { // 树形控件属性绑定
        label: 'authName',
        children: 'children'
      }
    }
  },
  created() {
    this.getRolesList()
  },
  methods: {
    async getRolesList() {
      const {
        data: res
      } = await apiGetRolesList()
      //   console.log(res)
      if (res.meta.status !== 200) {
        return this.$message.error(res.meta.msg)
      }
      this.rolesList = res.data
      this.$message.success(res.meta.msg)
      console.log(this.rolesList)
    },
    async removeRightById(role, id) {
      console.log(role, id)
      const confirmResult = await this.$confirm(
        '此操作将永久删除, 是否继续?',
        '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }
      ).catch((err) => err)
      console.log(confirmResult)
      if (confirmResult !== 'confirm') {
        return this.$message.info('取消了删除操作')
      }
      this.$message.success('确认删除')
    },
    async showSetRightDialog(role) {
      const { data: res } = await apiGetRightsList('tree')
      if (res.meta.status !== 200) {
        return this.$message.error(res.meta.msg)
      }
      console.log(res.data)
      this.rightsList = res.data
      this.defKeys = []
      this.getLeafKeys(role, this.defKeys)
      this.setRightdialogVisible = true
    },
    getLeafKeys(node, arr) {
      if (!node.children) {
        return arr.push(node.id)
      }
      node.children.forEach(item => {
        this.getLeafKeys(item, arr)
      })
    }
  }
}
</script>

<style lang="less" scoped>
.el-tag {
  margin: 7px;
}

.bdtop {
  border-top: 1px solid #ccc;
}

.bdbottom {
  border-bottom: 1px solid #ccc;
}

.el-table {
  margin-top: 10px;
}
</style>
