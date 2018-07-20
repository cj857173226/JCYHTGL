<template>
  <div id="DataAnalysis">
    <div class="DataAnalysis-head clearfix">
      <div class="title-wrap clearfix">
        <div class="title-icon">
          <i class="fa fa-table"></i>
        </div>
        <div class="title">深圳环保数据分析</div>
      </div>
      <div class="search-wrap clearfix">
        <input class="search-ipt" type="text" v-model="keyword" placeholder="请输入内容" @keyup.13="searchCue">
        <span class="search-btn" @click="searchCue()">
            <i class="iconfont icon-sousuo"></i>
          </span>
      </div>
    </div>
    <div class="main-body">
      <div class="cue-filter-wrap">
          <div class="cue-source clearfix">
            <div class="left-title">
                <i class="fa fa-vine"></i>
                同步状态:
            </div>
            <div class="right" style="overflow: inherit;position: relative;">
                <template>
                    <el-radio-group @change="selectState"  v-model="state">
                        <el-radio  label="success">同步成功</el-radio>
                        <el-radio  label="error">同步失败</el-radio>
                        <el-radio  label="no">未同步</el-radio>
                        <el-radio  label="all">全部</el-radio>
                    </el-radio-group>
              </template>
            </div>
          </div>
          <div class="cue-sort clearfix">
            <div class="left-title">
              <i class="fa fa-calendar"></i>
              同步日期:
            </div>
            <div class="right">
                <el-date-picker @change="selectTime" style="height: 100%;border:none;padding:0"
                              v-model="timeSearch"
                              type="daterange"
                              align="right"
                              format="yyyy-MM-dd"
                              value-format="yyyy-MM-dd"
                              range-separator="-"
                              unlink-panels
                              start-placeholder="开始日期"
                              end-placeholder="结束日期">

              </el-date-picker>
                <!-- <span class="comfirm-btn" @click="search">确定</span> -->
            </div>
          </div>
      </div>
      <div class="cue-list" ref="cueList" v-loading="isLoad">
        <el-table
            ref="oTable"
            :data="dataList"
            :max-height="tableH"
            :height="tableH"
            style="width: 100%">
            <el-table-column
                prop="BH"
                label="编号"
                min-width="170">
            </el-table-column>
            <el-table-column
            prop="ZY"
            label="摘要"
            min-width="300">
            <template slot-scope="scope">
              <el-popover trigger="click" placement="top" width='500'>
                <div slot="reference" class="td-content">
                  {{ scope.row.ZY}}
                </div>
                <pre style="white-space: pre-wrap; height: auto; overflow: auto;" v-html="scope.row.ZY"></pre>
              </el-popover>
            </template>
          </el-table-column>
           <el-table-column
            prop="SJMC"
            label="数据名称"
            min-width="300">
            <template slot-scope="scope">
              <el-popover trigger="click" placement="top" width='500'>
                <div slot="reference" class="td-content">
                  {{ scope.row.SJMC}}
                </div>
                <pre style="white-space: pre-wrap; height: auto; overflow: auto;" v-html="scope.row.SJMC"></pre>
              </el-popover>
            </template>
          </el-table-column>
           <el-table-column
            prop="SJTGF"
            label="数据提供方"
            min-width="300">
            <template slot-scope="scope">
              <el-popover trigger="click" placement="top" width='500'>
                <div slot="reference" class="td-content">
                  {{ scope.row.SJTGF}}
                </div>
                <pre style="white-space: pre-wrap; height: auto; overflow: auto;" v-html="scope.row.SJTGF"></pre>
              </el-popover>
            </template>
          </el-table-column>
           <el-table-column
            prop="GJZ"
            label="关键字"
            min-width="300">
            <template slot-scope="scope">
              <el-popover trigger="click" placement="top" width='500'>
                <div slot="reference" class="td-content">
                  {{ scope.row.GJZ}}
                </div>
                <pre style="white-space: pre-wrap; height: auto; overflow: auto;" v-html="scope.row.GJZ"></pre>
              </el-popover>
            </template>
          </el-table-column>
           
            <el-table-column
                prop="SJTS"
                label="数据条数"
                min-width="170">
            </el-table-column>
            <el-table-column
                prop="FBSJ"
                label="发布时间"
                min-width="170">
            </el-table-column>
            <el-table-column
                prop="GXSJ"
                label="更新时间"
                min-width="170">
            </el-table-column>
            <el-table-column
                prop="GXPV"
                label="更新频率"
                min-width="170">
            </el-table-column>
            <el-table-column
            prop="SJZT"
            label="数据主题"
            min-width="300">
            <template slot-scope="scope">
              <el-popover trigger="click" placement="top" width='500'>
                <div slot="reference" class="td-content">
                  {{ scope.row.SJZT}}
                </div>
                <pre style="white-space: pre-wrap; height: auto; overflow: auto;" v-html="scope.row.SJZT"></pre>
              </el-popover>
            </template>
          </el-table-column>
           <el-table-column
            prop="SJJKDZ"
            label="数据接口地址"
            min-width="300">
            <template slot-scope="scope">
              <el-popover trigger="click" placement="top" width='500'>
                <div slot="reference" class="td-content">
                  {{ scope.row.SJJKDZ}}
                </div>
                <pre style="white-space: pre-wrap; height: auto; overflow: auto;" v-html="scope.row.SJJKDZ"></pre>
              </el-popover>
            </template>
          </el-table-column>
          
            <el-table-column
                prop="TBRQ"
                label="同步日期"
                min-width="170">
            </el-table-column>       
            <el-table-column
                prop="SFTBCG"
                label="是否同步成功"
                min-width="170">
                <template slot-scope="scope">
                  <span v-text="scope.row.SFTBCG?'成功':'失败'"></span>  
                </template>
            </el-table-column>
             <el-table-column
              prop="TBSBYY"
              label="同步失败原因"
              min-width="300">
              <template slot-scope="scope">
                <el-popover trigger="click" placement="top" width='500'>
                  <div slot="reference" class="td-content">
                    {{ scope.row.TBSBYY}}
                  </div>
                  <pre style="white-space: pre-wrap; height: auto; overflow: auto;" v-html="scope.row.TBSBYY"></pre>
                </el-popover>
              </template>
          </el-table-column>
            <el-table-column
                fixed="right"
                label="操作"
                width="100">
                <template slot-scope="scope">
                    <el-button  @click="operation(scope.row.BH)" type="text" size="small">同步</el-button>
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

  </div>
</template>

<script>
export default {
    data(){
        return{
            isLoad:false,
            tableH:0, //表格高度
            dataList: [  //数据列表
                {
                    Id:'1',//编号
                    DataName: '名称',//数据名称
                    DataSource: '提供方',//数据提供方
                    Keyword: '啊打发',//关键字
                    DataNum: '22',//数据条数
                    PublishTime: '2018-07-18',//发布时间
                    UpdateTime: '2018-07-12',//更新时间
                    UpdateFrequency: '2',//更新频率
                    DataTheme: '数据啊打发',//数据主题
                    DataApi: 'www.cecece.cn',//数据接口地址
                    Time: "2018-07-19",//同步日期
                    Result: '1',//是否同步成功 (0:失败,1:成功)
                }
            ],
            page:1, //页码
            pageSize: 20,//每页条数
            totalPages: 10,//总条数
            keyword: '' , //关键字
            timeSearch:[new Date((new Date()).getTime() - 3600 * 1000 * 24 * 30),new Date()],
            state: 'all'//同步状态
        }
    },
    mounted(){
        this.tableResize();//表格高度自适应
        this.GetExDataIndex();//获取外部数据索引
    },
    methods:{ 
        GetExDataIndex(){//获取外部数据索引
          let _this = this;
          let url = (webApi.SzOpenData.GetExDataIndex).format({
            keywords: _this.keyword,//关键字
            pageNum: _this.page,//页号
            pageSize: _this.pageSize,//页大小
          })
          _this.isLoad = true;
          _this.axios({
            url: url,
            timeout: 10000
          }).then(function(res){
            if(res.data.code==0){
              _this.dataList = res.data.data.result;
              _this.totalPages =  res.data.data.total;
              _this.isLoad = false;
            }else {
              _this.isLoad = false;
            }
            // console.log(res)
          }).catch(function(err){
            _this.isLoad = false;
            console.log(err)
          })
        },
        //对数据操作
        operation(id) {
            console.log(id)
            let _this = this;
            this.axios({
              method: 'post',
              url: (webApi.SzOpenData.PullData).format({
                sjsybh: id
              }),
              timeout: 1000
            }).then(function(res){
              console.log(res)
              if(res.data.data==true){
                _this.$message({
                  message: "成功",
                  type: 'success'
                })
                _this.GetExDataIndex();
              }else {
                 _this.$message({
                  message: "失败",
                  type: 'error'
                });
                _this.GetExDataIndex();
              }
            }).catch(function(err){
              console.log(err)
               _this.$message({
                  message: "失败",
                  type: 'error'
                });
                _this.GetExDataIndex();
            })
        },
        //选择同步状态
        selectState(){
            console.log(this.state);
        },
        //选择同步日期
        selectTime(){
            if(this.timeSearch) {
                console.log(this.timeSearch);
            }
        },
        //搜索
        searchCue(){
            this.GetExDataIndex();
        },
        // 页码跳转
        pageTo(curr) {
          this.page = curr;
          this.GetExDataIndex();
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
  #DataAnalysis{
    height: 100%;
    max-height:100%;
    min-width: 750px;
    overflow-y:hidden;
    .DataAnalysis-head{
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
        height: calc(100% - 180px);
        max-height: calc(100% - 180px);
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

    #DataAnalysis{
      .DataAnalysis-head{
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
            height: calc( 100% - 140px);
            max-height: calc( 100% - 140px);
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
