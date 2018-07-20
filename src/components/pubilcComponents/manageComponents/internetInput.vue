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
              <el-radio :disabled="SJDL == 2" v-model="SJLB" :label="item" v-for="(item,index) in typeList" :key="index">{{item}}</el-radio>
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
          <!-- <div class="detail-item">
            <span class="item-title track-title">事态跟踪:</span>
            <span class="item-content timeline-content">
                <ul class="itemline-box">
                    <li v-for="item in trackData"  class="timeline-item">
                        <i class="timeline-icon fa fa-circle-o"></i>
                        <div class="tiemline-text">
                            <p class="timeline-time">
                              <input type="text" v-model="item.time">
                            </p>
                            <p class="tiemline-name">
                              <input type="text" v-model="item.name">
                            </p>
                            <p>
                              <textarea style="min-height:100px;" class="textarea" v-model="item.content"></textarea>
                            </p> -->
                          <!--<h3 class="timeline-time" v-model="item.time" contenteditable="true"></h3>-->
                          <!--<h4 class="tiemline-name" v-model="item.name" contenteditable="true"></h4>-->
                          <!--<p v-model="item.content" contenteditable="true"></p>-->
                        <!-- </div>
                    </li>
                </ul>
            </span>
          </div> -->
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
      'operation':'', //操作
    },
    data(){
      return{
        isDetailLoad: false, 
        isAnalysis: false,

        YSSJBH:'', //原始数据编号
        BH:'', //数据编号
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

      }
    },
    mounted(){
      this.getTypes();
      this.getLabels();
    },
    methods:{//省份改变
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
        if(this.CJNR == ''){
          this.$message({
            message:'暂无内容',
            type: 'error'
          });
          return;
        }
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
          url:webApi.WebData.Get.format({id:this.dataId}),
          timeout:10000
        }).then(function(response){
          _this.isDetailLoad = false;
          if(response.data.code == 0){
            console.log(response.data.data);
            _this.YSSJBH = response.data.data[0].YSSJBH;
            _this.BH = response.data.data[0].BH;
            _this.CJNR = response.data.data[0].CJNR;
            _this.CJSJ = response.data.data[0].CJSJ;
            _this.SJDZ = response.data.data[0].SJDZ;
            _this.SSSF = response.data.data[0].SSSF;
            _this.FBSJ = response.data.data[0].FBSJ;
            _this.SJLY = response.data.data[0].SJLY;
            _this.GJC = response.data.data[0].GJC;
            _this.RENM = response.data.data[0].RENM;
            _this.JIGOUM = response.data.data[0].JIGOUM;
            _this.SSCS = response.data.data[0].SSCS;
            _this.SSQX = response.data.data[0].SSQX;
            _this.ZY = response.data.data[0].ZY;
            _this.SJLY = response.data.data[0].SJLY;
            _this.SFZC = response.data.data[0].SFZC;
            _this.SFSJGZ = response.data.data[0].SFSJGZ;
            _this.SJDL = response.data.data[0].SJDL;
            _this.SJLB = response.data.data[0].SJLB;
            _this.BZ = response.data.data[0].BZ;
            _this.SFZSJ = response.data.data[0].SFZSJ;
          }else{

          }
        }).catch(function(error){
          _this.isDetailLoad = false;

        })
      },
      submit() {//提交
      var _this = this;
        if(this.SSSF == ''){
           this.$message({
             message:'请选择省份',
             type:'error'
           });
           return;
        }else if(this.SSCS == ''){
           this.$message({
             message:'请选择城市',
             type:'error'
           });
           return;
        }else if(this.SJDL == 1&&this.SJLB ==''){
           this.$message({
             message:'请选择所属领域',
             type:'error'
           });
           return;
        }else if(this.FBSJ.length == 0){
           this.$message({
             message:'请填写发布时间',
             type:'error'
           });
           return;
        }else if(this.CJNR.length == 0){
           this.$message({
             message:'请填写采集内容',
             type:'error'
           });
           return;
        }else if(this.CJSJ.length == 0){
           this.$message({
             message:'请填写采集时间',
             type:'error'
           });
           return;
        }else if(this.SJLY.length == 0){
           this.$message({
             message:'请填写数据网址',
             type:'error'
           });
           return;
        }else if(this.SJDZ.length == 0){
           this.$message({
             message:'请填写数据地址',
             type:'error'
           });
           return;
        }
        
        this.isDetailLoad = true;
        if(this.SJDL == 2){
          this.SJLB = '';
        }
        var bodyParam = {
          YSSJBH:this.YSSJBH,
          BH:this.BH,
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
        console.log(bodyParam);
        if(this.dataId == ''){//添加
        console.log('添加哦');
          this.axios({
            method: 'post',
            url:webApi.Host + webApi.WebData.Add,
            data:bodyParam,
            timeout:10000
          }).then(function(response){
            _this.isDetailLoad = false;
            if(response.data.code == 0){
              _this.$message({
                message:'添加成功',
                type: 'success'
              })
              _this.YSSJBH = ''; //原始数据编号
              _this.BH = ''; //数据编号
              _this.CJNR = ''; //采集内容
              _this.FBSJ = ''; //发布时间
              _this.SJDL = '1'; //数据大类
              _this.SJLB = ''; //数据类别
              _this.SJLY = ''; //数据来源
              _this.SJDZ = ''; //数据地址
              _this.BZ = ''; //备注
              _this.SSSF = ''; //省份
              _this.SSCS = ''; //地市
              _this.SSQX = ''; //区县
              _this.SSSFDM = ''; //省份代码
              _this.SSCSDM = ''; //地市代码
              _this.SSQXDM = ''; //区县代码
              _this.ZY = ''; //摘要
              _this.GJC = ''; //关键词
              _this.DIM = ''; //地名
              _this.RENM = ''; //人名
              _this.JIGOUM = ''; //机构名
              _this.CJSJ = ''; //采集时间
              _this.SFZSJ = '0'; //是否脏数据
              _this.SFZC = '0'; //是否暂存
              _this.SJKZ = ''; //快照
              _this.SFSJGZ = '0'; //是否含有事件跟踪
               _this.$emit('inputClose',{isShow:false,isUpdate:true});
            }else{
              _this.$message({
                message:'添加失败',
                type: 'error'
              })
            }
          }).catch(function(error){
            _this.isDetailLoad = false;
            _this.$message({
                message:'失败',
                type: 'error'
              })
  
          })
        }else{
          //修改
          this.axios({
            method: 'post',
            url:webApi.Host + webApi.WebData.Update,
            data:bodyParam,
            timeout:10000
          }).then(function(response){
            _this.isDetailLoad = false;
            if(response.data.code == 0){
              _this.$message({
                message:'修改成功',
                type: 'success'
              })
              _this.$emit('inputClose',{isShow:false,isUpdate:true});
            }else{
              _this.$message({
                message:'添加失败',
                type: 'error'
              })
            }
          }).catch(function(error){
            _this.isDetailLoad = false;
            _this.$message({
                message:'失败',
                type: 'error'
              })
          })
        }
      }
    },
    watch: {
      dataId() {
        if(this.dataId == ''){
          this.YSSJBH = ''; //原始数据编号
          this.BH = ''; //数据编号
          this.CJNR = ''; //采集内容
          this.FBSJ = ''; //发布时间
          this.SJDL = '1'; //数据大类
          this.SJLB = ''; //数据类别
          this.SJLY = ''; //数据来源
          this.SJDZ = ''; //数据地址
          this.BZ = ''; //备注
          this.SSSF = ''; //省份
          this.SSCS = ''; //地市
          this.SSQX = ''; //区县
          this.SSSFDM = ''; //省份代码
          this.SSCSDM = ''; //地市代码
          this.SSQXDM = ''; //区县代码
          this.ZY = ''; //摘要
          this.GJC = ''; //关键词
          this.DIM = ''; //地名
          this.RENM = ''; //人名
          this.JIGOUM = ''; //机构名
          this.CJSJ = ''; //采集时间
          this.SFZSJ = '0'; //是否脏数据
          this.SFZC = '0'; //是否暂存
          this.SJKZ = ''; //快照
          this.SFSJGZ = '0'; //是否含有事件跟踪
        }else{
            this.getData();
        }
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
                  .timeline-time{
                    margin-bottom: 5px;
                    font-size: 16px;
                    color: #333;
                    font-weight: 500;
                  }
                  .tiemline-name{
                    color: #333;
                  }
                  p{
                    color: #555;
                    input {
                      width: auto;
                      padding: 3px;
                      border: 1px solid #eae4e4;
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
