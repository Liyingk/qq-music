// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import vuescroll from 'vuescroll'
import 'vuescroll/dist/vuescroll.css'
import './assets/scss/common.scss'

Vue.config.productionTip = false
Vue.use(vuescroll)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
