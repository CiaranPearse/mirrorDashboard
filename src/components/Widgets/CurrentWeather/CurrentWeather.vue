<template>
	<div v-if="currentTempC === ''">
		<v-progress-circular
	      indeterminate
	      color="white"
	      ></v-progress-circular>
	      <p>Loading Weather</p>
	</div>
	<div v-else>
		



    <v-dialog v-model="edit" persistent max-width="400">
      <v-card>
        <v-card-title class="headline">Configure Weather</v-card-title>
        <v-card-text>
          <h4>You can get your Longitude/Latitude <a href="https://www.latlong.net/" target="_blank">here</a></h4>
          <form>
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
              <v-radio label="3 Day" value="4"></v-radio>
              <v-radio label="5 Day" value="6"></v-radio>
              <v-radio label="7 Day" value="8"></v-radio>
          </v-radio-group>
          </form>
      </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red darken-1" flat @click="edit = false">Close</v-btn>
          <v-btn color="green darken-1" flat @click="onChangeWeather">Update Weather</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>






		<div @click="edit = true" class="hoverCursor">
      <div class="weather">
        <div class="today">
          <div class="current">
            <div class="icon">
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
            <div class="temp">
              <p v-if="unit === 'f'" class="ts">{{ this.currentTempF }} <sup>F&deg;</sup></p>
              <p v-else class="ts">{{ this.currentTempC }} <sup>C&deg;</sup></p>
            </div>
          </div>
          <div class="location">
            <p class="summary ts">{{ this.summary }}</p>
            <p class="body-2 ts">{{ this.location }}</p>
          </div>
        </div>
      </div>
      <div class="weatherHeader">
        <div class="location">
          <h2>{{ this.location }}</h2>
          <p class="subhead">Weather Forecast</p>
        </div>
        <div class="icon">
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
        <div class="weatherCurrentTemp">
          <span v-if="unit=='f'" class="currentTemp">{{ this.currentTempF }} <sup>F&deg;</sup> <p class="summary">{{ this.summary }}</p> </span>
          <span v-else class="currentTemp">{{ this.currentTempC }} <sup>C&deg;</sup> <p class="summary">{{ this.summary }}</p> </span>
        </div>
      </div>
      <div class="forecast">
        <div class="forecastDay" v-for="(day, index) in forecast" :key="`day-${index}`"  v-if="index < days">
          <div v-if="index === 0" class="dayName">
            <span class="fullDay ts">Today</span>
            <span class="shortDay ts">Today</span>
          </div>
          <div v-else class="dayName">
            <span class="fullDay ts">{{ moment(day.time).add(index, 'd').format('dddd') }}</span>
            <span class="shortDay ts">{{ moment(day.time).add(index, 'd').format('dd') }}</span>
          </div>
          <div class="dayIcon ts">
            <img v-if="day.icon == 'clear-day'" src="../../../assets/img/weatherIcons/clear-day.png" />
            <img v-if="day.icon == 'clear-night'" src="../../../assets/img/weatherIcons/clear-night.png" />
            <img v-if="day.icon == 'rain'" src="../../../assets/img/weatherIcons/rain.png" />
            <img v-if="day.icon == 'snow'" src="../../../assets/img/weatherIcons/snow.png" />
            <img v-if="day.icon == 'sleet'" src="../../../assets/img/weatherIcons/sleet.png" />
            <img v-if="day.icon == 'wind'" src="../../../assets/img/weatherIcons/wind.png" />
            <img v-if="day.icon == 'fog'" src="../../../assets/img/weatherIcons/fog.png" />
            <img v-if="day.icon == 'cloudy'" src="../../../assets/img/weatherIcons/cloudy.png" />
            <img v-if="day.icon == 'partly-cloudy-day'" src="../../../assets/img/weatherIcons/partly-cloudy-day.png" />
            <img v-if="day.icon == 'partly-cloudy-night'" src="../../../assets/img/weatherIcons/partly-cloudy-night.png" />
          </div>
          <div class="dayTemps" v-if="unit == 'f'">
            <span class="dayHigh ts">
              {{ day.temperatureHigh.toFixed(0) }}
            </span> / 
            <span class="dayLow ts">
              {{ day.temperatureLow.toFixed(0) }}
            </span>
          </div>
          <div class="dayTemps" v-else>
            <span class="dayHigh ts">
              {{ ((day.temperatureHigh - 32) * (5 / 9)).toFixed(0) }}
            </span> / 
            <span class="dayLow ts">
              {{ ((day.temperatureLow - 32) * (5 / 9)).toFixed(0) }}
            </span>
          </div>
            
        </div>
      </div>

      </div>
      <div class="superClear"></div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import axios from 'axios'
export default {
  props: ['weather', 'theId'],
  data () {
    return {
      loading: true,
      edit: false,
      location: '',
      lat: '',
      long: '',
      summary: '',
      currentIcon: '',
      info: '',
      currentTempC: '',
      currentTempF: '',
      todayHigh: '',
      todayLow: '',
      todayHighC: '',
      todayLowC: '',
      showDays: '',
      unit: 'c',
      days: '1',
      forecast: ''
    }
  },
  mounted () {
    console.log(this.loading)
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
      this.summary = response.data.currently.summary
      this.todayHigh = response.data.daily.data[0].temperatureHigh.toFixed(0)
      var todayHighCel = ((this.todayHigh - 32) * (5 / 9))
      this.todayHighC = todayHighCel.toFixed(0)
      this.todayLow = response.data.daily.data[0].temperatureLow.toFixed(0)
      var todayLowCel = ((this.todayLow - 32) * (5 / 9))
      this.todayLowC = todayLowCel.toFixed(0)
      this.currentIcon = response.data.currently.icon
      this.forecast = response.data.daily.data
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
    },
    moment: function () {
      return moment()
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
<style lang="scss" scoped>
  // .weatherHeader {
  // }
  // .weatherHeader .location {
  //   width: 100%;
  // }
  // .weatherHeader .location p.subhead {
  //   font-size: 1.1rem;
  //   margin-bottom: 0px;
  // }

  // .weatherHeader .icon {
  //   width: 45%;
  //   float: left;
  // }
  // .weatherHeader .icon  img {
  //   width: 100%;
  // }
  // .weatherHeader .weatherCurrentTemp {
  //   width: 50%;
  //   float: right;
  //   top: -7px;
  //   position: relative;
  // }
  // .weatherHeader .weatherCurrentTemp .currentTemp {
  //   font-size: 4vw;
  // }
  // .weatherHeader .weatherCurrentTemp .currentTemp sup {
  //   font-size: 2vw;
  //   position: relative;
  //   top: -25px;
  //   left: -8px;
  // }

  // .weatherHeader .weatherCurrentTemp .currentTemp .summary {
  //   font-size: 1vw;
  //   margin: 0px;
  //   position: relative;
  //   top: -17px;
  //   left: -12px;
  // }

  // .forecast .forecastDay {
  //   display: inline-block;
  //   width: 100%;
  // }

  // .forecast .forecastDay .dayName {
  //   width: 40%;
  //   float: left;
  //   text-align: left;
  //   padding-top: 8px;
  //   font-size: 1.12vw;
  // }
  // .forecast .forecastDay .dayName .fullDay {
  //   display: block;
  // }
  // .forecast .forecastDay .dayName .shortDay {
  //   display: none;
  // }
  // .forecast .forecastDay .dayIcon {
  //   width: 30%;
  //   float: left;
  // }
  // .forecast .forecastDay .dayTemps {
  //   width: 30%;
  //   float: left;
  //   padding-top: 8px;
  // }
  // .forecast .forecastDay .dayTemps .dayHigh {
  //   font-size: 1.2vw;
  // }
  // .forecast .forecastDay .dayTemps .dayLow {
  //   font-size: 1.2vw;
  // }


  // .forecast .forecastDay .dayIcon img {
  //   max-width: 40px;
  // }





  

  // .centerBlock .weatherHeader {
    
  // }
  // .centerBlock .weatherHeader .location {
  //   width: 33%;
  //   float: left;
  //   margin-top: 18px;
  // }
  // .centerBlock .weatherHeader .icon {
  //   width: 33%;
  //   float: left;
  // }
  // .centerBlock .weatherHeader .icon img {
  //   width: 50%;
  // }
  // .centerBlock .weatherHeader .weatherCurrentTemp {
  //   width: 33%;
  //   float: left;
  // }
  // .centerBlock .weatherHeader .location p.subhead {
  //   font-size: 1.1rem;
  //   margin-bottom: 0px;
  // }

  // .centerBlock .forecast {
  //   display: inline-block;
  //   margin-left: 10px;
  // }

  // .centerBlock .forecast .forecastDay {
  //   display: inline-block;
  //   width: 12%;
  //   float: left;
  // }

  // .centerBlock .forecast .forecastDay .dayName {
  //   width: 100%;
  //   float: left;
  //   padding-top: 8px;
  //   font-size: 1.12vw;
  // }
  // .centerBlock .forecast .forecastDay .dayName .fullDay {
  //   display: none;
  // }
  // .centerBlock .forecast .forecastDay .dayName .shortDay {
  //   display: block;
  //   text-align: center;
  // }
  // .centerBlock .forecast .forecastDay .dayIcon {
  //   width: 100%;
  // }
  // .centerBlock .forecast .forecastDay .dayTemps {
  //   width: 100%;
  //   padding-top: 8px;
  // }
  // .centerBlock .forecast .forecastDay .dayTemps .dayHigh {
  //   font-size: 1.2vw;
  // }
  // .centerBlock .forecast .forecastDay .dayTemps .dayLow {
  //   font-size: 1.2vw;
  // }


  // .centerBlock .forecast .forecastDay .dayIcon img {
  //   max-width: 40px;
  // }

  // .footerBlock .weatherHeader {
  //   width: 50%;
  //   float: left;
  // }
  // .footerBlock .weatherHeader .location {
  //   width: 33%;
  //   float: left;
  //   margin-top: 18px;
  // }
  // .footerBlock .weatherHeader .icon {
  //   width: 33%;
  //   float: left;
  // }
  // .footerBlock .weatherHeader .icon img {
  //   width: 50%;
  // }
  // .footerBlock .weatherHeader .weatherCurrentTemp {
  //   width: 33%;
  //   float: left;
  // }
  // .footerBlock .weatherHeader .location p.subhead {
  //   font-size: 1.1rem;
  //   margin-bottom: 0px;
  // }

  // .footerBlock .forecast {
  //   width: 48%;
  //   float: right;
  //   display: inline-block;
  //   margin-left: 10px;
  // }

  // .footerBlock .forecast .forecastDay {
  //   display: inline-block;
  //   width: 12%;
  //   float: left;
  // }

  // .footerBlock .forecast .forecastDay .dayName {
  //   width: 100%;
  //   float: left;
  //   padding-top: 8px;
  //   font-size: 1.12vw;
  // }
  // .footerBlock .forecast .forecastDay .dayName .fullDay {
  //   display: none;
  // }
  // .footerBlock .forecast .forecastDay .dayName .shortDay {
  //   display: block;
  //   text-align: center;
  // }
  // .footerBlock .forecast .forecastDay .dayIcon {
  //   width: 100%;
  // }
  // .footerBlock .forecast .forecastDay .dayTemps {
  //   width: 100%;
  //   padding-top: 8px;
  // }
  // .footerBlock .forecast .forecastDay .dayTemps .dayHigh {
  //   font-size: 1.2vw;
  // }
  // .footerBlock .forecast .forecastDay .dayTemps .dayLow {
  //   font-size: 1.2vw;
  // }


  // .footerBlock .forecast .forecastDay .dayIcon img {
  //   max-width: 40px;
  // }


  // .weatherIcon {
  //   float: left;
  //   width: 40%;
  // }
  // .weatherIcon img {
  //   width: 100%;
  //   position: relative;
  // }
  // .currentTemp {
  //   font-size: 5vw
  // }
  // .currentTemp sup {
  //   font-size: 2rem;
  //   position: relative;
  //   top: -29px;
  //   left: -8px;
  // }
  // .weatherHighLow p {
  //   display: inline-block;
  //   font-size: 2rem;
  //   margin-bottom: 0px;
  // }
  // .weatherHigh img {
  //   width: 24px;
  // }
  // .weatherLow img {
  //   width: 24px;
  // }
  // .weatherDetails {
  //   display: block;
  // }
  // .weatherSuns {
  //   width: 33%;
  //   float: left;
  // }
  // .weatherHighLow {
  //   width: 33%;
  //   float: left;
  // }
  // .weatherWinds {
  //   width: 33%;
  //   float: left;
  // }
  // .sunRiseTime {
  //   margin-bottom: 10px;
  //   display: block;
  //   margin-top: 4px;
  // }
  // .windSpeed {
  //   font-size: 16px;
  //   margin-top: 4px;
  //   display: block;
  //   margin-bottom: 16px;
  // }
  // .superClear {
  //   clear: both;
  // }

  // .centerBlock .weatherIconTemp {
  //     width: 40%;
  //     float: left;
  // }
  // .centerBlock .weatherDetails {
  //   width: 60%;
  //   margin-top: 10px;
  //   float: right;
  // }


  #pleasingLayout {
    .weather {
      width: 100%;
      float: right;
      .subhead {
        display: none;
      }
      .today {
        float: right;
        .current {
          display: flex;
          float: right;
          .icon {
            float: left;
            padding-right: 10px;
            img {
              width: 66px;
            }
          }
          .temp{
            font-size: 3.1rem;
            float: right;
            p {
              margin: 0px;
            }
            sup {
              font-size: 50%;
              top: -1.1rem;
            }
          }
        }
        .location {
          float: left;
          font-size: 1rem;
          padding-right: 10px;
          p {
            margin-bottom: 0px;
            &.body-2 {
              font-size: 1.7rem!important;
            }
          }
        }
      }
      
    }
    .forecast {
      display: block;
      float: right;
      max-width: 100%;
      .forecastDay {
        float: left;
        width: 50px;
        text-align: center;
        .fullDay {
          display: none;
        }
        .dayIcon {
          img {
            width: 38px;
          }
        }
        .dayTemps {
          font-size: 1rem;
        }
      }

    }
    .weatherHeader {
      display: none;
    }
  }
</style>
