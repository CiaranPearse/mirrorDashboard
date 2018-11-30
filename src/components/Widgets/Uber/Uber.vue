<template>
  <div v-if="loading == 'true'">
    <div id="uberRealWaitTime">
      <strong>Loading</strong>  
    </div>
  </div>

  <div v-else>
    <strong>Uber Live Wait Times</strong> 
    <div v-if="editUber == true">
      <form @submit.prevent="onChangeUber">
        <v-text-field
          v-model="lat"
          label="Latitude"
        ></v-text-field>
        <v-text-field
          v-model="long"
          label="Longitude"
        ></v-text-field>

        <v-btn color="red" @click="onCloseUber">Close</v-btn>
        <v-btn color="green" :disabled="!formIsValid" type="submit">Update</v-btn>
      </form>
    </div>
    <div v-else @click="onClickEdit" class="hoverCursor">
      <div v-for="cars in rides">
        <strong>{{ cars.display_name}}</strong> - {{ cars.estimate / 60}} minutes
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  props: ['uber', 'dashInfo'],
  data () {
    return {
      loading: true,
      editUber: false,
      test: 'This is test text',
      lat: '',
      long: '',
      rides: ''
    }
  },
  // Fetches posts when the component is created.
  created () {
    console.log('created Uber')
    this.lat = this.dashInfo.latitude
    this.long = this.dashInfo.longitude
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
    onClickEdit () {
      this.editUber = true
    },
    onCloseUber () {
      console.log('clicked close edit')
      this.editUber = false
    },
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
