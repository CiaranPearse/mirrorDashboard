<template>
      <v-container>
        <v-layout row v-if="loading">
        <v-flex xs12 class="text-xs-center">
          <v-progress-circular
            indeterminate
            class="primary--text"
            :width="7"
            :size="70"></v-progress-circular>
        </v-flex>
      </v-layout>
        <v-layout>
          <v-flex xs12>
            <v-card-title>Edit Dashboard {{ dashboard.dashTitle }}</v-card-title>
          </v-flex>
        </v-layout>
        <v-layout row>
          <v-flex xs12>
            <v-card-text>
              <v-text-field
                name="dashTitle"
                label="Name this Dashboard"
                id="dashTitle"
                v-model="dashTitle"
                :messages="['Give it a name so you know what it\'s for']"
                required
                >
              </v-text-field>
            </v-card-text>
            <v-card-text>
              <v-text-field
                name="deviceId"
                label="Enter your Device ID"
                id="deviceId"
                v-model="deviceId"
                :messages="['You can find this on a sticker on your device.']"
                required
                >
              </v-text-field>
            </v-card-text>
            <v-card-text>
              <v-text-field
                name="Dashboard Location"
                label="Where is your device located"
                id="deviceLocation"
                v-model="deviceLocation"
                required
                >
              </v-text-field>
            </v-card-text>
          </v-flex>
        </v-layout>
        
        <v-divider></v-divider>
        <v-layout row>
          <v-flex xs12>
            <v-card-actions>
              <v-btn flat color="red" @click="editDialog = false">Cancel</v-btn>
              <v-btn flat color="orange" @click="onSaveChanges">Update</v-btn>
            </v-card-actions>
          </v-flex>
        </v-layout>
      </v-container>
</template>

<script>
export default {
  props: ['id'],
  data () {
    return {
      loading: false,
      deviceId: 'placeholder',
      dashTitle: 'placeholder',
      deviceLocation: 'placeholder',
      editedDashTitle: '',
      editedDeviceId: '',
      editedDeviceLocation: '',
      updated: null
    }
  },
  computed: {
    dashboard () {
      return this.$store.getters.loadedDashboard(this.id)
    },
    userIsAuthenticated () {
      return this.$store.getters.user !== null && this.$store.getters.user !== undefined
    },
    userIsCreator () {
      if (!this.userIsAuthenticated) {
        return false
      }
      return this.$store.getters.user.id === this.dashboard.creatorId
    },
    loading () {
      return this.$store.getters.loading
    }
  },
  methods: {
    onSaveChanges () {
      if (this.editedDashTitle.trim() === '') {
        return
      }
      this.editDialog = false
      // const dateNow = new Date()
      this.$store.dispatch('updateDashboardData', {
        id: this.dashboard.id,
        dashTitle: this.dashboard.editedDashTitle,
        deviceId: this.dashboard.editedDeviceId,
        deviceLocation: this.editedDeviceLocation
      })
    }
  },
  mounted () {
    this.dashTitle = this.dashboard.dashTitle
    this.deviceId = this.dashboard.deviceId
    this.deviceLocation = this.dashboard.deviceLocation
  }
}
</script>
