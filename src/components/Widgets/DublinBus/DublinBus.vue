<template>
  <div>
    <h1>This is Dublin Bus {{ dublinBus.stop1 }}</h1>
      <div v-if="stopId">
        <div v-for="time in times">
          {{ time.route }} -- {{ time.destination }} -- {{ time.duetime }}
        </div>
        
      </div>
      <div v-else>
        <h4>Enter Stop ID</h4>
      </div>
      
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  props: ['dublinBus'],
  data () {
    return {
      stop1: 2383,
      stopFinder: null,
      randomNumber: 3,
      timer: '',
      times: [],
      errors: []
    }
  },
  created () {
    const CORS_PROXY = 'https://cors-anywhere.herokuapp.com/'
    axios.get(CORS_PROXY + `https://data.dublinked.ie/cgi-bin/rtpi/realtimebusinformation?stopid=` + this.stop1, {
      headers: {
        'crossDomain': true,
        'Access-Control-Allow-Origin': '*'
      }
    })
    .then(response => {
      this.times = response.data.results
    })
    .catch(e => {
      this.errors.push(e)
    })
  },
  mounted () {
    this.$options.interval = setInterval(this.changedNumber, 10000)
    console.log(this.dublinBus.stop1)
    this.stop1 = this.dublinBus.stop1
  },
  beforeDestroy () {
    clearInterval(this.$options.interval)
  },
  methods: {
    changedBusStop (payload) {
      this.$emit('updateMessage', this.stopId)
    }
  }
}
</script>

<style>
.quotes{
  margin-top: -10px;
  font-family: 'Roboto', sans-serif;
  font-weight: 100;
  color: #ffffff;
  text-align: center;
}

.quote{
  font-size: 24px;
  margin: 0px;
}
.author{
  font-size: 16px;
  margin: 0px;
}
</style>
