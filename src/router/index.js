import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '@/views/layout/layout.vue'

import Login from '@/views/login/index.vue'
Vue.use(VueRouter)

//加载滚动条
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

const routes = [
  {
    path:'/',
    redirect: '/login'
  },
  {
    path:'*',
    redirect: '/404',
  },
  {
    path:'/404',
    name:'404',
    component: () => import(/* webpackChunkName: "Error" */ '@/views/error/index.vue')
  },
  {
    path:'/login',
    name:'Login',
    component:Login
  },{
    path:'/audit',
    name:'Audit',
    component: Layout,
    children:[
      {
        path: 'index',
        name: 'Index',
        component: () => import(/* webpackChunkName: "Error" */ '@/views/audit/index.vue')
      }
    ],
   
  }
]

const router = new VueRouter({
  routes
})
router.beforeEach((to, from, next) => {
  NProgress.start() 
  next()
})
router.afterEach(transition => {
  NProgress.done();
});
export default router
