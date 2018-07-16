<template>
    <div id="main">
        <div id="chart-header">
            本月线索统计
        </div>
        <div id="line-chart-box" v-loading.lock="isLoad">
            <div id="lineChart"></div>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            timeData:[], //时间线数据
            isLoad:false, //数据加载
            //图标参数配置
            option:{
                tooltip: {
                    trigger: 'axis'
                },
                legend: {
                    x:'left',
                    data:['线索总量','关注线索量']
                },
                toolbox: {
                    x:'right',
                    show : true,
                    feature : {
                        dataView : {show: true, readOnly: false},
                        magicType : {show: true, type: ['line', 'bar', 'stack', 'tiled']},
                        restore : {show: true}
                    }
                },
                xAxis: {
                    type: 'category',
                    boundaryGap: false,
                    data: [1,5,10,15,20,25,30]
                },
                yAxis:{
                    type: 'value'
                },
                series: [
                    {
                        name:'线索总量',
                        type: 'line',
                        stack:'总量',
                        data:[220, 182, 191, 234, 290, 330, 310],
                    },
                    {
                        name:'关注线索量',
                        type: 'line',
                        stack:'总量',
                        data:[120, 82, 151, 224, 120, 130, 230],
                    }
                ]
            }
        }
    },
    mounted(){
        var _this = this;
        window.addEventListener('resize',_this.chartInit);
        this.chartInit();
        this.timeDataGet();
    },
    methods:{
        chartInit(){
            var chart = document.getElementById('lineChart');
            var width = document.getElementById('line-chart-box').clientWidth;
            var height = document.getElementById('line-chart-box').clientHeight;
            chart.style.width = width;
            chart.style.height = height;
            var myChart = echarts.init(chart);
            myChart.setOption(this.option);
        },
        timeDataGet(){
            // this.isLoad = true;
            var _this = this;
            
        },
        lineChart(){

        }
    },
    destroyed(){
        window.removeEventListener('resize',this.chartInit);
    }
}
</script>

<style scoped>
    #main{
        width: 100%;
        border: solid 1px #ddd;
        border-radius: 5px;
    }
    #chart-header{
        width: 100%;
        height: 30px;
        line-height: 30px;
        text-align: left;
        border-bottom: solid 1px #ddd;
        border-top: solid 2px #44649e;
        padding-left: 10px;
        font-weight: bold;
    }
    #lineChart{
        width: 100%;
        height: 250px;
    }
    #line-chart-box{
        width: 100%;
        height: 250px;
    }
</style>
