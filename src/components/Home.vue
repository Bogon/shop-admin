<template>

  <el-container class="home-container">
    <!-- 头部区域 -->
    <el-header>
      <div>
        <img src="@/assets/heima.png">
        <span>电商后台管理系统</span>
      </div>
      <el-button type="info" @click="logout">退出</el-button>
    </el-header>
    <el-container>
      <el-aside :width="isOpen ? '64px' : '200px'">
        <div class="toggle-button" @click="toggleCollapse">|||</div>
        <el-menu
                :default-active="activePath"
                :router="true"
                :collapse="isOpen"
                :collapse-transition="false"
                background-color="#3D366A"
                text-color="#fff"
                active-text-color="#ffd04b"
                unique-opened>
          <!--          一级菜单-->
          <el-submenu v-for="item in menuList" :key="item.id" :index="'/' + item.path">
            <!--            一级菜单模版区域-->
            <template slot="title">
              <!--              图标-->
              <i :class="iconsObj[item.id + '']"></i>
              <!--              文本-->
              <span>{{ item.authName }}</span>
            </template>
            <!--            二级菜单-->
            <el-menu-item :index="'/' + subitem.path"
                          v-for="subitem in item.children"
                          :key="subitem.id"
                          @click="saveNavState('/'+subitem.path)">
              <template slot="title">
                <!--              图标-->
                <i class="el-icon-menu"></i>
                <!--              文本-->
                <span>{{ subitem.authName }}</span>
              </template>
            </el-menu-item>
          </el-submenu>

        </el-menu>

      </el-aside>
      <!--      中间区域-->
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>

</template>

<script>
import {getMenus} from '@/api'

export default {
  name: "Home",
  // 左侧菜单数据
  data() {
    return {
      menuList: [],
      iconsObj: {
        '125': 'iconfont icon-users',
        '103': 'iconfont icon-tijikongjian',
        '101': 'iconfont icon-shangpin',
        '102': 'iconfont icon-danju',
        '145': 'iconfont icon-baobiao',
      },
      isOpen: false,
      activePath: ''
    }
  },

  async created() {
    const result = await getMenus()
    if (result.meta.status != 200) return this.$message.error(result.meta.msg)
    this.menuList = result.data
    this.activePath = window.sessionStorage.getItem('activePath')
  },

  methods: {
    // 退出登录
    logout() {
      window.sessionStorage.clear()
      this.$router.push('/login')
    },
    // 点击按钮
    toggleCollapse() {
      this.isOpen = !this.isOpen
    },
    // 保存点击的状态
    saveNavState(activePath) {
      window.sessionStorage.setItem('activePath', activePath)
      this.activePath = activePath
    }
  }
}
</script>

<style lang="less" scoped>

.home-container {
  height: 100%;
}

.toggle-button {
  background-color: #3a87ad;
  font-size: 10px;
  line-height: 24px;
  color: #fff;
  text-align: center;
  letter-spacing: 0.2em;
  cursor: pointer;
}

.el-header {
  background-color: #3D366A;
  display: flex;
  justify-content: space-between;
  padding-left: 0px;
  align-items: center;
  color: #fff;
  font-size: 20px;

  > div {
    display: flex;
    align-items: center;

    span {
      margin-left: 15px;
    }
  }
}

.el-aside {
  background-color: #3D366A;

  .el-menu {
    border-right: none;
  }
}

.el-main {
  background-color: #eaedf1;

}

.iconfont {
  margin-right: 5px;
}

</style>