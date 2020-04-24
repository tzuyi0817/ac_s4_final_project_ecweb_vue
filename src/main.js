import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import '@fortawesome/fontawesome-free/css/all.css'
import './assets/application.scss'
import { BootstrapVue } from 'bootstrap-vue'

Vue.config.productionTip = false

axios.defaults.withCredentials = true

Vue.use(BootstrapVue)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
