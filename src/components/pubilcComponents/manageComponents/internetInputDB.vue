<template>
  <transition name="toggleShow">
  <div id="main_box" v-if="isShow">
      <div id="main" v-loading="isDetailLoad">
        <div id="main-header">
          <div class="main-icon">
            <i class="fa fa-pencil-square-o"></i>
          </div>
          <div class="main-title">数据详情</div>
          <div class="manage-icon">
            <i @click="close"  class="el-icon-close"></i>
          </div>
        </div>
        <div id="content">
          <div class="detail-item">
            <span class="item-title">内容</span>
            <textarea class=" textarea" v-model="CJNR"></textarea>
          </div>
          <div class="detail-item">
            <span class="item-title">数据来源</span>
            <span class="item-content">
              <input type="text" v-model="SJLY">
            </span>
          </div>
          <div class="detail-item">
            <span class="item-title">数据地址</span>
            <span class="item-content">
              <input type="text" v-model="SJDZ">
            </span>
          </div>
          <div class="detail-item">
            <span class="item-title">备注</span>
            <span class="item-content">
              <input type="text" v-model="BZ">
            </span>
          </div>
          <div class="detail-item">
            <span class="item-title">所属地域</span>
            <span class="item-content" style="border: none;">
             <v-distpicker :province="SSSF" :city="SSCS" :area="SSQX" @province="updataProvince" @city="updataCity" @area="updataCounty" style="height: 100%;display:inline-block"></v-distpicker>
            </span>
          </div>
          <div class="detail-item">
            <span class="item-title">采集时间</span>
            <span class="item-content">
              <input type="text" v-model="CJSJ">
            </span>
          </div>
          <div class="detail-item">
            <span class="item-title">发布时间</span>
            <span class="item-content">
              <input type="text" v-model="FBSJ">
            </span>
          </div>
          <div class="detail-item">
            <span class="item-title">所属大类</span>
            <span class="item-content">
              <el-radio v-model="SJDL" label="1">公益诉讼</el-radio>
              <el-radio v-model="SJDL" label="2">贪污腐败</el-radio>
            </span>
          </div>
          <div class="detail-item">
            <span class="item-title">所属领域</span>
            <!-- <el-select v-model="SJLB" :disabled="SJDL == 2">
              <el-option :key="item" v-for="item in typeList" :value="item">{{item}}</el-option>
            </el-select> -->
            <span class="item-content">
              <el-radio :disabled="SJDL == 2" v-model="SJLB" v-for="(item,index) in typeList" :label="item" :key="index">{{item}}</el-radio>
            </span>
          </div>
          <div class="detail-item">
            <span class="item-title">是否暂存</span>
            <span class="item-content">
              <el-radio v-model="SFZC" label="1">是</el-radio>
              <el-radio v-model="SFZC" label="0">否</el-radio>
            </span>
          </div>
          <div class="detail-item">
            <span class="item-title">是否脏数据</span>
            <span class="item-content">
              <el-radio v-model="SFZSJ" label="1">是</el-radio>
              <el-radio v-model="SFZSJ" label="0">否</el-radio>
            </span>
          </div>
          <div class="detail-item" v-loading="isAnalysis">
            <span class="item-title">机器分析</span>
            <el-button @click="analysis" type="success" style="margin-left: 10px;height: 30px;line-height: 11px;">分析</el-button>
            <div class="Machine" style="clear:both">
              <span class="item-title" >关键字</span>
              <span class="item-content">
                <input type="text" v-model="GJC">
              </span>

              <span class="item-title">人名</span>
              <span class="item-content">
                <input type="text" v-model="RENM">
              </span>

              <span class="item-title">地名</span>
              <span class="item-content">
                <input type="text" v-model="DIM">
              </span>
              <span class="item-title">机构名</span>
              <span class="item-content">
                <input type="text" v-model="JIGOUM">
              </span>
              <span  class="item-title">摘要</span>
              <textarea class="textarea " v-model="ZY"></textarea>
            </div>
          </div>
          <div class="detail-item">
            <span class="item-title">是否事态跟踪</span>
            <span class="item-content">
              <el-radio v-model="SFSJGZ" label="1">是</el-radio>
              <el-radio v-model="SFSJGZ" label="0">否</el-radio>
            </span>
          </div>
          <div class="detail-item" v-show="SFSJGZ == 1">
            <span class="item-title track-title">事态跟踪:</span>
            <span class="item-content timeline-content">
                <ul class="itemline-box">
                    <li v-for="item in trackData"  class="timeline-item">
                        <i class="timeline-icon fa fa-circle-o"></i>
                        <div class="tiemline-text">
                            <div class="timeline-text-item">
                              <span>目前回帖数:</span>
                              <input class="track-input" type="text" v-model="item.num">
                            </div>
                            <div class="timeline-text-item timeline-time">
                              <span>回复时间:</span>
                              <input class="track-input" type="text" v-model="item.time">
                            </div>
                            <div class="timeline-text-item  tiemline-name">
                              <span>机构名称:</span>
                              <input class="track-input" type="text" v-model="item.name">
                            </div>
                            <div class="timeline-text-item">
                              <span>回复内容:</span>
                              <textarea style="min-height:150px;" class="track-input textarea" v-model="item.content"></textarea>
                            </div>
                          <!--<h3 class="timeline-time" v-model="item.time" contenteditable="true"></h3>-->
                          <!--<h4 class="tiemline-name" v-model="item.name" contenteditable="true"></h4>-->
                          <!--<p v-model="item.content" contenteditable="true"></p>-->
                        </div>
                    </li>
                </ul>
            </span>
          </div>
          <div class="detail-item">
            <el-button @click="submit" type="success" >提交</el-button>
          </div>
        </div>
      </div>
  </div>
  </transition>
</template>

<script>
  import VDistpicker from 'v-distpicker';
  export default {
    components:{VDistpicker},
    props: {
      'isShow': false,//显示
      'dataId': "",//数据id
      'site':'', //网站
    },
    data(){
      return{
        isDetailLoad: false, 
        isAnalysis: false,

        place:[],

        YSSJBH:'', //原始数据编号
        CJNR:'', //采集内容
        FBSJ:'', //发布时间
        SJDL:'1', //数据大类
        SJLB:'', //数据类别
        SJLY:'', //数据来源
        SJDZ:'', //数据地址
        BZ:'', //备注
        SSSF:'', //省份
        SSCS:'', //地市
        SSQX:'', //区县
        SSSFDM:'', //省份代码
        SSCSDM:'', //地市代码
        SSQXDM:'', //区县代码
        ZY:'', //摘要
        GJC:'', //关键词
        DIM:'', //地名
        RENM:'', //人名
        JIGOUM:'', //机构名
        CJSJ:'', //采集时间
        SFZSJ:'0', //是否脏数据
        SFZC:'0', //是否暂存
        SJKZ:'', //快照
        SFSJGZ:'0', //是否含有事件跟踪

        typeList:[], //类型集合
        trackData:[{}], //事态跟踪

      }
    },
    mounted(){
      this.getTypes();
      this.getLabels();
    },
    methods:{
      //省份改变
        updataProvince(value){
          if(value.value == '省'){
            this.SSSF = ''
          }else{
            this.SSSF = value.value
          }
          console.log(this.SSSF);
        },
        //市改变
        updataCity(value){
          if(value.value == '市'){
            this.SSCS = ''
          }else{
            this.SSCS = value.value
          }
            console.log(this.SSCS);
        },
        //区县改变
        updataCounty(value){
          if(value.value == '区'){
            this.SSQX = ''
          }else{
            this.SSQX = value.value
          }
            console.log(this.SSQX);
        },
      //分析
      analysis(){
        var _this = this;
        var bodyParam = {
          Text:this.CJNR.replace(/<\/br>/g,''),
          Size:10
        }
        _this.isAnalysis = true;
        //获取摘要
        function summary(){
          return _this.axios({
                  method:'post',
                  url:webApi.Host + webApi.TextAnalysis.GetSummary,
                  data:bodyParam,
                  timeout: 10000
                })
                // .then(function(response){
                //   if(response.data.code == 0){
                //     _this.ZY = response.data.data;
                //   }else{

                //   }
                // }).catch(function(error){

                // })
        }
        
        //获取关键词
        function keyword(){
          return _this.axios({
                  method:'post',
                  url:webApi.Host + webApi.TextAnalysis.GetKeyword,
                  data:bodyParam,
                  timeout: 10000
                })
                // .then(function(response){
                //   if(response.data.code == 0){
                //     _this.GJC = response.data.data;
                //   }else{

                //   }
                // }).catch(function(error){

                // })
        }
        
        //获取人名地名机构名
        function name(){
          return _this.axios({
                  method:'post',
                  url:webApi.Host + webApi.TextAnalysis.GetSegment,
                  data:bodyParam,
                  timeout: 10000
                })
                // .then(function(response){
                //   if(response.data.code == 0){
                //     _this.RENM = response.data.data.renming;
                //     _this.DIM = response.data.data.diming;
                //     _this.JIGOUM = response.data.data.jigouming;
                //   }else{

                //   }
                // }).catch(function(error){

                // })
        }
        _this.axios.all([summary(),keyword(),name()])
          .then(_this.axios.spread(function(summary,keyword,name){
            _this.isAnalysis = false;
            console.log(summary);
            console.log(keyword);
            console.log(name);
            _this.GJC = keyword.data.data;
            _this.ZY = summary.data.data;
            _this.RENM = name.data.data.renming;
            _this.DIM = name.data.data.diming;
            _this.JIGOUM = name.data.data.jigouming;
          })).catch(function(error){
            _this.isAnalysis = false;
          });
        
      },
      close() {//关闭
        this.$emit('inputClose',{isShow:false,isUpdate:false});
      },
      //获取类型集合
      getTypes(){
        var _this = this;
        this.axios({
          method:'get',
          url:webApi.Host + webApi.WebData.GetGyssClueTypes,
          timeout: 10000
        }).then(function(response){
          if(response.data.code == 0){
            console.log(response.data.data);
            _this.typeList = response.data.data;
          }else{

          }
        }).catch(function(error){

        })
      },
      //获取标签
      getLabels(){
        this.axios({
          method:'get',
          url:webApi.Host + webApi.WebData.GetLabels,
          timeout: 10000
        }).then(function(response){
          if(response.data.code == 0){
            console.log(JSON.parse(response.data.data));
          }else{

          }
        }).catch(function(error){

        })
      },
      //获取数据
      getData(){
        var _this = this;
        this.isDetailLoad = true;
        this.axios({
          method:'get',
          url:webApi.WebData.GetSourceData.format({id:this.dataId,site:this.site}),
          timeout:10000
        }).then(function(response){
          _this.isDetailLoad = false;
          if(response.data.code == 0){
            console.log(response.data.data);
            _this.YSSJBH = response.data.data._id;
            _this.CJNR = response.data.data.Content;
            _this.CJSJ = response.data.data.CreatedTime;
            _this.SJDZ = response.data.data.Site;
            _this.SSSF = response.data.data.Province + '省';
            _this.SSCS = response.data.data.City +'市';
            _this.FBSJ = response.data.data.PublishTime.replace(/\./g,'-') + ' 00:00:00';
            _this.SJLY = response.data.data.SiteName;
            _this.analysis();
          }else{

          }
        }).catch(function(error){
          _this.isDetailLoad = false;

        })
      },
      submit() {//提交
      var _this = this;
        if(this.isDetailLoad||this.isAnalysis){
          return;
        }
        if(this.SSSF == ''){
           this.$message({
             message:'请选择省份',
             type:'error'
           });
           return;
        }else if(this.SJDL == 1&&this.SJLB ==''){
           this.$message({
             message:'请选择所属领域',
             type:'error'
           });
           return;
        }else if(this.SSCS == ''){
           this.$message({
             message:'请选择地市',
             type:'error'
           });
           return;
        }
        this.isDetailLoad = true;
        if(this.place.length > 0){
          this.SSSF = this.place[0];
          this.SSCS = this.place[1];
          this.SSQX = this.place[2];
        }
        if(this.SJDL == 2){
          this.SJLB = '';
        }
        var bodyParam = {
          YSSJJHMC:this.site,
          YSSJBH:this.YSSJBH,
          CJNR: this.CJNR,
          FBSJ: this.FBSJ,
          SJDL: this.SJDL,
          SJLB: this.SJLB,
          SJLY: this.SJLY,
          SJDZ: this.SJDZ,
          BZ: this.BZ,
          SSSF: this.SSSF,
          SSCS: this.SSCS,
          SSQX: this.SSQX,
          ZY: this.ZY,
          GJC: this.GJC,
          DIM: this.DIM,
          RENM: this.RENM,
          JIGOUM: this.JIGOUM,
          CJSJ: this.CJSJ,
          SFZSJ: this.SFZSJ,
          SFZC: this.SFZC,
          SJKZ: this.SJKZ,
          SFSJGZ: this.SFSJGZ
        }
        this.axios({
          method: 'post',
          url:webApi.Host + webApi.WebData.Confirm,
          data:bodyParam,
          timeout:10000
        }).then(function(response){
          _this.isDetailLoad = false;
          if(response.data.code == 0){
            _this.$message({
              message:'提交成功',
              type: 'success'
            })
            _this.$emit('complete',{isShow:false});
          }else{

          }
        }).catch(function(error){
          _this.isDetailLoad = false;

        })
      }
    },
    watch: {
      dataId() {
        console.log(this.dataId);
        this.getData();
      }
    }
  }
</script>

<style lang="scss" scoped>

  #main_box {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,.4);
    z-index: 999;
    &.toggleShow-enter-active,
    &.toggleShow-leave-active {
      transition: opacity .5s;
    }
    &.toggleShow-enter,
    &.toggleShow-leave-to {
      opacity: 0;
    }
    #main{
      position: relative;
      left: 50%;
      top: 50%;
      transform: translate(-50%,-50%);
      background-color: #fff;
      color: #333;
      height: 90%;
      width: 90%;
      #main-header{
        width: 100%;
        height: 50px;
        background: #EEEEEE;
        border-bottom: 1px solid #dcdcdc;
        .search-wrap {
          float: right;
          margin-right: 50px;
          margin-top: 4px;
        }
        .main-icon{
          display: inline-block;
          width: 50px;
          height: 50px;
          line-height: 50px;
          text-align: center;
          font-size: 16px;
          border-right: 1px solid #dcdcdc;
          color: #666666;
        }
        .main-title{
          padding-left: 10px;
          display: inline-block;
          height: 100%;
        }
        .manage-icon{
          float: right;
          height: 100%;
          width: 40px;
          line-height: 50px;
          text-align: center;
          border-right:solid 1px #ddd;
          &:hover {
            cursor: pointer;
          }
          i {
            color: red;
          }
        }
      }
      #content {
        overflow-x: hidden;
        overflow-y: auto;
        padding: 15px;
        height: calc(100% - 50px);
        .detail-item{
          margin: 15px 0;
          .textarea {
            clear: left;
            width: 100%;
            height: 200px;
            border: 1px solid #eae4e4;
            resize: none;
          }
          span{
            display: inline-block;
          }
          .item-title{
            width: 300px;
            height: 40px;
            line-height: 40px;
            text-align: center;
            float: left;
            background-color: #c0ecaa;
          }
          .item-content{
            border: solid 1px #ddd;
            height: 40px;
            line-height: 40px;
            padding: 0px 10px;
            width: calc(100% - 300px);
            input {
              height: 100%;
              vertical-align: text-bottom;
              border: none;
              width: 100%;
              padding: 0 10px;
            }
            .link{
              color: #3897c6;
            }
            .link:hover{
              text-decoration: underline;
            }
            .place-input{
              height: 100%;
            }
          }
          .Machine {
            padding: 10px;
            border: 1px solid #eae4e4;
            .item-title {
              width: 150px;
              margin-bottom: 15px;
            }
            .item-content {
              width: calc(100% - 150px);
              margin-bottom: 15px;    
              padding: 2px 0;
            }
            textarea {
              min-height: 150px;
              margin-top: -15px;
            }
          }
          .resource-box{
            width: 100%;
            display: block;
            float: none;
          }
          .resource-content{
            height: initial;
            line-height: 22px;
            padding: 15px;
            width: 100%;
            .text-title{
              font-size: 18px;
              font-weight: bold;
              margin-bottom: 10px;
            }
            .text-title-item{
              font-size: 14px;
              font-weight: bold;
              margin-right: 10px;
              vertical-align: top;
            }
            img{
              width: 200px;
              height: 300px;
            }
            video{
              width: 300px;
              height: 200px;
            }
          }
          .track-title{
            width: 80px;
            background: #fff;
            font-weight: bold;
            line-height: 20px;
          }
          .timeline-content{
            border: none;
            .itemline-box{
              padding: 0;
              .timeline-item{
                padding-bottom: 10px;
                position: relative;
                .timeline-icon{
                  position: absolute;
                  left: -5px;
                  top: 0;
                  z-index: 10;
                  width: 20px;
                  height: 20px;
                  line-height: 20px;
                  background-color: #fff;
                  color: #5FB878;
                  border-radius: 50%;
                  text-align: center;
                  cursor: pointer;
                }
                .tiemline-text{
                  line-height: 22px;
                  display: inline-block;
                  padding-left: 30px;
                  width: 100%;
                  .timeline-text-item{
                    margin-bottom: 5px;
                    font-size: 16px;
                    color: #333;
                    font-weight: 500;
                    span{
                      display: inline-block;
                      width: 100px;
                      color:#333;
                      vertical-align: top;
                      text-align: right;
                    }
                    .track-input{
                      border:solid 1px #ddd;
                      height: 30px;
                      width: 70%;
                    }
                  }
                }
              }
              .timeline-item:before{
                content: '';
                position: absolute;
                left: 5px;
                top: 0;
                z-index: 0;
                width: 1px;
                height: 100%;
                background-color: #e6e6e6;
              }
              .timeline-item:last-child:before{
                display: none;
              }
            }
          }
        }
      }
    }
  }
  @media (max-width: 1440px) {
    #main_box {
      #main{
        #content {
          .detail-item{
            .item-title{
              height: 32px;
              line-height: 32px;
            }
            .item-content{
              height: 32px;
              line-height: 32px;    
              padding: 2px 0;
            }
          }
        }
      }
    }
  }

</style>
