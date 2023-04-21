<template>
  <div>

    <!--    面包屑-->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>订单管理</el-breadcrumb-item>
      <el-breadcrumb-item>订单列表</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card>

      <!--      头部搜索-->
      <el-row>
        <el-input placeholder="请输入内容" v-model="orderForm.query" class="input-with-select">
          <el-button slot="append" icon="el-icon-search" @click="filterOrder"></el-button>
        </el-input>
      </el-row>

      <!--      中间列表-->
      <el-row>

        <el-table border stripe :data="orderList">
          <el-table-column label="#" type="index"></el-table-column>
          <el-table-column label="订单编号" prop="order_number"></el-table-column>
          <el-table-column label="订单价格" prop="order_price"></el-table-column>
          <el-table-column label="是否付款" prop="pay_status">
            <template v-slot:default="scope">
              <el-tag type="danger" v-if="scope.row.pay_status === '0'">未付款</el-tag>
              <el-tag type="success" v-else>已付款</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="是否发货" prop="is_send"></el-table-column>
          <el-table-column label="下单时间" prop="update_time">
            <template v-slot:default="scope">
              {{ scope.row.update_time | dateFromat }}
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template v-slot:default="scope">
              <el-button type="primary" icon="el-icon-edit" size="mini"
                         @click="editAddressOrder(scope.row)"></el-button>
              <el-button type="success" icon="el-icon-location" size="mini" @click="showProcess(scope.row)"></el-button>
            </template>
          </el-table-column>
        </el-table>

      </el-row>

      <!--      尾部视图-->
      <el-row>
        <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="orderForm.pagenum"
                :page-sizes="[20, 40, 60, 100]"
                :page-size="orderForm.pagesize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total">
        </el-pagination>
      </el-row>

    </el-card>

    <el-dialog
            title="修改地址"
            :visible.sync="editAddressDialogVisible"
            width="50%"
            :before-close="dialogClose">

      <el-form ref="addressFormRef"
               :model="addressForm"
               label-width="100px" :rules="addressFormRules">
        <el-form-item label="省市区/县" prop="address">
          <el-cascader
                  v-model="addressForm.addrssValue"
                  :options="cityOptions"
                  @change="handleChange"></el-cascader>
        </el-form-item>

        <el-form-item label="详细地址" prop="detail">
          <el-input v-model="addressForm.detailAddr" clearable></el-input>
        </el-form-item>
      </el-form>
    </el-dialog>


    <el-dialog
            title="物流进度"
            :visible.sync="processDialogVisible"
            width="50%"
            :before-close="processDialogClose">

      <el-timeline>
        <el-timeline-item
                v-for="(activity, index) in activityList"
                :key="index"
                :timestamp="activity.ftime">
          {{activity.context}}
        </el-timeline-item>
      </el-timeline>

    </el-dialog>

  </div>
</template>

<script>
import {
  getOrders,
  // processInfo,
} from '@/api'

import cityOptions from './city_data'

export default {
  name: "Order",

  created() {
    this.getOrderList()
  },

  data() {
    return {
      searchValue: '',
      orderForm: {
        query: '',
        pagenum: 1,
        pagesize: 20,
      },
      orderList: [],
      total: 0,
      editAddressDialogVisible: false,
      addressForm: {
        addrssValue: [],
        detailAddr: ''
      },
      props: {
        expandTrigger: 'hover',
        label: '',
        value: '',
        children: 'children'
      },
      cityOptions,
      addressFormRules: {
        address: [
          {required: true, message: '请选择省市区县', trigger: 'blur'}
        ],
        detail: [
          {required: true, message: '请输入详细地址', trigger: 'blur'},
          {min: 2, max: 100, message: '请输入详细地址', trigger: 'blur'}
        ]
      },
      processDialogVisible: false,
      activityList: [
        {
          "time": "2018-05-10 09:39:00",
          "ftime": "2018-05-10 09:39:00",
          "context": "已签收,感谢使用顺丰,期待再次为您服务",
          "location": ""
        },
        {
          "time": "2018-05-10 08:23:00",
          "ftime": "2018-05-10 08:23:00",
          "context": "[北京市]北京海淀育新小区营业点派件员 顺丰速运 95338正在为您派件",
          "location": ""
        },
        {
          "time": "2018-05-10 07:32:00",
          "ftime": "2018-05-10 07:32:00",
          "context": "快件到达 [北京海淀育新小区营业点]",
          "location": ""
        },
        {
          "time": "2018-05-10 02:03:00",
          "ftime": "2018-05-10 02:03:00",
          "context": "快件在[北京顺义集散中心]已装车,准备发往 [北京海淀育新小区营业点]",
          "location": ""
        },
        {
          "time": "2018-05-09 23:05:00",
          "ftime": "2018-05-09 23:05:00",
          "context": "快件到达 [北京顺义集散中心]",
          "location": ""
        },
        {
          "time": "2018-05-09 21:21:00",
          "ftime": "2018-05-09 21:21:00",
          "context": "快件在[北京宝胜营业点]已装车,准备发往 [北京顺义集散中心]",
          "location": ""
        },
        {
          "time": "2018-05-09 13:07:00",
          "ftime": "2018-05-09 13:07:00",
          "context": "顺丰速运 已收取快件",
          "location": ""
        },
        {
          "time": "2018-05-09 12:25:03",
          "ftime": "2018-05-09 12:25:03",
          "context": "卖家发货",
          "location": ""
        },
        {
          "time": "2018-05-09 12:22:24",
          "ftime": "2018-05-09 12:22:24",
          "context": "您的订单将由HLA（北京海淀区清河中街店）门店安排发货。",
          "location": ""
        },
        {
          "time": "2018-05-08 21:36:04",
          "ftime": "2018-05-08 21:36:04",
          "context": "商品已经下单",
          "location": ""
        }
      ]
    }
  },

  methods: {
    async getOrderList() {
      const result = await getOrders(this.orderForm)
      console.log(result)
      if (result.meta.status != 200) return this.$message.error(result.meta.msg)
      this.orderList = result.data.goods
      this.total = result.data.total
    },

    editAddressOrder(row) {
      console.log(row)
      this.editAddressDialogVisible = true

    },

    handleChange(){

    },

    dialogClose() {
      this.editAddressDialogVisible = false
    },

    handleSizeChange(newSize) {
      this.orderForm.pagesize = newSize
      this.getOrderList()
    },

    handleCurrentChange(newPage) {
      this.orderForm.pagenum = newPage
      this.getOrderList()
    },

    filterOrder() {
      this.getOrderList()
    },

    processDialogClose() {
      this.processDialogVisible = false
    },

   async  showProcess(row) {
      this.processDialogVisible = true
      console.log(row)

      // if (row.is_send === '是') {
      //   this.editAddressDialogVisible = true
        // const result =  await processInfo('1106975712662')
        // console.log(result)
        // if (result.meta.status !== 200) return this.$message.error(result.meta.msg)
      // } else {
      //   this.$message.info("尚未发货")
      // }

    },
  }

}
</script>

<style lang="less" scoped>

.input-with-select {
  width: 30%;
}

</style>