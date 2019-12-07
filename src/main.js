import Vue from 'vue'

import axios from 'axios'
Vue.prototype.$axios = axios
import VueCarousel from 'vue-carousel';
Vue.use(VueCarousel);

import moment from 'moment'
Vue.prototype.moment = moment

import App from './App.vue'
import router from './router'

Vue.config.productionTip = false

export const eventBus = new Vue() // добавление нового канала - ???

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')