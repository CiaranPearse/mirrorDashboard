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
import VueTimers from 'vue-timers'
import AlertCmp from './components/Shared/Alert.vue'
import EditDashboardDetailsDialog from './components/Dashboard/Edit/EditDashboardDetailsDialog.vue'
import 'vuetify/dist/vuetify.min.css'
import 'vue-material-design-icons/styles.css'

Vue.use(Vuetify)
Vue.use(VueAxios, axios)
Vue.use(VueMoment, {moment})
Vue.use(VueTimers)
Vue.component('app-alert', AlertCmp)
Vue.component('app-edit-dashboard-details-dialog', EditDashboardDetailsDialog)
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
        this.$store.dispatch('fetchUserData')
      }
    })
    this.$store.dispatch('loadDashboards')
  }
})
