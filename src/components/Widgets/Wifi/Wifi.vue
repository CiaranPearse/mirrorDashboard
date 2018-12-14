<template>
  <div v-if="isWifiLoading">
    <div id="wifiLoading">
      <v-layout row>
        <v-flex xs12 class="text-xs-center">
          <wifi-orbit-spinner
            :animation-duration="1200"
            :size="55"
            color="#ffffff"
          />
        </v-flex>
      </v-layout>
    </div>
  </div>

  <div v-else id="wifiDetails">

    <v-dialog v-model="editWifi" persistent max-width="400">
      <v-card>
        <v-card-title class="headline">Configure Wifi</v-card-title>
        <v-card-text>
          <v-text-field
            v-model="ssid"
            label="SSID"
          ></v-text-field>
            <v-text-field
              v-model="wifiPassword"
              label="Password"
            ></v-text-field>
      </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red darken-1" flat @click="editWifi = false">Close</v-btn>
          <v-btn color="green darken-1" flat @click="onChangeWifi">Update Wifi</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <div @click="editWifi = true" class="hoverCursor">
      <h3 class="wifiTitle">Wifi Details</h3>
      <div id="wifiInfo">
        <table>
          <tr>
            <td class="wifiSsid"><WifiSsidIcon class="ssidIcon" /></td>
            <td class="ssid">{{ ssid }}</td>
          </tr>
          <tr>
            <td class="wifiPassword"><WifiPasswordIcon class="passwordIcon" /></td>
            <td class="password">{{ wifiPassword }}</td>
          </tr>
        </table>
      </div>
      <div id="wifiSpeed" v-if="showSpeed">
        Show Wifi Speen here
      </div>
    </div>
  </div>
</template>

<script>
import { WifiOrbitSpinner } from 'epic-spinners'
import WifiIcon from 'vue-material-design-icons/Wifi.vue'
import WifiSsidIcon from 'vue-material-design-icons/WifiStrengthAlertOutline.vue'
import WifiPasswordIcon from 'vue-material-design-icons/WifiStrengthLockOutline.vue'
export default {
  props: ['wifi', 'dashInfo', 'theId'],
  data () {
    return {
      isWifiLoading: true,
      editWifi: false,
      ssid: '',
      wifiPassword: 'Wifi Password',
      showSpeed: false
    }
  },
  components: {
    WifiOrbitSpinner,
    WifiIcon,
    WifiSsidIcon,
    WifiPasswordIcon
  },
  created () {
    this.ssid = this.wifi.ssid
    this.wifiPassword = this.uber.wifiPassword
  },
  mounted () {
    this.getWifi()
    this.getSpeed()
    this.isWifiLoading = false
  },
  methods: {
    onChangeWifi (payload) {
      this.$store.dispatch('updateWidgetData', {
        id: this.theId,
        wifi: this.consolidated
      })
      this.editWifi = false
    },
    getWifi () {
      if (this.ssid !== '') {
        this.ssid = this.wifi.ssid
        this.wifiPassword = this.wifi.wifiPassword
      } else {
        this.ssid = 'Wifi name'
        this.wifiPassword = 'Wifi Password'
      }
    },
    getSpeed () {
      console.log('GETTING SPEED')
    }
  },
  watch: {
    wifi: function (newVal, oldVal) {
      this.ssid = this.wifi.ssid
      this.wifiPassword = this.wifi.wifiPassword
    }
  },
  computed: {
    formIsValid () {
      return this.ssid !== '' && this.wifiPassword !== ''
    },
    consolidated () {
      return {
        ssid: this.ssid,
        wifiPassword: this.wifiPassword
      }
    }
  }
}
</script>

<style lang="scss">
#wifiLoading {
  border: 1px solid red;
}

#wifiDetails {
  max-width: 300px;
  margin: 0 auto;
  #wifiInfo {
    margin: 0 auto;
  }
}


.material-design-icon.ssidIcon, .material-design-icon.passwordIcon {
  height: 1.6em;
  width: 1.6em;
}

.material-design-icon.ssidIcon > .material-design-icon__svg, .material-design-icon.passwordIcon > .material-design-icon__svg {
    height: 1.6em;
    width: 1.6em;
}

#wifiInfo {
  table {
    margin: 0 auto;
    td {
      font-size: 16px;
      padding-left: 10px;
      text-align: left;
    }
  }
}
.wifiPassword {
  margin-bottom: 0px;
  .password {
    position: relative;
    top: -4px;
    font-size: 16px;
  }
}
.wifiTitle {
  margin-bottom: 0px;
  font-size: 16px;
  font-weight: 600;
}


</style>
