<template>
  <div id="newsManage">
    <div id="header">
      <div class="header-icon">
        <i class="iconfont icon-boshimao"></i>
      </div>
      <div class="header-title">新闻管理</div>

      <!--<div class="search-wrap clearfix">-->
      <!--<i @click="change" style="color:green;width:30px;height:30px;" class="el-icon-circle-plus-outline"></i>-->
      <!--</div>-->

    </div>
    <div id="content" v-loading="isLoading">
      <div class="table-list" ref="cueList">
        <el-table
          ref="oTable"
          :data="newsList"
          :max-height="tableH"
          :height="tableH"
          style="width: 100%">
          <el-table-column
            prop="BT"
            label="标题"
            min-width="300">
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
              <el-popover trigger="click" placement="top" max-width="400">
                <p style="text-indent: 2em;">{{ scope.row.SJDZ }}</p>
                <div slot="reference" class="td-content">
                  <a :href="scope.row.SJDZ" target="_blank" style="color: #00a0e9">{{ scope.row.SJDZ}}</a>
                </div>
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column
            fixed="right"
            label="操作"
            width="100">
            <template slot-scope="scope">
              <el-button @click="newsDetail(scope.row.BH)"  style="color:#00a0e9;" type="text" size="small">查看</el-button>
              <el-button @click="deletenews(scope.row.BH)"  style="color:red;" type="text" size="small">删除</el-button>
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
        totalPages: 10000, //总条数
        newsList:[

        ],
        tableH:0, //表格高度
        keyword:'', //关键字
        type: "",//类型,理论研究,法律法规
        isLoading: false//加载
      }
    },
    mounted(){
      this.tableResize();
      this.getNewsList();
    },
    methods:{
      //删除指定新闻
      deletenews(bh) {//删除
        let url = (webApi.News.Delete).format({id:bh});
        let _this = this;
        _this.$confirm('是否删除此条新闻', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          _this.axios({
            method: "post",
            url:url,
            timeout: 5000
          }).then(function(res){
            if(res.data.code==0){
              console.log(res)
              _this.$message({
                showClose: true,
                message: '删除成功',
                type: 'success'
              });
              _this.getNewsList();
            }
          }).catch(function(err){
            _this.$message({
              showClose: true,
              message: '删除失败,请重试',
              type: 'error'
            });
            console.log(err);
          })
        }).catch(() => {

        });
      },

      //查看新闻详情
      newsDetail(bh){
        this.$router.push({path: '/home/newsDetail',query:{id:bh}});
      },

      //获取新闻列表
      getNewsList(){
        let _this = this;
        let url  = (webApi.News.GetNews).format({
          keyword:_this.keyword,
          p:_this.pageNum,
          ps:_this.pageSize
        });
        _this.isLoading = true;
        _this.axios({
          url: url,
          timeout: 10000
        }).then(function(res){
          if(res.data.code==0) {
            _this.newsList = res.data.data.data;
            _this.isLoading = false;
          }
        }).catch(function(err){
          _this.isLoading = false;
          console.log(err)
        })
      },
      //获取知识库信息
      // getKnowledge(){
      //   let _this = this;
      //   let url = (webApi.Knowledge.GetKnowledges).format({
      //     keyword: _this.keyword,//关键字
      //     type: _this.type,//类型,法律法规,理论研究
      //     p: _this.pageNum,//当前页
      //     ps: _this.pageSize//条数
      //   });
      //   _this.isLoading = true;
      //   _this.axios({
      //     url: url,
      //     timeout: 10000
      //   }).then(function(res){
      //     if(res.data.code==0) {
      //       _this.waitApproval = res.data.data.data;
      //       _this.isLoading = false;
      //     }
      //   }).catch(function(err){
      //     _this.isLoading = false;
      //     console.log(err)
      //   })
      // },
      //跳转分页
      pageTo(page){
        this.pageNum = page;
        this.getNewsList();
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
  #newsManage{
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
        padding-left: 10px;
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
    #newsManage{
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
