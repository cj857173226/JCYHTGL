<template>
  <div id="internetCue">
    <div class="internet-cue-head clearfix">
      <div class="title-wrap clearfix">
        <div class="title-icon">
          <i class="fa fa-window-restore"></i>
        </div>
        <div class="title">互联网线索</div>
      </div>
      <div class="search-wrap clearfix">
        <input class="search-ipt" type="text" v-model="keyword" placeholder="请输入内容" @keyup.13="searchCue">
        <span class="search-btn" @click="searchCue()">
            <i class="iconfont icon-sousuo"></i>
          </span>
      </div>
      <span @click="explain" style="float:right;color: #676767;margin-right:10px;cursor: pointer;"><span style="color:red;margin-right:10px">审核至少从2017年发布的数据</span><i class="fa fa-question-circle"></i>审核说明</span>
    </div>
    <div class="main-body">
      <div class="cue-filter-wrap">
          <div class="cue-source clearfix">
            <div class="left-title">
                <i class="iconfont icon-caiji"></i>
                采集网站:
            </div>
            <div class="right" style="overflow: inherit;position: relative;">
                <!-- <div v-show="siteList.length>0" class="site-item" :class="{'site-item-on':currSite == item }" @click="clueSiteOder(item)" v-for="(item,index) in siteList" >{{item}}</div> -->
                <div v-show="siteList.length==0"> 无 </div>
                <el-select @change="clueSiteOder()" v-model="currSite" style="margin-left:10px;width: 50%;height: 32px">
                  <el-option v-for="(item,index) in siteList" :value="item" :key="index">{{item}}</el-option>
                </el-select>
                <!-- <div v-show="siteList.length > 0" @click="moreSiteFloat"> 更多 </div>
                <div class="float-box" v-show="moreSite">
                  <div v-show="siteList.length>0" class="site-item" :class="{'site-item-on':currSite == item }" @click="clueSiteOder(item)" v-for="(item,index) in siteList" >{{item}}</div>
                  <span class="close-float" @click="closeFloat">
                    <i class="fa fa-times-circle"></i>
                  </span>
                </div> -->
            </div>
          </div>
          <div class="cue-sort clearfix">
            <div class="left-title">
              <i class="iconfont icon-paixu01"></i>
              选择省市:
            </div>
            <div class="right city-right" style="overflow: inherit;position: relative;">
              <v-distpicker @province="updataProvince" @city="updataCity" @area="updataCounty" style="height: 100%;display:inline-block"></v-distpicker>
              <span class="clear-city" @click="confirmCity">确认</span>
            </div>
          </div>
          <div class="cue-sort clearfix">
            <div class="left-title">
              <i class="fa fa-calendar" style="margin-right: 12px;"></i>
              时间段:
            </div>
            <div class="right">
                <el-date-picker
                    v-model="timeSearch"
                    type="daterange"
                    align="right"
                    range-separator="-"
                    unlink-panels
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    format="yyyy-MM-dd"
                    value-format="yyyy-MM-dd" style="border:none;line-height: 25px;vertical-align: top;">

                </el-date-picker>
                <span class="comfirm-btn" @click="search">确定</span>
            </div>
          </div>
      </div>
      <div class="cue-list" ref="cueList" v-loading="isLoad">
        <el-table
            ref="oTable"
            :data=" internetCueList"
            :max-height="tableH"
            :height="tableH"
            style="width: 100%">
            <el-table-column
                prop="Content"
                label="内容"
                min-width="300">
                <template slot-scope="scope">
                  <el-popover trigger="click" placement="top" width="500">
                      <div slot="reference" class="td-content">
                      {{ scope.row.Content}}
                      </div>
                      <pre style="white-space: pre-wrap; height: 290px; overflow: auto;" v-html="scope.row.Content"></pre>
                  </el-popover>
                </template>
            </el-table-column>
            <el-table-column
                prop="PublishTime"
                label="发布时间"
                min-width="170">
            </el-table-column>
            <el-table-column
                prop="CreatedTime"
                label="采集时间"
                min-width="170">
            </el-table-column>
            <el-table-column
                prop="SiteName"
                label="线索来源"
                width="150">
            </el-table-column>
            <!-- <el-table-column
                label="所属地域"
                min-width="300">
                <template slot-scope="scope">
                    <el-button style="padding:0" type = "text" @click="chooseCity">{{scope.row.SSDY}}</el-button>
                </template>
            </el-table-column>
            <el-table-column
                label="所属领域"
                min-width="130">
                <template slot-scope="scope">
                    <el-select v-model="scope.row.XSLB">
                        <el-option value="食药安全">食药安全</el-option>
                        <el-option value="英烈保护">英烈保护</el-option>
                        <el-option value="国有财产">国有财产</el-option>
                        <el-option value="食品安全">食品安全</el-option>
                        <el-option value="国土资源">国土资源</el-option>
                        <el-option value="环境保护">环境保护</el-option>
                        <el-option value="其他">其他</el-option>
                    </el-select>
                </template>
            </el-table-column>
            <el-table-column
                label="所属门类"
                min-width="130">
                <template slot-scope="scope">
                    <el-select v-model="scope.row.XSML">
                        <el-option value="公益诉讼">公益诉讼</el-option>
                        <el-option value="贪污腐败">贪污腐败</el-option>
                    </el-select>
                </template>
            </el-table-column>
            <el-table-column
                label="关键词"
                width="200">
                <template slot-scope="scope">

                </template>
            </el-table-column> -->
            <el-table-column
                fixed="right"
                label="操作"
                min-width="150">
                <template slot-scope="scope">
                    <el-button @click="fornow(scope.row)" type="text" size="small">暂存</el-button>
                    <el-button @click="checkDetail(scope.row._id)" type="text" size="small">审核</el-button>
                    <el-button v-show='IdentityType == 1' style="color:#ea2626" @click="delCue(scope.row._id)" type="text" size="small">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
      </div>
      <div class="page-wrap">
        <el-pagination
          @current-change="pageTo"
          :page-size="pageSize"
          :current-page="page"
          layout="total, prev, pager, next, jumper"
          :total="totalPages">
        </el-pagination>
      </div>
    </div>

    <internet-input-d-b 
        @inputClose="inputClose"
        :isShow="isCheckDetail"
        :dataId="BH"
        :site = "currSite"
        @complete="completeSubmit"
    ></internet-input-d-b>

  </div>
</template>

<script>
import internetInputDB from '../pubilcComponents/manageComponents/internetInputDB';
import VDistpicker from 'v-distpicker';
export default {
    components:{internetInputDB,VDistpicker},
    data(){
        return{
            isLoad:false,
            tableH:0, //表格高度
            internetCueList: [  //互联网线索列表
            ],
            siteList:[],   //采集网站
            currSite:'', //当前选择网站
            page:1, //页码
            pageSize: 20,//每页条数
            totalPages:1000,//总条数
            keyword: '' , //关键字
            timeSearch:[
                '2018-01-01',
                '2018-07-16'
            ], //时间范围

            isChooseCity:false,
            isCheckDetail:false, //是否查看详情
            BH: '' , //选择数据编号

            province:'',
            city:'',
            county:'',

            clearCity:true,
            moreSite:false,

            IdentityType:0, //身份
        }
    },
    mounted(){
        this.IdentityType = localStorage.getItem('IdentityType');
        this.getProvince(); //获取省市
        this.getCueCollection(); //获取可用数据
        this.tableResize();//表格高度自适应
    },
    methods:{
        //暂存
        fornow(index){
          var _this = this;
          var bodyParam = {
            YSSJJHMC:this.currSite,
            YSSJBH:index._id,
            CJNR: index.Content,
            FBSJ: index.PublishTime.replace(/\./g,"-") + " 00:00:00",
            SJDL: 1,
            SJLB: '环境保护',
            SJLY: index.SiteName,
            SJDZ: index.Site,
            BZ: '',
            SSSF: index.Province,
            SSCS: index.City,
            SSQX: '',
            ZY: '',
            GJC: '',
            DIM: '',
            RENM: '',
            JIGOUM: '',
            CJSJ: index.CreatedTime,
            SFZSJ: 0,
            SFZC: 1,
            SJKZ: '',
            SFSJGZ: 0
          };
          this.isLoad = true;
          this.axios({
            method: 'post',
            url:webApi.Host + webApi.WebData.Confirm,
            data:bodyParam,
            timeout:10000
          }).then(function(response){
            _this.isLoad = false;
            if(response.data.code == 0){
              _this.$message({
                message:'提交成功',
                type: 'success'
              })
            _this.getInternetCueList(_this.currSite);
            }else{

            }
          }).catch(function(error){
            _this.isLoad = false;

          })
        },
        //说明
        explain(){
          let routeData = this.$router.resolve({
            name: "explain"
          });
          window.open(routeData.href,'_blank');
        },
        //完成审核
        completeSubmit(index){
          this.isCheckDetail = index.isShow;
          this.getInternetCueList(this.currSite);
        },
        //省份改变
        updataProvince(value){
          if(value.value == '省'){
            this.province = ''
          }else{
            this.province = value.value
          }
          console.log(this.province);
        },
        //市改变
        updataCity(value){
          if(value.value == '市'){
            this.city = ''
          }else{
            this.city = value.value
          }
            console.log(this.city);
        },
        //区县改变
        updataCounty(value){
          if(value.value == '区'){
            this.county = ''
          }else{
            this.county = value.value
          }
            console.log(this.county);
        },
        //确认城市
        confirmCity(){
            this.getInternetCueList(this.currSite);
        },
        //删除
        delCue(id){
          var _this = this;
          this.axios({
            method:'post',
            url:webApi.WebData.DeleteSourceData.format({id:id,site:this.currSite}),
            timeout:10000
          }).then(function(response){
            if(response.data.code == 0){
              _this.$message({
                message:'删除成功',
                type:'success'
              });
              
              _this.getInternetCueList(_this.currSite);
            }else{
              _this.$message({
                message:'删除失败',
                type: 'error'
              })
            }
          }).catch(function(error){

          })
        },
        //搜索
        searchCue(){
            this.getInternetCueList(this.currSite);
        },
        //显示更多网站
        moreSiteFloat(){
          this.moreSite = true;
        },
        //关闭网站选择
        closeFloat(){
          this.moreSite = false;
        },
        //获取省市
        getProvince(){
            this.axios({
                method:'get',
                url:webApi.Host + webApi.WebData.GetCities,
                timeout: 10000
            }).then(function(response){
                if(response.data.code == 0){
                }else{

                }
            }).catch(function(error){

            })
        },
        //时间搜索
        search(){
            if(this.province == '省'){
              this.province = ''
            }else if(this.city == '市'){
              this.city = ''
            }else if(this.county == '区'){
              this.county = '';
            }
            this.getInternetCueList(this.currSite);
        },
        //修改详情
        checkDetail(index){
            this.isCheckDetail = true;
            this.BH = index;
        },
        //关闭详情
        inputClose(){
            this.isCheckDetail = false;
        },
        //获取可用数据门类
        getCueCollection(){
            var _this = this;
            this.axios({
                method:'get',
                url: webApi.Host + webApi.WebData.GetCollections,
                timeout: 10000
            }).then(function(response){
                if(response.data.code == 0){
                    _this.siteList = response.data.data;
                    _this.currSite = _this.siteList[0];
                    _this.getInternetCueList(_this.currSite);
                }else {
                    _this.siteList = [];
                }
            }).catch(function(error){

            })
        },
        //获取互联网线索列表
        getInternetCueList(site){
            let _this = this;
            var param = {
                site:site, //网站
                province:_this.province, //
                city:_this.city, //
                county: _this.county, //
                keyword: _this.keyword, //
                beginDate: _this.timeSearch[0], //
                endDate: _this.timeSearch[1], //
                p: _this.page, // 
                ps: _this.pageSize, //
            }
            let url = webApi.WebData.GetUntreatedData.format(param); 
            _this.isLoad = true;
            //获取总量
            function count(){
              return _this.axios({
                      method:'get',
                      url:webApi.WebData.CountUntreatedData.format(param),
                      timeout: 10000
                    })
            }
            
            //获取数据
            function data(){
              return _this.axios({
                        method:'get',
                        url:webApi.WebData.GetUntreatedData.format(param),
                        timeout: 10000
                    })
            }

            _this.axios.all([count(),data()])
              .then(_this.axios.spread(function(count,data){
                _this.isLoad = false;
                _this.internetCueList = data.data.data;
                _this.totalPages = count.data.data;
              })).catch(function(error){
                _this.isLoad = false;
              });
            
        },
      //按线索来源筛选
        clueSiteOder(){
            let _this = this;
            if(_this.isLoad == false){
              _this.getInternetCueList(_this.currSite);
            }   
        },
        // 页码跳转
        pageTo(curr) {
            let _this = this ;
            _this.page = curr;
            _this.getInternetCueList(_this.currSite);
        },
        //表格高度自适应
        tableResize(){
            let _this = this;
            this.$nextTick(function () {
            _this.tableH = _this.$refs.cueList.clientHeight;
            window.addEventListener('resize',_this.resize);
            })
        },
        resize(){
            let _this = this;
            _this.tableH = _this.$refs.cueList.clientHeight;
        },
    },
    //实例销毁钩子
    destroyed(){
        window.removeEventListener('resize',this.resize)
    }
}
</script>


<style lang="scss" scoped>
  #internetCue{
    height: 100%;
    max-height:100%;
    min-width: 750px;
    overflow-y:hidden;
    .internet-cue-head{
      height: 50px;
      width: 100%;
      line-height: 50px;
      background: #EEEEEE;
      border-bottom: 1px solid #dcdcdc;
      /*标题*/
      .title-wrap{
        float: left;
        height: 100%;
        .title-icon{
          float: left;
          height: 100%;
          text-align: center;
          width: 50px;
          border-right: 1px solid #dcdcdc;
          .iconfont{
            font-size: 26px;
            color: #666666;
          }
        }
        .title{
          float: left;
          padding-left: 10px;
          font-size: 16px;
          color: #666666;
        }
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
    .main-body{
      margin-top: 24px;
      height: calc(100% - 74px);
      max-height: calc(100% - 74px);
      padding: 0 50px;
      .cue-types-wrap{
        border: 1px solid #dcdcdc;
        .title-wrap{
          background: #EEEEEE;
          padding-left: 20px;
          height: 40px;
          line-height: 40px;
          font-size: 16px;
          color: #333333;
          border-bottom: 1px solid #dcdcdc;
          .iconfont{
            font-weight: 800;
            color: #333;
          }
        }
        .types-wrap{
          height: 80px;
          overflow-y: auto;
          .type-item{
            position: relative;
            float: left;
            width: 90px;
            height: 100%;
            text-align: center;
            font-size: 14px;
            cursor: pointer;
            .type-icon{
              padding-top: 14px;
              .iconfont{
                -webkit-transition: all 0.3s;
                -moz-transition: all 0.3s;
                -ms-transition: all 0.3s;
                -o-transition: all 0.3s;
                transition: all 0.3s;
                color: #333333;
                font-size: 30px;
              }
            }
            .type-name{
              -webkit-transition: all 0.3s;
              -moz-transition: all 0.3s;
              -ms-transition: all 0.3s;
              -o-transition: all 0.3s;
              transition: all 0.3s;
              padding-top: 4px;
              color: #333333;
            }
          }
          .type-item:after{
            position: absolute;
            content: '';
            width: 1px;
            height: 50px;
            background: #dcdcdc;
            top: 16px;
            right: 0;
          }

          .type-item:last-child:after{
            display: none;
          }
          .type-item-on{
            .type-icon{
              .iconfont{
                color: #0B8E45;
              }
            }
            .type-name{
              color: #0B8E45!important;
            }
          }
          .type-item:hover {
            .type-icon{
              .iconfont{
                color: #0B8E45;
              }
            }
            .type-name{
              color: #0B8E45;
            }
          }
        }

      }
      .cue-filter-wrap{
        margin-top: 24px;
        .cue-source,
        .cue-sort{
          height: 45px;
          line-height: 45px;
          border:1px solid #dcdcdc;
          .left-title{
            float: left;
            padding-left: 20px;
            height: 100%;
            width: 144px;
            background:#EEEEEE;
            font-size: 16px;
            color: #333;
            border-right: 1px solid #dcdcdc;
            .iconfont{
              font-size: 16px;
              font-weight: 800;
              margin-right: 10px;
            }
          }
          .right{
            float: left;
            font-size: 16px;
            height: 100%;
            width: calc(100% - 144px);
            padding: 0 20px;
            color: #333;
            overflow:hidden;
            text-overflow:ellipsis;
            white-space:nowrap;
            .distpicker-address-wrapper{
              color: red;
               select{
                height: 30px!important;
               }
            }
            .float-box{
              position: absolute;
              z-index: 99999999;
              background: #fff;
              left: 0;
              padding: 0 10px;
              border-bottom: solid 1px #ddd;
              box-shadow: 0px 2px 10px #c4c4c4;
              .close-float{
                position: absolute;
                top: -16px;
                right: -8px;
                font-size: 18px;
                cursor: pointer;
              }
            }
            .clear-city{
              // position: absolute;
              // top: 0;
              // left: 550px;
              margin-left: 10px;
              color: #65afea;
              cursor: pointer;
            }
            .comfirm-btn{
                cursor: pointer;
                color: #65c7ea;
            }
            .site-item{
              height: 100%;
              float: left;
              margin-right: 20px;
              cursor: pointer;
              -webkit-transition: all 0.3s;
              -moz-transition: all 0.3s;
              -ms-transition: all 0.3s;
              -o-transition: all 0.3s;
              transition: all 0.3s;
            }
            .site-item-on{
              color: #FF6600;
            }
            .site-item:hover{
              color: #FF6600;
            }
            .sort-item-tip{
              height: 100%;
              float: left;
              cursor: default;
            }
            .sort-item{
              height: 100%;
              float: left;
              margin-right: 40px;
              cursor: pointer;
              -webkit-transition: all 0.3s;
              -moz-transition: all 0.3s;
              -ms-transition: all 0.3s;
              -o-transition: all 0.3s;
              transition: all 0.3s;
            }
            .sort-item:hover,
            .sort-item-on{
              color: #FF6600;
            }
            .sort-item:last-child{
              margin-right: 0;
            }
          }
          .city-right{
            padding-top: 5px;
          }
        }
        .cue-sort{
          border-top:none;
        }
      }
      .cue-list{
        margin-top: 24px;
        height: calc(100% - 144px - 64px - 15px);
        max-height: calc(100% - 144px - 64px - 15px);
        overflow-y: hidden;
        .isRead{
          color: #F66;
        }
      }
      .page-wrap{
        margin-top: 24px;
        height: 40px;
      }
    }
  }


  @media (max-width: 1440px) {

    #internetCue{
      .internet-cue-head{
        height: 40px;
        line-height: 40px;
        /*标题*/
        .title-wrap{
          .title-icon{
            width: 40px;
            .iconfont{
              font-size: 22px;
            }
          }
          .title{
            font-size: 16px;
          }
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
      .main-body{
        margin-top: 16px;
        height: calc(100% - 56px);
        max-height: calc(100% - 56px);
        .cue-types-wrap{
          .title-wrap{
            height: 32px;
            line-height: 32px;
          }
          .types-wrap{
            height: 68px;
            .type-item{
              width: 86px;
              font-size: 14px;
              cursor: pointer;
              .type-icon{
                padding-top: 8px;
                .iconfont{
                  font-size: 24px;
                }
              }
              .type-name{
                color: #333333;
              }
            }
            .type-item:after{
              position: absolute;
              content: '';
              width: 1px;
              height: 44px;
              background: #dcdcdc;
              top: 16px;
              right: 0;
            }
          }
        }
        .cue-filter-wrap{
          margin-top: 16px;
          .cue-source,
          .cue-sort{
            height: 32px;
            line-height: 32px;
            border:1px solid #dcdcdc;
            .right{
              font-size: 14px;
            }
            .city-right{
              padding-top: 0;
            }
          }
          .cue-sort{
            border-top:none;

          }
        }
        .cue-list{
            margin-top: 16px;
            height: calc( 100% - 48px - 40px - 16px - 62px);
            max-height: calc( 100% - 48px - 40px - 16px - 62px);
            overflow-y: hidden;
        }
        .page-wrap{
          margin-top: 16px;
          height: 40px;
        }
      }
    }

  }
</style>
