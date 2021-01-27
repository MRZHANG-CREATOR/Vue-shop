<template>
    <div>
<h3>数据报表</h3>
<!-- 面包屑导航-->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item><a href="/">数据管理</a></el-breadcrumb-item>
      <el-breadcrumb-item>数据报表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片视图-->
    <el-card>
        <!-- 为 ECharts 准备一个具备大小（宽高）的 DOM -->
        <div id="main" style="width: 600px;height:400px;"></div>
    </el-card>
    </div>
</template>

<script>
import { apiGetReport } from '../../api'
import { init } from 'echarts'
    export default {
        data() {
            return {
                // 指定图表的配置项和数据
            option1: {
            title: {
                text: 'ECharts 数据统计'
            },
            tooltip: {},
            legend: {
                data: ['销量']
            },
            xAxis: {
                data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
            },
            yAxis: {},
            series: [{
                name: '销量',
                type: 'bar',
                data: [5, 20, 36, 10, 10, 20]
            }]
            },
            options2: {
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
          }
            }
        },
        async mounted () { // 此时页面元素渲染完毕
            // 基于准备好的dom，初始化echarts实例
            const myChart = init(document.getElementById('main'))
            const { data: res } = await apiGetReport()
            if (res.meta.status !== 200) return this.$message.error(res.meta.msg)
            const Option = Object.assign(this.option1, res.data)
            // 使用刚指定的配置项和数据显示图表。
            myChart.setOption(Option)
        },
        methods: {
        }
    }
</script>

<style lang="less" scoped>

</style>
