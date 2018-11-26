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
        <strong><img src="../../../assets/img/weatherIcons/sunrise.png" /> {{ this.sunRise | moment("HH:mm") }}/ <img src="../../../assets/img/weatherIcons/sunset.png" /> {{ this.sunSet | moment("HH:mm")}}</strong><br />
        <strong>High {{ this.todayHigh }}/ Low {{ this.todayLow }}</strong><br />
        <strong>Wind Speed {{ this.currentWind }}/ Direction{{ this.currentWindDirection }}</strong><br />
        <strong>Warnings</strong><br />

      </div>
      <span v-if="unit=='f'">
       
      </span>
      <span v-else>
       
      </span>
	  	
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
      this.todayLow = response.data.daily.data[0].temperatureLow.toFixed(0)
      this.currentWind = response.data.currently.windSpeed
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
    font-size: 5rem;
  }
  .currentTemp sup {
    font-size: 2rem;
    position: relative;
    top: -29px;
    left: -8px;
  }
  
</style>
