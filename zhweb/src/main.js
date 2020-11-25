// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import iView from 'iview'
import 'iview/dist/styles/iview.css'
import * as hApi from '@/handler/api.js'
Vue.use(iView)
Vue.config.productionTip = false
Vue.prototype.$hapi = hApi;
// Vue.prototype.$router = router;
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
