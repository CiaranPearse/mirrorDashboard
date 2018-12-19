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
      <div id="wifiSpeed">
        <div v-if="speedLoading">
          <p>SPEED IS LOADING</p>
        </div>
        <div v-else>
          <div v-if="showSpeedBps !== ''">
            <div v-if="showUpdatedAt === true">{{ this.speedUpdatedAgo }}</div>
            <div v-if="showBps">{{ this.showSpeedBps }}</div>
            <div v-if="showKbps">{{ this.showSpeedKbps }}</div>
            <div v-if="showMbps">{{ this.showSpeedMbps }}</div>
          </div>
          <div v-else>
            <p>Calculating Wifi Speed</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
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
      ssid: 'WiFi Name',
      wifiPassword: 'Wifi Password',
      showSpeed: false,
      showSpeedBps: '',
      showSpeedKbps: '',
      showSpeedMbps: '',
      speedLoading: false,
      imageAddr: 'http://www.kenrockwell.com/contax/images/g2/examples/31120037-5mb.jpg',
      startTime: (new Date()).getTime(),
      endTime: (new Date()).getTime(),
      downloadSize: 0,
      speedUpdated: (new Date()).getTime(),
      speedUpdatedAgo: '',
      intervalid1: '',
      counter: 0,
      showUpdatedAt: true,
      showBps: false,
      showKbps: false,
      showMbps: true
    }
  },
  components: {
    WifiOrbitSpinner,
    WifiIcon,
    WifiSsidIcon,
    WifiPasswordIcon
  },
  created () {
    this.ssid = ''
    this.wifiPassword = ''
  },
  mounted () {
    this.ssid = this.wifi.ssid
    this.wifiPassword = this.wifi.wifiPassword
    this.showSpeed = this.wifi.showSpeed
    this.isWifiLoading = false
    this.getTheSpeed()
    this.updatedAgo()
  },
  methods: {
    moment: function () {
      return moment()
    },
    updatedAgo: function () {
      var a = moment(this.speedUpdated)
      var b = moment()
      this.speedUpdatedAgo = a.from(b)
      this.intervalid1 = setInterval(function () {
        var a = moment(this.speedUpdated)
        var b = moment()
        this.speedUpdatedAgo = a.from(b)
        console.log(this.speedUpdatedAgo)
      }.bind(this), 30000)
    },
    onChangeWifi (payload) {
      this.$store.dispatch('updateWidgetData', {
        id: this.theId,
        wifi: this.consolidated
      })
      this.editWifi = false
    },
    getTheSpeed () {
      this.downloadSize = 4995374
      this.initiateSpeedDetection()
      if (window.addEventListener) {
        window.addEventListener('load', this.initiateSpeedDetection, false)
      } else if (window.attachEvent) {
        window.attachEvent('onload', this.initiateSpeedDetection)
      }
    },
    initiateSpeedDetection () {
      window.setTimeout(this.measureConnectionSpeed, 1)
    },
    measureConnectionSpeed () {
      var self = this
      var download = new Image()
      this.startTime = (new Date()).getTime()
      download.onload = function () {
        this.endTime = (new Date()).getTime()
        self.showResults()
      }
      var cacheBuster = '?nnn=' + this.startTime
      download.src = this.imageAddr + cacheBuster
    },
    showResults () {
      var duration = (this.startTime - this.endTime) / 100
      var bitsLoaded = this.downloadSize * 8
      var speedBps = (bitsLoaded / duration).toFixed(2)
      var speedKbps = (speedBps / 1024).toFixed(2)
      var speedMbps = (speedKbps / 1024).toFixed(2)
      this.showSpeedBps = (speedBps + ' Bps')
      this.showSpeedKbps = (speedKbps + ' Kbps')
      this.showSpeedMbps = (speedMbps + ' Mbps')
      this.speedUpdated = (new Date()).getTime()
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
