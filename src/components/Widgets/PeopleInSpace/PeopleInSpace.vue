<template>
  <div v-if="loading">
    <div id="peopleInSpace">
      <strong>Loading</strong>  
    </div>
  </div>

  <div v-else>
    <strong>People in space</strong> 
    <div>
      <div v-for="person in people">
        <strong>{{ person.name}}</strong> - {{ person.craft }}
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data () {
    return {
      loading: false,
      people: ''
    }
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
#uberRealWaitTime{
  border: 1px solid red;
}


</style>
