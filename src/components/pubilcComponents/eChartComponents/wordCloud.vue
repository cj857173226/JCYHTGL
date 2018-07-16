<template>
  <div id="wordCloud_main" style="width: 100%;height: 250px;" v-loading="isLoading"></div>
</template>

<script>
    export default {
        name: "word-cloud",
        data() {
          return {
            optionData: "",
            isLoading: false,
          }
        },
        methods : {
          //图表初始化
          initChart() {
            let myChart = echarts.init(document.getElementById('wordCloud_main'));
            let _this = this;
            let  option ;
            let data = [];
            function createRandomItemStyle() {
              return {
                normal: {
                  color: 'rgb(' + [
                    Math.round(Math.random() * 160),
                    Math.round(Math.random() * 160),
                    Math.round(Math.random() * 160)
                  ].join(',') + ')'
                }
              };
            }
            if(!_this.optionData) {
              _this.isLoading = true;
              _this.axios({
                url: webApi.Host + webApi.Clue.GetWebClueKeywordFreq,
                timeout: 5000,
              })
                .then(function(res){
                  if(res.data.code==0) {
                    data = res.data.data;
                    data.forEach(function(item){
                      let color = createRandomItemStyle();
                      item['name'] = item['Key'];
                      delete item['Key']
                      item['value'] = item['Value'];
                      delete item['Value']
                      item['itemStyle'] = color;
                    })
                    option =  _this.getOption(data);
                    myChart.setOption(option);
                    _this.optionData = data;
                    _this.isLoading = false;
                  }
                }).catch(function(err) {
                _this.isLoading = false;
                console.log(err)
              })
            }else {
              data = _this.optionData;
              option =  _this.getOption(data);
              myChart.setOption(option);
            }
          },
          //获取option设置
          getOption(data) {
            let option = {
              backgroundColor: '#fff',
              title: {
                text: '活跃关键词',
                x:'center'
              },
              tooltip: {
                show: true
              },
              series: [{
                name: '活跃关键词',
                type: 'wordCloud',
                size: ['100%', '80%'],
                textRotation : [0,0],
                textPadding: 0,
                autoSize: {
                  enable: true,
                  minSize: 16
                },
                data: data
              }]
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

<style scoped>

</style>
