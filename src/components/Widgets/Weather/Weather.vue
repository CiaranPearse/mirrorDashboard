<template>
<!-- LOAD THE WEATHER -->
    <div v-if="loading">
      Loading Weather
    </div>
<!-- END LOADING THE WEATHER -->
    <div v-else>
<!-- EDIT THE WEATHER DETAILS -->
<div>
      <div v-if="editWeather">
        <form @submit.prevent="onChangeWeather">
         <p>THis is the edit</p>
          <v-btn color="red" @click="onCloseEdit">Close</v-btn>
          <v-btn color="green" :disabled="!formIsValid" type="submit">Add Message</v-btn>
        </form>
      </div>
<!-- END EDIT THE DETAILS -->

<!-- SHOW THE WEATHER -->
      <div v-else @click="onClickEdit">
        <weather 
            api-key="3469e148ee58b9591f84c3244bad3199"
            title="Weather"
            :latitude=this.lat
            :longitude=this.long
            :updateInterval=this.updateInterval
            :hideHeader=this.hideHeader
            :language=this.language
            bar-color="#fff"
            text-color="#fff"
            hide-header=true
            update-interval=10000
            :units=this.unit>
        </weather>
      </div>
    </div>
<!-- END SHOW THE WEATHER -->
    </div>
</template>
 
<script>
import VueWeatherWidget from 'vue-weather-widget'
import 'vue-weather-widget/dist/css/vue-weather-widget.css'

export default {
  props: ['weather'],
  components: {
    'Weather': VueWeatherWidget
  },
  data: () => ({
    loading: false,
    editWeather: false,
    lat: '53.350140',
    long: '-6.266155',
    language: 'en',
    unit: 'uk',
    hideHeader: true,
    updateInterval: 1000
  }),
  methods: {
    onClickEdit () {
      this.editWeather = true
    },
    onCloseEdit () {
      this.editWeather = false
    },
    onChangeWeather (payload) {
      console.log('Update weather')
      console.log(this.consolidated)
      // this.$emit('updateWeather', this.consolidated)
      this.edit = false
    }
  },
  mounted () {
    this.loading = false
    this.lat = this.weather.latitude
    this.long = this.weather.longitude
    this.language = this.weather.language
    this.unit = this.weather.unit
  },
  watch: {
    weather: function (newVal, oldVal) {
      console.log('Prop changed: ', newVal, ' | was: ', oldVal)
      this.lat = this.weather.latitude
      this.long = this.weather.longitude
      this.language = this.weather.language
      this.unit = this.weeather.unit
    }
  },
  computed: {
    formIsValid () {
      return this.latitude !== '' && this.longitude !== '' && this.language !== '' && this.unit !== ''
    },
    consolidated () {
      return {
        latitude: this.lat,
        longitude: this.long,
        language: this.language,
        unit: this.unit
      }
    }
  }
}
</script> 

<style>
.fe_forecast {
  font-family: 'Roboto', sans-serif;
  font-weight: 100;
}
.fe_title {
  display: none !important;
}
.fe_container .fe_forecast {
}
.fe_container{
  height: 100% !important;
}
.fe_container .fe_currently {
  color: white;
  width: 28%;
}
.fe_temp {
  font-weight: 100 !important;
}
.fe_day {
  display: none !important;
}
.fe_day:nth-child(-n+2) {
  display: block !important;
}
.fe_temp_bar {
  height: 0px !important;
}
.fe_dir{
  display: none !important;
}
.fe_alert {
  position: relative;
  top: -200px;
  width: 206px;
  background: red;
  color: hite;
}
.fe_alert a {
  color: white;
  text-decoration: none;
}
#fe_current_icon{
  position: relative;
  top: -20px;
}
.fe_container .fe_daily {
  width: 0px !important;
  margin-left: 16px;
  margin-top: 10px;
}
.fe_container .fe_daily .fe_day .fe_temp_bar {
  font-size: 18px !important;
}
.fe_container .fe_daily .fe_day .fe_low_temp {
    position: absolute;
    width: 100%;
    bottom: 12px;
    left: 16px;
}
.fe_container .fe_daily .fe_day .fe_high_temp {
    position: absolute;
    width: 100%;
    top: -38px;
    left: -16px;
}
</style>
