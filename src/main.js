import Vue from 'vue'

import axios from 'axios'
Vue.prototype.$axios = axios
import VueCarousel from 'vue-carousel';
Vue.use(VueCarousel);

import BootstrapVue from 'bootstrap-vue'
Vue.use(BootstrapVue);

import moment from 'moment'
Vue.prototype.moment = moment
moment.locale('ru');

import App from './App.vue'
import router from './router'

import store from './store'

Vue.config.productionTip = false

export const eventBus = new Vue() // добавление нового канала - ???

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')