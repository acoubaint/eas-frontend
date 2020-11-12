import Vue from 'vue'
import App from './App.vue'
import axios from 'axios';
import router from './router'
import store from './store'

require("@/assets/css/app.css");
require("@/assets/css/animation.css");

axios.defaults.baseURL = process.env.VUE_APP_SERVER_URL;

Vue.config.productionTip = false
new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')
