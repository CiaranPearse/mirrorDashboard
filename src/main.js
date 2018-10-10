import Vue from 'vue'
import App from './App'
import router from './router'
import Vuetify from 'vuetify'
import { store } from './store'
import DateFilter from './filters/dates'
import 'vuetify/dist/vuetify.min.css'

Vue.use(Vuetify)
Vue.config.productionTip = false
Vue.filter('date', DateFilter)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
