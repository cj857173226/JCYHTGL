<template>
    <div id="main">
        <div id="header">
            <span class="header-icon">
                <i class="fa fa-window-restore"></i>
            </span>
            <span class="header-title">互联网线索管理</span>
        </div>
        <div id="header-nav">
            <span :class="isNav == 1 ? 'active': ''" @click="changeNav(1)">添加线索</span>
            <span :class="isNav == 2 ? 'active': ''" @click="changeNav(2)">事态跟踪</span>
        </div>
        <div id="content">
            <div class="add-news" v-show="isNav == 1">
                <div class="JB-item">
                    <span>数据来源:</span>
                    <input class="input-item" type="text" v-model="SJLY" />
                </div>
                <div class="JB-item">
                    <span>发布时间:</span>
                    <input class="input-item" type="text" v-model="FBSJ" />
                </div>
                <div class="JB-item">
                    <span>采集时间:</span>
                    <input class="input-item" type="text" v-model="CJSJ" />
                </div>
                <div class="JB-item">
                    <span>线索类别:</span>
                    <input class="input-item" type="text" v-model="XSLB" />
                </div>
                <div class="JB-item">
                    <span>数据地址:</span>
                    <input class="input-item" type="text" v-model="SJDZ" />
                </div>
                <div class="JB-item">
                    <span class="text-area-title">采集内容:</span>
                    <textarea class="input-item text-area-item" type="text" v-model="CJLR" ></textarea>
                </div>
                <div class="JB-item">
                    <div>
                        <span>图片内容:</span>
                        <label for="choose-img">
                            <div class="add-icon">
                                <i class="fa fa-plus"></i>
                            </div>
                        </label>
                        <input style="display:none" @change="chooseImg" type="file" id="choose-img">
                    </div>
                    <div class="resource-box" v-show="imgs.length > 0">
                        <div class="img-box" v-for="(item,index) in imgs">
                            <img :src="item">
                            <div class="del-img" @click="delImg(index)"><i class="fa fa-times"></i></div>
                        </div>
                    </div>
                </div>
                <div class="JB-item">
                    <div>
                        <span>视频内容:</span>
                        <label for="choose-video">
                            <div class="add-icon">
                                <i class="fa fa-plus"></i>
                            </div>
                        </label>
                        <input style="display:none" @change="chooseVideo" type="file" id="choose-video">
                    </div>
                    <div class="resource-box" v-show="videos.length > 0">
                        <div class="video-box" v-for="(item,index) in videos">
                            <video :src="item" controls="controls"></video>
                            <div class="del-img" @click="delVideo(index)"><i class="fa fa-times"></i></div>
                        </div>
                    </div>
                </div>
                <div class="submit-btn" @click="addCues">
                    提交
                </div>
            </div>
            <div class="news-track" v-show="isNav == 2">
                <div class="JB-item">
                    <span>目前回帖:</span>
                    <input class="input-item" type="text" v-model="HTZS" />
                </div>
                <div class="JB-item">
                    <span>机构名称:</span>
                    <input class="input-item" type="text" v-model="JGMC" />
                </div>
                <div class="JB-item">
                    <span>回复时间:</span>
                    <input class="input-item" type="text" v-model="HFSJ" />
                </div>
                <div class="JB-item">
                    <span>回复内容:</span>
                    <input class="input-item" type="text" v-model="HFNR" />
                </div>
                <div class="submit-btn" @click="addTrack">
                    提交
                </div>
            </div>
        </div>
    </div>
    
</template>

<script>

export default {
    data(){
        return {
            SJLY: '', //数据来源
            FBSJ: '', //发布时间
            CJSJ: '', //采集时间
            XSLB: '', //线索类别
            SJDZ: '', //数据地址
            CJLR: '', //采集内容
            ZY : '', //摘要
            GJZ: '', //关键字
            DIM: '' , //地名
            JIGOUM: '',//机构名
            RENM: '', //人民

            BH: '', //线索编号 

            imgs: [], //图片
            videos: [], //视频
            isNav: 1, 

            HTZS: '', //回帖总数
            JGMC: '', //机构名称
            HFSJ: '', //机构回复时间
            HFNR: '', //机构回复内容
        }
    },
    mounted(){

    },
    methods:{
        //添加互联网线索
        addCues(){
            // if(this.SJLY == '' || this.FBSJ ==  '' || this.CJSJ == '' || this.XSLB == '' || this.SJDZ == '' || this.CJLR == ''){
            //     layer.msg('请填写完整',{
            //         anim: 6,
            //         time: 1000
            //     });
            //     return;
            // }
            var _this = this;
            var zy = false;
            var gjz = false;
            var mz = false;
            var param = {
                text: _this.CJLR,
                size: 10
            }
            //获取摘要
            this.axios({
                method:'post',
                url: window.webApi.Host + window.webApi.TextAnalysis.GetSummary,
                data:JSON.stringify(param),
                timeout: 10000
            }).then(function(response){
                if(response.data.code == 0){
                    zy = true;
                    _this.ZY = response.data.data;
                    if(zy&&gjz&&mz){
                        addCueAjax(_this);
                    }
                }else{

                }
            })
            //获取关键字
            this.axios({
                method:'post',
                url: window.webApi.Host + window.webApi.TextAnalysis.GetKeyword,
                data:JSON.stringify(param),
                timeout: 10000
            }).then(function(response){
                if(response.data.code == 0){
                    gjz = true;
                    _this.GJZ = response.data.data;
                    if(zy&&gjz&&mz){
                        addCueAjax(_this);
                    }
                }else{

                }
            })
            //获取关键字
            this.axios({
                method:'post',
                url: window.webApi.Host + window.webApi.TextAnalysis.GetSegment,
                data:JSON.stringify(param),
                timeout: 10000
            }).then(function(response){
                if(response.data.code == 0){
                    mz = true;
                    _this.DIM = response.data.data.diming;
                    _this.RENM = response.data.data.renming;
                    _this.JIGOUM = response.data.data.jigouming;
                    if(zy&&gjz&&mz){
                        addCueAjax(_this);
                    }
                }else{

                }
            })
            function addCueAjax(data){
                var _this = data;
                var addParam = {
                        JBNR: _this.CJLR,
                        FBSJ: _this.FBSJ,
                        XSLB: _this.XSLB,
                        XSLY: _this.SJLY,
                        SJDZ: _this.SJDZ,
                        CJSJ: _this.CJSJ,
                        ZY: _this.ZY,
                        GJC: _this.GJZ,
                        RENM: _this.RENM,
                        DIM: _this.DIM,
                        JIGOUM: _this.JIGOUM,
                    };
                this.axios({
                    method:'post',
                    url:window.webApi.Host + window.ClueManager.AddWebClue,
                    data:JSON.stringify(addParam),
                    timeout: 10000
                }).then(function(response){
                    if(response.data.code == 0){
                        _this.BH = response.data.data;
                    }else{

                    }
                }).catch(function(error){

                })
            }
        },
        //添加事态跟踪
        addTrack(){
            if(this.BH == ''){
                layer.msg('请先添加事态',{
                    anim: 6,
                    time: 1000
                });
                return;
            }
        },
        //修改导航
        changeNav(index){
            this.isNav = index;
        },
        //选择图片
        chooseImg(){
            var _this = this;
            var file = document.getElementById('choose-img').files[0];
            console.log(file);
            //转化为base64
            var renderUrl = new FileReader();
            renderUrl.readAsDataURL(file);
            renderUrl.onload = function(e){
                _this.imgs.push(e.target.result);
                document.getElementById('choose-img').value = '';
            }
        },
        //选择视频
        chooseVideo(){
            var _this = this;
            var file = document.getElementById('choose-video').files[0];
            console.log(file);
            //转化为base64
            var renderUrl = new FileReader();
            renderUrl.readAsDataURL(file);
            renderUrl.onload = function(e){
                _this.videos.push(e.target.result);
                console.log(e.target.result);
                document.getElementById('choose-video').value = '';
            }
        },
        //删除图片
        delImg(index){
            this.imgs.splice(index,1);
        },
        //删除视频
        delVideo(index){
            this.videos.splice(index,1);
        }
    }
}
</script>

<style scoped>
    #main{
        height: 100%;
        overflow: hidden;
    }
    #header{
      width: 100%;
      height: 50px;
      background: #EEEEEE;
      border-bottom: 1px solid #dcdcdc;
    }
    .header-icon{
        display: inline-block;
        width: 50px;
        height: 50px;
        line-height: 50px;
        text-align: center;
        font-size: 16px;
        border-right: 1px solid #dcdcdc;
        color: #666666;
    }
    .header-title{
        padding-left: 10px;
    }
    #nav-bar{
        text-align: left;
    }
    #header .page-title{
        text-align: left;
        color: #00a65a;
        font: 500 1.5rem 'PingFang-SC-Medium';
        font-size: 18px;    
        margin-bottom: 10px;
    }
    #header-nav{
        text-align: left;
        width: 100%;
        border-bottom: solid 1px #ddd;
    }
    #header-nav span{
        display: inline-block;
        width: 80px;
        height: 50px;
        line-height: 50px;
        text-align: center;
        cursor: pointer;
    }
    #header-nav .active{
        border-bottom: solid 1px #00a65a;
    }
    #content{
        text-align: left;
        padding-top: 10px;
        padding-bottom: 30px;
        padding-left: 40px;
        overflow: auto;
        height: calc(100% - 50px - 50px);
    }
    #content .JB-item{
        margin-bottom: 19px;
    }
    #content .JB-item span{
        display: inline-block;
        width: 90px;
        height: 35px;
        line-height: 35px;
        vertical-align: top;
    }
    #content .JB-item .input-item{
        height: 30px;
        width: 400px;
        border-radius: 5px;
        border: solid 1px #ddd;
        padding-left: 10px;
    }
    #content .JB-item .resource-box{
        border: solid 1px #ddd;
        max-width: 822px;
        margin-left: 95px;
        border-radius: 6px;
        padding: 10px;
        text-align: center;
        display: inline-block;
    }
    .img-box{
        display: inline-block;
        height: inherit;
        width: 200px;
        text-align: center;
        position: relative;
    }
    .video-box{
        display: inline-block;
        height: inherit;
        text-align: center;
        position: relative;
    }
    .img-box img{
        width: 90%;
    }
    .video-box video{
        width: 300px;
    }
    .del-img{
        position: absolute;
        display: block;
        font-size: 15px;
        top: 0;
        right: 12px;
        color: #bd3737;
        cursor: pointer;
    }
    .add-icon{
        width: 20px;
        height: 20px;
        border-radius: 50px;
        display: inline-block;
        text-align: center;
        background: #c5c5c5;
        line-height: 20px;
        color: #fff;
        cursor: pointer;
    }
    .submit-btn{
        color: #fff;
        width: 100px;
        background: #00a65a;
        text-align: center;
        height: 35px;
        line-height: 35px;
        border-radius: 6px;
        cursor: pointer;
    }
    .text-area-title{

    }
    .text-area-item{
        height: 100px!important;
    }
</style>
