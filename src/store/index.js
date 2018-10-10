import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    loadedDashboards: [
      {
        imageUrl: 'https://cdn.freshome.com/wp-content/uploads/2018/01/living-room-intro.jpg',
        id: 'location1',
        title: 'Fourth Corner',
        location: 'Cafe Area',
        date: '2017-07-17'
      },
      {
        imageUrl: 'https://contentgrid.homedepot-static.com/hdus/en_US/DTCCOMNEW/fetch/collections/staticImages/SD318/42-SD318-CoastalGetawayBathroom-C16-1000x1000.jpg',
        id: 'location2',
        title: 'Becketts',
        location: 'Bar Area',
        date: '2017-07-19'
      },
      {
        imageUrl: 'https://contentgrid.homedepot-static.com/hdus/en_US/DTCCOMNEW/fetch/collections/staticImages/SD318/42-SD318-CoastalGetawayBathroom-C16-1000x1000.jpg',
        id: 'location3',
        title: 'Tigin',
        location: 'Bathroom',
        date: '2017-07-20'
      }
    ],
    user: {
      id: 'person1',
      registeredDashboards: ['location1']
    }
  },
  mutations: {
    createDashboard (state, payload) {
      state.loadedDashboards.push(payload)
    }
  },
  actions: {
    createDashboard ({commit}, payload) {
      const dashboard = {
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
        createdOn: payload.createdOn,
        id: 'sdfsdfsdfsdfsdfsfssd'
      }
      // Reach out to firebase
      commit('createDashboard', dashboard)
    }
  },
  getters: {
    loadedDashboards (state) {
      return state.loadedDashboards.sort((dashboardA, dashboardB) => {
        return dashboardA.date > dashboardB.date
      })
    },
    loadedDashboard (state) {
      return (dashboardId) => {
        return state.loadedDashboards.find((dashboard) => {
          return dashboard.id === dashboardId
        })
      }
    }
  }
})
