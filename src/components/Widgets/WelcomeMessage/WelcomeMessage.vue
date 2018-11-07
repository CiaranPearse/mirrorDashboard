<template>
  <div>
    <v-btn v-if="edit === false"
              dark
              fab
              @click="onClickEdit"
              color="gray"
            >
              <v-icon>edit</v-icon>
            </v-btn>
    <h1 v-if="messageTitle !== undefined && messageTitle !== ''">{{ messageTitle }}</h1>
    <h1 v-else>Placeholder Title</h1>
    <p v-if="messageSubtitle !== undefined && messageSubtitle !== ''">{{ messageSubtitle }}</p>
    <p v-else>Placeholder Subtitle</p>
    <div v-if="edit === true">
      <form @submit.prevent="onChangeMessage">
          <v-text-field
        v-model="messageTitle"
        label="Title"
        required
      ></v-text-field>
      <v-text-field
        v-model="messageSubtitle"
        label="Subtitle"
      ></v-text-field>
      <v-btn color="red" @click="onCloseEdit" type="submit">Close</v-btn>
      <v-btn color="green" :disabled="!formIsValid" type="submit">Add Message</v-btn>
      </form>
    </div>
    <div>
      
    </div>
  </div>
</template>

<script>

export default {
  props: ['allProps'],
  data () {
    return {
      edit: false,
      messageTitle: null,
      messageSubtitle: null
    }
  },
  methods: {
    onClickEdit () {
      this.edit = true
    },
    onCloseEdit () {
      this.edit = false
      this.messageTitle = ''
      this.messageSubtitle = ''
    },
    onChangeMessage (payload) {
      console.log(this.messageSubtitle)
      console.log(this.messageTitle)
      this.$emit('allProps.welcomeMessageTitle', this.messageTitle)
      this.$emit('messageSubtitle', this.messageSubtitle)
    }
  },
  mounted () {
    this.messageTitle = this.allProps.welcomeMessageTitle
    this.messageSubtitle = this.allProps.welcomeMessageSubtitle
  },
  computed: {
    formIsValid () {
      return this.messageTitle !== ''
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
