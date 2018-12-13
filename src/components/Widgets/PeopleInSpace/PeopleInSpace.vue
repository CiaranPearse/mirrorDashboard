<template>
  <div v-if="loading">
    <v-layout row>
        <v-flex xs12 class="text-xs-center" align-self-center>
          <peopleinspace-orbit-spinner
            :animation-duration="1200"
            :size="55"
            color="#ffffff"
          />
        </v-flex>
      </v-layout>
  </div>

  <div v-else>
    <div id="peopleInSpace">
    <p class="title">There are {{ this.people.length }} people in space</p> 
      <table>
        <tr v-for="person in people">
          <td><p class="text-sm-left body-2">{{ person.name}}</p></td>
          <td><p class="text-sm-right body-1 pl-3">{{ person.craft }}</p></td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { PeopleinspaceOrbitSpinner } from 'epic-spinners'
export default {
  data () {
    return {
      loading: true,
      people: ''
    }
  },
  components: {
    PeopleinspaceOrbitSpinner
  },
  mounted () {
    axios.get('http://api.open-notify.org/astros.json', {
    })
    .then(response => {
      console.log(response.data)
      this.people = response.data.people
    })
    this.loading = false
  }
}
</script>

<style>
#peopleInSpace{
  border: 1px solid red;
}

.centerBlock #peopleInSpace table{
      margin: 0 auto;
}

.footerBlock #peopleInSpace table{
      margin: 0 auto;
}

.rightBlock #peopleInSpace{
   text-align: right;
}
.rightBlock #peopleInSpace table{
   margin-right: 0px;
    margin-left: auto;
}


</style>
