<template>

  <div>

    <!--    头部导航-->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>权限列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!--   卡片试图-->
    <el-card>

      <!--    中间表格-->
      <el-table
              :data="rights"
              border
              style="width: 100%"
              stripe>
        <el-table-column type="index" label="#" width="60px"></el-table-column>
        <el-table-column
                prop="authName"
                label="权限名称">
        </el-table-column>
        <el-table-column
                prop="path"
                label="路径">
        </el-table-column>
        <el-table-column
                prop="level"
                label="权限等级">
          <template v-slot:default="scope">

            <el-tag v-if="scope.row.level === '0'">一级</el-tag>
            <el-tag v-else-if="scope.row.level === '1'" type="success">二级</el-tag>
            <el-tag v-else type="warning">三级</el-tag>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

  </div>
</template>

<script>

import {getRights} from "@/api";

export default {
  name: "Rights",

  data() {
    return {
      rights: []
    }
  },

  created() {
    this.getRights()
  },

  methods: {

    //   获取权限列表 list
    async getRights() {
      const result = await getRights('list')
      if (result.meta.status != 200) {
        return this.$message.error(result.meta.msg)
      }
      this.rights = result.data
    }
  }
}
</script>

<style scoped lang="less">

</style>