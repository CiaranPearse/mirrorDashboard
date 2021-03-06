import Vue from 'vue'
import Vuex from 'vuex'
import * as firebase from 'firebase'
import router from '@/router'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    loadedDashboards: [
      {
        imageUrl: 'https://cdn.freshome.com/wp-content/uploads/2018/01/living-room-intro.jpg',
        id: 'location1',
        deviceId: 'deviceId 1',
        dashTitle: 'Fourth Corner',
        location: 'Cafe Area',
        created: '2017-07-17',
        updated: '2018-01-01'
      },
      {
        imageUrl: 'https://contentgrid.homedepot-static.com/hdus/en_US/DTCCOMNEW/fetch/collections/staticImages/SD318/42-SD318-CoastalGetawayBathroom-C16-1000x1000.jpg',
        id: 'location2',
        deviceId: 'deviceId 2',
        dashTitle: 'Becketts',
        location: 'Bar Area',
        created: '2017-07-19',
        updated: '2018-01-03'
      },
      {
        imageUrl: 'https://contentgrid.homedepot-static.com/hdus/en_US/DTCCOMNEW/fetch/collections/staticImages/SD318/42-SD318-CoastalGetawayBathroom-C16-1000x1000.jpg',
        id: 'location3',
        deviceId: 'deviceId 3',
        dashTitle: 'Tigin',
        location: 'Bathroom',
        created: '2015-07-20',
        updated: '2015-01-02'
      }
    ],
    user: null,
    loading: false,
    error: null
  },
  mutations: {
    setLoadedDashboards (state, payload) {
      state.loadedDashboards = payload
    },
    createDashboard (state, payload) {
      state.loadedDashboards.push(payload)
    },
    updateDashboard (state, payload) {
      const dashboard = state.loadedDashboards.find(dashboard => {
        return dashboard.id === payload.id
      })
      if (payload.dashTitle) {
        dashboard.dashTitle = payload.dashTitle
      }
      if (payload.deviceId) {
        dashboard.deviceId = payload.deviceId
      }
      if (payload.backgroundType) {
        dashboard.backgroundType = payload.backgroundType
      }
      if (payload.backgroundSource) {
        dashboard.backgroundSource = payload.backgroundSource
      }
      if (payload.deviceLocation) {
        dashboard.deviceLocation = payload.deviceLocation
      }
      if (payload.longitude) {
        dashboard.longitude = payload.longitude
      }
      if (payload.latitude) {
        dashboard.latitude = payload.latitude
      }
      if (payload.slotLeft1) {
        dashboard.slotLeft1 = payload.slotLeft1
      }
      if (payload.slotLeft2) {
        dashboard.slotLeft2 = payload.slotLeft2
      }
      if (payload.slotLeft3) {
        dashboard.slotLeft3 = payload.slotLeft3
      }
      if (payload.slotCenter1) {
        dashboard.slotCenter1 = payload.slotCenter1
      }
      if (payload.slotCenter2) {
        dashboard.slotCenter2 = payload.slotCenter2
      }
      if (payload.slotCenter3) {
        dashboard.slotCenter3 = payload.slotCenter3
      }
      if (payload.slotRight1) {
        dashboard.slotRight1 = payload.slotRight1
      }
      if (payload.slotRight2) {
        dashboard.slotRight2 = payload.slotRight2
      }
      if (payload.slotRight3) {
        dashboard.slotRight3 = payload.slotRight3
      }
      if (payload.slotFooter) {
        dashboard.slotFooter = payload.slotFooter
      }
      if (payload.deviceType) {
        dashboard.deviceType = payload.deviceType
      }
      if (payload.deviceLayout) {
        dashboard.deviceLayout = payload.deviceLayout
      }
      if (payload.allProps) {
        dashboard.allProps = payload.allProps
      }
      if (payload.updated) {
        dashboard.updated = payload.updated
      }
    },
    updateWidget (state, payload) {
      const dashboard = state.loadedDashboards.find(dashboard => {
        return dashboard.id === payload.id
      })
      if (payload.allProps) {
        dashboard.allProps = payload.allProps
      }
      if (payload.updated) {
        dashboard.updated = payload.updated
      }
    },
    setUser (state, payload) {
      state.user = payload
    },
    updateUser (state, payload) {
      const user = state.user
      if (payload.firstName) {
        user.firstName = payload.firstName
      }
      if (payload.lastName) {
        user.lastName = payload.lastName
      }
      if (payload.avatar) {
        user.avatar = payload.avatar
      }
      if (payload.currency) {
        user.currency = payload.currency
      }
      if (payload.location) {
        user.location = payload.location
      }
      if (payload.timeZone) {
        user.timeZone = payload.timeZone
      }
      if (payload.longitude) {
        user.longitude = payload.longitude
      }
      if (payload.latitude) {
        user.latitude = payload.latitude
      }
      if (payload.language) {
        user.language = payload.language
      }
      if (payload.updated) {
        user.updated = payload.updated
      }
    },
    setLoading (state, payload) {
      state.loading = payload
    },
    setError (state, payload) {
      state.error = payload
    },
    clearError (state) {
      state.error = null
    }
  },
  actions: {
    loadedProfile ({commit}, payload) {
      console.log('in loadedProfile inside ACTIONS')
      console.log('The Commit is: ', commit)
      console.log('The payload is: ', payload)
    },
    loadDashboards ({commit}, payload) {
      commit('setLoading', true)
      firebase.database().ref('dashboards').on('value', function (snapshot) {
        if (snapshot.val()) {
          const dashboards = []
          const obj = snapshot.val()
          console.log('FROM FIREBASE:', obj)
          for (let key in obj) {
            dashboards.push({
              id: key,
              deviceId: obj[key].deviceId,
              backgroundType: obj[key].backgroundType,
              backgroundSource: obj[key].backgroundSource,
              dashTitle: obj[key].dashTitle,
              deviceLocation: obj[key].deviceLocation,
              longitude: obj[key].longitude,
              latitude: obj[key].latitude,
              slotLeft1: obj[key].slotLeft1,
              slotLeft2: obj[key].slotLeft2,
              slotLeft3: obj[key].slotLeft3,
              slotCenter1: obj[key].slotCenter1,
              slotCenter2: obj[key].slotCenter2,
              slotCenter3: obj[key].slotCenter3,
              slotRight1: obj[key].slotRight1,
              slotRight2: obj[key].slotRight2,
              slotRight3: obj[key].slotRight3,
              slotFooter: obj[key].slotFooter,
              created: obj[key].created,
              allProps: obj[key].allProps,
              deviceType: obj[key].deviceType,
              deviceLayout: obj[key].deviceLayout,
              updated: obj[key].updated,
              creatorId: obj[key].creatorId
            })
          }
          commit('setLoadedDashboards', dashboards)
          commit('setLoading', false)
        }
      })
    },
    createDashboard ({commit, getters}, payload) {
      console.log('from create Dashboard line 182: ', payload)
      const dashboard = {
        dashTitle: payload.dashTitle,
        deviceId: payload.deviceId,
        deviceLocation: payload.deviceLocation,
        created: payload.created,
        updated: payload.updated,
        creatorId: getters.user.id
      }
      firebase.database().ref('dashboards').push(dashboard)
      .then((data) => {
        const key = data.key
        commit('createDashboard', {
          ...dashboard,
          id: key
        })
      })
      .catch((error) => {
        console.log(error)
      })
    },
    updateDashboardData ({commit}, payload) {
      commit('setLoading', true)
      const updateObj = {}
      console.log('PAYLOAD', payload)
      if (payload.dashTitle) {
        updateObj.dashTitle = payload.dashTitle
      }
      if (payload.deviceId) {
        updateObj.deviceId = payload.deviceId
      }
      if (payload.backgroundType) {
        updateObj.backgroundType = payload.backgroundType
      }
      if (payload.backgroundSource) {
        updateObj.backgroundSource = payload.backgroundSource
      }
      if (payload.deviceLocation) {
        updateObj.deviceLocation = payload.deviceLocation
      }
      if (payload.longitude) {
        updateObj.longitude = payload.longitude
      }
      if (payload.latitude) {
        updateObj.latitude = payload.latitude
      }
      if (payload.deviceType) {
        updateObj.deviceType = payload.deviceType
      } else {
        updateObj.deviceType = null
      }
      if (payload.deviceLayout) {
        updateObj.deviceLayout = payload.deviceLayout
      } else {
        updateObj.deviceLayout = null
      }
      if (payload.slotLeft1) {
        updateObj.slotLeft1 = payload.slotLeft1
      } else {
        updateObj.slotLeft1 = null
      }
      if (payload.slotLeft2) {
        updateObj.slotLeft2 = payload.slotLeft2
      } else {
        updateObj.slotLeft2 = null
      }
      if (payload.slotLeft3) {
        updateObj.slotLeft3 = payload.slotLeft3
      } else {
        updateObj.slotLeft3 = null
      }
      if (payload.slotCenter1) {
        updateObj.slotCenter1 = payload.slotCenter1
      } else {
        updateObj.slotCenter1 = null
      }
      if (payload.slotCenter2) {
        updateObj.slotCenter2 = payload.slotCenter2
      } else {
        updateObj.slotCenter2 = null
      }
      if (payload.slotCenter3) {
        updateObj.slotCenter3 = payload.slotCenter3
      } else {
        updateObj.slotCenter3 = null
      }
      if (payload.slotRight1) {
        updateObj.slotRight1 = payload.slotRight1
      } else {
        updateObj.slotRight1 = null
      }
      if (payload.slotRight2) {
        updateObj.slotRight2 = payload.slotRight2
      } else {
        updateObj.slotRight2 = null
      }
      if (payload.slotRight3) {
        updateObj.slotRight3 = payload.slotRight3
      } else {
        updateObj.slotRight3 = null
      }
      if (payload.slotFooter) {
        updateObj.slotFooter = payload.slotFooter
      } else {
        updateObj.slotFooter = null
      }
      if (payload.welcomeMessage) {
        var welcomeMessage = payload.welcomeMessage
        updateObj['allProps/welcomeMessage'] = welcomeMessage
      }
      if (payload.dublinBus) {
        var dublinBus = payload.dublinBus
        updateObj['allProps/dublinBus'] = dublinBus
      }
      if (payload.clock) {
        var clock = payload.clock
        updateObj['allProps/clock'] = clock
      }
      if (payload.quotes) {
        var quotes = payload.quotes
        updateObj['allProps/quotes'] = quotes
      }
      if (payload.uber) {
        var uber = payload.uber
        updateObj['allProps/uber'] = uber
      }
      if (payload.wifi) {
        var wifi = payload.wifi
        updateObj['allProps/wifi'] = wifi
      }
      if (payload.currency) {
        var currency = payload.currency
        updateObj['allProps/currency'] = currency
      }
      if (payload.updated) {
        updateObj.updated = payload.updated
      }
      firebase.database().ref('dashboards').child(payload.id).update(updateObj)
      .then(() => {
        commit('setLoading', false)
        console.log('This is the push of the payload', payload)
        commit('updateDashboard', payload)
      })
      .catch(error => {
        console.log(error)
        commit('setLoading', false)
      })
    },
    updateWidgetData ({commit}, payload) {
      console.log('updating widget data: ', payload)
      commit('setLoading', true)
      const updateObj = {}
      if (payload.welcomeMessage) {
        var welcomeMessage = payload.welcomeMessage
        updateObj['allProps/welcomeMessage'] = welcomeMessage
      }
      if (payload.dublinBus) {
        var dublinBus = payload.dublinBus
        updateObj['allProps/dublinBus'] = dublinBus
      }
      if (payload.clock) {
        var clock = payload.clock
        updateObj['allProps/clock'] = clock
      }
      if (payload.quotes) {
        var quotes = payload.quotes
        updateObj['allProps/quotes'] = quotes
      }
      if (payload.weather) {
        var weather = payload.weather
        updateObj['allProps/weather'] = weather
      }
      if (payload.uber) {
        var uber = payload.uber
        updateObj['allProps/uber'] = uber
      }
      if (payload.wifi) {
        var wifi = payload.wifi
        updateObj['allProps/wifi'] = wifi
      }
      if (payload.currency) {
        var currency = payload.currency
        updateObj['allProps/currency'] = currency
      }
      if (payload.updated) {
        updateObj.updated = payload.updated
      }
      firebase.database().ref('dashboards').child(payload.id).update(updateObj)
      .then(() => {
        commit('setLoading', false)
        console.log('This is the push of the payload', payload)
        commit('updateWidget', payload)
      })
      .catch(error => {
        console.log(error)
        commit('setLoading', false)
      })
    },
    signUserUp ({commit}, payload) {
      commit('setLoading', true)
      commit('clearError')
      firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
      .then(
        user => {
          commit('setLoading', false)
          const newUser = {
            id: user.user.uid
          }
          commit('setUser', newUser)
        }
      )
      .then(
        user => {
          const dateNow = new Date()
          console.log(this.state.user.id)
          const newUser = {
            firstName: 'Saga',
            lastName: 'Dash',
            location: 'Cork, Ireland',
            longitude: '-8.486316',
            latitude: '51.896893',
            timeZone: 'GMT',
            language: 'en_US',
            currency: 'USD',
            avatar: 'http://ciaranfoley.com/assets/img/author/perry.jpg',
            userLevel: 'free',
            joinDate: dateNow.toISOString(),
            isAdmin: false
          }
          firebase.database().ref('users/' + this.state.user.id).set(newUser)
          console.log('Profile should be created with TEST field as XXXXXXX')
        }
      )
      .then(
        user => {
          router.push('/profile')
        }
      )
      .catch(
        error => {
          commit('setLoading', false)
          commit('setError', error)
          console.log('Error on signup: ', error)
        }
      )
    },
    signUserIn ({commit}, payload) {
      commit('setLoading', true)
      commit('clearError')
      firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
      .then(
        user => {
          console.log('User from signin is: ', user)
          commit('setLoading', false)
          const newUser = {
            id: user.user.uid,
            userLevel: ''
          }
          commit('setUser', newUser)
        }
      )
      .catch(
        error => {
          commit('setLoading', false)
          commit('setError', error)
        }
      )
    },
    autoSignIn ({commit}, payload) {
      commit('setUser', {id: payload.uid, registeredDashboards: [], userLevel: ''})
    },
    fetchUserData ({commit, getters}) {
      commit('setLoading', true)
      firebase.database().ref('/users/' + getters.user.id).once('value')
      .then(data => {
        const values = data.val()
        console.log('from fetchUserData: ', values)
        const updatedUser = {
          id: getters.user.id,
          firstName: values.firstName,
          lastName: values.lastName,
          location: values.location,
          longitude: values.longitude,
          latitude: values.latitude,
          timeZone: values.timeZone,
          language: values.language,
          currency: values.currency,
          avatar: values.avatar,
          userLevel: values.userLevel,
          joinDate: values.joinDate,
          isAdmin: values.isAdmin
        }
        commit('setLoading', false)
        commit('setUser', updatedUser)
      })
      .catch(
        error => {
          commit('setLoading', false)
          commit('setError', error)
        }
      )
    },
    updateUserData ({commit}, payload) {
      commit('setLoading', true)
      const updateUserObj = {}
      console.log('PAYLOAD', payload)
      if (payload.firstName) {
        updateUserObj.firstName = payload.firstName
      }
      if (payload.lastName) {
        updateUserObj.lastName = payload.lastName
      }
      if (payload.avatar) {
        updateUserObj.avatar = payload.avatar
      }
      if (payload.currency) {
        updateUserObj.currency = payload.currency
      }
      if (payload.location) {
        updateUserObj.location = payload.location
      }
      if (payload.timeZone) {
        updateUserObj.timeZone = payload.timeZone
      }
      if (payload.longitude) {
        updateUserObj.longitude = payload.longitude
      }
      if (payload.latitude) {
        updateUserObj.latitude = payload.latitude
      }
      if (payload.language) {
        updateUserObj.language = payload.language
      }
      if (payload.updated) {
        updateUserObj.updated = payload.updated
      }
      firebase.database().ref('users').child(payload.id).update(updateUserObj)
      .then(() => {
        commit('setLoading', false)
        console.log('This is the push of the USER payload', payload)
        // commit('updateUser', payload)
      })
      .catch(error => {
        console.log(error)
        commit('setLoading', false)
      })
    },
    logout ({commit}) {
      firebase.auth().signOut()
      commit('setUser', null)
    },
    clearError ({commit}) {
      commit('clearError')
    }
  },
  getters: {
    loadedDashboards (state) {
      console.log(state)
      return state.loadedDashboards.sort((dashboardA, dashboardB) => {
        return dashboardA.created > dashboardB.created
      })
    },
    featuredDashboards (state, getters) {
      return getters.loadedDashboards.slice(0, 5)
    },
    loadedDashboard (state) {
      return (dashboardId) => {
        return state.loadedDashboards.find((dashboard) => {
          return dashboard.id === dashboardId
        })
      }
    },
    getCurrentUser (state) {
      console.log('From getCurrentUser: ', state.user)
      // return state.user
    },
    loadProfile (state) {
      return state.loadedProfile
    },
    user (state) {
      return state.user
    },
    loading (state) {
      return state.loading
    },
    error (state) {
      return state.error
    }
  }
})
