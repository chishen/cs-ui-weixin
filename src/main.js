// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App'
import router from './router'
import Cs from '../packages/index'
// import VueCodemirror from 'vue-codemirror'
import 'codemirror/lib/codemirror.css'
import Api from './components/Api'
import Util from './js/common'
import './css/common.css'
Vue.use(VueAxios, axios)
// Vue.prototype.$axios = axios;
Vue.use(Util)
Vue.use(ElementUI)
Vue.use(Cs)
// Vue.use(VueCodemirror)
Vue.component('cs-api', Api)
Vue.config.productionTip = false
// Vue.component('cs-input', CsInput)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
