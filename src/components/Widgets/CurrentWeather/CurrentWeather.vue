<template>
  <div v-if="currentTempC === ''" class="loadingShim">
    <weather-orbit-spinner
  :animation-duration="1200"
  :size="55"
  color="#ffffff"
/>
</div>
  <div v-else>
    



    <v-dialog v-model="edit" persistent max-width="400">
      <v-card>
        <v-card-title class="headline">Configure Weather</v-card-title>
        <v-card-text>
          <h4>You can get your Longitude/Latitude <a href="https://www.latlong.net/" target="_blank">here</a></h4>
          <form>
            <v-text-field
            v-model="editedLocation"
            label="location"
          ></v-text-field>
          <v-text-field
            v-model="editedLat"
            label="Latitude"
          ></v-text-field>
          <v-text-field
            v-model="editedLong"
            label="Longitude"
          ></v-text-field>
          <v-radio-group v-model="editedUnit" row>
             <v-radio label="C" value="c"></v-radio>
              <v-radio label="F" value="f"></v-radio>
          </v-radio-group>
          <v-radio-group v-model="editedDays" row>
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
              <cloudy v-if="currentIcon == 'cloudy'" class="icon-lead" />
              <clearday v-if="currentIcon == 'clear-day'" class="icon-lead" />
              <night v-if="currentIcon == 'clear-night'" class="icon-lead" />
              <rain v-if="currentIcon == 'rain'" class="icon-lead" />
              <snow v-if="currentIcon == 'snow'" class="icon-lead" />
              <sleet v-if="currentIcon == 'sleet'" class="icon-lead" />
              <wind v-if="currentIcon == 'wind'" class="icon-lead" />
              <fog v-if="currentIcon == 'fog'" class="icon-lead" />
              <partlycloudy v-if="currentIcon == 'partly-cloudy-day'" />
              <partlycloudy v-if="currentIcon == 'partly-cloudy-night'" />
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
          <cloudy v-if="currentIcon == 'cloudy'" class="icon-sub" />
          <clearday v-if="currentIcon == 'clear-day'" class="icon-sub" />
          <night v-if="currentIcon == 'clear-night'" class="icon-sub" />
          <rain v-if="currentIcon == 'rain'" class="icon-sub" />
          <snow v-if="currentIcon == 'snow'" class="icon-sub" />
          <sleet v-if="currentIcon == 'sleet'" class="icon-sub" />
          <wind v-if="currentIcon == 'wind'" class="icon-sub" />
          <fog v-if="currentIcon == 'fog'" class="icon-sub" />
          <partlycloudy v-if="currentIcon == 'partly-cloudy-day'" class="icon-sub" />
          <partlycloudy v-if="currentIcon == 'partly-cloudy-night'" class="icon-sub" />
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
            <cloudy v-if="day.icon == 'cloudy'" class="icon-sub" />
          <clearday v-if="day.icon == 'clear-day'" class="icon-sub" />
          <night v-if="day.icon == 'clear-night'" class="icon-sub" />
          <rain v-if="day.icon == 'rain'" class="icon-sub" />
          <snow v-if="day.icon == 'snow'" class="icon-sub" />
          <sleet v-if="day.icon == 'sleet'" class="icon-sub" />
          <wind v-if="day.icon == 'wind'" class="icon-sub" />
          <fog v-if="day.icon == 'fog'" class="icon-sub" />
          <partlycloudy v-if="day.icon == 'partly-cloudy-day'" class="icon-sub" />
          <partlycloudy v-if="day.icon == 'partly-cloudy-night'" class="icon-sub" />
          </div>
          <div class="dayTemps" v-if="unit == 'f'">
            <span class="dayHigh ts">
              {{ day.temperatureHigh.toFixed(0) }}
            </span>/
            <span class="dayLow ts">
              {{ day.temperatureLow.toFixed(0) }}
            </span>
          </div>
          <div class="dayTemps" v-else>
            <span class="dayHigh ts">{{ ((day.temperatureHigh - 32) * (5 / 9)).toFixed(0) }}</span>/
            <span class="dayLow ts">{{ ((day.temperatureLow - 32) * (5 / 9)).toFixed(0) }}</span>
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
import cloudy from 'vue-material-design-icons/WeatherCloudy.vue'
import clearday from 'vue-material-design-icons/WeatherSunny.vue'
import night from 'vue-material-design-icons/WeatherNight.vue'
import rain from 'vue-material-design-icons/WeatherRainy.vue'
import snow from 'vue-material-design-icons/WeatherSnowy.vue'
import sleet from 'vue-material-design-icons/WeatherHail.vue'
import wind from 'vue-material-design-icons/WeatherWindy.vue'
import fog from 'vue-material-design-icons/WeatherFog.vue'
import partlycloudy from 'vue-material-design-icons/WeatherPartlycloudy.vue'
import { WeatherOrbitSpinner } from 'epic-spinners'
export default {
  props: ['weather', 'theId'],
  data () {
    return {
      loading: true,
      edit: false,
      location: '',
      editedLocation: '',
      lat: '',
      editedLat: '',
      long: '',
      editedLong: '',
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
      editedUnit: '',
      days: '1',
      editedDays: '',
      forecast: ''
    }
  },
  components: {
    cloudy,
    clearday,
    night,
    rain,
    snow,
    sleet,
    wind,
    fog,
    partlycloudy,
    WeatherOrbitSpinner
  },
  mounted () {
    this.location = this.weather.location
    this.editedLocation = this.weather.location
    this.lat = this.weather.latitude
    this.editedLat = this.weather.latitude
    this.long = this.weather.longitude
    this.editedLong = this.weather.longitude
    this.unit = this.weather.unit
    this.editedUnit = this.weather.unit
    this.days = this.weather.days
    this.editedDays = this.weather.days
    this.getWeather()
  },
  methods: {
    onClickEdit () {
      this.edit = true
    },
    onCloseEdit () {
      this.edit = false
    },
    onChangeWeather (payload) {
      this.currentTempC = ''
      this.$store.dispatch('updateWidgetData', {
        id: this.theId,
        weather: this.consolidated
      })
      this.edit = false
      setTimeout(this.getWeather, 500)
    },
    moment: function () {
      return moment()
    },
    getWeather () {
      var queryString = this.lat + ',' + this.long
      const CORS_PROXY = 'https://cors-anywhere.herokuapp.com/'
      axios.get(CORS_PROXY + `https://api.darksky.net/forecast/3469e148ee58b9591f84c3244bad3199/` + queryString, {
        headers: {
          'crossDomain': true,
          'Access-Control-Allow-Origin': '*'
        }
      })
      .then(response => {
        queryString = ''
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
    }
  },
  watch: {
    weather: function (newVal, oldVal) {
      this.lat = this.weather.latitude
      this.long = this.weather.longitude
      this.location = this.weather.location
      this.city = this.weather.city
      this.days = this.weather.days
      this.unit = this.weather.unit
      if (newVal.latitude !== oldVal.latitude) {
        this.getWeather()
      }
      if (newVal.longitude !== oldVal.longitude) {
        this.getWeather()
      }
    }
  },
  computed: {
    formIsValid () {
      return this.long !== '' && this.lat !== ''
    },
    consolidated () {
      return {
        location: this.editedLocation,
        latitude: this.editedLat,
        longitude: this.editedLong,
        days: this.editedDays,
        unit: this.editedUnit
      }
    }
  }
}
</script>
<style lang="scss">
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


  .material-design-icon {
    height: 4em;
    width: 4em;
    .material-design-icon__svg {
      height: 4em;
      width: 4em;
    }
  }
  .material-design-icon.icon-sub{
    height: 2em;
    width: 2m;
    .material-design-icon__svg {
      height: 2em;
      width: 2em;
    }
  }


  #pleasingLayout {
    #leftBlock {
      .loadingShim {
        float: left;
      }
      .weather {
        float: left;
        .today {
          float: left;
          .current {
            float: left;
            .icon {
              float: right;
              padding-left: 10px;
            }
            .temp {
              float: left;
            }
          }
        }
        .location {
          float: right;
          padding-left: 10px;
          padding-top: 10px;
        }
      }
      .forecast {
        float: left;
        .forecastDay {
          float: right;
          @media screen and (max-width: 959px) {
            &:nth-of-type(n+4) {
              display: none;
            }
          }
        }
      }
      @media screen and (max-width: 959px) {
        .location {
          clear: both;
        }
      }
    }
    #rightBlock {
      .loadingShim {
        float: right;
      }
      .weather {
        float: right;
        .today {
          float: right;
          .current {
            float: right;
            .icon {
              float: left;
              padding-right: 10px;
            }
            .temp {
              float: right;
            }
          }
        }
        .location {
          float: left;
          padding-right: 10px;
          padding-top: 10px;
        }
      }
      .forecast {
        float: right;
        .forecastDay {
          float: left;
          @media screen and (max-width: 959px) {
            &:nth-of-type(n+4) {
              display: none;
            }
          }
        }
      }
      @media screen and (max-width: 959px) {
        .location {
          clear: both;
        }
      }
    }
    #footerBlock {
      .loadingShim {
        margin-left: 40%;
      }
      .weather {
        width: 50%;
        text-align: center;
        float: left;
        display: block;
        @media screen and (max-width: 959px) {
          width: 100%;
          text-align: center;
          margin: 0 auto;
        }
        .today {
          max-width: 50%;
          @media screen and (max-width: 959px) {
            width: 100%;
            padding: 0px;
            float: none;
          }
          .current {
            float: left;
            .icon {
              padding-right: 10px;
              @media screen and (max-width: 959px) {
                padding: 0px;
                float: left;
              }
            }
            @media screen and (max-width: 959px) {
              max-width: 100%;
              float: none;
              display: inline-block;
              .temp {
                float: left;
              }
            }
          }
          @media screen and (max-width: 959px) {
            width: 100%;
            text-align: center;
            margin: 0 auto;
          }
        }
        .location {
          float: left;
          padding-right: 10px;
          @media screen and (max-width: 959px) {
            padding: 0px;
            float: none;
          }
        }
      }
      .forecast {
        width: 50%;
        float: right;
        .forecastDay {
          float: right;
        }
        @media screen and (max-width: 959px) {
        display: none;
      }
      }
    }
    .weather {
      width: 100%;
      .subhead {
        display: none;
      }
      .today {
        .current {
          display: flex;
          .icon {
            img {
              width: 66px;
            }
          }
          .temp{
            font-size: 3.1rem;
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
          font-size: 1rem;
          p {
            margin-bottom: 0px;
            &.body-2 {
              font-weight: bold;
            }
          }
        }
      }
      
    }
    .forecast {
      display: block;
      max-width: 100%;
      .forecastDay {
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
