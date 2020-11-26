import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

export default new Router({
  mode:'history',
  routes: [
    {
      path: '/',
      name: 'index',
      component: () => import('@/view/home/index.vue')
    },
    {
      path: '/news',
      name: 'news',
      component: () => import('@/view/home/news.vue')
    },
    {
      path: '/news/detail',
      name: 'detail',
      component: () => import('@/view/home/detail.vue')
    },
    {
      path: '/books',
      name: 'books',
      component: () => import('@/view/home/bookList.vue')
    },
    {
      path: '/books/detail',
      name: 'bookDetail',
      component: () => import('@/view/home/bookDetail.vue')
    },
    {
      path: '/notice',
      name: 'notice',
      component: () => import('@/view/home/notice.vue')
    },
    {
      path: '/voteList',
      name: 'voteList',
      component: () => import('@/view/home/voteList.vue')
    },
    {
      path: '/noticeC',
      name: 'noticeC',
      component: () => import('@/view/home/noticeC.vue')
    },
    {
      path: '/getUser',
      name: 'userInfo',
      component: () => import('@/view/home/user.vue')
    },
    {
      path: '/download',
      name: 'download',
      component: () => import('@/view/home/download.vue')
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('@/view/home/about.vue')
    },
    {
      path: '/recharge',
      name: 'recharge',
      component: () => import('@/view/home/recharge.vue')
    }
  ]
})
