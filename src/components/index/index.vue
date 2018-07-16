<template>
	<div id="root-box">
		<o-head id="header" style="z-index:10" ></o-head>
    <div id="main-body">
      <div id="side-menu">
        <side-menu></side-menu>
      </div>
      <div id="main-area">
        <keep-alive include="cue-list,news-page">
          <router-view/>
        </keep-alive>
      </div>
    </div>
    <o-footer id="footer"></o-footer>
	</div>
</template>

<script>

	import oHead from './header.vue'
  import oFooter from './footer.vue'
  import sideMenu from './sideMenu'

	 export default {
	 	components: {oHead,oFooter,sideMenu},
	 	data(){
	 		return {
	 		}
     },
     update() {

     }
	 }

</script>

<style lang="scss">
  #root-box{
    height: 100%;
    #hearder{
      height: 50px;
    }
    #main-body{
      height: calc( 100% - 90px);
      #side-menu{
        float: left;
        width: 230px;
        height: 100%;
        .el-menu{
          height: 100%;
          max-height: 100%;
          overflow-y: auto;
        }
        .el-submenu .el-menu-item{
          min-width: 0;
          padding-right: 0;
        }
        .el-menu-item, .el-submenu__title{
          height: 40px;
          line-height: 40px;
        }
        .el-submenu .el-menu-item{
          height: 38px;
          line-height: 38px;
        }
      }
      #main-area{
        float: left;
        box-sizing: border-box;
        width: calc(100% - 230px);
        height: 100%;
        max-height: 100%;
        overflow-y: auto;
      }
    }
    #footer{
      height: 40px;
    }
  }
  @media (max-width: 780px){
    #main-body{
      height: calc( 100% - 140px);
    }
  }

</style>
