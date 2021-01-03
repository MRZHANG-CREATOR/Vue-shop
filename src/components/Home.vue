<template>
  <el-container class="home-container">
    <!--头部-->
    <el-header>
      <div>
        <img src="../assets/kid.jpg" alt="" />
        <span>电商管理系统</span>
      </div>
      <el-button type="info" @click="logout">退出</el-button>
    </el-header>
    <el-container>
      <!--侧边栏-->
      <el-aside :width="isCollapse ? '64px' : '200px'">
        <div class="toggle-button" @click="toggleCollapse">|||</div>
        <el-menu
          class="el-menu-vertical-demo"
          background-color="#333744"
          text-color="#fff"
          active-text-color="#409eff"
          :unique-opened="true"
          :collapse="isCollapse"
          :collapse-transition="false"
          router
          :default-active="'/' + activePath"
        >
          <el-submenu
            :index="item.id + ''"
            v-for="item in menuList"
            :key="item.id"
          >
            <!--一级菜单模板区域-->
            <template slot="title">
              <i :class="iconObj[item.id]"></i>
              <span>{{ item.authName }}</span>
            </template>
            <!--二级菜单模板区域-->
            <el-menu-item
              :index="'/' + subItem.path"
              v-for="subItem in item.children"
              :key="subItem.id"
              @click="saveNavState(subItem.path)"
            >
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span>{{ subItem.authName }} </span>
              </template>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <!--主体-->
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import { apiGetMenuList } from '../api'
export default {
  created() {
    this.getMenuList()
    this.activePath = window.sessionStorage.getItem('activePath')
  },
  data() {
    return {
      menuList: [], // 侧边栏菜单数据
      iconObj: {
        101: 'iconfont icon-user',
        102: 'iconfont icon-tijikongjian',
        103: 'iconfont icon-shangpin',
        104: 'iconfont icon-danju',
        105: 'iconfont icon-baobiao'
      },
      isCollapse: false, // 是否折叠侧边栏
      activePath: '' // 激活的链接地址
    }
  },
  methods: {
    logout() {
      window.sessionStorage.clear()
      this.$router.push('/login')
    },
    async getMenuList() {
      // 获取菜单列表
      const res = await apiGetMenuList()
      if (res.meta.status !== 200) return this.$message.error(res.meta.msg)
      this.menuList = res.data
    },
    toggleCollapse() {
      // 侧边栏折叠展开
      this.isCollapse = !this.isCollapse
    },
    // 保存链接激活状态
    saveNavState(activePath) {
      window.sessionStorage.setItem('activePath', activePath)
      this.activePath = activePath
    }
  }
}
</script>
<style lang="less" scoped>
.el-header {
  background-color: #373d41;
  display: flex;
  align-items: center;
  justify-content: space-between;

  div {
    display: flex;
    align-items: center;

    img {
      height: 50px;
      width: 50px;
      border-radius: 50%;
    }
    span {
      height: 100%;
      font-size: 20px;
      color: #fff;
      line-height: 100%;
      margin-left: 15px;
    }
  }
}
.el-aside {
  background-color: #333744;
  .toggle-button {
    line-height: 24px;
    text-align: center;
    font-size: 10px;
    background-color: #4a5064;
    color: #fff;
    letter-spacing: 0.5em;
    // 设置字母间距
    cursor: pointer;
    // 鼠标经过显示小手
  }

  .el-menu {
    border: 0;
  }
}
.el-main {
  background-color: #ccc;
}
.home-container {
  height: 100%;
}
.iconfont {
  margin-right: 10px;
}
</style>
