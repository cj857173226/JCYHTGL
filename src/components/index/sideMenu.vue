<template>
  <el-menu id="menu" class="el-menu-vertical-demo"  :default-openeds="openeds">

    <el-submenu index="1" v-if="IdentityType==1?true:false">

      <template slot="title">
        <i class="fa fa-database"></i>
        <span slot="title">管理模块</span>
      </template>
      <el-menu-item-group >
        <template slot="title" id="menu-group-title" style="display:none"></template>
        <!-- <router-link to="/home/reviewInternetCue">
          <el-menu-item index="1-1" :class="isThisNav == '审核线索'?'is-active':''" @click="switchNav('审核线索')" >
            <i class="fa fa-list-alt"></i>
            <span slot="title">审核线索</span>
          </el-menu-item>
        </router-link> -->

        <router-link to="/home/knowledgeInput">
          <el-menu-item index="1-2" :class="isThisNav == '知识库录入'?'is-active':''" @click="switchNav('知识库录入')">
            <i class="fa fa-keyboard-o"></i>
            <span slot="title">知识库录入</span>
          </el-menu-item>
        </router-link>
        <router-link to="/home/newsManage">
          <el-menu-item index="1-3" :class="isThisNav == '新闻管理'?'is-active':''" @click="switchNav('新闻管理')">
            <i class="fa fa-newspaper-o"></i>
            <span slot="title">新闻管理</span>
          </el-menu-item>
        </router-link>
        <el-submenu index="1-4">
          <template slot="title">
            <i class="fa fa-database"></i>
            <span slot="title">互联网线索管理</span>
          </template>
          <el-menu-item-group>
            <template slot="title" id="menu-group-title" style="display:none"></template>
            <router-link to="/home/internetCueManageNo">
              <el-menu-item index="1-4-1" :class="isThisNav == '互联网未处理'?'is-active':''" @click="switchNav('互联网未处理')">
                <i class="fa fa-window-restore"></i>
                <span slot="title">互联网未处理</span>
              </el-menu-item>
            </router-link>
            <router-link to="/home/internetCueManageYes">
              <el-menu-item index="1-4-2" :class="isThisNav == '互联网已处理'?'is-active':''" @click="switchNav('互联网已处理')">
                <i class="fa fa-connectdevelop"></i>
                <span slot="title">互联网已处理</span>
              </el-menu-item>
            </router-link>
          </el-menu-item-group>
        </el-submenu>

      </el-menu-item-group>
    </el-submenu>

    <router-link to="/home/news">
      <el-menu-item index="4" :class="isThisNav == '新闻页' || isThisNav == '新闻页详情'?'is-active':''" @click="switchNav('新闻页')">
        <i class="iconfont icon-xiangji"></i>
        <span slot="title">新闻聚合</span>
      </el-menu-item>
    </router-link>

    <router-link to="/home/knowledge">
      <el-menu-item index="5" :class="isThisNav == '知识库' || isThisNav == '知识库详情'?'is-active':''" @click="switchNav('知识库')">
        <i class="iconfont icon-boshimao"></i>
        <span slot="title">知识库</span>
      </el-menu-item>
    </router-link>

    <!--<el-menu-item index="7">-->
      <!--<i class="el-icon-setting"></i>-->
      <!--<span slot="title">手动录入</span>-->
    <!--</el-menu-item>-->
  </el-menu>

</template>

<script>
  export  default {
    name:'side_menu',
    data(){
      return{
        IdentityType: localStorage.getItem('IdentityType'),//身份信息
        openeds: ['1','1-4'],
        isThisNav: '',
      }
    },
    mounted(){
      console.log(this.$route.meta.name);
      this.isThisNav = this.$route.meta.name;
      var _this = this;
      this.$root.Bus.$on('changeIdentity',function(val){
        _this.IdentityType = val;
      })
    },
    methods:{
      switchNav(title){
        this.isThisNav = title;
      }
    }
  }
</script>

<style lang="scss" scoped>
  #menu{
    // .active{
    //   color: red;
    // }
    height: 100%;
    el-menu-item-group{
      overflow: hidden;
    }
    .note-tag{
      color: #ff6000;
      display: inline-block;
      vertical-align: bottom;
    }
  }
  /*.el-menu-item.is-active{*/
    /*color: #c0ecaa;*/
  /*}*/
  /*.el-menu-item:focus, .el-menu-item:hover{*/
    /*background: #00a65a;*/
  /*}*/
</style>
