<template>
  <transition name="toggleShow">
  <div id="main_box" v-show="isShow">
      <div id="main">
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
            <span class="item-title">数据来源</span>
            <span class="item-content">
          <input  type="text" v-model="source">
          </span>
          </div>
          <div class="detail-item">
            <span class="item-title">发布时间</span>
            <span class="item-content">
            <input type="text" v-model="publishTime">
         </span>
          </div>
          <div class="detail-item">
            <span class="item-title">所属地域</span>
            <span class="item-content">
            <input type="text" v-model="region">
          </span>
          </div>
          <div class="detail-item">
            <span class="item-title">所属领域</span>
            <el-select v-model="dataType">
              <el-option value="食药安全">食药安全</el-option>
              <el-option value="英烈保护">英烈保护</el-option>
              <el-option value="国有财产">国有财产</el-option>
              <el-option value="食品安全">食品安全</el-option>
              <el-option value="国土资源">国土资源</el-option>
              <el-option value="环境保护">环境保护</el-option>
              <el-option value="其他">其他</el-option>
            </el-select>
          </div>
          <div class="detail-item">
            <span class="item-title">所属门类</span>
            <el-select v-model="category">
              <el-option value="公益诉讼">公益诉讼</el-option>
              <el-option value="贪污腐败">贪污腐败</el-option>
            </el-select>
          </div>
          <div class="detail-item">
            <span class="item-title">数据地址</span>
            <span class="item-content">
            <input type="text" v-model="link">
          </span>
          </div>
          <div class="detail-item">
            <span class="item-title">机器分析</span>
            <div class="Machine" style="clear:both">

              <span class="item-title" >关键字</span>
              <span class="item-content">
              <input type="text" v-model="Machine.keyword">
            </span>

              <span class="item-title">人名</span>
              <span class="item-content">
              <input type="text" v-model="Machine.name">
            </span>

              <span class="item-title">地名</span>
              <span class="item-content">
              <input type="text" v-model="Machine.placeName">
            </span>

              <span class="item-title">机构名</span>
              <span class="item-content">
              <input type="text" v-model="Machine.InstitutionalName">
            </span>
              <span  class="item-title">摘要</span>
              <textarea  class="textarea " v-model="Machine.abstract"></textarea>
              <el-button type="success">分析</el-button>
            </div>
          </div>
          <div class="detail-item">
            <span class="item-title">内容</span>
            <textarea class=" textarea" v-model="content"></textarea>
          </div>
          <div class="detail-item">
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
                            </p>
                          <!--<h3 class="timeline-time" v-model="item.time" contenteditable="true"></h3>-->
                          <!--<h4 class="tiemline-name" v-model="item.name" contenteditable="true"></h4>-->
                          <!--<p v-model="item.content" contenteditable="true"></p>-->
                        </div>
                    </li>
                </ul>
            </span>
          </div>
          <div class="detail-item">
            <el-button @click="submit" type="success">提交</el-button>
          </div>
        </div>
      </div>
  </div>
  </transition>
</template>

<script>
  export default {
    props: {
      'isShow': false,//显示
      'dataId': "",//数据id
      'operation': "",//操作
    },
    data(){
      return{
        source: "",//数据来源
        region: "",//所属地域
        dataType: "",//所属领域
        category: "",//所属门类
        publishTime: "",//发布时间
        link: "",//数据地址
        Machine: {//机器分析
          keyword: "",//关键字
          name: "",//人名
          placeName: '',//地名
          InstitutionalName: '',//机构名
          abstract: '',//摘要
        },
        content: "",//内容
        trackData: [//事态跟踪
          {
            time: "2018-07-13",//回复时间
            name: "机构名称",//回复机构名称
            content: '某时某刻回复该条信息',//回复内容
          }
        ]
      }
    },
    mounted(){
    },
    methods:{
      close() {//关闭
        this.$emit('inputClose',{isShow:false,isUpdate:false});
      },
      submit() {//提交

      }
    },
    watch: {
      dataId() {
        console.log(this.dataId)
        console.log(this.operation)
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
            min-height: 300px;
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
            }
          }
        }
      }
    }
  }

</style>
