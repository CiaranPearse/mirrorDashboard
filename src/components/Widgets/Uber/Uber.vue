<template>
  <div v-if="loading == 'true'">
    <div id="uberRealWaitTime">
      <v-layout row>
        <v-flex xs12 class="text-xs-center" align-self-center>
          <orbit-spinner
            :animation-duration="1200"
            :size="55"
            color="#ffffff"
          />
        </v-flex>
      </v-layout>
    </div>
  </div>

  <div v-else>

    <v-dialog v-model="editUber" persistent max-width="400">
      <v-card>
        <v-card-title class="headline">Configure Uber</v-card-title>
        <v-card-text>
          <h4>You can get your Longitude/Latitude <a href="https://www.latlong.net/" target="_blank">here</a></h4>
          <v-text-field
            v-model="lat"
            label="Latitude"
          ></v-text-field>
            <v-text-field
              v-model="long"
              label="Longitude"
            ></v-text-field>
      </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red darken-1" flat @click="editUber = false">Close</v-btn>
          <v-btn color="green darken-1" flat @click="onChangeUber">Update Uber</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <div @click="editUber = true" class="hoverCursor">
      <div v-for="cars in rides">
        <strong>{{ cars.display_name}}</strong> - {{ cars.estimate / 60}} minutes
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { OrbitSpinner } from 'epic-spinners'
export default {
  props: ['uber', 'dashInfo'],
  data () {
    return {
      loading: true,
      editUber: false,
      lat: '',
      long: '',
      rides: ''
    }
  },
  components: {
    OrbitSpinner
  },
  // Fetches posts when the component is created.
  created () {
    console.log('created Uber')
    this.lat = this.uber.latitude
    this.long = this.uber.longitude
  },
  mounted () {
    const CORS_PROXY = 'https://cors-anywhere.herokuapp.com/'
    axios.get(CORS_PROXY + 'https://api.uber.com/v1.2/estimates/time?start_latitude=37.7752315&start_longitude=-122.418075', {
      headers: {
        'crossDomain': true,
        'Access-Control-Allow-Origin': '*',
        'Authorization': 'Token XXxaR--cwsdmHryDd9lr8wqJqXDsY3RNr02W5ARi'
      }
    })
    .then(response => {
      console.log(response.data)
      this.rides = response.data.times
    })
    this.loading = false
  },
  methods: {
    onChangeUber (payload) {
      console.log('Consolidated: ', this.consolidated)
      this.$store.dispatch('updateWidgetData', {
        id: this.theId,
        uber: this.consolidated
      })
      this.editUber = false
    }
  },
  computed: {
    formIsValid () {
      return this.long !== '' && this.lat !== ''
    },
    consolidated () {
      return {
        latitude: this.lat,
        longitude: this.long
      }
    }
  }
}
</script>

<style>
#uberRealWaitTime{
  border: 1px solid red;
}


</style>
