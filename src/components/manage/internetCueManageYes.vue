<template>
  <div id="internetManage">
    <div id="header">
      <div class="header-icon">
        <i class="iconfont icon-boshimao"></i>
      </div>
      <div class="header-title">互联网线索管理</div>
      <div class="search-wrap clearfix">
        <input class="search-ipt" type="text" v-model="keyword" placeholder="请输入内容" @keyup.13="getInternetCueList">
        <span class="search-btn" @click="getInternetCueList()">
                    <i class="iconfont icon-sousuo"></i>
                </span>
      </div>
    </div>
    <!-- <div id="add-icon">
    </div> -->

    <div class="cue-filter-wrap">
      <div class="cue-source clearfix">
        <div class="left-title">
          <i class="iconfont icon-caiji"></i>
          采集网站:
        </div>
        <div class="right">
          <div v-show="siteList.length>0" class="site-item" :class="{'site-item-on':site == item }" @click="clueSiteOder(item)" v-for="(item,index) in siteList" >{{item}}</div>
          <div v-show="siteList.length==0"> 无 </div>
        </div>
      </div>
      <div class="cue-sort clearfix">
        <div class="left-title">
          <i class="iconfont icon-paixu01"></i>
          日期选择:
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
      <div class="manage-icon">
        <i @click="addInternet"  class="el-icon-circle-plus-outline"></i>
      </div>
    </div>
    <div id="content" ref="cueList" v-loading = "isLoad">
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
          prop="XSLY"
          label="线索来源"
          width="150">
        </el-table-column>
        <el-table-column
          label="所属地域"
          min-width="100">
          <template slot-scope="scope">
            <p>四川省成都市</p>
          </template>
        </el-table-column>
        <el-table-column
          label="所属领域"
          min-width="130">
          <template slot-scope="scope">
            <el-select v-model="XSLB">
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
            <el-select v-model="XSML">
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
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          width="100">
          <template slot-scope="scope">
            <el-button type="text" size="small">提交</el-button>
            <el-button @click='editDetail' type="text" size="small">详情</el-button>
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
    <inter-input @inputClose="responseClose"
                 :operation='interInputProps.operation'
                 :isShow="interInputProps.isShow"
                 :dataId="interInputProps.dataId"></inter-input>
  </div>
</template>

<script>
  import interInput from '../pubilcComponents/manageComponents/internetInput'
  export default {
    components: {interInput},
    data(){
      return{
        interInputProps: {
          isShow: false,//是否显示
          dataId: '',//数据id
          operation: '',//操作
        },
        isLoad:false,
        tableH:0, //表格高度
        internetCueList: [  //互联网线索列表
          {
            ZY:'来访方式：来信案件编号：06-242案件标题：梁平县重庆泰山电缆厂噪声振动扰民来信时间：2006-05-20发布时间：2006-06-02来访者：张先',//内容
            FBSJ:'2014-04-28 00:00:00', //发布时间
            CJSJ:'2018-06-21 07:17:14', //采集时间
            XSLY:'互联网线索', //线索来源
          }
        ],
        siteList:[   //采集网站
        ],
        page:1, //页码
        pageSize: 20,//每页条数
        totalPages:1,//总条数
        keyword: '' , //关键字
        type:'', //线索类型
        site:'',//来源站点
        order:'cjsj',//排序方式
        timeSearch:'', //时间范围


        FBSJ:'', //发布时间
        CJSJ:'', //采集时间
        XSLY:'', //线索来源

        SSDY:'', //所属地域
        XSLB:'', //所属领域
        XSML:'', //所属门类
        GJC:'', //关键词
        RENM:'', //人名
        DIM:'', //地名
        JIGOUM:'', //机构名
        ZY:'', //摘要
      }
    },
    mounted(){
      let _this = this;
      _this.tableResize();//表格高度自适应
      // _this.getInternetCueList(); //获取互联网线索列表
    },
    methods:{
      //响应弹出层关闭
      responseClose(res) {
        let _this = this;
        _this.interInputProps.isShow = res.isShow;
        if(res.isUpdate) {
          _this.getInternetCueList();
        }
      },
      //提交数据
      submitData() {

      },
      //编辑数据
      editData() {

      },
      // 页码跳转
      pageTo(curr) {
        let _this = this ;
        _this.page = curr;
        _this.getInternetCueList();
      },
      //获取互联网线索列表
      getInternetCueList(){

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
      addInternet(){//新增
        this.interInputProps.isShow = true;
        this.interInputProps.dataId = '123';
        this.interInputProps.operation = "Add";
      },
      editDetail() {//编辑详情
        this.interInputProps.isShow = true;
        this.interInputProps.dataId = '1234';
        this.interInputProps.operation = "edit";
      }
    },
    //实例销毁钩子
    destroyed(){
      window.removeEventListener('resize',this.resize)
    }
  }
</script>


<style lang="scss" scoped>
  #internetManage{
    position: relative;
    height: 100%;
    max-height:100%;
    min-width: 750px;
    overflow-y:hidden;
    #header{
      height: 50px;
      width: 100%;
      line-height: 50px;
      background: #EEEEEE;
      border-bottom: 1px solid #dcdcdc;
      .header-icon{
        display: inline-block;
        height: 100%;
        width: 40px;
        text-align: center;
        border-right:solid 1px #ddd;
      }
      .header-title{
        display: inline-block;
        height: 100%;
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
    .cue-filter-wrap{
      width: 90%;
      margin: 24px 0px;
      padding-left: 24px;
      position: relative;
      .cue-source,
      .cue-sort{
        height: 40px;
        line-height: 40px;
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
      .manage-icon{
        position: absolute;
        right: 0;
        top: 50%;
        margin-top: -18px;
        margin-right: -62px;
        font-size: 25px;
        &:hover {
          cursor: pointer;
        }
        i {
          color: green;
        }
      }
      .cue-sort{
        border-top:none;
      }
    }
    #content{
      height: calc( 100% - 50px - 64px - 128px);
      overflow-y: hidden;
      padding: 0 24px;
      .isRead{
        color: #F66;
      }
    }
    .page-wrap{
      margin-top: 24px;
      height: 40px;
    }
  }
</style>
