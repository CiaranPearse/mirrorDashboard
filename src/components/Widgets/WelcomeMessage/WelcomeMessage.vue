<template>
  <div v-if="loading">
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
  <div v-else>
    <div v-if="edit">
      <v-dialog v-model="edit" persistent max-width="400">
        <v-card>
          <v-card-title class="headline">Configure Message</v-card-title>
          <v-card-text>
              <v-text-field
                v-model="editedMessageTitle"
                label="Title"
                required
              ></v-text-field>
              <v-text-field
                v-model="editedMessageSubtitle"
                label="Subtitle"
              ></v-text-field>
          </v-card-text>
          <v-card-actions>
            
            <v-spacer></v-spacer>
            <v-btn color="red darken-1" flat @click="edit = false">Close</v-btn>

            <v-btn color="green darken-1" flat @click="onChangeMessage">Update Message</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
    <div v-else @click="edit = true" class="hoverCursor">
      <h1 v-if="messageTitle">{{ messageTitle }}</h1>
      <h1 v-else>Placeholder Title</h1>
      <p v-if="messageSubtitle">{{ messageSubtitle }}</p>
      <p v-else>Placeholder Subtitle</p>
    </div>
  </div>
</template>

<script>
import { OrbitSpinner } from 'epic-spinners'
export default {
  props: ['message', 'theId'],
  data () {
    return {
      loading: true,
      edit: false,
      messageTitle: 'Placeholder Title',
      messageSubtitle: 'Placeholder Subtitle',
      editedMessageTitle: 'Placeholder Title',
      editedMessageSubtitle: 'Placeholder Subtitle'

    }
  },
  components: {
    OrbitSpinner
  },
  methods: {
    onClickEdit () {
      this.edit = true
    },
    onCloseEdit () {
      this.edit = false
    },
    onChangeMessage (payload) {
      this.$store.dispatch('updateWidgetData', {
        id: this.theId,
        welcomeMessage: this.consolidated
      })
      this.messageTitle = this.editedMessageTitle
      this.messageSubtitle = this.editedMessageSubtitle
      this.edit = false
    }
  },
  mounted () {
    this.loading = false
    this.messageTitle = this.message.welcomeMessageTitle
    this.messageSubtitle = this.message.welcomeMessageSubtitle
    this.editedMessageTitle = this.message.welcomeMessageTitle
    this.editedMessageSubtitle = this.message.welcomeMessageSubtitle
  },
  watch: {
    message: function (newVal, oldVal) {
      console.log('Prop changed: ', newVal, ' | was: ', oldVal)
      this.messageTitle = this.message.welcomeMessageTitle
      this.messageSubtitle = this.message.welcomeMessageSubtitle
    }
  },
  computed: {
    formIsValid () {
      return this.messageTitle !== ''
    },
    consolidated () {
      return {
        welcomeMessageTitle: this.editedMessageTitle,
        welcomeMessageSubtitle: this.editedMessageSubtitle
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
