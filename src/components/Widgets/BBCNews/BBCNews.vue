<template>
  <div>
  <div id="bbc-news">
    <p class="title">BBC News (UK)</p>
    <ul v-if="posts && topItems.length">
      <li v-for="post of topItems">
        <span class="body-2">{{ post.pubDate[0] | moment("HH:mm") }}:</span> <span class="body-1">{{post.title[0]}}</span></p>
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
      showHowMany: 3
    }
  },
  // Fetches posts when the component is created.
  created () {
    const CORS_PROXY = 'https://cors-anywhere.herokuapp.com/'
    axios.get(CORS_PROXY + `https://feeds.bbci.co.uk/news/rss.xml?edition=uk`, {
      headers: {
        'Access-Control-Allow-Origin': '*'
      }
    })
    .then(response => {
      var self = this
      parseString(response.data, function (err, result) {
        self.posts = result.rss.channel[0].item
        console.log(err)
      })
    })
    // .then(response => {
      // JSON responses are automatically parsed.
      // parseString(response.data, function (err, result) {
        // this.posts = response.data
      // })
    // })
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
#bbc-news{
  margin-top: -10px;
  font-family: 'Roboto', sans-serif;
  font-weight: 100;
  color: #ffffff;
  text-align: center;
}

#bbc-news ul{
  list-style: none;
  text-align: left;
  padding-left: 0px;
}

#bbc-news ul li {
  padding0bottom: 4px;
}

</style>
