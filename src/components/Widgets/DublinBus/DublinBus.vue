<template>
  <div>
    <div v-if="loading">
      <v-progress-circular
      indeterminate
      color="white"
    ></v-progress-circular><br />
    Loading Dublin Bus
    </div>
    <div v-else>
      <v-btn v-if="edit === false"
        dark
        fab
        small
        @click="onClickEdit"
        color="gray"
      >
        <v-icon>edit</v-icon>
      </v-btn>
      <h1>This is Dublin Bus {{ stop1 }}</h1>
        <div v-if="edit === false">
          <div v-for="time in times">
            {{ time.route }} -- {{ time.destination }} -- {{ time.duetime }} min
          </div>
          
        </div>
        <div v-else>
          <h4>Enter Stop ID</h4>
          <form @submit.prevent="onChangeBusStop">
            <v-text-field
          v-model="stop1"
          label="Stop 1"
          required
        ></v-text-field>
        <v-btn color="red" @click="onCloseEdit" type="submit">Close</v-btn>
        <v-btn color="green" :disabled="!formIsValid" type="submit">Update Stop</v-btn>
        </form>
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
      edit: false,
      stop1: '2383',
      stop2: '2222',
      stopFinder: null,
      randomNumber: 3,
      loading: true,
      timer: '',
      times: [],
      errors: []
    }
  },
  mounted () {
    this.$options.interval = setInterval(this.changedNumber, 10000)
    this.stop1 = this.dublinBus.stop1
    const CORS_PROXY = 'https://cors-anywhere.herokuapp.com/'
    const currentBusStop = this.dublinBus.stop1
    axios.get(CORS_PROXY + `https://data.dublinked.ie/cgi-bin/rtpi/realtimebusinformation?stopid=` + currentBusStop, {
      headers: {
        'crossDomain': true,
        'Access-Control-Allow-Origin': '*'
      }
    })
    .then(response => {
      this.times = response.data.results
      this.loading = false
    })
    .catch(e => {
      this.errors.push(e)
    })
  },
  beforeDestroy () {
    clearInterval(this.$options.interval)
  },
  methods: {
    onClickEdit () {
      this.edit = true
    },
    onCloseEdit () {
      this.edit = false
      this.stop1 = this.dublinBus.stop1
    },
    onChangeBusStop (payload) {
      this.$emit('updateDublinBus', this.consolidated)
      this.edit = false
    }
  },
  computed: {
    formIsValid () {
      return this.stop1 !== ''
    },
    consolidated () {
      return {
        stop1: this.stop1,
        stop2: this.stop2
      }
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
