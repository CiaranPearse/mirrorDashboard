<template>
  <div v-if="loading">
    <div id="peopleInSpace">
      <strong>Loading</strong>  
    </div>
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
