<template>
  <div>
    <h1>This is Dublin Bus</h1>
      <div v-if="stopId === null">
        <h4>Enter Stop ID</h4>
        
        
      </div>
      <div v-else>
        <div v-for="time in times">
          {{ time.route }} -- {{ time.destination }} -- {{ time.duetime }}
        </div>
      </div>
      
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data () {
    return {
      stopId: 2383,
      stopFinder: null,
      randomNumber: 3,
      timer: '',
      times: [],
      errors: []
    }
  },
  created () {
    const CORS_PROXY = 'https://cors-anywhere.herokuapp.com/'
    axios.get(CORS_PROXY + `https://data.dublinked.ie/cgi-bin/rtpi/realtimebusinformation?stopid=` + this.stopId, {
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
  },
  beforeDestroy () {
    clearInterval(this.$options.interval)
  },
  methods: {
    changedNumber () {
      var ticker = Math.floor(Math.random() * 10) + 1
      this.randomNumber = ticker
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
