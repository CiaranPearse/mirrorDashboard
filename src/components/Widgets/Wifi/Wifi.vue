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
            <v-checkbox
              label="Show Bps"
              v-model="showBps"
            ></v-checkbox>
            <v-checkbox
              label="Show Kbps"
              v-model="showKbps"
            ></v-checkbox>
            <v-checkbox
              label="Show Mbps"
              v-model="showMbps"
            ></v-checkbox>
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
          <div v-if="speedBps !== ''">
            <div v-if="showUpdatedAt">Updated {{ this.speedUpdatedAgo }}</div>
            <div v-if="showBps">{{ this.speedBps }} Bps</div>
            <div v-if="showKbps">{{ this.speedKbps }} Kbps</div>
            <div v-if="showMbps">{{ this.speedMbps }} Mbps</div>
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
      speedBps: '',
      speedKbps: '',
      speedMbps: '',
      speedLoading: false,
      imageAddr: 'http://i.imgur.com/pfudboE.jpg',
      startTime: 0,
      endTime: 0,
      downloadSize: 4281953,
      speedUpdated: 0,
      speedUpdatedAgo: '',
      intervalid1: '',
      counter: 0,
      showUpdatedAt: true,
      showBps: false,
      showKbps: false,
      showMbps: true,
      intervaliWifi: ''
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
    // this.$options.interval = setInterval(this.getTheSpeed, 10000)
  },
  mounted () {
    this.ssid = this.wifi.ssid
    this.wifiPassword = this.wifi.wifiPassword
    this.showBps = this.wifi.showBps
    this.showKbps = this.wifi.showKbps
    this.showMbps = this.wifi.showMbps
    this.isWifiLoading = false
    this.getDlSpeed()
    this.MeasureConnectionSpeed()
    this.updatedAgo()
  },
  methods: {
    moment: function () {
      return moment()
    },
    onChangeWifi (payload) {
      this.$store.dispatch('updateWidgetData', {
        id: this.theId,
        wifi: this.consolidated
      })
      this.editWifi = false
    },
    MeasureConnectionSpeed () {
      this.startTime = (new Date()).getTime()
      var download = new Image()
      var cacheBuster = '?nnn=' + this.startTime
      download.src = this.imageAddr + cacheBuster
      download.onload = function () {
        this.showResults()
      }.bind(this)
      download.onerror = function (err, msg) {
        console.log(err)
      }
    },
    showResults () {
      this.endTime = (new Date()).getTime()
      this.duration = (this.endTime - this.startTime) / 1000
      this.bitsLoaded = this.downloadSize * 8
      this.speedBps = (this.bitsLoaded / this.duration).toFixed(2)
      this.speedKbps = (this.speedBps / 1024).toFixed(2)
      this.speedMbps = (this.speedKbps / 1024).toFixed(2)
      this.speedUpdated = (new Date()).getTime()
      console.log([
        'duration' + this.duration,
        'endTime' + this.endTime,
        'startTime' + this.startTime,
        this.speedMbps + ' Mbps'
      ])
    },
    getDlSpeed () {
      this.intervaliWifi = setInterval(function () {
        this.MeasureConnectionSpeed()
      }.bind(this), 300000)
    },
    updatedAgo: function () {
      let lastUpdate = this.endTime
      if (lastUpdate === 0) {
        lastUpdate = (new Date()).getTime()
      }
      var a = moment(lastUpdate)
      var b = moment()
      this.speedUpdatedAgo = a.from(b)
      this.intervalid1 = setInterval(function () {
        let lastUpdate = this.endTime
        if (lastUpdate === 0) {
          lastUpdate = (new Date()).getTime()
        }
        var a = moment(this.endTime)
        var b = moment()
        this.speedUpdatedAgo = a.from(b)
        console.log(this.speedUpdatedAgo)
      }.bind(this), 1000)
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
        wifiPassword: this.wifiPassword,
        showBps: this.showBps,
        showKbps: this.showKbps,
        showMbps: this.showMbps,
        speedUpdated: this.speedUpdated
      }
    }
  },
  beforeDestroy () {
    clearInterval(this.intervaliWifi)
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
