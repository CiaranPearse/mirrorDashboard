<template>
  <div>
    <div v-if="loading">
      <v-flex xs12 class="text-xs-center" align-self-center>
          <dublinbus-orbit-spinner
            :animation-duration="1200"
            :size="55"
            color="#ffffff"
          />
        </v-flex>
      </v-layout>
    </div>
    <div v-else>
      <div v-if="error === true">
        <p class="body-2">Dublin Bus</p>
        <p class="body-2">[ERROR]</p>
        <p>{{ errorMessage }}</p>
      </div>
      <div v-else>
      <p>This is Dublin Bus {{ stop1 }}</p>
        <div v-if="edit">
          <h4>Enter Stop ID</h4>
          <form @submit.prevent="onChangeBusStop">
            <v-text-field
              v-model="stop1"
              label="Stop 1"
              required
            ></v-text-field>
            <v-btn color="red" @click="onCloseEdit">Close</v-btn>
            <v-btn color="green" :disabled="!formIsValid" type="submit">Update Stop</v-btn>
          </form>
          
        </div>
        <div v-else @click="onClickEdit" class="hoverCursor">
          <div v-if="error">
            <p>There was an error with Dublin Bus</p>
          </div>
          <div v-else v-for="time in times">
            {{ time.route }} -- {{ time.destination }} -- {{ time.duetime }} min
          </div>
        </div>
        </div>
      </div>
    </div>

</template>

<script>
import axios from 'axios'
import { DublinbusOrbitSpinner } from 'epic-spinners'
export default {
  props: ['dublinBus'],
  data () {
    return {
      error: false,
      edit: false,
      stop1: '2383',
      stop2: '2222',
      stopFinder: null,
      randomNumber: 3,
      loading: true,
      timer: '',
      times: [],
      errors: [],
      errorMessage: 'Something went wrong. We\'re looking into it'
    }
  },
  components: {
    DublinbusOrbitSpinner
  },
  mounted () {
    this.$options.interval = setInterval(this.changedNumber, 10000)
    if (this.dublinBus.stop1) {
      console.log('has peops value')
      this.stop1 = this.dublinBus.stop1
    } else {
      console.log('doesnt have value')
    }
    const CORS_PROXY = 'https://cors-anywhere.herokuapp.com/'
    const currentBusStop = this.stop1
    axios.get(CORS_PROXY + `https://data.dublinked.ie/cgi-bin/rtpi/realtimebusinformation?stopid=` + currentBusStop, {
      headers: {
        'crossDomain': true,
        'Access-Control-Allow-Origin': '*'
      }
    })
    .then(response => {
      this.times = response.data.results
      this.loading = false
      this.error = false
    })
    .catch(e => {
      console.log('theres an error: ', e)
      this.loading = false
      this.error = true
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
