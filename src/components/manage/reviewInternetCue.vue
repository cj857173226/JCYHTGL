<template>
    <div id="review">
        <div id="header">
            <span class="header-icon">
                <i class="fa fa-heart"></i>
            </span>
            <span class="header-title">审核互联网线索</span>
            
            <!-- <div class="search-wrap clearfix">
                <input class="search-ipt" type="text" v-model="keyword" placeholder="请输入内容" @keyup.13="getInternetCueList">
                <span class="search-btn" @click="getInternetCueList()">
                    <i class="iconfont icon-sousuo"></i>
                </span>
            </div> -->
        </div>
        <div id="nav">
            <ul>
                <li :class="isThisNav == 1?'active':''" @click="chooseNav(1)">
                    <i class="fa fa-file-text-o"></i>
                    未审核
                </li><li :class="isThisNav == 2?'active':''" @click="chooseNav(2)">
                    <i class="fa fa-pencil-square-o"></i>
                    已审核
                </li><li :class="isThisNav == 3?'active':''" @click="chooseNav(3)">
                    <i class="fa fa-sitemap"></i>
                    有效审核
                </li>
                <li class="pass-cue">
                    <span>批量通过</span>
                </li>
            </ul>
        </div>
        <div id="content">
            <div class="table-list" ref="cueList">
                <el-table
                    ref="oTable"
                    :data=" internetCueList"
                    :max-height="tableH"
                    :height="tableH"
                    style="width: 100%">
                    <el-table-column
                        type="selection"
                        width="55">
                    </el-table-column>
                    <el-table-column
                        prop="ZY"
                        label="内容"
                        min-width="300">
                        <template slot-scope="scope">
                            <el-popover trigger="click" placement="top" max-width="400">
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
                        min-width="180"
                    >
                    </el-table-column>
                    <el-table-column
                        prop="CJSJ"
                        label="采集时间"
                        min-width="180"
                    >
                    </el-table-column>
                    <el-table-column
                        prop="XSLB"
                        label="线索类别"
                        min-width="100"
                    >
                    </el-table-column>
                    <el-table-column
                        prop="XSLY"
                        label="线索来源"
                        width="150">
                    </el-table-column>
                    <el-table-column
                        prop="GJC"
                        label="关键词"
                        width="200">
                        <template slot-scope="scope">
                        <el-popover trigger="click" placement="top" max-width="400">
                            <p>{{ scope.row.GJC }}</p>
                            <div slot="reference" class="td-content">
                            {{ scope.row.GJC}}
                            </div>
                        </el-popover>
                        </template>
                    </el-table-column>
                    <el-table-column
                        fixed="right"
                        label="操作"
                        width="150">
                        <template slot-scope="scope">
                        <el-button style="color:#c93030" type="text" size="small">不通过</el-button>
                        <el-button style="color:#21ac33" type="text" size="small">通过</el-button>
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
export default {
    name:'review-cue',
    data(){
        return{
            isThisNav:1,//导航
            pageSize:10, //每页条数
            pageNum:1, //当前页
            totalPages: 0, //总条数
            internetCueList: [
                {
                    ZY:'回去玩传奇我请问你我v区区我',
                    FBSJ:'2017-02-03',
                    CJSJ:'2018-06-03',
                    XSLB:'环境保护',
                    XSLY:'人民网',
                    GJC:'环保，公益',
                },
                {
                    ZY:'回去玩传奇我请问你我v区区我',
                    FBSJ:'2017-02-03',
                    CJSJ:'2018-06-03',
                    XSLB:'环境保护',
                    XSLY:'人民网',
                    GJC:'环保，公益',
                },
                {
                    ZY:'回去玩传奇我请问你我v区区我',
                    FBSJ:'2017-02-03',
                    CJSJ:'2018-06-03',
                    XSLB:'环境保护',
                    XSLY:'人民网',
                    GJC:'环保，公益',
                },
                {
                    ZY:'回去玩传奇我请问你我v区区我',
                    FBSJ:'2017-02-03',
                    CJSJ:'2018-06-03',
                    XSLB:'环境保护',
                    XSLY:'人民网',
                    GJC:'环保，公益',
                },
                {
                    ZY:'回去玩传奇我请问你我v区区我',
                    FBSJ:'2017-02-03',
                    CJSJ:'2018-06-03',
                    XSLB:'环境保护',
                    XSLY:'人民网',
                    GJC:'环保，公益',
                },
                {
                    ZY:'回去玩传奇我请问你我v区区我',
                    FBSJ:'2017-02-03',
                    CJSJ:'2018-06-03',
                    XSLB:'环境保护',
                    XSLY:'人民网',
                    GJC:'环保，公益',
                },
                {
                    ZY:'回去玩传奇我请问你我v区区我',
                    FBSJ:'2017-02-03',
                    CJSJ:'2018-06-03',
                    XSLB:'环境保护',
                    XSLY:'人民网',
                    GJC:'环保，公益',
                },
                {
                    ZY:'回去玩传奇我请问你我v区区我',
                    FBSJ:'2017-02-03',
                    CJSJ:'2018-06-03',
                    XSLB:'环境保护',
                    XSLY:'人民网',
                    GJC:'环保，公益',
                },
                {
                    ZY:'回去玩传奇我请问你我v区区我',
                    FBSJ:'2017-02-03',
                    CJSJ:'2018-06-03',
                    XSLB:'环境保护',
                    XSLY:'人民网',
                    GJC:'环保，公益',
                },
                {
                    ZY:'回去玩传奇我请问你我v区区我',
                    FBSJ:'2017-02-03',
                    CJSJ:'2018-06-03',
                    XSLB:'环境保护',
                    XSLY:'人民网',
                    GJC:'环保，公益',
                },
                {
                    ZY:'回去玩传奇我请问你我v区区我',
                    FBSJ:'2017-02-03',
                    CJSJ:'2018-06-03',
                    XSLB:'环境保护',
                    XSLY:'人民网',
                    GJC:'环保，公益',
                },
                {
                    ZY:'回去玩传奇我请问你我v区区我',
                    FBSJ:'2017-02-03',
                    CJSJ:'2018-06-03',
                    XSLB:'环境保护',
                    XSLY:'人民网',
                    GJC:'环保，公益',
                },
                {
                    ZY:'回去玩传奇我请问你我v区区我',
                    FBSJ:'2017-02-03',
                    CJSJ:'2018-06-03',
                    XSLB:'环境保护',
                    XSLY:'人民网',
                    GJC:'环保，公益',
                },
                {
                    ZY:'回去玩传奇我请问你我v区区我',
                    FBSJ:'2017-02-03',
                    CJSJ:'2018-06-03',
                    XSLB:'环境保护',
                    XSLY:'人民网',
                    GJC:'环保，公益',
                },
                {
                    ZY:'回去玩传奇我请问你我v区区我',
                    FBSJ:'2017-02-03',
                    CJSJ:'2018-06-03',
                    XSLB:'环境保护',
                    XSLY:'人民网',
                    GJC:'环保，公益',
                },
                {
                    ZY:'回去玩传奇我请问你我v区区我',
                    FBSJ:'2017-02-03',
                    CJSJ:'2018-06-03',
                    XSLB:'环境保护',
                    XSLY:'人民网',
                    GJC:'环保，公益',
                },
                {
                    ZY:'回去玩传奇我请问你我v区区我',
                    FBSJ:'2017-02-03',
                    CJSJ:'2018-06-03',
                    XSLB:'环境保护',
                    XSLY:'人民网',
                    GJC:'环保，公益',
                },
                {
                    ZY:'回去玩传奇我请问你我v区区我',
                    FBSJ:'2017-02-03',
                    CJSJ:'2018-06-03',
                    XSLB:'环境保护',
                    XSLY:'人民网',
                    GJC:'环保，公益',
                },
            ], //互联网审批线索
            
            tableH:0, //表格高度
            keyword:'', //关键字 
        }
    },
    mounted(){
        this.tableResize();
    },
    methods:{
        //搜索
        getInternetCueList(){

        },
        //跳转分页
        pageTo(){

        },
        //切换导航
        chooseNav(index){
            this.isThisNav = index;
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
#review{
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
            padding-left: 15px;
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
    #nav{
        border-bottom: solid 1px #ddd;
        height: 80px;
        ul{
            height: 100%;
            padding-left: 39px;
            li:first-child{
                border-left: solid 1px #ddd;
            }
            li{
                display: inline-block;
                height: 100%;
                line-height: 100px;
                width: 100px;
                text-align: center;
                cursor: pointer;
                position: relative;
                border-right: solid 1px #ddd;
                i{
                    position: absolute;
                    font-size: 20px;
                    top: 23%;
                    left: 50%;
                    margin-left: -8px;
                }
            }
            .pass-cue{
                float: right;
                margin-right: 10px;
                border: none;
                line-height: initial;
                span{
                    display: inline-block;
                    padding: 0 10px;
                    height: 40px;
                    line-height: 39px;
                    width: 90px;
                    margin-top: 20px;
                    border-radius: 5px;
                    border: solid 1px #ddd;
                }
                span:hover{
                    color: #21ac33;
                }
                span:active{
                    border-color:#21ac33;
                }
            }
            .pass-cue{
                float: right;
                margin-right: 30px;
                border: none;
            }
            .active{
                color: #0a8f46;
                border-bottom: solid 2px #fff;
                height: 80px;
            }
        }
    }
    #content{    
        height: calc(100% - 40px - 80px);
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
#review{
    #header{
    height: 40px;
    .header-icon{
        width: 40px;
        height: 40px;
        line-height: 40px;
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
}
}
</style>
