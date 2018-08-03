<template>
    <div id="check-table">
        <div id="back">
            <div id="main-header">
                <div class="main-icon">
                    <i class="fa fa-pencil-square-o"></i>
                </div>
                <div class="main-title">数据详情</div>
                <div class="manage-icon">
                    <i @click="close"  class="el-icon-close"></i>
                </div>
            </div>
            <div id="content" v-loading="isLoad">
                <div class="table-div" id="table-header">
                    <table cellpadding="0" cellspacing="0">
                        <thead>
                            <tr class="tr-box">
                                <th class="td-box">
                                    <div>标题一</div>
                                </th>
                                <th class="td-box">
                                    <div>标题一</div>
                                </th>
                                <th class="td-box">
                                    <div>标题一</div>
                                </th>
                                <th class="td-box">
                                    <div>标题一</div>
                                </th>
                                <th class="td-box">
                                    <div>标题一</div>
                                </th>
                                <th class="td-box">
                                    <div>标题一</div>
                                </th>
                                <th class="td-box">
                                    <div>标题一</div>
                                </th>
                                <th class="td-box">
                                    <div>标题一</div>
                                </th>
                                <th class="td-box">
                                    <div>标题一</div>
                                </th>
                            </tr>
                        </thead>
                    </table>
                </div>
                <div class="table-div" id="table-content" @scroll="scrollEvent">
                    <table cellpadding="0" cellspacing="0">
                        <tbody>
                            <tr class="tr-box">
                                <td class="td-box">
                                    <input class="td-content" type="text" value="内容" />
                                </td>
                                <td class="td-box">
                                    <input class="td-content" type="text" value="内容" />
                                </td>
                                <td class="td-box">
                                    <input class="td-content" type="text" value="内容" />
                                </td>
                                <td class="td-box">
                                    <input class="td-content" type="text" value="内容" />
                                </td>
                                <td class="td-box">
                                    <input class="td-content" type="text" value="内容" />
                                </td>
                                <td class="td-box">
                                    <input class="td-content" type="text" value="内容" />
                                </td>
                                <td class="td-box">
                                    <input class="td-content" type="text" value="内容" />
                                </td>
                                <td class="td-box">
                                    <input class="td-content" type="text" value="内容" />
                                </td>
                                <td class="td-box">
                                    <input class="td-content" type="text" value="内容" />
                                </td>
                            </tr>
                            <tr class="tr-box">
                                <td class="td-box">
                                    <input class="td-content" type="text" value="内容" />
                                </td>
                                <td class="td-box">
                                    <input class="td-content" type="text" value="内容" />
                                </td>
                                <td class="td-box">
                                    <input class="td-content" type="text" value="内容" />
                                </td>
                                <td class="td-box">
                                    <input class="td-content" type="text" value="内容" />
                                </td>
                                <td class="td-box">
                                    <input class="td-content" type="text" value="内容" />
                                </td>
                                <td class="td-box">
                                    <input class="td-content" type="text" value="内容" />
                                </td>
                                <td class="td-box">
                                    <input class="td-content" type="text" value="内容" />
                                </td>
                                <td class="td-box">
                                    <input class="td-content" type="text" value="内容" />
                                </td>
                                <td class="td-box">
                                    <input class="td-content" type="text" value="内容" />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div id="footer">
                <el-button type="success">提交</el-button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            id:'',
            pageNum:1,
            pageSize:20,
            isLoad:false, //数据加载
        }
    },
    mounted(){
        var _this = this;
        this.$root.Bus.$on('showMore',function(id){
            _this.id = id;
            _this.getData();
        })
    },
    methods:{
        //关闭框框
        close(){
            this.$root.Bus.$emit('closeMore');
        },
        //获取数据
        getData(){
            var _this = this;
            this.isLoad = true;
            console.log(1);
            this.axios({
                method:'get',
                url:webApi.SzOpenData.GetData.format({sjsybh:_this.id,p:_this.pageNum,ps:_this.pageSize}),
                timeout:60000
            }).then(function(response){
                _this.isLoad = false;
                if(response.data.code == 0){
                    console.log(response.data.data);
                }else{

                }
            }).catch(function(error){
                _this.isLoad = false;
            })
        },
        //滚动条
        scrollEvent(){
            var header = document.getElementById('table-header'); //获取表格头部
            var content = document.getElementById('table-content'); //获取表格内容
            console.log(content.scrollLeft);
            header.scrollLeft = content.scrollLeft;
        }
    }
}
</script>


<style lang="scss" scoped>
#check-table{    
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: 10;
    background: rgba(0,0,0,.3);
    #back{
        position: absolute;
        width: 90%;
        margin: 0 auto;
        height: 90%;
        top: 50%;
        left: 50%;
        z-index: 10;
        background: #fff;
        transform: translate(-50%,-50%);
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
        #content{
            width: 100%;
            height: calc(100% - 50px - 50px);
            padding:10px;
            overflow: hidden;
            #table-header{
                overflow: hidden!important;
                table{
                    .tr-box{
                        background: #ddd;
                        .td-box{
                            border-bottom: none!important;
                            border-color: #fff;
                        }
                    }
                }
            }
            #table-content{
                height: calc(100% - 30px);
            }
            .table-div{
                width: 100%;
                overflow: auto;
                text-align: center;
                table{
                    border-top:solid 1px #ddd;
                    border-left:solid 1px #ddd;
                    .tr-box{
                        .td-box{
                            min-width: 200px;
                            height: 30px;
                            text-align: center;
                            border-right: solid 1px #ddd;
                            border-bottom: solid 1px #ddd;
                            .td-content{
                                height: 90%;
                                border: none;
                                width: 90%;
                            }
                        }
                    }
                }
            }
        }
        #footer{
            height: 50px;
            line-height: 50px;
            float: right;
            margin-right: 20px;
        }
    }
}
</style>
