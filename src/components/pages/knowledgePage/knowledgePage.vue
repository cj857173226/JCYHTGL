<template>
  <div id="knowledge">
    <div id="knowledge-header">
      <span class="knowledge-icon">
        <i class="fa fa-graduation-cap"></i>
      </span>
      <span class="knowledge-title">知识库</span>
      <div class="search-wrap clearfix">
        <input class="search-ipt" type="text" placeholder="请输入内容" v-model="keyword">
        <span class="search-btn" @click="searchBtn">
          <i class="iconfont icon-sousuo"></i>
        </span>
      </div>
    </div>
    <div id="knowledge-content" v-loading.lock="isLoad" @scroll="handleScroll">
      <ul>
        <li v-for="item in knowledgeData">
          <div class="item-header">
            <span :class="['item-type',item.SSLB == '理论研究'?'':'type-blue']">{{item.SSLB}}</span>
            <span class="item-title" @click="checkDetail(item)">{{item.BT}}</span>
          </div>
          <div class="item-content">
            <!-- <span>{{item.NR}}</span> -->
            <span v-html="item.NR"></span>
          </div>
          <div class="item-time">
            <span>{{item.LY}}:{{item.FBSJ}}</span>
          </div>
        </li>
        <li class="load-more" v-show="knowledgeData.length>=10" v-loading.lock="loadMore">
          <span v-show="noMoreData">已无更多数据</span>
          <span v-show="!noMoreData">继续滑动加载更多...</span>
        </li>
      </ul> 
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return{
      keyword:'', //关键字
      type:'', //类型
      pageNum: 1, //当前页
      pageSize: 10, //每页条数
      knowledgeData: [], //新闻数据
      isLoad:false, //数据加载
      loadMore: false, //加载更多
      noMoreData: false, //无更多数据
    }
  },
  mounted(){
    var _this = this;
    this.isLoad = true;
    this.knowledgeDataGet();
  },
  methods: {
    //鼠标滚动加载
    handleScroll(){
      var _this = this;
      var content = document.getElementById("knowledge-content");
      if(Math.ceil(content.scrollTop)+content.offsetHeight >= content.scrollHeight){
        if(!this.noMoreData){
          this.loadMore = true;
          this.pageNum += 1;
          setTimeout(function(){
            _this.knowledgeDataGet();
          },1000);
        }else{
          return;
        }
      }else{
        return;
      }
    },
    //搜索
    searchBtn(){
      this.knowledgeData = [];
      this.pageNum = 1;
      this.isLoad = true;
      this.knowledgeDataGet();
    },
    //查看详情
    checkDetail(item){
      this.$router.push({path: '/home/knowledgeDetail',query:{id:item.BH}});
    },
    //获取知识库数据
    knowledgeDataGet(){
      var _this = this;
      var params = {
        keyword: _this.keyword,
        type: _this.type,
        p: _this.pageNum,
        ps: _this.pageSize
      }
      this.axios({
        method:'get',
        url: webApi.Knowledge.GetKnowledges.format(params),
        timeout: 10000
      }).then(function(response){
        _this.isLoad = false;
        _this.loadMore = false;
        if(response.data.data.data.length >0){
          _this.noMoreData = false;
          _this.knowledgeData = _this.knowledgeData.concat(response.data.data.data);
        }else{
          _this.noMoreData = true;
        }
      }).catch(function(error){
        _this.isLoad = false;
      })
    }
  }
}
</script>


<style lang="scss" scoped>
  #knowledge{
    overflow: hidden;
    height: 100%;
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
      /*搜索框*/
      .search-wrap{
        float: right;
        background: #FFFFFF;
        height: 42px;
        width: 320px;
        margin-right: 50px;
        margin-top: 4px;
        border: 1px solid #dcdcdc;
        -webkit-border-radius: 8px;
        -moz-border-radius: 8px;
        border-radius: 8px;
        .search-ipt{
          width: 270px;
          float: left;
          font-size: 16px;
          height: 100%;
          border: none;
          padding-left: 10px;
          color: #999999;
          background: transparent;
        }
        .search-btn{
          float: left;
          position: relative;
          height: 100%;
          line-height: 40px;
          width: 48px;
          color: #999999;
          text-align: center;
          cursor: pointer;
        }
        .search-btn:after{
          content: '';
          position: absolute;
          left: 0;
          top: 10px;
          width: 2px;
          height: 20px;
          background: #dcdcdc;
        }
      }
    }
    #knowledge-content{
      padding: 10px 40px;
      height: calc(100% - 40px);
      overflow: auto;
      ul{
        padding: 0;
        li{
          padding: 10px;
          .item-header{
            height: 30px;
            line-height: 30px;
            position: relative;
            margin-bottom: 5px;
            .item-type{
              display: inline-block;
              height: 100%;
              line-height: 30px;
              background: #00a65a;
              color: #fff;
              width: 80px;
              text-align: center;
              margin-right: 5px;
            }
            .type-blue{
              background: #498ec0;
            }
            .item-title{
              font-size: 16px;
              color: #00a65a;
              margin-right: 20px;
            }
            .item-title:hover{
              text-decoration: underline;
              cursor: pointer;
            }
          }
          .item-header:before{
            content:'';
            position: absolute;
            width: 2px;
            height: 2px;
            background: #00a65a;
            top: 50%;
            left: -10px;
          }
          .item-content{
            margin-bottom: 5px;
            span{
              overflow: hidden;
              text-overflow: ellipsis;
              display: -webkit-box;
              -webkit-box-orient: vertical;
              -webkit-line-clamp: 1;
              white-space: nowrap;
              width: 100%;
              display: block;
            }
          }
          .item-time{
            font-size: 12px;
            color: #848484;
          }
        }
        .load-more{
          text-align: center;
          color: #b1b1b1;
        }
      }
    }
  }
  @media (max-width: 1440px) {
    #knowledge{
      #knowledge-header{
        height: 40px;
        .knowledge-icon{
          width: 40px;
          height: 40px;
          line-height: 40px;
        }
        /*搜索框*/
        .search-wrap{
          height: 32px;
          width: 300px;
          .search-ipt{
            width: 260px;
            font-size: 14px;
          }
          .search-btn{
            line-height: 32px;
            width: 38px;
          }
          .search-btn:after{
            content: '';
            left: 0;
            top: 8px;
            width: 2px;
            height: 14px;
          }
        }
      }
    }
  }
</style>
