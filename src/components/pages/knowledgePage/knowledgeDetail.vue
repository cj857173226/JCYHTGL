<template>
  <div id="knowledge-detail">
    <div id="knowledge-header">
      <span class="knowledge-icon">
        <i class="fa fa-graduation-cap" ></i>
      </span>
      <span class="knowledge-title"><span class="back-btn" @click="backNav">知识库</span>/详情</span>
    </div>
    <div id="knowledge-content">
      <div id="knowledge-name">
        {{knowledgeData.BT}}
      </div>
      <div id="knowledge-info">
        <span>时间:{{knowledgeData.FBSJ}}</span>
        <span>来源:{{knowledgeData.LY}}</span>
      </div>
      <div id="knowledge-text">
        <span>
          <pre>{{knowledgeData.NR}}</pre>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return{
      knowledgeData:{}
    }
  },
  mounted(){
    this.getknowledgeData();
  },
  methods:{
    //返回
    backNav(){
      this.$router.go(-1);
    },
    //获取数据
    getknowledgeData(){
      var _this = this;
      this.axios({
        method: 'get',
        url: webApi.Knowledge.Get.format({id:this.$route.query.id}),
        timeout: 1000
      }).then(function(response){
        _this.knowledgeData = response.data.data[0];
      }).catch(function(error){

      })
    }
  }
}
</script>


<style lang="scss" scoped>
#knowledge-detail{
  #knowledge-header{
    width: 100%;
    height: 50px;
    background: #EEEEEE;
    border-bottom: 1px solid #dcdcdc;
    .knowledge-icon{
      display: inline-block;
      width: 50px;
      height: 50px;
      line-height: 50px;
      text-align: center;
      font-size: 16px;
      border-right: 1px solid #dcdcdc;
      color: #666666;
    }
    .knowledge-title{
      padding-left: 10px;
    }
    .back-btn{
      cursor: pointer;
    }
    .back-btn:hover{
      color:#00a65a;
    }
  }
  #knowledge-content{
    #knowledge-name{
      text-align: center;
      font-size: 18px;
      height: 60px;
      line-height: 60px;
      color: #00a65a;
    }
    #knowledge-info{
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
    #knowledge-text{
      padding: 10px;
      span{
        line-height: 35px;
        display: block;
        pre{
          white-space: pre-wrap;
          color: #333;
        }
      }
    }
  }
}
@media (max-width: 1440px) {
  #knowledge-detail{
    #knowledge-header{
      height: 40px;
      .knowledge-icon{
        width: 40px;
        height: 40px;
        line-height: 40px;
      }
    }
  }
}
</style>
