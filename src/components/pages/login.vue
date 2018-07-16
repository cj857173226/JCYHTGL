<template>
  <div id="public_login">
    <!--<img src="./assets/login/login_box.png" alt="">-->
    <div class="login_head">
      <p>检察机关</p>
      <p>公益诉讼线索综合处理系统</p>
      <p>后台管理</p>
    </div>
    <div class="login-box-head">
      用户登录
    </div>
    <div class="login-box">
      <div class="input-wrap clearfix">
          <div class="olabel">
            <i class="fa fa-user"></i>
          </div>
        <input class="oipt" type="text"  placeholder="请输入用户名"  v-model="username"  ref="username" @keyup.13="inputFoucs()">
      </div>
      <div class="input-wrap  clearfix">
        <div class="olabel">
          <i class="fa fa-lock"></i>
        </div>
        <input class="oipt" type="password" placeholder="请输入密码"  v-model="password"  ref="password" @keyup.13="loginClick()">
      </div>
      <div class="control_pwd clearfix">
        <div class="remember_pwd"><input type="checkbox" id="checkbox_pwd"  ref="checkbox_pwd" v-bind:checked="isCheck"><label for="checkbox_pwd"></label> 记住密码</div>
        <div class="forget_pwd">忘记密码?</div>
      </div>
      <button class="login-btn" :disabled="isLogin" @click="loginClick()">登&emsp;录</button>
    </div>
    <div class="CR">
      Copyright © 2018长日科技成都有限公司. All rights reserved.
    </div>
    <div id="login-load" v-show="isLogin"><img src="../../assets/wait.gif" /> </div>
    <div id="isChrome" v-show="noChrome"> 检测到您不是使用的谷歌浏览器,为了避免页面显示不正常。&nbsp;
      <a href="https://pan.baidu.com/s/1lGLcjXWt1aI_YQjuP0kgGQ" target="_blank" style="cursor: pointer;color: #F00;text-decoration: underline">前去下载</a>
    </div>
  </div>
</template>

<script >
  export default {
    name: "login",
    data() {
      return {
        username: '',
        password: '',
        isLogin: false,
        noChrome: false,
        isCheck:false,
      }
    },
    mounted() {
      let _this = this;
			let  pwdState = localStorage.getItem("pwdState");
			if(Boolean(pwdState)){
				pwdState = JSON.parse(pwdState);
				this.isCheck = pwdState.isCheck;
				this.username = pwdState.username;
				this.password = pwdState.password;
			}

      var isChrome = window.navigator.userAgent.indexOf("Chrome") !== -1;
      if(isChrome && window.navigator.userAgent.indexOf("compatible") == -1 && window.navigator.userAgent.indexOf("MSIE") == -1 && window.navigator.userAgent.indexOf("Opera") == -1 && window.navigator.userAgent.indexOf("Edge") == -1 && window.navigator.userAgent.indexOf("Firefox") == -1) {
        this.noChrome = false;
      } else {
        this.noChrome = true;
      }


    },
    methods: {
      //登陆
      loginClick() {
        let isCheck = this.$refs.checkbox_pwd.checked
        let url = webApi.Host + webApi.Auth.Login;
        let that = this;
        var jsonVal = {
          'u': that.username,
          'p': that.password
        }
        if(that.username.trim() == '' || that.password.trim()  == '') {
          that.$message({
            showClose: false,
            message: '账号密码不能为空',
            type: 'error',
          });
        } else {
          that.isLogin = true;
          that.axios({
            method:'post',
            url: url,
            data: jsonVal,
          }).then(function(res){
            that.isLogin = false;
            let data =  res.data;
            if(data.code == 0){
              localStorage.setItem("token", data.data);
              that.$router.push({
                path: '/home/internetCueManageNo'
              });
            }else {
              that.$message({
                showClose: false,
                message: data.errorMessage,
                type: 'error',
              });
            }
          }).catch(function(err){
            that.isLogin = false;
              console.log((err))
          })
        }

      },
      inputFoucs: function() {
        var _this = this;
        console.log(_this.username.trim().length)
        if(_this.password.trim() == ''&& _this.username.trim() !='') {
          _this.$refs.password.focus()
        } else if(_this.password.trim() != '' && _this.username.trim() != '') {
          _this.loginClick()
        }
      }
    },
  }
</script>

<style scoped lang="scss" >

  #public_login {
    position: relative;
    background: url("../../assets/login/login_bg.jpg") center center no-repeat;
    background-size: cover;
    height: 100%;
    text-align: center;
    min-height: 600px;
    overflow: hidden;
    .login_head {
      display: flex;
      flex-direction:column;
      justify-content: center;
      color: #ffffff;
      font-size: 44px;
      height: 42%;
      -webkit-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
      user-select: none;
      font-weight: 600;
    }
    .login-box-head{
      margin: -56px auto 0;
       width: 600px;
      height: 85px;
      background: url("../../assets/login/login_box_head.png") no-repeat;
      background-size: 100% 100% ;
      color: #ffffff;
      font-size: 20px;
      line-height: 90px;
      font-weight: 800;
      text-shadow: 4px 4px 4px rgba(0,0,0,0.4);
    }
    .login-box{
      width: 600px;
      margin:0 auto;
      padding: 44px 50px 0;
      .input-wrap{
        width: 100%;
        text-align:left;
        height: 60px;
        .olabel{
          float: left;
          height: 60px;
          width: 60px;
          background: #4DB37A;
          -webkit-border-radius: 5px 0 0 5px;
          -moz-border-radius: 5px 0 0 5px;
          border-radius: 5px 0 0 5px;
          text-align: center;
          line-height: 60px;
          color: #FFFFFF;
          font-size: 40px;
        }
        .oipt{
          float: left;
          height: 100%;
          font-size: 18px;
          color: #BCBCBC;
          padding-left: 20px;
          -webkit-border-radius: 0 5px 5px 0;
          -moz-border-radius: 0 5px 5px 0;
          border-radius: 0 5px 5px 0;
          border: 1px solid #4BB726;
          width: calc(100% - 60px);
        }

      }
      .input-wrap:first-child{
        margin-bottom: 32px;
      }
      .control_pwd {
        margin-top: 24px;
        font-size: 12px;
        padding: 0 40px;
        .remember_pwd {
          float: left;
          padding-left: 4px;
          margin-right: 32px;
          font-family: "microsoft yahei";
          color: #333333;
          user-select: none;
          -webkit-user-select: none;
          -moz-user-select: none;
          font-size: 18px;
        }
        .remember_pwd input[type="checkbox"] {
          display: none;
        }

        .remember_pwd input[type="checkbox"]+label {
          position: relative;
          box-sizing: border-box;
          margin: 0;
          display: inline-block;
          width: 18px;
          height: 18px;
          border: 1px solid #565656;
          vertical-align: middle;
          top: -2px;
        }

        .remember_pwd input[type="checkbox"]:checked+label {
          background: url('../../assets/login/check_on.png') no-repeat;
          background-size: cover;
        }

        .forget_pwd {
          float: right;
          color: #84c59e;
          font-size: 18px;
        }

        .forget_pwd:hover {
          cursor: pointer;
        }
      }
      .login-btn{
        margin-top: 30px;
        font-size: 20px;
        color: #FFFFFF;
        background: #43AF71;
        width: 100%;
        height: 60px;
        border: none;
        -webkit-border-radius: 5px;
        -moz-border-radius: 5px;
        border-radius: 5px;
        cursor: pointer;
      }
      .login-btn:hover{
        background: #40b572;
      }
      .login-btn:active{
        background: #43a36c;
      }
    }

    .CR {
      width: 100%;
      position: absolute;
      left: 0;
      bottom: 30px;
      text-align: center;
      font-size: 18px;
      font-family: 'FZZZHUNHJW--GB1-0';
      color: #555555;
    }
  }
  #login-load {
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    width: 100%;
    user-select: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    background: rgba(0, 0, 0, 0.3);
  }

  #login-load>img {
    display: inline-block;
    margin-top: 28%;
    width: 32px;
  }
  #isChrome {
    width: 100%;
    position: absolute;
    font-size: 16px;
    padding: 10px;
    top: 10px;
    left: 0;
    color: #FFFFFF;
    background: rgba(0, 0, 0, 0.2);
  }

  @media only screen and (max-width: 1600px) {
    #public_login {
      .login_head {
        font-size: 30px;
      }
      .login-box-head{
        margin: -42px auto 0;
        width: 440px;
        height: 65px;
        color: #ffffff;
        font-size: 18px;
        line-height: 70px;
      }
      .login-box{
        width: 440px;
        padding: 24px 40px 0;
        .input-wrap{
          height: 40px;
          .olabel{
            height: 40px;
            width: 40px;
            line-height: 40px;
            font-size: 20px;
          }
          .oipt{
            font-size: 16px;
            padding-left: 14px;
            width: calc(100% - 40px);
          }

        }
        .input-wrap:first-child{
          margin-bottom: 20px;
        }
        .control_pwd {
          margin-top: 24px;
          font-size: 12px;
          padding: 0 20px;
          .remember_pwd {

            font-size: 14px;
          }
          .remember_pwd input[type="checkbox"] {
          }

          .remember_pwd input[type="checkbox"]+label {
          }

          .remember_pwd input[type="checkbox"]:checked+label {
            background: url('../../assets/login/check_on.png') no-repeat;
            background-size: cover;
          }

          .forget_pwd {
            float: right;
            color: #84c59e;
            font-size: 14px;
          }

          .forget_pwd:hover {
            cursor: pointer;
          }
        }
        .login-btn{
          margin-top: 18px;
          font-size: 18px;
          width: 100%;
          height: 40px;
        }
        .login-btn:hover{
          background: #40b572;
        }
        .login-btn:active{
          background: #43a36c;
        }
      }

      .CR {
        width: 100%;
        position: absolute;
        left: 0;
        bottom: 20px;
        text-align: center;
        font-size: 16px;
        font-family: 'FZZZHUNHJW--GB1-0';
        color: #555555;
      }
    }
  }

</style>
