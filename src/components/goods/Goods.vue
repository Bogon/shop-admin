<template>
  <div>

    <!--    面包屑-->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品列表</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card>

      <!--    展示搜索-->
      <el-row>
        <el-input placeholder="请输入内容"
                  v-model="searchValue"
                  class="input-with-select" clearable @clear="searchGoods">
          <el-button slot="append" icon="el-icon-search" @click="searchGoods"></el-button>
        </el-input>
        <el-button type="primary" class="add-goods" @click="goAddPage">添加商品</el-button>
      </el-row>

      <!--    中间内容区域-->
      <el-row>

        <el-table fit style="width: 100%" :data="goodsList" stripe border>

          <el-table-column align="center" type="index" label="#"></el-table-column>

          <el-table-column align="left" width="400" label="商品名称" prop="goods_name"></el-table-column>
          <el-table-column align="center" label="商品价格(元)" prop="goods_price"></el-table-column>
          <el-table-column align="center" label="商品重量" prop="goods_weight"></el-table-column>
          <el-table-column align="center" label="创建时间" prop="add_time">
            <template v-slot:default="scope">
              {{ scope.row.add_time | dateFromat }}
            </template>
          </el-table-column>
          <el-table-column align="center" label="操作">
            <template v-slot:default="scope">
              <el-button type="primary" icon="el-icon-edit" size="mini" @click="goEditPage(scope.row)"></el-button>
              <el-button type="danger" icon="el-icon-delete" size="mini"
                         @click="deleteGoodsById(scope.row)"></el-button>
            </template>
          </el-table-column>


        </el-table>

      </el-row>

      <!--    底部分页区域-->
      <el-row>
        <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="pagenum"
                :page-sizes="[15, 30, 45, 100]"
                :page-size="pagesize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total">
        </el-pagination>

      </el-row>

    </el-card>

  </div>
</template>

<script>
import {
  getGoodsList,
  deleteGoods,
} from "@/api";


export default {
  name: "Goods",

  created() {
    this.getGoods()
  },

  data() {
    return {
      searchValue: '',
      goodsList: [],
      pagenum: 1,
      pagesize: 15,
      total: 0,
    }
  },

  methods: {

    //  获取商品列表
    async getGoods() {
      const result = await getGoodsList({query: this.searchValue, pagenum: this.pagenum, pagesize: this.pagesize})
      if (result.meta.status !== 200) return this.$message.error(result.meta.msg)
      this.goodsList = result.data.goods
      this.total = result.data.total
    },

    handleSizeChange(newSize) {
      this.pagesize = newSize
      this.getGoods()
    },

    handleCurrentChange(newPage) {
      this.pagenum = newPage
      this.getGoods()
    },

    searchGoods() {
      this.pagenum = 1
      this.getGoods()
    },

    // 删除商品
     deleteGoodsById(row) {
      this.$confirm('此操作将永久删除该商品, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const result = await deleteGoods(row.goods_id)
        if (result.meta.status !== 200) return this.$message.error(result.meta.msg)
        this.$message({
          type: 'success',
          message: '删除成功!'
        });
        await this.getGoods()
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },

    // 添加商品
    goAddPage() {
      this.$router.push('/goods/add')
    },

    goEditPage(row) {
      this.$router.push({path: `/goods/edit/${row.goods_id}`})
    },


  },

  computed: {}

}
</script>

<style lang="less" scoped>

.input-with-select {
  width: 30%;
}

.add-goods {
  margin-left: 15px;
}

</style>