<template>
	<div v-if="loading">
		<v-progress-circular
	      indeterminate
	      color="white"
	      ></v-progress-circular>
	      <p>Loading Weather</p>
	</div>
	<div v-else>
	  <p><strong> {{ this.city }}</strong></p>
	  <strong>Long:</strong> {{ this.long }}<br />
  	<strong>Lat:</strong> {{ this.lat }}<br />
  	<strong>Lang:</strong> {{ this.language }}<br />
  	<strong>Unit:</strong> {{ this.unit }}<br />
  	<strong>Current Temp: </strong> {{ this.currentTemp }} F&deg;
  	</div>
</template>

<script>
import axios from 'axios'
export default {
  props: ['weather'],
  data () {
    return {
      loading: true,
      edit: false,
      city: '',
      lat: '',
      long: '',
      language: '',
      unit: '',
      info: '',
      currentTemp: ''
    }
  },
  mounted () {
    this.loading = false
    this.lat = this.weather.latitude
    this.long = this.weather.longitude
    this.language = this.weather.language
    this.unit = this.weather.unit
    var currentLong = this.long
    var currentLat = this.lat
    var queryString = currentLong + ',' + currentLat
    const CORS_PROXY = 'https://cors-anywhere.herokuapp.com/'
    axios.get(CORS_PROXY + `https://api.darksky.net/forecast/3469e148ee58b9591f84c3244bad3199/` + queryString, {
      headers: {
        'crossDomain': true,
        'Access-Control-Allow-Origin': '*'
      }
    })
    .then(response => {
      console.log(response.data)
      this.currentTemp = response.data.currently.temperature
      this.city = response.data.timezone
    })
    this.loading = false
  },
  watch: {
    weather: function (newVal, oldVal) {
      console.log('Prop changed: ', newVal, ' | was: ', oldVal)
      this.lat = this.weather.latitude
      this.long = this.weather.longitude
      this.language = this.weather.language
      this.unit = this.weeather.unit
    }
  }
}
</script>
<style>
</style>
