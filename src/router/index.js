import Vue from 'vue'
import Router from 'vue-router'
//登录
import login from '../components/pages/login'
//主体框架
import indexPage from '../components/index/index'


//知识库
import knowledge from  '../components/pages/knowledgePage/knowledgePage'
//知识详情页
import  knowledgeDetail from '../components/pages/knowledgePage/knowledgeDetail'

//新闻
import news from  '../components/pages/newsPage/newsPage'
//新闻详情
import newsDetail from '../components/pages/newsPage/newsDetail'


//管理模块
import reviewInternetCue from '../components/manage/reviewInternetCue' //审核互联网线索
import knowledgeInput from '../components/manage/knowledgeManage' //知识库录入
import internetCueManageNo from '../components/manage/internetCueManageNo' //互联网线索管理未审批
import internetCueManageYes from '../components/manage/internetCueManageYes' //互联网线索管理已审批
import newsManage from '../components/manage/newsManage'  //新闻管理
Vue.use(Router)

let router =  new Router({
 	routes:[
    {
      path:'/home',
      component: indexPage,
      name: '主页',
      children:[
        {
          path:'knowledge',
          name:knowledge,
          component:knowledge,
          meta:{
            keepAlive: true,
            name: '知识库',
          }
        },
        {
          path:'knowledgeDetail',
          name:knowledgeDetail,
          component:knowledgeDetail,
          meta:{
            name: '知识库详情',
          }
        },
        {
          path:'news',
          name:news,
          component:news,
          meta:{
            keepAlive: true,
            name: '新闻页',
          }
        },
        {
          path:'newsDetail',
          name:newsDetail,
          component:newsDetail,
          meta:{
            name: '新闻页详情',
          }
        },
        {
          path:'reviewInternetCue',
          name:reviewInternetCue,
          component:reviewInternetCue,
          meta:{
            name: '审核线索',
          }
        },
        {
          path:'knowledgeInput',
          name:knowledgeInput,
          component:knowledgeInput,
          meta:{
            name: '知识库录入',
          }
        },
        {
          path:'newsManage',
          name:newsManage,
          component:newsManage,
          meta:{
            name:'新闻管理'
          }
        },
        {
          path:'internetCueManageNo',
          name:internetCueManageNo,
          component:internetCueManageNo,
          meta:{
            name: '互联网未处理',
          }
        },
        {
          path:'internetCueManageYes',
          name:internetCueManageYes,
          component:internetCueManageYes,
          meta:{
            name: '互联网已处理',
          }
        },
      ]
    },
    {
      path:'/login',
      component:login,
      name: '登录',
    },
    {
      path:'/',
      component:login,
      redirect:'/login',
      name: '登录',
    },
 	]
});
export default router
