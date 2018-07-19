<template>
  <div id="knowledgeManage">
    <div id="header">
      <div class="header-icon">
          <i class="iconfont icon-boshimao"></i>
      </div>
      <div class="header-title">知识库</div>
      <div class="ly">来源：<span>公益诉讼研究</span>,<span>公益诉讼研讨</span>,<span>检查公益诉讼</span>,<span>公益诉讼羊皮卷</span></div>
       <!--<div class="search-wrap clearfix">-->
         <!--<i @click="change" style="color:green;width:30px;height:30px;" class="el-icon-circle-plus-outline"></i>-->
      <!--</div>-->
      <div class="manage-icon">
         <i @click="addKnowledge"  class="el-icon-circle-plus-outline"></i>
      </div>

    </div>
    <div id="content" v-loading="isLoading">
      <div class="table-list" ref="cueList">
        <el-table
          ref="oTable"
          :data="waitApproval"
          :max-height="tableH"
          :height="tableH"
          style="width: 100%">
          <el-table-column
            prop="JBNR"
            label="内容"
            min-width="200">
            <template slot-scope="scope">
              <el-popover trigger="click" placement="top" max-width="200">
                <p style="text-indent: 2em;">{{ scope.row.NR }}</p>
                <div slot="reference" class="td-content">
                  {{ scope.row.NR}}
                </div>
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column
            prop="BT"
            label="标题"
            min-width="150">
            <template slot-scope="scope">
              <el-popover trigger="click" placement="top" max-width="400">
                <p style="text-indent: 2em;">{{ scope.row.BT }}</p>
                <div slot="reference" class="td-content">
                  {{ scope.row.BT}}
                </div>
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column
            prop="SSLB"
            label="所属领域"
            min-width="100"
          >
          </el-table-column>
          <el-table-column
            prop="ZZ"
            label="作者"
            min-width="100"
          >
          </el-table-column>
          <el-table-column
            prop="FBSJ"
            label="发布时间"
            width="180">
          </el-table-column>
          <el-table-column
            prop="CJZD"
            label="采集站点"
            width="180">
          </el-table-column>
          <el-table-column
            prop="CJZDMC"
            label="采集站点名称"
            width="180">
          </el-table-column>
          <el-table-column
            prop="LY"
            label="来源"
            min-width="110"
          >
          </el-table-column>
          <el-table-column
            prop="SJDZ"
            label="数据地址"
            min-width="150">
            <template slot-scope="scope">
              <el-popover trigger="click" placement="top">
                <p style="text-indent: 2em;" >{{ scope.row.SJDZ }}</p>
                <div slot="reference" class="td-content" >
                  {{ scope.row.SJDZ}}
                </div>
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column
            fixed="right"
            label="操作"
            width="140">
            <template slot-scope="scope">
              <el-button @click="change(scope.row.BH)"  type="text" size="small">修改</el-button>
              <el-button @click="check(scope.row.BH)"  type="text" size="small">查看</el-button>
              <el-button @click="deleteKnowledge(scope.row.BH)"  style="color:red;" type="text" size="small">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="page-wrap">
        <el-pagination
          @current-change="pageTo"
          :page-size="pageSize"
          :current-page="pageNum"
          layout="total, prev, pager, next, jumper"
          :total="totalPages">
        </el-pagination>
      </div>
      <know-input :type="knowledgeType" :knowledgeId="knowledgeId" :isShow="isShow" @closeInput="closeInput">{{editorTitle}}</know-input>
    </div>
  </div>
</template>

<script>
  import knowInput from '../pubilcComponents/manageComponents/knowInput'
  export default {
    name:'knowledge-manage',
    components: {knowInput},
    data(){
      return{
        isShow: false,//浮动编辑框显示
        knowledgeId: "",//指定知识数据
        editorTitle: "",//浮动编辑框标题
        knowledgeType:'',//操作类型,新增、修改
        pageSize: 20, //每页条数
        pageNum:1, //当前页
        totalPages: 1000, //总条数
        waitApproval: [
          // {
          //   NR:'回去玩传奇我请问你我v区区我',
          //   BT:'第一次标题',
          //   SSLB:'理论研究',
          //   LY:'互联网线索',
          //   FBSJ:'2014-04-28 00:00:00',
          //   CJZD:'阿道夫',
          //   CJZDMC: "阿道夫",
          //   SJDZ: "啊打发"
          // },
        ], //待审批线索

        tableH:0, //表格高度
        keyword:'', //关键字
        type: "",//类型,理论研究,法律法规
        isLoading: false//加载
      }
    },
    mounted(){
      this.tableResize();
      this.getKnowledge();
    },
    methods:{
      //查看
      check(id){
        this.$router.push({path: '/home/knowledgeDetail',query:{id:id}});
      },
      closeInput(data) {//关闭编辑框
        this.isShow = data;
        this.getKnowledge();
      },
      change(id) {//修改
        let _this = this;
        _this.isShow = true;
        _this.knowledgeId = id;
        _this.editorTitle = '修改';
        _this.knowledgeType = 'Modify';
      },
      addKnowledge() {//新增
        let _this = this;
        if(_this.knowledgeId) {
          _this.knowledgeId = "";
        }
        this.isShow = true;
        this.editorTitle = '新增';
        this.knowledgeType = 'Add';
      },
      deleteKnowledge(bh) {//删除
        let url = (webApi.Knowledge.Delete).format({bh:bh});
        let _this = this;
        this.axios({
          method: "post",
          url:url,
          timeout: 5000
        }).then(function(res){
          if(res.data.code==0){
            _this.$message({
              showClose: true,
              message: '删除成功',
              type: 'success'
            });
            _this.getKnowledge();
          }
        }).catch(function(err){
          _this.$message({
            showClose: true,
            message: '删除失败,请重试',
            type: 'error'
          });
          console.log(err);
        })
      },
      //获取知识库信息
      getKnowledge(){
        let _this = this;
        let url = (webApi.Knowledge.GetKnowledges).format({
          keyword: _this.keyword,//关键字
          type: _this.type,//类型,法律法规,理论研究
          p: _this.pageNum,//当前页
          ps: _this.pageSize//条数
        });
        _this.isLoading = true;
        _this.axios({
          url: url,
          timeout: 10000
        }).then(function(res){
          if(res.data.code==0) {
            _this.waitApproval = res.data.data.data;
            _this.isLoading = false;
          }
        }).catch(function(err){
          _this.isLoading = false;
          console.log(err)
        })
      },
      //跳转分页
      pageTo(page){
        this.pageNum = page;
        this.getKnowledge();
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
      window.removeEventListener('resize',this.resize);
    }
  }
</script>

<style lang="scss" scoped>
  #knowledgeManage{
    position: relative;
    height: 100%;
    overflow: hidden;
    #header{
      height: 50px;
      line-height: 50px;
      color: #666;
      font-size: 16px;
      border-bottom: solid 1px #dcdcdc;
      background: #eee;
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
        margin-right: 20px;
        padding-left: 10px;
      }
      .ly{
        display: inline-block;
        font-size: 16px;
      }
      .manage-icon{
        float: right;
        height: 100%;
        width: 40px;
        text-align: center;
        border-right:solid 1px #ddd;
        &:hover {
          cursor: pointer;
        }
        i {
          color: green;
        }
      }
    }
    #content{
      height: calc(100% - 40px);
      padding-left: 15px;
      padding-right: 15px;
      .table-list{
        padding-top: 10px;
        height: calc(100% - 70px);
      }
      .page-wrap{
        margin-top: 20px;
        height: 40px;
      }
    }
  }
  @media (max-width: 1440px) {
    #knowledgeManage{
      #header{
        height: 40px;
        line-height: 40px;
        .header-icon,
        .manage-icon {
          width: 40px;
          height: 100%;
        }
      }
    }
  }
</style>
