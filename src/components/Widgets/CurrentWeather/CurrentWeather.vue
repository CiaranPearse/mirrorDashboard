<template>
	<div v-if="loading">
		<v-progress-circular
	      indeterminate
	      color="white"
	      ></v-progress-circular>
	      <p>Loading Weather</p>
	</div>
	<div v-else>
		<div v-if="edit">
			<p>Editing</p>
			<v-select
			  item-text="name"
			  item-value="nameICO"
			  v-model="defaultSelected"
			  :items="languages"
			></v-select>
		</div>
		<div v-else>
		  <p><strong> {{ this.city }}</strong></p>
		  <strong>Long:</strong> {{ this.long }}<br />
	  	<strong>Lat:</strong> {{ this.lat }}<br />
	  	<strong>Lang:</strong> {{ this.language }}<br />
	  	<strong>Icon:</strong> {{ this.currentIcon }}<br />
	  	<strong>Current Temp: </strong> {{ this.currentTempF }} F&deg;<br />
	  	<strong>Current Temp: </strong> {{ this.currentTempC }} C&deg;<br />
    </div>
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
      currentIcon: '',
      info: '',
      currentTempC: '',
      currentTempF: '',
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
          name: 'English (which is the default)'
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
          name: 'Norwegian Bokmål (alias for nb)'
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
    this.lat = this.weather.latitude
    this.long = this.weather.longitude
    this.language = this.weather.language
    this.unit = this.weather.unit
    var queryString = this.weather.longitude + ',' + this.weather.latitude
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
      this.currentTempF = currentTemp
      var currentTempC = ((currentTemp - 32) * (5 / 9))
      this.currentTempC = currentTempC.toFixed(1)
      this.city = response.data.timezone
      this.currentIcon = response.data.currently.icon
    })
    this.loading = false
  },
  watch: {
    weather: function (newVal, oldVal) {
      console.log('Prop changed: ', newVal, ' | was: ', oldVal)
      this.lat = this.weather.latitude
      this.long = this.weather.longitude
      this.language = this.weather.language
      this.unit = this.weather.unit
    }
  }
}
</script>
<style>
</style>
