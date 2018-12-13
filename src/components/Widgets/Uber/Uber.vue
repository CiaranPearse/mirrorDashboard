<template>
  <div v-if="rides.length === 0">
    <div id="uberRealWaitTime">
      <v-layout row>
        <v-flex xs12 class="text-xs-center">
          <uber-orbit-spinner
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
import { UberOrbitSpinner } from 'epic-spinners'
export default {
  props: ['uber', 'dashInfo'],
  data () {
    return {
      loadingUber: true,
      editUber: false,
      lat: '',
      long: '',
      rides: ''
    }
  },
  components: {
    UberOrbitSpinner
  },
  // Fetches posts when the component is created.
  created () {
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
      this.rides = response.data.times
    })
    this.loadingUber = false
  },
  methods: {
    onChangeUber (payload) {
      this.$store.dispatch('updateWidgetData', {
        id: this.theId,
        uber: this.consolidated
      })
      this.editUber = false
    }
  },
  watch: {
    uber: function (newVal, oldVal) {
      this.lat = this.uber.latitude
      this.long = this.uber.longitude
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

<style lang="scss">
.updateMsg {
  padding-top: 10px;
  font-weight: 600;
}
  #leftBlock {
    #uberRealWaitTime {
      .spinnerContainer {
        float: left;
      }
    }
  }
  #rightBlock {
    #uberRealWaitTime {
      .spinnerContainer {
        float: right;
      }
    }
  }


</style>
