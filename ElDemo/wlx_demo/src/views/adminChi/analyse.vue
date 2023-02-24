<template>
    <div class="analyse">
        <div class="bingImage" ref="myChart">饼图</div>
    </div>
</template>
  
<script>
//核心模块接口
import * as echarts from 'echarts/core';
import { PieChart } from 'echarts/charts';
// 引入提示框，标题，直角坐标系，数据集，内置数据转换器组件，组件后缀都为 Component
import {
    TitleComponent,
    TooltipComponent,
    GridComponent,
    DatasetComponent,
    TransformComponent
} from 'echarts/components';
// 标签自动布局，全局过渡动画等特性
import { LabelLayout, UniversalTransition } from 'echarts/features';
// 引入 Canvas 渲染器，注意引入 CanvasRenderer 或者 SVGRenderer 是必须的一步
import { CanvasRenderer } from 'echarts/renderers';
// 注册必须的组件
echarts.use([
    TitleComponent,
    TooltipComponent,
    GridComponent,
    DatasetComponent,
    TransformComponent,
    PieChart,
    LabelLayout,
    UniversalTransition,
    CanvasRenderer
]);


export default {
    name: 'analyse',
    data() {
        return {
            goodsData: [],
        }
    },
    methods: {
        async initData() {
            let ress = await this.$axios.get("/node/login/getPieChartData")
            // console.log(ress.data);
            let myChart = echarts.init(this.$refs.myChart)
            //设置数据
            // let data = [
            //     { value: 11, name: "food" },
            //     { value: 66, name: "goods" },
            //     { value: 41, name: "car" },
            //     { value: 12, name: "hat" },
            //     { value: 32, name: "egg" },
            // ]
            let option = {
                title: {
                    text: "商品种类数量占比",
                    left: "center"
                },
                series: [
                    {
                        name: "数量统计",
                        type: "pie",  //设置为饼状图
                        data: ress.data
                    }
                ]
            }
            myChart.setOption(option)
        }
    },
    mounted() {
        this.initData()
    }
}
</script>
  
<style lang="less">
.bingImage {
    margin: 20px auto;
    width: 600px;
    height: 450px;
    // background-color: antiquewhite;
}
</style>