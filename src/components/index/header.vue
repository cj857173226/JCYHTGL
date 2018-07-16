<template>
  <div id="header"  class="clearfix">
      <a class="logo">
        <b>公益诉讼线索综合处理系统</b>
      </a>
      <nav class="navbar clearfix" >
        <!--<a href="#" class="menu-toggle">-->
          <!--<i class="el-icon-sort"></i>-->
        <!--</a>-->

        <div class="navbar-right">
            <ul class="navbar-menu clearfix">
              <li class="navbar-menu-item user-info">您好！您的帐户类型为 :&nbsp;{{userInfo.AccountType}},</li>
              <li class="navbar-menu-item user-info">到期时间为 :&nbsp;{{userInfo.ExpireTime}}</li>
              <li class="navbar-menu-item user-menu clearfix" :class="{'user-menu-on':userInfoShow}" @click.stop.prevent=" userModal()">
                <img src="../../assets/adminlte/avatar.png" class="user-avatar" alt="">
                <span class="user-name">{{userInfo.UserName}}</span>
                <div class="user-info-modal" v-show="userInfoShow"  @click.stop.prevent>
                    <div class="up-box">
                      <img src="../../assets/adminlte/avatar.png" class="up-avatar" alt="">
                    </div>
                    <div class="down-box clearfix">
                      <button class="down-box-btn reset-btn " @click="resetModal()" >修改密码</button>
                      <button class="down-box-btn logout-btn" @click="logout()">退出登录</button>
                    </div>
                </div>
              </li>
            </ul>
        </div>
        <el-dialog title="修改密码" :visible.sync="resetpsw" id="resetModal" :close-on-click-modal="false">
          <el-input placeholder="设置新密码" v-model="newPassword1" type="password" >
            <template slot="prepend">新密码</template>
          </el-input>
          <el-input placeholder="确认新密码" v-model="newPassword2"  type="password" style="margin-top: 15px">
            <template slot="prepend">确认密码</template>
          </el-input>
          <p style="text-align: right;margin-top: 15px">
            <el-button type="success" size="small" plain  @click="resetPassword()">确认修改</el-button>
          </p>
        </el-dialog>
      </nav>

  </div>
</template>

<script>

	 export default {
	   name: "o_header",
     data(){
	     return {
         userInfo:{}, //用户信息
         userInfoShow:false,// 是否显示退出登录/修改密码模块
         resetpsw:false,//修改密码弹层
         newPassword1:'', //旧密码
         newPassword2:'', //新密码
       }
     },
     mounted(){
	     let _this = this;
	     _this.getUerInfo(); // 获取用户信息
       window.onclick=function () {
         _this.userInfoShow = false;
       }
     },
     methods:{
	  //   获取用户信息
       getUerInfo(){
         let _this = this ;
         _this.axios({
           method:'get',
           url:webApi.Host + webApi.User.GetUser
         }).then(function(res){
            if(res.data.code == 0){
              let data = res.data.data;
              localStorage.setItem('IdentityType', data.IdentityType);
              data.ExpireTime = data.ExpireTime.split(' ')[0];
              _this.userInfo = data;
              _this.$root.Bus.$emit('changeIdentity',data.IdentityType);
            }
         }).catch(function(err){

         })
       },
       //用户信息弹层
       userModal(){
         let _this = this;
         _this.userInfoShow = !_this.userInfoShow
       },
       //登出弹层
       logout(){
         let _this = this;

         // _this.axios({
         //   method:'post',
         //   url:webApi.Host + webApi.Auth.Logout,
         // }).then(function(res){
         //   console.log(res)
         // }).catch(function(err){
         //
         // })
         localStorage.removeItem("token");
         _this.$router.push({
           path: '/login'
         });
       },
       //修改密码模态
       resetModal(){
         let _this = this;
         console.log(1);
         _this.userInfoShow = false;
         _this.resetpsw = true;
       },
       resetPassword(){
         let _this = this;
         if(_this.newPassword1.trim()== ''){
           _this.$message({
             message: '新密码不能为空',
             type: 'error'
           });

         }else if(_this.newPassword2.trim() ==''){
           _this.$message({
             message: '请再次确认密码',
             type: 'error'
           });
         }else if(_this.newPassword1.trim() != _this.newPassword2.trim()){
           _this.$message({
             message: '两次密码不相同',
             type: 'error'
           });
         }else {

           _this.axios({
             method:'post',
             url:webApi.Host + webApi.Auth.ChangePwd,
             data:{
               newPwd :_this.newPassword2
             }
           }).then(function(res){
             console.log(res)
            if(res.data.code == 0){
              if(res.data.data){
                _this.$message({
                  message: '修改成功,即将退出登录',
                  type: 'success',
                  duration:1000,
                  onClose:function () {
                    _this.resetpsw = false;
                    _this.newPassword1 = '';
                    _this.newPassword2 = '';
                    _this.logout();
                  }
                });
              }else{
                _this.$message({
                  message: res.data.errorMsg,
                  type: 'error',
                  duration:1000,
                  onClose:function () {
                    _this.newPassword1 = '';
                    _this.newPassword2 = '';
                  }
                });
              }
            }
           }).catch(function(err){

           })
         }
       }
     },

	 }

</script>

<style lang="scss"  scoped>
  #header{
    max-height: 100px;
    .logo{
      background-color: #00a65a;
      color: #fff;
      border-bottom: 0 solid transparent;
      -webkit-transition: all .3s ease-in-out;
      transition: all .3s ease-in-out;
      display: block;
      float: left;
      height: 50px;
      font-size: 20px;
      line-height: 50px;
      text-align: center;
      width: 275px;
      font-family: "Helvetica Neue",Helvetica,Arial,sans-serif;
      padding: 0 15px;
      -webkit-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
      user-select: none;
      cursor: pointer;
      overflow: hidden;
    }
    .logo:hover{
      background:#00a157;
    }
    .navbar{
      background: #00a65a;
      -webkit-transition: margin-left .3s ease-in-out;
      transition: margin-left .3s ease-in-out;
      margin-bottom: 0;
      margin-left: 230px;
      border: none;
      min-height: 50px;
      border-radius: 0;
      .menu-toggle{
        float: left;
        padding: 0 15px;
        height: 50px;
        line-height: 50px;
        color: #FFFFFF;
        -webkit-transition: all .1s ease-in-out;
        transition: all .1s ease-in-out;
      }
      .menu-toggle:hover{
        background:#008d4c;
      }
      .navbar-right{
        height: 50px;
        float: right;
        background: #00a65a;
        .navbar-menu{
          background: #00a65a;
          padding: 0;
          .navbar-menu-item{
            height: 50px;
            line-height: 50px;
            float: left;
            margin-right: 12px;
            font-size: 14px;
            color: #FFFFFF;
          }
          .user-menu{
            position: relative;
            margin-right: 0;
            margin-left: 10px ;
            padding: 12px;
            line-height: 26px;
            height: 50px;
            cursor: pointer;
            .user-info-modal{
              position: absolute;
              -webkit-transition: all 0.3s;
              -moz-transition: all 0.3s;
              -ms-transition: all 0.3s;
              -o-transition: all 0.3s;
              transition: all 0.3s;
              border: 1px solid #ffffff;
              right: 0;
              top: 50px;
              width: 270px;
              cursor: default;
              z-index: 100;
              .up-box{
                height: 150px;
                background: #00a65a;
                text-align: center;
                line-height: 150px;
                padding-top: 35px;
                -webkit-user-select: none;
                -moz-user-select: none;
                -ms-user-select: none;
                user-select: none;
                .up-avatar{
                  width: 80px;
                  -webkit-border-radius: 50%;
                  -moz-border-radius: 50%;
                  border-radius: 50%;
                }
              }
              .down-box{
                background: #f7f7f7;
                padding: 10px;
                .down-box-btn{
                  background: #f1f1f1;
                  border: 1px solid #CCCCCC;
                  padding:8px 10px;
                  color: #333;
                  cursor: pointer;
                }
                .down-box-btn:hover{
                  background: #f5f5f5;
                }
                .reset-btn{
                  float: left;
                }
                .logout-btn{
                  float: right;
                }
              }
            }
             .user-avatar{
               display: inline-block;
               float: left;
               margin-right: 10px;
               width: 25px;
               height: 25px;
               border-radius: 50%;
             }
            .user-name{
              float: left;
            }
          }
          .user-menu-on,
          .user-menu:hover{
            background:#008d4c
          }
        }
      }
    }
  }
  .zindex{
    z-index: 10;
  }
  /*@media (max-width: 767px){*/
    /*#header{*/
      /*.logo{*/
        /*width: 100%;*/
      /*}*/
      /*.navbar{*/
        /*margin-left: 0;*/
      /*}*/
    /*}*/
  /*}*/

</style>
