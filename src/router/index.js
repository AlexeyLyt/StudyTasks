import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/MainTask.vue'
import VuexExample from '@/views/AppVuex.vue'
import Task1 from '@/views/Task1.vue'
import Task2 from '@/views/Task2.vue'
import Task3 from '@/views/Task3.vue'
import Task4 from '@/views/Task4.vue'  // ---> тогда в пути вместо import вставляю 'Task4'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'MainTask',
    component: Home
  },
  {
    path: '/vuex',
    name: 'VuexExample',
    component: VuexExample
  },
  {
    path: '/Task1',
    name: 'Task1',
    // component: () => import(/* webpackChunkName: "about" */ '../views/Task1.vue')
    component: Task1
  },
  {
    path: '/Task2',
    name: 'Task2',
    component: Task2
  },
  {
    path: '/Task3',
    name: 'Task3',
    component: Task3
  },
  {
    path: '/Task4',
    name: 'Task4',
    component: Task4
  },
  {
  path: '/weather',
  name: 'weather',
  component: Home
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
