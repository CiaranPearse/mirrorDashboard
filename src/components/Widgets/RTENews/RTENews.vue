<template>
  <div>
  <div id="rte-news">
    <strong>RTE News</strong>
    <ul v-if="posts && topItems.length">
      <li v-for="post of topItems">
        <p>{{ post.pubDate[0] | moment("HH:mm") }}: {{post.title[0]}}</p>
      </li>
    </ul>
  </div>
  <div>
    <ul v-if="errors && errors.length">
      <li v-for="error of errors">
        {{error.message}}
      </li>
    </ul>
  </div>
</div>
</template>

<script>
import axios from 'axios'
var parseString = require('xml2js').parseString
export default {
  data () {
    return {
      posts: [],
      errors: [],
      showHowMany: 5
    }
  },
  // Fetches posts when the component is created.
  created () {
    axios.get('https://www.rte.ie/news/rss/news-headlines.xml')
    .then(response => {
      var self = this
      parseString(response.data, function (err, result) {
        self.posts = result.rss.channel[0].item
        console.log(err)
      })
    })
    .catch(e => {
      this.errors.push(e)
    })

    // async / await version (created() becomes async created())
    //
    // try {
    //   const response = await axios.get(`http://jsonplaceholder.typicode.com/posts`)
    //   this.posts = response.data
    // } catch (e) {
    //   this.errors.push(e)
    // }
  },
  computed: {
    topItems () {
      return this.posts.slice(0, this.showHowMany)
    }
  }
}
</script>

<style>
#rte-news{
  margin-top: -10px;
  font-family: 'Roboto', sans-serif;
  font-weight: 100;
  color: #ffffff;
  text-align: center;
}

#rte-news ul{
  list-style: none;
  text-align: left;
  padding-left: 0px;
}

</style>
