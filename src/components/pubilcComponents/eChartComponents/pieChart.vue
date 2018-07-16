<template>
  <div id="pieChart_main" style="width: 100%;height:400px;" v-loading="isLoading"></div>
</template>

<script>
  export default {
    name: "pie-chart",
    data() {
      return {
        optionData: "",
        isLoading: false,
      }
    },
    methods : {
      //图表初始化
      initChart() {
        let myChart = echarts.init(document.getElementById('pieChart_main'));
        let _this = this;
        let  option;
        let dataArray = [];
        if(!_this.optionData) {
          _this.isLoading = true;
          _this.axios({
            method: 'post',
            url: webApi.Host + webApi.Stats.CountMonthCluesType,
            timeout: 5000,
          })
            .then(function(res){
              if(res.data.code==0) {
                let dataObj = {};
                let data = res.data.data;
                for(let i in data) {
                  if(data[i].length > 0) {
                    for(let k = 0; k < data[i].length; k++ ) {
                      let XSLB = data[i][k].XSLB;
                      let AMOUNT = data[i][k].AMOUNT;
                      if(!dataObj[XSLB]) {
                        dataObj[XSLB] = AMOUNT;
                      }else {
                        dataObj[XSLB] = Number(dataObj[XSLB]) + AMOUNT;
                      }
                    }
                  }
                }
                for (let i in dataObj) {
                  dataArray.push({value:dataObj[i],name:i})
                }
                option =  _this.getOption(dataArray);
                myChart.setOption(option);
                _this.optionData = dataArray;
                _this.isLoading = false;
              }
            }).catch(function(err) {
            _this.isLoading = false;
            console.log(err)
          })
        }else {
          dataArray = _this.optionData;
          option =  _this.getOption(dataArray);
          myChart.setOption(option);
        }
      },
      //获取option设置
      getOption(data) {
        let option = {
          backgroundColor: '#fff',
          title: {
            text: '线索领域占比图',
            x: 'center'
          },
          tooltip : {
            trigger: 'item',
            formatter: '{b} : {c} ({d}%)'
          },
          series: [
            {
              name: '',
              type: 'pie',
              radius: '55%' ,
              center: [ '50%' , '50%'],
              data: data
            }
          ],
          color: ['#ed9203','#87cefa','#566770','#078840','#6395ec','#db4734']
        };
        return option;
      },
      //窗口改变重绘图表
      resizeWindow() {
        let _this = this;
        window.addEventListener('resize',_this.initChart)
      },
    },
    mounted() {
      this.initChart();//初始化图表
      this.resizeWindow();
    },
    destroyed() {
      window.removeEventListener('resize',this.initChart);
    }
  }
</script>

<style>
</style>
