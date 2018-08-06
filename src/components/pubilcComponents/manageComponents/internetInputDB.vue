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
            <span class="item-title">图片上传</span>

            <form id="uploadImg" name="uploadImg" enctype="multipart/form-data">

              <label for="img-input">
                <i class="fa fa-plus-circle" style="font-size: 30px;margin-left: 10px;color: #7faae4;"></i>
              </label>
              <input name="img" style="display:none" @change="chooseImg" id="img-input" type="file">

            </form>

            <div class="Machine" style="clear:both">
              <div class="resource-item" v-for="(item,index) in TP">
                <img :src="item">
                <span class="close-resource" @click="delImg(index)">
                  <i class="fa fa-times-circle"></i>
                </span>
              </div>
            </div>
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
            <span class="item-title">事态跟踪</span>
            <el-radio v-model="SFSJGZ" label="1">是</el-radio>
            <el-radio v-model="SFSJGZ" label="0">否</el-radio>
            <el-button v-show="SFSJGZ == 1" @click="trackAnalysis" type="success" style="margin-left: 10px;height: 30px;line-height: 11px;">分析</el-button>
          </div>
          <div class="detail-item" v-show="SFSJGZ == 1">
            <span class="item-content timeline-content">
                <div v-show="trackData.length == 0">请点击分析按钮获取事件跟踪数据</div>
                <ul class="itemline-box" v-show="trackData.length > 0">
                  <!-- <li class="timeline-item">
                    <div class="tiemline-text">
                      <div class="timeline-text-item">
                        <span>发帖时间：</span>
                        <input class="track-input" type="text" v-model="trackHead.time">
                      </div>
                      <div class="timeline-text-item">
                        <span>帖子信息：</span>
                        <input class="track-input" type="text" v-model="trackHead.content">
                      </div>
                    </div>
                  </li> -->
                  <li v-for="(item,index) in trackData"  class="timeline-item">
                      <i class="timeline-icon fa fa-circle-o"></i>
                      <!-- <span class="timeline-index">{{index + 1}}</span> -->
                      <i @click="delTrack(index)" class="del-track timeline-icon fa fa-times"></i>
                      <div class="tiemline-text">
                          <div class="timeline-text-item" v-show="index > 0">
                            <span>之前回帖数:</span>
                            <input class="track-input" type="text" v-model="item.preNum">
                          </div>
                          <div class="timeline-text-item">
                            <span>之后回帖数:</span>
                            <input class="track-input" type="text" v-model="item.nextNum">
                          </div>
                          <div class="timeline-text-item timeline-time">
                            <span>回复时间:</span>
                            <input class="track-input" type="text" v-model="item.fbsj">
                          </div>
                          <div class="timeline-text-item  tiemline-name">
                            <span>名称:</span>
                            <input class="track-input" type="text" v-model="item.fbrmc">
                          </div>
                          <div class="timeline-text-item">
                            <span>回复内容:</span>
                            <textarea style="min-height:150px;" class="track-input textarea" v-model="item.content"></textarea>
                          </div>
                          <div class="timeline-text-item">
                            <span>图片:</span>
                            <ul id="imgViewer" class="img-box">
                              <li class="img-content" v-for="img in item.imgs">
                                <img :src="img" />
                              </li>
                            </ul>
                          </div>
                      </div>
                  </li>
                </ul>
            </span>
          </div>
          <div class="detail-item" style="margin-top: 30px;">
            <el-button @click="submit" type="success" >提交</el-button>
          </div>
        </div>
      </div>
      
    <div id="track-box" v-show="isShowTrackBox">
      <div id="track-box-header">
        <div class="track-title">事件跟踪</div>
        <div class="manage-icon">
          <i @click="closeTrack"  class="el-icon-close"></i>
        </div>
      </div>
      <div id="track-box-content">
        <div v-show="trackData2.length==0">此条数据暂无数据跟踪</div>
        <div class="detail-item"  v-show="trackData2.length>0">
            <span class="item-content timeline-content">
                <ul class="itemline-box">
                  <!-- <li class="timeline-item">
                    <div class="tiemline-text">
                      <div class="timeline-text-item">
                        <span>发帖时间：</span>
                        <input class="track-input" type="text" v-model="trackHead.time">
                      </div>
                      <div class="timeline-text-item">
                        <span>帖子信息：</span>
                        <input class="track-input" type="text" v-model="trackHead.content">
                      </div>
                    </div>
                  </li> -->
                  <li v-for="(item,index) in trackData2"  class="timeline-item" >
                      <i class="timeline-icon fa fa-circle-o" @click="chooseTrack(item,index)"></i>
                      <!-- <span class="timeline-index">{{index + 1}}</span> -->
                      <i v-show="item.isChecked" class="del-track timeline-icon fa fa-check"></i>
                      <div class="tiemline-text">
                          <div class="timeline-text-item" v-show="index > 0">
                            <span>之前回帖数:</span>
                            <input class="track-input" type="text" v-model="item.preNum">
                          </div>
                          <div class="timeline-text-item">
                            <span>之后回帖数:</span>
                            <input class="track-input" type="text" v-model="item.nextNum">
                          </div>
                          <div class="timeline-text-item timeline-time">
                            <span>回复时间:</span>
                            <input class="track-input" type="text" v-model="item.fbsj">
                          </div>
                          <div class="timeline-text-item  tiemline-name">
                            <span>名称:</span>
                            <input class="track-input" type="text" v-model="item.fbrmc">
                          </div>
                          <div class="timeline-text-item">
                            <span>回复内容:</span>
                            <textarea style="min-height:150px;" class="track-input textarea" v-model="item.content"></textarea>
                          </div>
                          <div class="timeline-text-item">
                            <span>图片:</span>
                            <ul id="imgViewer2" class="img-box">
                              <li class="img-content" v-for="img in item.imgs">
                                <img :src="img" />
                              </li>
                            </ul>
                          </div>
                      </div>
                  </li>
                </ul>
            </span>
          </div>
      </div>
      <div id="track-btn">
        <el-button @click="trackAnalysisConfirm" class="track-btn-confirm" type="success" plain>分析</el-button>
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
        isTrackAnalysis: false,

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
        SJGZSJ:'', //事件跟踪数据
        TPJH:'', //图片集合

        typeList:[], //类型集合
        trackData:[], //事态跟踪
        trackHead:{}, //事态跟踪头部

        trackData2:[], //事件跟踪元数据
        TP:[], //图片储存文件获取的图片

        isShowTrackBox:false, //是否显示事件跟踪
        trackChoose:[]

      }
    },
    mounted(){
      this.getTypes();
      this.getLabels();
    },
    methods:{
        //分析事态跟踪
        trackAnalysisConfirm(){
          this.isShowTrackBox = false;
          this.trackData = this.trackData2;
          this.$nextTick(()=>{
            let viewer = new Viewer(document.getElementById('imgViewer'));
          })
        },
        //选择事态跟踪
        chooseTrack(item,index){
          var _this = this;
          // this.trackData2[index].isChecked = !this.trackData2[index].isChecked;
          this.$set(this.trackData2[index],'isChecked',!item.isChecked);
          this.trackData2 = this.trackData2.slice();
          if(this.trackData2[index].isChecked){
            this.trackChoose.push(this.trackData2[index]);
          }else{
            if(this.trackChoose.length > 0){
              for(var i=0;i<this.trackChoose.length;i++){
                if(_this.trackChoose[i].content == this.trackData2[index].content){
                  _this.trackChoose.splice(i,1);
                  i -= 1;
                }
              }
            }else{
              this.trackChoose =  [];
            }
          }
        },
        //关闭事件跟踪模块
        closeTrack(){
          this.isShowTrackBox = false;
        },
        //删除跟踪
        delTrack(index){
          this.trackData.splice(index,1);
        },
        //删除图片
        delImg(index){
          var _this = this;
          _this.TP.splice(index,1);
          var tpjh = '';
          if(_this.TPJH.indexOf(',') != -1){
            var obj = _this.TPJH.split(',');
            obj = obj.splice(index,1);
            for(var i = 0;i<obj.length;i++){
              tpjh += obj[i] + ',';
            }
            tpjh = tpjh.slice(0,tpjh.length-1);
          }
          _this.TPJH = tpjh;
        },
        //选择图片
        chooseImg(){
          var _this = this;
          var form = document.getElementById('uploadImg');
          var formData = new FormData(form);
          // formData.append('img',this.fileList);
          this.axios({
            method:'post',
            url:webApi.Host + webApi.WebData.UploadFile,
            data:formData,
            timeout:10000
          }).then(function(response){
            if(response.data.code == 0){
              if(response.data.data.length > 0){
                _this.TPJH += ',' + response.data.data[0];
                var src = webApi.WebData.DownLoadFile.format({id:response.data.data[0]});
                _this.TP.push(src);
              }
            }else{

            }
          }).catch(function(error){
            console.log(error);
            _this.isDetailLoad = false;
          })
        },
        //事件跟踪分析
        trackAnalysis(){
          this.isShowTrackBox = true;
        },
        //省份改变
        updataProvince(value){
          if(value.value == '省'){
            this.SSSF = ''
          }else{
            this.SSSF = value.value
          }
        },
        //市改变
        updataCity(value){
          if(value.value == '市'){
            this.SSCS = ''
          }else{
            this.SSCS = value.value
          }
        },
        //区县改变
        updataCounty(value){
          if(value.value == '区'){
            this.SSQX = ''
          }else{
            this.SSQX = value.value
          }
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
        }
        
        //获取关键词
        function keyword(){
          return _this.axios({
                  method:'post',
                  url:webApi.Host + webApi.TextAnalysis.GetKeyword,
                  data:bodyParam,
                  timeout: 10000
                })
        }
        
        //获取人名地名机构名
        function name(){
          return _this.axios({
                  method:'post',
                  url:webApi.Host + webApi.TextAnalysis.GetSegment,
                  data:bodyParam,
                  timeout: 10000
                })
        }
        _this.axios.all([summary(),keyword(),name()])
          .then(_this.axios.spread(function(summary,keyword,name){
            _this.isAnalysis = false;
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
        this.SJLB = '', //数据类别
        this.SSSF = '', //省份
        this.SSCS = '', //地市
        this.SSQX = '', //区县
        this.SFZC = '0',
        this.SFZSJ = '0',
        this.$emit('inputClose',{isShow:false,isUpdate:false});
        this.isShowTrackBox = false;
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
            _this.YSSJBH = response.data.data._id;
            _this.CJNR = response.data.data.Content;
            _this.CJSJ = response.data.data.CreatedTime;
            _this.SJDZ = response.data.data.Link;
            if(response.data.data.Province.indexOf('省') == -1){
              _this.SSSF = response.data.data.Province + '省';
            }else{
              _this.SSSF = response.data.data.Province;
            }
            if(response.data.data.City.indexOf('市') == -1){
              _this.SSCS = response.data.data.City +'市';
            }else{
              _this.SSCS = response.data.data.City;
            }
            if(response.data.data.PublishTime){
              console.log(3);
              
              console.log(response.data.data.PublishTime.indexOf(':') != -1);
              if(response.data.data.PublishTime.indexOf(':') != -1){
                console.log(1);
                var fbsj = response.data.data.PublishTime.split(' ')[0].split('-');
                var time = response.data.data.PublishTime.split(' ')[1]
                if(fbsj[1]<10 && fbsj[1].indexOf('0') == -1){
                  response.data.data.PublishTime = fbsj[0] + '-' + addZero(fbsj[1]) + '-' + addZero(fbsj[2]) + ' ' +time;
                }
              }else{
                console.log(2);
                if(response.data.data.PublishTime.indexOf('.') != -1){
                  response.data.data.PublishTime = response.data.data.PublishTime.replace(/\./g,'-') + ' 00:00:00';
                }else{
                  response.data.data.PublishTime = response.data.data.PublishTime + ' 00:00:00';
                }
              }
              console.log(4);
              console.log(response.data.data.PublishTime);
              _this.FBSJ = response.data.data.PublishTime;
              function addZero(obj){
                if(obj<10){
                  return '0' + obj;
                }else{
                  return obj;
                }
              }
            }
            // if(response.data.data.PublishTime.indexOf('.') != -1){
            //   _this.FBSJ = response.data.data.PublishTime.replace(/\./g,'-') + ' 00:00:00';
            // }else{
            //   _this.FBSJ = response.data.data.PublishTime;
            // }
            _this.SJLY = response.data.data.SiteName;
            _this.analysis();
            if(response.data.data.Notes != undefined&&response.data.data.Notes.length > 0){
              _this.SFSJGZ = '1';
              _this.trackData2 = response.data.data.Notes;
              for(var i=0;i<_this.trackData2.length;i++){
                _this.trackData2[i].isChecked = false;
                if(i >= 2){
                  _this.trackData2[i].preNum = i - 1;
                  _this.trackData2[i].nextNum = _this.trackData2.length - i - 1;
                }else if(i < 2){
                  _this.trackData2[i].preNum = 0;
                  _this.trackData2[i].nextNum = _this.trackData2.length - i - 1;
                }
              }
              _this.$nextTick(function(){
                  let viewer2 = new Viewer(document.getElementById('imgViewer2'));
              })
            }else{
              _this.SFSJGZ = '0';
              _this.trackData2 = [];
            }
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
        if(this.SFZSJ == 0&&this.SFZC == 0){
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
        }
        this.isDetailLoad = true;
        if(this.SJDL == 2){
          this.SJLB = '';
        }
        if(this.SFSJGZ == 1){
          this.SJGZSJ = JSON.stringify(this.trackData);
        }else{
          this.SJGZSJ = '';
        }
        var obj = this.JIGOUM.split(',');
        if(obj.length > 18){
          var jigou = '';
          for(var i = 0;i<18;i++){
            if(i<17){
              jigou += obj[i] + ',';
            }else if(i == 17){
              jigou += obj[i];
            }
          }
          this.JIGOUM = jigou;
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
          SFSJGZ: '0',
          SJGZSJ: this.SJGZSJ
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
            
            _this.SJLB = '', //数据类别
            _this.SSSF = '', //省份
            _this.SSCS = '', //地市
            _this.SSQX = '', //区县
            _this.SFZC = '0',
            _this.SFZSJ = '0',
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
    #track-box{    
      position: absolute;
      top: 50%;
      left: 50%;
      width: 70%;
      height: 70%;
      background: #fff;
      transform: translate(-50%,-50%);
      box-shadow: 0 0 10px #ddd;
      #track-box-header{
        width: 100%;
        height: 30px;
        line-height: 30px;
        background: #EEEEEE;
        border-bottom: 1px solid #dcdcdc;
        .track-title{
          padding-left: 10px;
          display: inline-block;
          height: 100%;
          font-size: 12px;
        }
        .manage-icon{
          float: right;
          height: 100%;
          width: 40px;
          line-height: 30px;
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
      #track-box-content{
        width: 100%;
        height: calc(100% - 80px);
        overflow: auto;
        .detail-item{
          margin: 15px 0;
          .item-content{
            border: solid 1px #ddd;
            height: 40px;
            line-height: 40px;
            padding: 0px 10px;
            width: calc(100% - 300px);
          }
          .timeline-content{
            border: none;
            .itemline-box{
              padding: 0;
              padding-left: 51px;
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
                  font-size: 20px;
                  cursor: pointer;
                }
                .timeline-index{
                  position: absolute;
                  left: -3px;
                  top: -4px;
                  z-index: 10;
                  height: 27px;
                  line-height: 28px;
                }
                .del-track{
                  left: -35px;
                  font-size: 20px;
                  color: #4de688;
                }
                .tiemline-text{
                  line-height: 22px;
                  display: inline-block;
                  padding-left: 10px;
                  width: 100%;
                  vertical-align: text-bottom;
                  .timeline-text-item{
                    margin-bottom: 5px;
                    font-size: 16px;
                    color: #333;
                    font-weight: 500;
                    .img-box{
                      display: inline-block;
                      width: 80%;
                      .img-content{
                        width: 20%;
                        height: 165px;
                        text-align: center;
                        line-height: 300px;
                        padding: 5px;
                        display: inline-block;
                        img{
                          width: 100%;
                          height: 100%;
                        }
                      }
                    }
                    span{
                      display: inline-block;
                      width: 100px;
                      color:#333;
                      vertical-align: top;
                      text-align: right;
                      font-size: 14px;
                    }
                    .track-input{
                      border:solid 1px rgb(158, 158, 158);
                      height: 30px;
                      width: 80%;
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
      #track-btn{
        width: 100%;
        height: 50px;
        line-height: 50px;
        border-top: solid 1px #ddd;
        .track-btn-confirm{
          float: right;    
          margin: 5px 10px 0 0;
        }
      }
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
        position: relative;
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
            .resource-item{
              width: 25%;
              position: relative;
              display: inline-block;
              padding: 10px;
              img{
                width: 100%;
              }
              .close-resource{    
                position: absolute;
                top: -12px;
                right: -8px;
                font-size: 20px;
                color: red;
                cursor: pointer;
              }
            }
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
              padding-left: 51px;
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
                  font-size: 20px;
                  cursor: pointer;
                }
                .timeline-index{
                  position: absolute;
                  left: -3px;
                  top: -4px;
                  z-index: 10;
                  height: 27px;
                  line-height: 28px;
                }
                .del-track{
                  left: -35px;
                  font-size: 20px;
                  color: #c71010;
                }
                .tiemline-text{
                  line-height: 22px;
                  display: inline-block;
                  padding-left: 10px;
                  width: 100%;
                  vertical-align: text-bottom;
                  .timeline-text-item{
                    margin-bottom: 5px;
                    font-size: 16px;
                    color: #333;
                    font-weight: 500;
                    .img-box{
                      display: inline-block;
                      width: 80%;
                      .img-content{
                        width: 20%;
                        height: 165px;
                        text-align: center;
                        line-height: 300px;
                        padding: 5px;
                        display: inline-block;
                        img{
                          width: 100%;
                          height: 100%;
                        }
                      }
                    }
                    span{
                      display: inline-block;
                      width: 100px;
                      color:#333;
                      vertical-align: top;
                      text-align: right;
                      font-size: 14px;
                    }
                    .track-input{
                      border:solid 1px rgb(158, 158, 158);
                      height: 30px;
                      width: 80%;
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
              padding: 2px 5px;
            }
          }
        }
      }
    }
  }

</style>
