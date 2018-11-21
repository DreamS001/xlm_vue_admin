import Vue from 'vue'
import Router from 'vue-router'
import login from '@/components/login';

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/management'
    },
    {
      path: '/',
      component: resolve => require(['../components/common/Home.vue'], resolve),
      meta: { title: '自述文件' },
      children:[
          {
              path: '/management',
              component: resolve => require(['../components/management.vue'], resolve),
              meta: { title: '信息管理' }
          },
          {
              path: '/winuser',
              component: resolve => require(['../components/winuser.vue'], resolve),
              meta: { title: '中奖用户' }
          }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: login
    }
  ]
})
