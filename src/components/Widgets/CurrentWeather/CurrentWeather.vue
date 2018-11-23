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
  			<v-select
  			  item-text="name"
  			  item-value="nameICO"
  			  v-model="defaultSelected"
  			  :items="languages"
  			></v-select>
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
        <strong>Sunrise {{ this.sunRise }}/ Sunset {{ this.sunSet }}</strong><br />
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
      language: '',
      currentIcon: '',
      info: '',
      sunRise: '',
      sunSet: '',
      currentTempC: '',
      currentTempF: '',
      todayHigh: '',
      todayLow: '',
      currentWind: '',
      currentWindDirection: '',
      unit: 'c',
      defaultSelected: {
        name: 'English',
        nameICO: 'en'
      },
      languages: [
        {
          nameICO: 'ar',
          name: 'Arabic'
        },
        {
          nameICO: 'az',
          name: 'Azerbaijani'
        },
        {
          nameICO: 'be',
          name: 'Belarusian'
        },
        {
          nameICO: 'bg',
          name: 'Bulgarian'
        },
        {
          nameICO: 'bs',
          name: 'Bosnian'
        },
        {
          nameICO: 'ca',
          name: 'Catalan'
        },
        {
          nameICO: 'cs',
          name: 'Czech'
        },
        {
          nameICO: 'da',
          name: 'Danish'
        },
        {
          nameICO: 'de',
          name: 'German'
        },
        {
          nameICO: 'el',
          name: 'Greek'
        },
        {
          nameICO: 'en',
          name: 'English'
        },
        {
          nameICO: 'es',
          name: 'Spanish'
        },
        {
          nameICO: 'et',
          name: 'Estonian'
        },
        {
          nameICO: 'fi',
          name: 'Finnish'
        },
        {
          nameICO: 'fr',
          name: 'French'
        },
        {
          nameICO: 'he',
          name: 'Hebrew'
        },
        {
          nameICO: 'hr',
          name: 'Croatian'
        },
        {
          nameICO: 'hu',
          name: 'Hungarian'
        },
        {
          nameICO: 'id',
          name: 'Indonesian'
        },
        {
          nameICO: 'is',
          name: 'Icelandic'
        },
        {
          nameICO: 'it',
          name: 'Italian'
        },
        {
          nameICO: 'ja',
          name: 'Japanese'
        },
        {
          nameICO: 'ka',
          name: 'Georgian'
        },
        {
          nameICO: 'ko',
          name: 'Korean'
        },
        {
          nameICO: 'kw',
          name: 'Cornish'
        },
        {
          nameICO: 'lv',
          name: 'Latvian'
        },
        {
          nameICO: 'nb',
          name: 'Norwegian Bokmål'
        },
        {
          nameICO: 'nl',
          name: 'Dutch'
        },
        {
          nameICO: 'no',
          name: 'Norwegian Bokmål'
        },
        {
          nameICO: 'pl',
          name: 'Polish'
        },
        {
          nameICO: 'pt',
          name: 'Portuguese'
        },
        {
          nameICO: 'ro',
          name: 'Romanian'
        },
        {
          nameICO: 'ru',
          name: 'Russian'
        },
        {
          nameICO: 'sk',
          name: 'Slovak'
        },
        {
          nameICO: 'sl',
          name: 'Slovenian'
        },
        {
          nameICO: 'sr',
          name: 'Serbian'
        },
        {
          nameICO: 'sv',
          name: 'Swedish'
        },
        {
          nameICO: 'tet',
          name: 'Tetum'
        },
        {
          nameICO: 'tr',
          name: 'Turkish'
        },
        {
          nameICO: 'uk',
          name: 'Ukrainian'
        },
        {
          nameICO: 'x-pig-latin',
          name: 'Igpay Atinlay'
        },
        {
          nameICO: 'zh',
          name: 'simplified Chinese'
        },
        {
          nameICO: 'zh-tw',
          name: 'traditional Chinese'
        }
      ]
    }
  },
  mounted () {
    this.loading = false
    this.location = this.weather.location
    this.lat = this.weather.latitude
    this.long = this.weather.longitude
    this.language = this.weather.language
    this.unit = this.weather.unit
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
      this.language = this.weather.language
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
        language: this.language,
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
