<template>
  <div id="news-detail">
    <div id="news-header">
      <span class="news-icon">
        <i class="fa fa-camera" ></i>
      </span>
      <span class="news-title"><span class="back-btn" @click="backNav">新闻动态</span>/详情</span>
    </div>
    <div id="news-content">
      <div id="news-name">
        {{newsData.BT}}
      </div>
      <div id="news-info">
        <span>时间:{{newsData.FBSJ}}</span>
        <span style="max-width: 66%">作者:{{newsData.RENM}}</span>
        <span>来源:{{newsData.LY}}</span>
        <span class="origin-address" @click="originAddress">查看源地址</span>
      </div>
      <div id="news-text">
        <span v-html="newsData.NR"></span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return{
      newsData:{}
    }
  },
  mounted(){
    this.getNewsData();
  },
  methods:{
    //返回
    backNav(){
      this.$router.push({
        path:'/home/news'
      });
    },
    //查看源地址
    originAddress(){
      window.open(this.newsData.SJDZ);
    },
    //获取数据
    getNewsData(){
      var _this = this;
      this.axios({
        method: 'get',
        url: webApi.News.Get.format({id:this.$route.query.id}),
        timeout: 1000
      }).then(function(response){
        _this.newsData = response.data.data[0];
        var text = _this.newsData.NR;
        _this.newsData.NR = text.replace(/<\/br>/g,'</br></br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;');
        _this.newsData.NR = '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' + _this.newsData.NR;

      }).catch(function(error){

      })
    }
  }
}
</script>


<style lang="scss" scoped>
#news-detail{
  #news-header{
    width: 100%;
    height: 50px;
    background: #EEEEEE;
    border-bottom: 1px solid #dcdcdc;
    .news-icon{
      display: inline-block;
      width: 50px;
      height: 50px;
      line-height: 50px;
      text-align: center;
      font-size: 16px;
      border-right: 1px solid #dcdcdc;
      color: #666666;
    }
    .news-title{
      padding-left: 10px;
    }
    .back-btn{
      cursor: pointer;
    }
    .back-btn:hover{
      color:#00a65a;
    }
  }
  #news-content{
    
    #news-name{
      text-align: center;
      font-size: 18px;
      height: 60px;
      line-height: 60px;
      color: #00a65a;
      position: relative;
      .back-btn{
        position: absolute;
        top: 50%;
        left: 10px; 
        margin-top: -10px;
        color: #00a65a;
        cursor: pointer;
      }
    }
    #news-info{
      border-bottom: solid 1px #ddd;
      font-size: 12px;
      padding-bottom: 5px;
      color: #969696;
      span{
        display: inline-block;
        padding: 0 10px;
      }
      .origin-address{
        float: right;
        color: #00a65a;
        cursor: pointer;
        text-decoration: underline;
      }
    }
    #news-text{
      padding: 10px;
      span{
        line-height: 25px;
        display: block;
      }
    }
  }
}
@media (max-width: 1440px) {
  #news-detail{
    #news-header{
      height: 40px;
      .news-icon{
        width: 40px;
        height: 40px;
        line-height: 40px;
      }
    }
  }
}
</style>
