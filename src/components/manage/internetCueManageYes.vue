<template>
  <div id="internetCue">
    <div class="internet-cue-head clearfix">
      <div class="title-wrap clearfix">
        <div class="title-icon">
          <i class="fa fa-connectdevelop"></i>
        </div>
        <div class="title">互联网线索管理</div>
      </div>
      <div class="search-wrap clearfix">
        <input class="search-ipt" type="text" v-model="keyword" placeholder="请输入内容" @keyup.13="getInternetCueList">
        <span class="search-btn" @click="getInternetCueList()">
            <i class="iconfont icon-sousuo"></i>
          </span>
      </div>
      <div class="manage-icon">
        <i @click="addInternet"  class="el-icon-circle-plus-outline"></i>
      </div>
    </div>
    <div class="main-body">
      <div class="cue-types-wrap" style="border:none;">
        <div class="pushBtn">
            <el-button @click="chooseCity" type="success" plain>推送至检察院</el-button>
          </div>
      </div>
      <div class="cue-filter-wrap">
        <!-- <div class="cue-source clearfix">
          <div class="left-title">
            <i class="iconfont icon-caiji"></i>
            采集网站:
          </div>
          <div class="right">
            <div v-show="siteList.length>0" class="site-item" :class="{'site-item-on':site == item }" @click="clueSiteOder(item)" v-for="(item,index) in siteList" :key=index>{{item}}</div>
            <div v-show="siteList.length==0"> 无 </div>
          </div>
        </div> -->
        <div class="cue-source clearfix">
            <div class="left-title">
                <i class="iconfont icon-caiji"></i>
                采集网站:
            </div>
            <div class="right" style="overflow: inherit;position: relative;">
                <!-- <div v-show="siteList.length>0" class="site-item" :class="{'site-item-on':currSite == item }" @click="clueSiteOder(item)" v-for="(item,index) in siteList" >{{item}}</div> -->
                <div v-show="siteList.length==0"> 无 </div>
                <el-select  placeholder="全部" v-model="site" style="width: 50%;vertical-align: text-bottom;">
                  <el-option value="">全部</el-option>
                  <el-option v-for="(item,index) in siteList" :value="item" :key='index'>{{item}}</el-option>
                </el-select>
              
            </div>
          </div>
        <div class="cue-source clearfix">
          <div class="left-title">
            <i class="fa fa-map-marker"></i>
            选择省/市/区:
          </div>
          <div class="right" style="margin-left: -10px;padding-top: 3px;overflow:inherit;">
            <area-select v-if="clearCity" style="margin-left:0;line-height:100%;height:100%;" :level='2' type="text" :data = "pcaa" v-model="citySelected"></area-select>
            <span class="clear-city" @click="cleanCity">清空</span>
          </div>
        </div>
        <div class="cue-sort clearfix">
          <div class="cue-sort-wrap">
            <div class="left-title">
              <i class="fa fa-th"></i>
              线索类别:
            </div>
            <div class="right">
              <el-radio v-model="SJDL" label="1">公益诉讼</el-radio>
              <el-radio v-model="SJDL" label="2">贪污腐败</el-radio>
              <el-radio v-model="SJDL" label="">全部</el-radio>
            </div>
          </div>
          <div class="cue-sort-wrap">
            <div class="left-title">
              <i class="fa fa-th"></i>
              所属领域:
            </div>
            <div class="right">
              <el-select v-model="SJLB" :disabled="SJDL == 2||SJDL == ''">
                <el-option :key="item" v-for="item in typeList" :value="item">{{item}}</el-option>
              </el-select>
            </div>
          </div>
        </div>
        <div class="cue-sort clearfix">
          <div class="cue-sort-wrap">
            <div class="left-title">
              <i class="fa fa-asterisk"></i>
              脏数据:
            </div>
            <div class="right">
              <template>
                <el-radio v-model="isDirtyData" label="">全部</el-radio>
                <el-radio v-model="isDirtyData" label="1">是</el-radio>
                <el-radio v-model="isDirtyData" label="0">否</el-radio>
              </template>
            </div>
          </div>
          <div class="cue-sort-wrap">
            <div class="left-title">
              <i class="fa fa-hdd-o "></i>
              暂存:
            </div>
            <div class="right">
              <template>
                <el-radio v-model="isStorage" label="">全部</el-radio>
                <el-radio v-model="isStorage" label="1">是</el-radio>
                <el-radio v-model="isStorage" label="0">否</el-radio>
              </template>
            </div>
          </div>
        </div>
       
        <div class="cue-sort clearfix">
          <div class="cue-sort-wrap">
            <div class="left-title">
              <i class="fa fa-list-alt"></i>
              日期类型:
            </div>
            <div class="right">
              <template>
                <el-radio v-model="rqlx" label="cjsj">采集日期</el-radio>
                <el-radio v-model="rqlx" label="fbsj">发布日期</el-radio>
              </template>        
            </div>
          </div>
          <div class="cue-sort-wrap">
            <div class="left-title">
              <i class="fa fa-calendar"></i>
              时间段:
            </div>
            <div class="right">
              <el-date-picker style="height: 100%;border:none;padding:0"
                              v-model="timeSearch"
                              type="daterange"
                              align="right"
                              range-separator="-"
                              start-placeholder="开始日期"
                              end-placeholder="结束日期">

              </el-date-picker>
            </div>
          </div>
        </div>
         <div class="cue-sort clearfix">
           <div class="left-title">
              <i class="fa fa-sort"></i>
              排序方式:
            </div>
            <div class="right">
              <template>
                <el-radio v-model="order" label="asc">升序</el-radio>
                <el-radio v-model="order" label="desc">降序</el-radio>
              </template>
              <!-- <div class="sort-item" :class='{"sort-item-on":order== "cjsj"}' @click="clueOrder('cjsj')">采集时间</div>
              <div class="sort-item" :class='{"sort-item-on":order== "fbsj"}' @click="clueOrder('fbsj')">发布时间</div> -->
            
            </div>
        </div>
        <div class="cue-source clearfix" style="border:none;margin-top:10px;">
            <el-button @click="confirmFilter" type="success" plain>确认</el-button>
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
            prop="ZY"
            label="内容"
            min-width="300">
            <template slot-scope="scope">
              <el-popover trigger="click" placement="top" >
                <p style="text-indent: 2em;">{{ scope.row.ZY }}</p>
                <div slot="reference" class="td-content">
                  {{ scope.row.ZY}}
                </div>
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column
            prop="FBSJ"
            label="发布时间"
            min-width="170">
          </el-table-column>
          <el-table-column
            prop="CJSJ"
            label="采集时间"
            min-width="170">
          </el-table-column>
          <el-table-column
            prop="SJLY"
            label="线索来源"
            width="150">
          </el-table-column>
          <el-table-column
            label="所属地域"
            min-width="300">
            <template slot-scope="scope">
              {{scope.row.SSSF}}/{{scope.row.SSCS}}/{{scope.row.SSQX}}
              <!-- <el-button style="padding:0" type = "text" @click="chooseCity"></el-button> -->
            </template>
          </el-table-column>
          <el-table-column
            prop="SJDL"
            label="所属门类"
            min-width="130">
          </el-table-column>
          <el-table-column
            prop="SJLB"
            label="所属领域"
            min-width="130">
          </el-table-column>
           <el-table-column
            prop="GJC"
            label="关键词"
            min-width="200">
            <template slot-scope="scope">
              <el-popover trigger="click" placement="top" >
                <p style="text-indent: 2em;">{{ scope.row.GJC }}</p>
                <div slot="reference" class="td-content">
                  {{ scope.row.GJC}}
                </div>
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column
            fixed="right"
            label="操作"
            width="100">
            <template slot-scope="scope">
              <!-- <el-button type="text" size="small">提交</el-button> -->
              <el-button @click='editDetail(scope.row.BH)' type="text" size="small">详情</el-button>
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
    <inter-input @inputClose="responseClose"
                 :operation='interInputProps.operation'
                 :isShow="interInputProps.isShow"
                 :dataId="interInputProps.dataId"></inter-input>

    <el-dialog @close="closeCity" width="600px" title="选择省市" :visible.sync="isChooseCity">
      <div id="choose-city" style="height: 55px">
        <area-select  :level="2" type="text" :data = "pcaa" v-model="citySelected"></area-select>
        <el-button style="float:right" type="text" @click="confirmPush">确认推送</el-button>
      </div>
    </el-dialog>
  </div>

</template>

<script>
  import interInput from '../pubilcComponents/manageComponents/internetInput'
  import { pca, pcaa } from 'area-data';
  export default {
    components: {interInput},
    name:'cue-list',
    data(){
      return{
        interInputProps: {
          isShow: false,//是否显示
          dataId: '',//数据id
          operation: '',//操作
        },
        //来源地址
        outerVisible:false,
        siteList:[
        ],
        tableH:0, //表格高度
        totalPages:0,//总条数
        internetCueList: [  //互联网线索列表
        ],

        typeList: [],//线索门类
        type:'', //线索类型
        rqlx: "cjsj",//日期类型
        qsrq: '',//起始日期
        jzrq: '',//截至日期
        order: 'desc',//排序字段
        keyword:'',//查询列表关键字
        site:'',//采集站点名称
        page:1, //页码
        pageSize: 20,//页面大小,最大100
        isLoad:false,//数据是否在加载
        timeSearch: '',//时间范围
        SJDL: '',//数据大类
        SJLB: '',//数据类别
        isStorage: '',//是否暂存
        isDirtyData: '',//是否脏数据
        province: "",//省份
        city: "",//城市
        county:'',//区县
        isChooseCity:false,
        pca: pca,
        pcaa: pcaa,
        citySelected:[],
        clearCity: true,//城市
      }
    },
    mounted(){
      let _this = this;
      _this.tableResize();//表格高度自适应
      _this.getClueSites(); //获取来源网站
      _this.getClueType(); //获取线索类型
      _this.getDefaultDate();//设置默认日期
      _this.getInternetCueList(); //获取互联网线索列表
    },
    methods:{
      //清空城市
        cleanCity(){
          var _this = this;
          this.clearCity = false;
          setTimeout(function(){
            _this.clearCity = true;
          },100)
          this.citySelected = [];
        },
      //确认筛选条件
      confirmFilter() {
        if(this.citySelected.length>0){
          this.province = this.citySelected[0];
          this.city = this.citySelected[1];
          this.county = this.citySelected[2];
        } 
        this.page = 1;
        this.getInternetCueList();
      },
      //推送检察院
      confirmPush() {
        if(this.citySelected.length == 0){
            return;
        }
        var param = {
          province:this.citySelected[0],
          city: this.citySelected[1],
          county: this.citySelected[2]
        }
        
        this.axios({
          method: "post",
          url: webApi.WebData.PushData.format(param),
          timeout: 10000
        }).then(function(response){
          console.log(response.data.data);
        }).catch(function(error){

        })
      },
      //响应弹出层关闭
      responseClose(res) {
        let _this = this;
        _this.interInputProps.isShow = res.isShow;
        if(res.isUpdate) {
          _this.getInternetCueList();
        }
      },
      addInternet(){//新增
        this.interInputProps.isShow = true;
        this.interInputProps.dataId = '';
        this.interInputProps.operation = "Add";
      },
      editDetail(id) {//编辑详情
        console.log(id);
        this.interInputProps.isShow = true;
        this.interInputProps.dataId = id;
        this.interInputProps.operation = "edit";
      },
      getDefaultDate() {//设置默认日期
        let _this = this;
        let endDate = new Date();
        let beginDate = new Date(endDate.getTime() - 3600 * 1000 * 24 * 30);
        _this.timeSearch = [beginDate,endDate]
      },
      timeFormat(date) {
        let time = date;
        let year = time.getFullYear();
        let month = time.getMonth() + 1;
        let day = time.getDate();
        if(month < 10) {
          month =  '0' + month;
        }
        if(day < 10 ) {
          day =  '0' + day;
        }
        time = year + '-' + month + '-' + day;
        return time;
      },
      //获取互联网线索列表
      getInternetCueList(){
        let _this = this;
        if(_this.isLoad ==false){
          _this.isLoad = true;
          let url = (webApi.WebData.GetAll).format({
            rqlx: _this.rqlx,//日期类型
            qsrq: _this.timeFormat(_this.timeSearch[0]),//起始日期
            jzrq: _this.timeFormat(_this.timeSearch[1]),//截至日期
            order:_this.order,//采集字段,默认采集日期
            province: _this.province,//省份
            city: _this.city,//城市
            county:_this.county,//区县
            keyword: _this.keyword,//关键词
            type1: _this.SJDL,//数据大类
            type2: _this.SJLB,//线索类型
            sfzsj: _this.isDirtyData,//是否脏数据
            sfzc: _this.isStorage,//是否暂存
            clr: "",//处理人
            site: _this.site,//采集站点名称
            p:_this.page,//页码
            ps:_this.pageSize//页面大小,最大100
          })
          console.log(url)
          _this.axios({
            methods:'get',
            url:url,
            timeout: 10000
          }).then(function(res){
            _this.isLoad = false;
            if(res.data.code == 0){
              let data = res.data.data.data;
              for(let i =0; i<data.length;i++) {
                if(data[i].SJDL=='1'){
                  data[i].SJDL = '公益诉讼';
                }else if(data[i].SJDL=='2') {
                  data[i].SJDL = '贪污腐败';
                }
                if(data[i].FBSJ.split(" ")[1]=="00:00:00") {
                    data[i].FBSJ=data[i].FBSJ.split(" ")[0];
                }
              }
              // let ZYstr = '';
              // for(let i = 0;i < data.length; i++){
              //   let str = data[i].ZY.split("<br/>");
              //   for(let j= 0;j<str.length;j++){
              //     ZYstr += str[j];
              //   }
              //   data[i].ZY = ZYstr;
              // }
              _this.internetCueList = data;
              _this.totalPages = res.data.data.total;
            }else {
              _this.$message.error(res.data.errorMessage);
            }
          }).catch(function(err){
            _this.isLoad = false;
          })
        }
      },
      //获取举报门类
      getClueType(){
        let _this = this;
        _this.axios({
          methods:'get',
          url:webApi.Host + webApi.WebData.GetGyssClueTypes
        }).then(function(res){
          if(res.data.code == 0){
            let data = res.data.data;
            _this.typeList = data;
          }
        }).catch(function(err){

        })
      },

      //获取线索来源网站
      getClueSites(){
        let _this = this;
        _this.axios({
          methods:'get',
          url:webApi.Host + webApi.WebData.GetSites
        }).then(function(res){
          if(res.data.code == 0){
            let data = res.data.data;
            _this.siteList = data;
          }else {
            _this.siteList = [];
          }
        }).catch(function(){

        })
      },
  
      //关闭选择城市
      closeCity(){
        this.citySelected = [];
      },
      //查看详情
      chooseCity(){
        if(this.citySelected.length != 0){
          console.log(this.citySelected);
          this.SSDY = this.citySelected[0] + this.citySelected[1];
        }
        this.citySelected = [];
        console.log(this.citySelected);
        this.isChooseCity = !this.isChooseCity;
      },
      // 页码跳转
      pageTo(curr) {
        let _this = this ;
        _this.page = curr;
        _this.getInternetCueList();
      },
      // 查看详情
      details(index,id){
        this.$router.push({
          path:'/home/cueDetail',
          query:{type:2,id:id}
        });
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
      }
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
      .manage-icon{
        position: absolute;
        right: 14px;
        top: 50px;
        font-size: 25px;
        &:hover {
          cursor: pointer;
        }
        i {
          color: green;
        }
      }
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
      margin-top: 5px;
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
        margin-top: 5px;
        .cue-source,
        .cue-sort{
          height: 40px;
          line-height: 40px;
          border:1px solid #dcdcdc;
          .cue-sort-wrap {
            width: 50%;
            height: 100%;
            &:first-child {
              float: left;
            }
            &:last-child {
              float: right;
            }
          }
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
            position: relative;
            float: left;
            font-size: 16px;
            height: 100%;
            width: calc(100% - 144px);
            padding: 0 20px;
            color: #333;
            overflow:hidden;
            text-overflow:ellipsis;
            white-space:nowrap;
             .clear-city{
              position: absolute;
              top: 0;
              left: 550px;
              color: #65afea;
              cursor: pointer;
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
         
        }
        .cue-sort{
          border-top:none;
        }
      }
      .cue-list{
        margin-top: 10px;
        height: calc( 100% - 403px);
        max-height: calc( 100% - 403px);
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
              padding-top: 0 !important;
            }
          }
          .cue-sort{
            border-top:none;

          }
        }
        .cue-list{
          margin-top: 10px;
          height: calc( 100% - 365px);
          max-height: calc( 100% - 365px);
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
