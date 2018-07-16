<template>
    <div id="main">
        <div id="chart-header">
            线索来源数据分析
        </div>
        <div id="pie-chart-box">
            <div id="choose-type">
                <ul>
                    <li :class="['cue-type',isNav == 1?'active':'']" @click="changeNav(1)">全部</li>
                    <li :class="['cue-type',isNav == 2?'active':'']" @click="changeNav(2)">举报线索</li>
                    <li :class="['cue-type',isNav == 3?'active':'']" @click="changeNav(3)">互联网线索</li>
                    <li :class="['cue-type',isNav == 4?'active':'']" @click="changeNav(4)">公益诉讼线索</li>
                    <li :class="['cue-type',isNav == 5?'active':'']" @click="changeNav(5)">热点线索</li>
                </ul>
            </div>
            <div id="pie-chart" v-loading.lock="isLoad">
                <div v-show="!isLoad&&noData" class="no-data">暂无数据</div>
                <div v-show="!isLoad&&!noData" id="pieChart"></div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            noData: false, //暂无数据
            allType: [], //全部类型数据
            internetType: [], //举报线索数据
            reportType: [], //互联网线索数据
            isLoad:false,
            isNav:1, //饼状图切换
        }
    },
    mounted(){
        var _this = this;
        this.pieDataGet();
        window.addEventListener('resize',_this.changeNav);
    },
    methods: {
        chartInit(data){
            var option = {
                legend:{
                    x: 'left',
                    y: 'bottom',
                    data: []
                },
                tooltip : {
                    trigger: 'item',
                    formatter: "{a} <br/>{b} : {c} ({d}%)"
                },
                series:[
                    {
                        name:'线索来源',
                        type:'pie',
                        radius:'55%',
                        center:['50%',120],
                        data:data
                    }
                ],
                color: ['#ed9203','#87cefa','#566770','#078840','#6395ec','#db4734']
            }
            var chart = document.getElementById('pieChart');
            var width = document.getElementById('pie-chart').clientWidth;
            var height = document.getElementById('pie-chart').clientHeight;
            chart.style.width = width + 'px';
            chart.style.height = height + 'px';
            var myChart = echarts.init(chart);
            myChart.setOption(option);
        },
        //切换导航
        changeNav(index){
            if(arguments[0].type != 'resize'){
                this.isNav = index;
            }
            if(this.isNav == 1 && this.allType.length > 0){
                this.noData = false;
                this.chartInit(this.allType);
                return;
            }else if(this.isNav == 2 && this.reportType.length > 0){
                this.noData = false;
                this.chartInit(this.reportType);
                return;
            }else if(this.isNav == 3 && this.internetType.length > 0){
                this.noData = false;
                this.chartInit(this.internetType);
                return;
            }
            this.noData = true;
        },
        //数据获取
        pieDataGet(){
            var _this = this;
            this.isLoad = true;
            this.axios({
                method: 'post',
                url: webApi.Host + webApi.Stats.CountMonthCluesType,
                timeout:10000,
            }).then(function(response){
                var msg = response.data;
                _this.isLoad = false;
                if(msg.code == 0){
                    //其他类型
                    if(msg.data.internetCluesType.length > 0){
                        for(var i = 0;i<msg.data.internetCluesType.length;i++){
                            var obj = {
                                value:'',
                                name:'',
                            };
                            obj.value = msg.data.internetCluesType[i].AMOUNT;
                            obj.name = msg.data.internetCluesType[i].XSLB;
                            _this.internetType.push(obj);
                        }
                    }else if(msg.data.reportCluesType.length > 0){
                        for(var i = 0;i<msg.data.reportCluesType.length;i++){
                            var obj = {
                                value:'',
                                name:'',
                            };
                            obj.value = msg.data.reportCluesType[i].AMOUNT;
                            obj.name = msg.data.reportCluesType[i].XSLB;
                            _this.reportType.push(obj);
                        }
                    }
                    var obj = {};
                    for(var i in msg.data){
                        if(msg.data[i].length > 0){
                            for(var j = 0;j<msg.data[i].length;j++){
                                var XSLB = msg.data[i][j].XSLB;
                                var AMOUNT = msg.data[i][j].AMOUNT;
                                if(!obj[XSLB]){
                                    obj[XSLB] = AMOUNT;
                                }else{
                                    obj[XSLB] += AMOUNT;
                                }
                            }
                        }
                    }
                    for(var i in obj){
                        var a = {
                            name: '',
                            value: '',
                        }
                        a.name = i;
                        a.value = obj[i];
                        _this.allType.push(a);
                    }
                    console.log(_this.reportType);
                    console.log(_this.internetType);
                    _this.changeNav(_this.isNav);
                }else{

                }
            }).catch(function(error){

            })
        }
    },
    destroyed(){
        var _this = this;
        window.removeEventListener('resize',_this.changeNav);
    }
}
</script>

<style lang="scss" scoped>
    #main{
        width: 100%;
        border: solid 1px #ddd;
        border-radius: 5px;
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
        #pie-chart-box{
            width: 100%;
            #choose-type{
                width: 100px;
                float: left;
                border-right: solid 1px #ddd;
                ul{
                    padding: 0;
                    .cue-type{
                        height: 50px;
                        line-height: 50px;
                        cursor: pointer;
                        text-align: center;
                    }
                    .active{
                        color: #fff;
                        background: #00a65a;
                    }
                }
            }
            #pie-chart{
                width: calc(100% - 100px);
                height: 250px;
                margin-left: 100px;
                .no-data{
                    font-size: 18px;
                    font-weight: bold;
                    line-height: 250px;
                    text-align: center;
                }
            }
        }
    }
</style>
