<template>
	<div v-if="loading">
		<v-progress-circular
	      indeterminate
	      color="white"
	      ></v-progress-circular>
	      <p>Loading Weather</p>
	</div>
	<div v-else>
		<div v-if="edit" class="editPane">
      <h4>You can get your Longitude/Latitude <a href="https://www.latlong.net/" target="_blank">here</a></h4>
      <form @submit.prevent="onChangeWeather">
        <v-text-field
        v-model="location"
        label="location"
      ></v-text-field>
      <v-text-field
        v-model="lat"
        label="Latitude"
      ></v-text-field>
      <v-text-field
        v-model="long"
        label="Longitude"
      ></v-text-field>
      <v-radio-group v-model="unit" row>
         <v-radio label="C" value="c"></v-radio>
          <v-radio label="F" value="f"></v-radio>
      </v-radio-group>
      <v-radio-group v-model="days" row>
         <v-radio label="Today" value="1"></v-radio>
          <v-radio label="3 Day" value="3"></v-radio>
          <v-radio label="5 Day" value="5"></v-radio>
      </v-radio-group>
        <v-btn color="red" @click="onCloseEdit">Close</v-btn>
        <v-btn color="green" :disabled="!formIsValid" type="submit">Update</v-btn>
      </form>
		</div>
		<div v-else @click="onClickEdit">
      <h2>{{ this.location }}</h2>
      <div class="weatherTemps">
        <div class="weatherIcon">
          <img v-if="currentIcon == 'clear-day'" src="../../../assets/img/weatherIcons/clear-day.png" />
          <img v-if="currentIcon == 'clear-night'" src="../../../assets/img/weatherIcons/clear-night.png" />
          <img v-if="currentIcon == 'rain'" src="../../../assets/img/weatherIcons/rain.png" />
          <img v-if="currentIcon == 'snow'" src="../../../assets/img/weatherIcons/snow.png" />
          <img v-if="currentIcon == 'sleet'" src="../../../assets/img/weatherIcons/sleet.png" />
          <img v-if="currentIcon == 'wind'" src="../../../assets/img/weatherIcons/wind.png" />
          <img v-if="currentIcon == 'fog'" src="../../../assets/img/weatherIcons/fog.png" />
          <img v-if="currentIcon == 'cloudy'" src="../../../assets/img/weatherIcons/cloudy.png" />
          <img v-if="currentIcon == 'partly-cloudy-day'" src="../../../assets/img/weatherIcons/partly-cloudy-day.png" />
          <img v-if="currentIcon == 'partly-cloudy-night'" src="../../../assets/img/weatherIcons/partly-cloudy-night.png" />
        </div>
        <div class="weatherTemp">
           <span v-if="unit=='f'" class="currentTemp">{{ this.currentTempF }} <sup>F&deg;</sup></span>
           <span v-else class="currentTemp">{{ this.currentTempC }} <sup>C&deg;</sup></span>
        </div>
        <div class="weatherDetails">
          <div class="weatherSuns">
            <span class="sunRiseTime">
              <img src="../../../assets/img/weatherIcons/sunrise.png" /> {{ this.sunRise | moment("HH:mm") }}
            </span>
            <span class="sunSetTime">
              <img src="../../../assets/img/weatherIcons/sunset.png" /> {{ this.sunSet | moment("HH:mm")}}
            </span>
          </div>
          <div class="weatherHighLow">
            <span class="weatherHigh">
              <img src="../../../assets/img/weatherIcons/tempHigh.png" /> 
              <p v-if="unit=='f'" >{{ this.todayHigh }}&deg;</p>
              <p v-else >{{ this.todayHighC }}&deg;</p>
            </span>
            <span class="weatherLow">
              <img src="../../../assets/img/weatherIcons/tempLow.png" /> 
              <p v-if="unit=='f'">{{ this.todayLow }}&deg;</p>
              <p v-else >{{ this.todayLowC }}&deg;</p>
            </span>
          </div>
          <div class="weatherWinds">
            <span class="windSpeed">
              {{ this.currentWind }} MPH
            </span>
            <span class="windIcon">
              <img src="../../../assets/img/weatherIcons/windArrow.png" :class="this.currentWindDeg" /> 
            </span>
          </div>
          <div class="superClear"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  props: ['weather', 'theId'],
  data () {
    return {
      loading: true,
      edit: false,
      location: '',
      city: '',
      lat: '',
      long: '',
      currentIcon: '',
      info: '',
      sunRise: '',
      sunSet: '',
      currentTempC: '',
      currentTempF: '',
      todayHigh: '',
      todayLow: '',
      todayHighC: '',
      todayLowC: '',
      currentWind: '',
      showDays: '',
      currentWindDirection: '',
      unit: 'c',
      days: '1'
    }
  },
  mounted () {
    this.location = this.weather.location
    this.lat = this.weather.latitude
    this.long = this.weather.longitude
    this.unit = this.weather.unit
    this.days = this.weather.days
    var queryString = this.weather.latitude + ',' + this.weather.longitude
    console.log('First is Long then Lat: ', queryString)
    const CORS_PROXY = 'https://cors-anywhere.herokuapp.com/'
    axios.get(CORS_PROXY + `https://api.darksky.net/forecast/3469e148ee58b9591f84c3244bad3199/` + queryString, {
      headers: {
        'crossDomain': true,
        'Access-Control-Allow-Origin': '*'
      }
    })
    .then(response => {
      console.log(response.data)
      var currentTemp = response.data.currently.temperature
      this.currentTempF = currentTemp.toFixed(0)
      var currentTempC = ((currentTemp - 32) * (5 / 9))
      this.currentTempC = currentTempC.toFixed(0)
      this.city = response.data.timezone
      this.sunRise = response.data.daily.data[0].sunriseTime
      this.sunSet = response.data.daily.data[0].sunsetTime
      this.todayHigh = response.data.daily.data[0].temperatureHigh.toFixed(0)
      var todayHighCel = ((this.todayHigh - 32) * (5 / 9))
      this.todayHighC = todayHighCel.toFixed(0)
      this.todayLow = response.data.daily.data[0].temperatureLow.toFixed(0)
      var todayLowCel = ((this.todayLow - 32) * (5 / 9))
      this.todayLowC = todayLowCel.toFixed(0)
      this.currentWind = response.data.currently.windSpeed.toFixed(0)
      this.currentWindDirection = response.data.currently.windBearing
      this.currentIcon = response.data.currently.icon
    })
    this.loading = false
  },
  methods: {
    onClickEdit () {
      this.edit = true
    },
    onCloseEdit () {
      this.edit = false
    },
    onChangeWeather (payload) {
      console.log('Consolidated: ', this.consolidated)
      this.$store.dispatch('updateWidgetData', {
        id: this.theId,
        weather: this.consolidated
      })
      this.edit = false
    }
  },
  watch: {
    weather: function (newVal, oldVal) {
      console.log('Prop changed: ', newVal, ' | was: ', oldVal)
      this.lat = this.weather.latitude
      this.long = this.weather.longitude
      this.location = this.weather.location
      this.city = this.weather.city
      this.days = this.weather.days
      this.unit = this.weather.unit
    }
  },
  computed: {
    formIsValid () {
      return this.long !== '' && this.lat !== ''
    },
    currentWindDeg () {
      if (this.currentWindDirection >= 0 && this.currentWindDirection < 10) {
        return 'deg5'
      } else if (this.currentWindDirection >= 10 && this.currentWindDirection <= 20) {
        return 'deg15'
      } else if (this.currentWindDirection >= 21 && this.currentWindDirection <= 30) {
        return 'deg25'
      } else if (this.currentWindDirection >= 31 && this.currentWindDirection <= 40) {
        return 'deg35'
      } else if (this.currentWindDirection >= 41 && this.currentWindDirection <= 50) {
        return 'deg45'
      } else if (this.currentWindDirection >= 51 && this.currentWindDirection <= 60) {
        return 'deg55'
      } else if (this.currentWindDirection >= 61 && this.currentWindDirection <= 70) {
        return 'deg65'
      } else if (this.currentWindDirection >= 71 && this.currentWindDirection <= 80) {
        return 'deg75'
      } else if (this.currentWindDirection >= 81 && this.currentWindDirection <= 90) {
        return 'deg85'
      } else if (this.currentWindDirection >= 91 && this.currentWindDirection <= 100) {
        return 'deg95'
      } else if (this.currentWindDirection >= 101 && this.currentWindDirection <= 110) {
        return 'deg105'
      } else if (this.currentWindDirection >= 111 && this.currentWindDirection <= 120) {
        return 'deg115'
      } else if (this.currentWindDirection >= 121 && this.currentWindDirection <= 130) {
        return 'deg125'
      } else if (this.currentWindDirection >= 131 && this.currentWindDirection <= 140) {
        return 'deg135'
      } else if (this.currentWindDirection >= 141 && this.currentWindDirection <= 150) {
        return 'deg145'
      } else if (this.currentWindDirection >= 151 && this.currentWindDirection <= 160) {
        return 'deg155'
      } else if (this.currentWindDirection >= 161 && this.currentWindDirection <= 170) {
        return 'deg165'
      } else if (this.currentWindDirection >= 171 && this.currentWindDirection <= 180) {
        return 'deg175'
      } else if (this.currentWindDirection >= 181 && this.currentWindDirection <= 190) {
        return 'deg185'
      } else if (this.currentWindDirection >= 191 && this.currentWindDirection <= 200) {
        return 'deg195'
      } else if (this.currentWindDirection >= 201 && this.currentWindDirection <= 210) {
        return 'deg205'
      } else if (this.currentWindDirection >= 211 && this.currentWindDirection <= 220) {
        return 'deg215'
      } else if (this.currentWindDirection >= 221 && this.currentWindDirection <= 230) {
        return 'deg225'
      } else if (this.currentWindDirection >= 231 && this.currentWindDirection <= 240) {
        return 'deg235'
      } else if (this.currentWindDirection >= 241 && this.currentWindDirection <= 250) {
        return 'deg245'
      } else if (this.currentWindDirection >= 251 && this.currentWindDirection <= 260) {
        return 'deg255'
      } else if (this.currentWindDirection >= 261 && this.currentWindDirection <= 270) {
        return 'deg265'
      } else if (this.currentWindDirection >= 271 && this.currentWindDirection <= 280) {
        return 'deg275'
      } else if (this.currentWindDirection >= 281 && this.currentWindDirection <= 290) {
        return 'deg285'
      } else if (this.currentWindDirection >= 291 && this.currentWindDirection <= 300) {
        return 'deg295'
      } else if (this.currentWindDirection >= 301 && this.currentWindDirection <= 310) {
        return 'deg305'
      } else if (this.currentWindDirection >= 311 && this.currentWindDirection <= 320) {
        return 'deg315'
      } else if (this.currentWindDirection >= 321 && this.currentWindDirection <= 330) {
        return 'deg325'
      } else if (this.currentWindDirection >= 331 && this.currentWindDirection <= 340) {
        return 'deg335'
      } else if (this.currentWindDirection >= 341 && this.currentWindDirection <= 350) {
        return 'deg345'
      } else {
        return 'deg255'
      }
    },
    consolidated () {
      return {
        location: this.location,
        latitude: this.lat,
        longitude: this.long,
        days: this.days,
        unit: this.unit
      }
    }
  }
}
</script>
<style scoped>
  .weatherIcon {
    float: left;
    width: 40%;
  }
  .weatherIcon img {
    width: 100%;
    position: relative;
  }
  .currentTemp {
    font-size: 5vw
  }
  .currentTemp sup {
    font-size: 2rem;
    position: relative;
    top: -29px;
    left: -8px;
  }
  .windIcon img {
    width: 34px;
  }
  .deg5 {
    transform: rotate(5deg);
  }
  .deg15 {
    transform: rotate(15deg);
  }
  .deg25 {
    transform: rotate(25deg);
  }
  .deg35 {
    transform: rotate(35deg);
  }
  .deg45 {
    transform: rotate(45deg);
  }
  .deg55 {
    transform: rotate(55deg);
  }
  .deg65 {
    transform: rotate(65deg);
  }
  .deg75 {
    transform: rotate(75deg);
  }
  .deg85 {
    transform: rotate(85deg);
  }
  .deg95 {
    transform: rotate(95deg);
  }
  .deg105 {
    transform: rotate(105deg);
  }
  .deg115 {
    transform: rotate(115deg);
  }
  .deg125 {
    transform: rotate(125deg);
  }
  .deg135 {
    transform: rotate(135deg);
  }
  .deg145 {
    transform: rotate(145deg);
  }
  .deg155 {
    transform: rotate(155deg);
  }
  .deg165 {
    transform: rotate(165deg);
  }
  .deg175 {
    transform: rotate(175deg);
  }
  .deg185 {
    transform: rotate(185deg);
  }
  .deg195 {
    transform: rotate(195deg);
  }
  .deg205 {
    transform: rotate(205deg);
  }
  .deg215 {
    transform: rotate(215deg);
  }
  .deg225 {
    transform: rotate(225deg);
  }
  .deg235 {
    transform: rotate(235deg);
  }
  .deg245 {
    transform: rotate(245deg);
  }
  .deg255 {
    transform: rotate(255deg);
  }
  .deg265 {
    transform: rotate(265deg);
  }
  .deg275 {
    transform: rotate(275deg);
  }
  .deg285 {
    transform: rotate(285deg);
  }
  .deg295 {
    transform: rotate(295deg);
  }
  .deg305 {
    transform: rotate(305deg);
  }
  .deg315 {
    transform: rotate(315deg);
  }
  .deg325 {
    transform: rotate(325deg);
  }
  .deg335 {
    transform: rotate(335deg);
  }
  .deg345 {
    transform: rotate(345deg);
  }
  .deg355 {
    transform: rotate(355deg);
  }
  .weatherHighLow p {
    display: inline-block;
    font-size: 2rem;
    margin-bottom: 0px;
  }
  .weatherHigh img {
    width: 24px;
  }
  .weatherLow img {
    width: 24px;
  }
  .weatherDetails {
    display: block;
  }
  .weatherSuns {
    width: 33%;
    float: left;
  }
  .weatherHighLow {
    width: 33%;
    float: left;
  }
  .weatherWinds {
    width: 33%;
    float: left;
  }
  .sunRiseTime {
    margin-bottom: 10px;
    display: block;
    margin-top: 4px;
  }
  .windSpeed {
    font-size: 16px;
    margin-top: 4px;
    display: block;
    margin-bottom: 16px;
  }
  .superClear {
    clear: both;
  }
</style>
