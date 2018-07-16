<template>
  <transition name="toggleShow">
  <div id="knowBox" v-show="isShow">
    <div id="knowledgeInput">
      <div id="knowledge-header">
            <div class="knowledge-icon">
                <i class="fa fa-pencil-square-o"></i>
            </div>
        <div class="knowledge-title"><slot></slot></div>
        <div class="manage-icon">
          <i @click="close"  class="el-icon-close"></i>
        </div>
      </div>
      <div id="knowledge-content" v-loading="isLoading">
        <div class="detail-item">
          <span class="item-title">标题</span><span class="item-content"><input type="text" v-model="Title"/>
                </span>
        </div>
        <div class="detail-item">
          <span class="item-title">所属领域</span><span class="item-content"><input type="text" v-model="DataType"/>
                </span>
        </div>
        <div class="detail-item">
          <span class="item-title">作者</span><span class="item-content"><input type="text" v-model="Author"/>
                  </span>
        </div>
        <div class="detail-item">
          <span class="item-title">发布时间</span><span class="item-content"><input type="text" v-model="PublishTime"/>
                </span>
        </div>
        <div class="detail-item">
          <span class="item-title">采集站点</span><span class="item-content"><input type="text" v-model="Site"/></span>
        </div>
        <div class="detail-item">
          <span class="item-title">采集站点名称</span><span class="item-content"><input type="text" v-model="SiteName"/></span>
        </div>
        <div class="detail-item">
          <span class="item-title">来源</span><span class="item-content"><input type="text" v-model="Source"/>
                </span>
        </div>
        <div class="detail-item">
          <span class="item-title">数据地址</span><span class="item-content"><input type="text" v-model="Link"/>
                </span>
        </div>
        <div class="detail-item">
          <span class="item-title">内容</span>
          <textarea id="textarea" v-show="type=='Modify'" cols="30" rows="10" v-model="editorText"></textarea>
          <div v-show="type=='Add'" id="result-edit" style="clear: both;"></div>
          </div>
        <button id="submit-btn" @click="submitBtn" ref="submitBtn">
          提交
        </button>
      </div>
    </div>
  </div>
  </transition>
</template>

<script>
  export default {
    props: {'isShow': false,"knowledgeId": "",'type': ''},
    data(){
      return{
        isLoading: false,
        //编辑器菜单栏设置
        items:[
          'source', '|', 'undo', 'redo', '|', 'preview', 'template', 'code', 'cut', 'copy', 'paste',
          'plainpaste', 'wordpaste', '|', 'justifyleft', 'justifycenter', 'justifyright',
          'justifyfull', 'insertorderedlist', 'insertunorderedlist', 'indent', 'outdent', 'subscript',
          'superscript', 'clearhtml', 'quickformat', 'selectall', '|', 'fullscreen', '/',
          'formatblock', 'fontname', 'fontsize', '|', 'forecolor', 'hilitecolor', 'bold',
          'italic', 'underline', 'lineheight', 'removeformat', '|', 'image',
          'insertfile', 'table', 'hr', 'emoticons', 'pagebreak',
          'anchor', 'link', 'unlink', '|', 'about'
        ],
        Title:'',  //标题
        Author: "",//作者
        Site: "",//采集站点,
        SiteName: "",//采集站点中文名称,
        DataType:  "",//所属类别,法律法规、理论研究,
        PublishTime:'', //发布时间
        PublishTimeStr: "" ,//发布时间字符串，当PublishTime不能转化为日期时使用,
        Source:'', //来源
        Link:'', //数据地址
        editorText:'', //内容
        editor: "",//Ueditor
        BH: "" ,//编号
      }
    },
    methods:{
      //初始化editor
      initEditor() {
        this.editor =  UE.getEditor('result-edit');
      },
      //关闭
      close() {
        this.$emit("closeInput",false);
      },
      //修改编写内容
      onContentChange(val){
        this.editorText = val;
      },
      //提交
      submitBtn(){
        let _this = this;
        let url;
        let btn = _this.$refs.submitBtn;
        btn.setAttribute('disabled',"disabled");
        btn.style.cursor = 'not-allowed';
        let data= {
          Title: _this.Title,//标题
            Content: _this.editorText,//内容,
            Source: _this.Source,//来源,
            Link: _this.Link,//数据地址,
            Author: _this.Author,//作者
            PublishTime: _this.PublishTime,//发布时间
            PublishTimeStr: _this.PublishTimeStr,//发布时间字符串，当PublishTime不能转化为日期时使用,
            Site: _this.Site,//采集站点,
            SiteName: _this.SiteName,//采集站点中文名称,
            DataType: _this.DataType,//所属类别,法律法规、理论研究,
        };
        if(_this.type=="Add") {
          url = webApi.Host + webApi.Knowledge.Add;
          data.Content = _this.editor.getPlainTxt();
        }else if(_this.type=="Modify") {
          url = webApi.Host + webApi.Knowledge.Modify;
          data.BH = _this.BH;
        }
        this.axios({
          method: 'post',
          url: url,
          data: data,
          timeout: 5000
        }).then(function(res) {
          if(res.data.code==0) {
            _this.$message({
              showClose: true,
              message: '操作成功',
              type: 'success'
            });
            btn.removeAttribute('disabled');
            btn.style.cursor = 'pointer';
          }
          console.log(res)
        }).catch(function(err){
          _this.$message({
            showClose: true,
            message: '操作失败,请重试',
            type: 'error'
          });
          btn.removeAttribute('disabled');
          btn.style.cursor = 'pointer';
          console.log(err)
        })
      }
    },
    mounted() {
      this.initEditor();
    },
    watch: {
      knowledgeId(){
        let _this = this;
        if(_this.knowledgeId) {
          _this.isLoading = true;
          _this.axios({
            url: (webApi.Knowledge.Get).format({id:_this.knowledgeId}),
            timeout: 10000
          }).then(function(res){
            if(res.data.code==0){
              let data = res.data.data[0];
              _this.Title = data.BT;
              _this.Source = data.LY;
              _this.Link = data.SJDZ;
              _this.Author = data.ZZ;
              _this.PublishTime = data.FBSJ;
              _this.Site = data.CJZD;
              _this.SiteName = data.CJZDMC;
              _this.DataType = data.SSLB;
              _this.BH = data.BH;
              _this.editorText = data.NR;
              _this.isLoading = false;
            }
          }).catch(function(err){
            _this.isLoading = false;
            console.log(err)
          })
        }else {
          _this.Title = "";
          _this.Source = "";
          _this.Link = "";
          _this.Author = "";
          _this.PublishTime = "";
          _this.Site = "";
          _this.SiteName = "";
          _this.DataType = "";
          _this.editorText = "";
          _this.editor.setContent("");
        }
        console.log(this.knowledgeData)
      }
    },
    destroyed() {
      this.editor.destroy();
    }
  }
</script>

<style lang="scss" scoped>
  #knowBox {
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    width: 100%;
    background-color: rgba(0,0,0,.4);
    z-index: 1000;
    &.toggleShow-enter-active,
    &.toggleShow-leave-active {
      transition: opacity .5s;
    }
    &.toggleShow-enter,
    &.toggleShow-leave-to {
      opacity: 0;
    }
    #knowledgeInput{
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%,-50%);
      height: 90%;
      width: 90%;
      background-color: #fff;
      overflow: hidden;
      #knowledge-header{
        width: 100%;
        height: 50px;
        background: #EEEEEE;
        border-bottom: 1px solid #dcdcdc;
        .search-wrap {
          float: right;
          margin-right: 50px;
          margin-top: 4px;
        }
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
      #knowledge-content{
        padding: 0 15px;
        height: calc(100% - 50px);
        overflow-y: auto;
        overflow-x: hidden;
        .detail-item{
          width: 100%;
          margin: 15px 0;
          span{
            display: inline-block;
          }
          .item-title{
            width: 300px;
            height: 30px;
            line-height: 30px;
            text-align: center;
            float: left;
            background-color: #c0ecaa;
          }
          .item-content{
            border: solid 1px #ddd;
            height: 30px;
            line-height: 30px;
            width: calc(100% - 300px);
            .link{
              color: #3897c6;
            }
            .link:hover{
              text-decoration: underline;
            }
            input{
              height: 100%;
              vertical-align: text-bottom;
              border: none;
              width: 100%;
              padding: 0 10px;
            }
          }
        }
        #textarea {
          clear: both;
          width:100%;
          height:500px;
          padding: 20px;
          border: none;
        }
        #submit-btn{
          display: inline-block;
          width: 100px;
          height: 30px;
          text-align: center;
          line-height: 30px;
          background: #00a65a;
          border-radius: 5px;
          color: #fff;
          margin-top: 10px;
          cursor: pointer;
          margin-bottom: 20px;
          border: none;
        }
        #submit-btn:hover{
          background: #0aba69;
        }
        #submit-btn:active{
          background: #059553;
        }
      }
    }
  }
</style>

