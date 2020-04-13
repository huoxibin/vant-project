import Vue from 'vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue'
import { axios, get, post } from "@/utils/request.js";

import router from './router'
import store from './store'


Vue.use(ElementUI);


import Vant from 'vant';
import 'vant/lib/index.css';
Vue.use(Vant);

import 'amfe-flexible/index.js'


Vue.prototype.$get = get;
Vue.prototype.$post = post;
Vue.prototype.$axios = axios;

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
