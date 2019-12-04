import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/MainTask.vue'
// import Task4 from '@/components/Task4/Task4Comp' ---> тогда в пути вместо import вставляю 'Task4'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'MainTask',
    component: Home
  },
  {
    path: '/Task1',
    name: 'Task1',
    component: () => import(/* webpackChunkName: "about" */ '../views/Task1.vue')
  },
  {
    path: '/Task2',
    name: 'Task2',
    component: () => import(/* webpackChunkName: "about" */ '../views/Task2.vue')
  },
  {
    path: '/Task3',
    name: 'Task3',
    component: () => import('../views/Task3.vue')
  },
  {
    path: '/Task4',
    name: 'Task4',
    component: () => import('../views/Task4.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
