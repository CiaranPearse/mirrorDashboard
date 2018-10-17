import Vue from 'vue'
import App from './App'
import router from './router'
import * as firebase from 'firebase'
import Vuetify from 'vuetify'
import VueMoment from 'vue-moment'
import axios from 'axios'
import VueAxios from 'vue-axios'
import moment from 'moment-timezone'
import { store } from './store'
import DateFilter from './filters/dates'
import AlertCmp from './components/Shared/Alert.vue'
import 'vuetify/dist/vuetify.min.css'

Vue.use(Vuetify)
Vue.use(VueAxios, axios)
Vue.use(VueMoment, {moment})
Vue.component('app-alert', AlertCmp)
Vue.config.productionTip = false
Vue.filter('date', DateFilter)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
  created () {
    firebase.initializeApp({
      apiKey: 'AIzaSyC1tOWtTSNjHh_nO9bP_H6TbiGHJi5s3RQ',
      authDomain: 'mymirrordashboard.firebaseapp.com',
      databaseURL: 'https://mymirrordashboard.firebaseio.com',
      projectId: 'mymirrordashboard',
      storageBucket: 'mymirrordashboard.appspot.com'
    })
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.$store.dispatch('autoSignIn', user)
      }
    })
    this.$store.dispatch('loadDashboards')
  }
})
