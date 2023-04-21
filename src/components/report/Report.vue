<template>
  <div>


    <!--    面包屑-->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>数据统计</el-breadcrumb-item>
      <el-breadcrumb-item>报表管理</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card>

      <div id="main" style="width: 600px; height: 400px;"></div>
    </el-card>

  </div>
</template>

<script>
import * as echarts from 'echarts';
import {
  getRepost
} from '@/api'

import _ from 'lodash'
export default {
  name: "Report",

  created() {

  },

  async mounted() {

    // 基于准备好的dom，初始化echarts实例
    var chartDom = document.getElementById('main');
    var myChart = echarts.init(chartDom);


    const result = await getRepost()
    if (result.meta.status !== 200) return this.$message.error(result.meta.msg)

    const resultChart = _.merge(result.data, this.options)
    myChart.setOption(resultChart);
  },

  data() {
    return {
      options: {
        title: {
          text: '用户来源'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#E9EEF3'
            }
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            boundaryGap: false
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ]
      },
    }
  },

  methods: {},
}

</script>

<style lang="less" scoped>

</style>