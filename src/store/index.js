import Vue from 'vue'
import Vuex from 'vuex'
import * as firebase from 'firebase'

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
      if (payload.deviceLocation) {
        dashboard.deviceLocation = payload.deviceLocation
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
      if (payload.updated) {
        dashboard.updated = payload.updated
      }
    },
    setUser (state, payload) {
      state.user = payload
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
    loadDashboards ({commit}) {
      commit('setLoading', true)
      firebase.database().ref('dashboards').once('value')
      .then((data) => {
        const dashboards = []
        const obj = data.val()
        for (let key in obj) {
          dashboards.push({
            id: key,
            deviceId: obj[key].deviceId,
            dashTitle: obj[key].dashTitle,
            deviceLocation: obj[key].deviceLocation,
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
            welcomeMessageTitle: obj[key].welcomeMessageTitle,
            allProps: obj[key].allProps,
            updated: obj[key].updated,
            creatorId: obj[key].creatorId
          })
        }
        commit('setLoadedDashboards', dashboards)
        commit('setLoading', false)
      })
      .catch(
        (error) => {
          console.log(error)
          commit('setLoading', true)
        }
      )
    },
    createDashboard ({commit, getters}, payload) {
      const dashboard = {
        dashTitle: payload.dashTitle,
        deviceId: payload.deviceId,
        deviceLocation: payload.deviceLocation,
        slotLeft1: payload.slotLeft1,
        slotLeft2: payload.slotLeft2,
        slotLeft3: payload.slotLeft3,
        slotCenter1: payload.slotCenter1,
        slotCenter2: payload.slotCenter2,
        slotCenter3: payload.slotCenter3,
        slotRight1: payload.slotRight1,
        slotRight2: payload.slotRight2,
        slotRight3: payload.slotRight3,
        slotFooter: payload.slotFooter,
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
      if (payload.dashTitle) {
        updateObj.dashTitle = payload.dashTitle
      }
      if (payload.deviceId) {
        updateObj.deviceId = payload.deviceId
      }
      if (payload.deviceLocation) {
        updateObj.deviceLocation = payload.deviceLocation
      }
      if (payload.slotLeft1) {
        updateObj.slotLeft1 = payload.slotLeft1
      }
      if (payload.slotLeft2) {
        updateObj.slotLeft2 = payload.slotLeft2
      }
      if (payload.slotLeft3) {
        updateObj.slotLeft3 = payload.slotLeft3
      }
      if (payload.slotCenter1) {
        updateObj.slotCenter1 = payload.slotCenter1
      }
      if (payload.slotCenter2) {
        updateObj.slotCenter2 = payload.slotCenter2
      }
      if (payload.slotCenter3) {
        updateObj.slotCenter3 = payload.slotCenter3
      }
      if (payload.slotRight1) {
        updateObj.slotRight1 = payload.slotRight1
      }
      if (payload.slotRight2) {
        updateObj.slotRight2 = payload.slotRight2
      }
      if (payload.slotRight3) {
        updateObj.slotRight3 = payload.slotRight3
      }
      if (payload.slotFooter) {
        updateObj.slotFooter = payload.slotFooter
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
    signUserUp ({commit}, payload) {
      commit('setLoading', true)
      commit('clearError')
      firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
      .then(
        user => {
          commit('setLoading', false)
          const newUser = {
            id: user.user.uid,
            registeredDashboards: []
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
    signUserIn ({commit}, payload) {
      commit('setLoading', true)
      commit('clearError')
      firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
      .then(
        user => {
          commit('setLoading', false)
          const newUser = {
            id: user.user.uid,
            registeredDashboards: []
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
      commit('setUser', {id: payload.uid, registeredDashboards: []})
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
